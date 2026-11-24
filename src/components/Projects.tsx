import { useEffect, useRef } from "react";
import SectionHeader from "./SectionHeader";
import { pad, projects, type Project } from "../data";

/** Auto-scroll speed in px per ms (~28px/s): slow enough to read while it moves. */
const AUTO_SPEED = 0.028;
/** After a swipe or drag, auto-scroll waits this long before resuming. */
const RESUME_DELAY = 2500;
/** Time constant (ms) for easing an arrow press (or focus) to its target. */
const TARGET_EASE = 140;
/** Pointer travel (px) before a press counts as a drag rather than a click. */
const DRAG_THRESHOLD = 5;
/** [clone][original][clone]: the offset can wrap in either direction without a visible jump. */
const SETS = ["clone", "original", "clone"] as const;

interface CardProps {
  project: Project;
  index: number;
  clone: boolean;
}

function ProjectCard({ project, index, clone }: CardProps) {
  const titleId = clone ? undefined : `project-${index + 1}-title`;
  return (
    <li className="project-card">
      <div className="project-card__media">
        <img src={project.image} alt={clone ? "" : project.imageAlt} loading="lazy" decoding="async" draggable={false} />
      </div>
      <div className="project-card__body">
        <p className="project-card__category">
          <span className="project-card__index" aria-hidden="true">
            {pad(index + 1)}
          </span>
          {project.category}
        </p>
        <h3 id={titleId} className="project-card__title">
          {project.title}
        </h3>
        <p className="project-card__context">{project.context}</p>
        <p className="project-card__desc">{project.description}</p>
        <div className="project-card__actions">
          <a
            className="button"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            draggable={false}
            tabIndex={clone ? -1 : undefined}
            aria-describedby={titleId}
          >
            View project
            <svg className="button__arrow" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
              <path d="M1 7h11M8 3l4 4-4 4" />
            </svg>
            {!clone && <span className="visually-hidden"> (opens in a new tab)</span>}
          </a>
          {project.liveUrl && (
            <a
              className="button button--ghost"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              tabIndex={clone ? -1 : undefined}
              aria-describedby={titleId}
            >
              Live site
              <svg className="button__arrow" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                <path d="M3 9l6-6M4 3h5v5" />
              </svg>
              {!clone && <span className="visually-hidden"> (opens in a new tab)</span>}
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

export default function Projects() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nudgeRef = useRef<(dir: 1 | -1) => void>(() => {});

  useEffect(() => {
    const carousel = carouselRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!carousel || !viewport || !track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sets = track.children as HTMLCollectionOf<HTMLElement>;

    // One offset drives everything: auto-scroll, arrows, drag, swipe and focus all move `pos`.
    let setWidth = 0; // one full set of cards, including the gap after it
    let step = 0; // one card + gap: how far an arrow press moves
    let pos = 0; // track is translated by -pos
    let target: number | null = null; // where an arrow press (or focus) is easing to
    let velocity = 0; // px/ms, momentum after a drag or swipe
    let speed = AUTO_SPEED; // eases between 0 and AUTO_SPEED, so pausing and resuming are smooth
    let hovering = false;
    let focusInside = false;
    let focusInCard = false;
    let dragging = false;
    let lastDrag = -Infinity;
    let raf = 0;
    let last = 0;

    // Drag state.
    let pressed = false;
    let moved = false;
    let startX = 0;
    let startPos = 0;
    let samples: { x: number; t: number }[] = [];

    const measure = () => {
      const prev = setWidth;
      setWidth = sets[1].offsetLeft - sets[0].offsetLeft;
      const cards = sets[1].children as HTMLCollectionOf<HTMLElement>;
      step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : setWidth;
      // First load: start on the original set, first card just inside the left fade.
      pos = prev ? (pos / prev) * setWidth : setWidth - viewport.clientWidth * 0.06;
    };

    // Keep pos within [0.5, 1.5) sets — pos modulo one set, offset so a clone always covers
    // both edges. Every position-like value shifts together, so nothing jumps mid-drag or
    // mid-ease. Skipped while a card has focus, so the focused original stays the one on screen.
    const wrap = () => {
      if (focusInCard || !setWidth) return;
      const shift = pos >= setWidth * 1.5 ? -setWidth : pos < setWidth * 0.5 ? setWidth : 0;
      if (!shift) return;
      pos += shift;
      startPos += shift;
      if (target !== null) target += shift;
    };

    const frame = (t: number) => {
      const dt = Math.min(t - last, 50);
      last = t;

      const paused = reduce.matches || hovering || focusInside || dragging || t - lastDrag < RESUME_DELAY;
      speed += ((paused ? 0 : AUTO_SPEED) - speed) * (1 - Math.exp(-dt / 280));

      if (!dragging) {
        if (target !== null) {
          pos += (target - pos) * (1 - Math.exp(-dt / TARGET_EASE));
          if (Math.abs(target - pos) < 0.5) {
            pos = target;
            target = null;
          }
        } else if (Math.abs(velocity) > 0.005) {
          pos += velocity * dt;
          velocity *= Math.pow(0.996, dt); // release momentum decays like a flick
        }
        pos += speed * dt;
      }
      wrap();
      track.style.transform = `translate3d(${-pos}px, 0, 0)`;
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    nudgeRef.current = (dir) => {
      velocity = 0;
      target = (target ?? pos) + dir * step;
    };

    // ---- Hover pause: the whole carousel (track + arrows) is the hitbox. Mouse only;
    // touch relies on the post-swipe delay instead.
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };

    // ---- Click-and-drag (mouse) and swipe (touch). Vertical page scrolling stays native via touch-action.
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      pressed = true;
      moved = false;
      startX = e.clientX;
      startPos = pos;
      samples = [{ x: e.clientX, t: e.timeStamp }];
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!pressed) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > DRAG_THRESHOLD) {
        // Capture only once it's clearly a drag, so a plain click on a link still works.
        moved = true;
        dragging = true;
        target = null;
        velocity = 0;
        startX = e.clientX; // start from here so the track doesn't hop by the threshold
        startPos = pos;
        viewport.setPointerCapture(e.pointerId);
        carousel.classList.add("is-dragging");
      }
      if (!moved) return;
      pos = startPos - (e.clientX - startX);
      samples.push({ x: e.clientX, t: e.timeStamp });
      while (samples.length > 2 && e.timeStamp - samples[0].t > 100) samples.shift();
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!pressed) return;
      pressed = false;
      if (!moved) return;
      const first = samples[0];
      const span = e.timeStamp - first.t;
      velocity = span > 0 ? -(e.clientX - first.x) / span : 0;
      dragging = false;
      lastDrag = performance.now();
      carousel.classList.remove("is-dragging");
    };
    // Click-vs-drag guard: a drag that ends over a link must not open it.
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    // ---- Keyboard: pause while focus is inside, and slide a focused card to the centre.
    const onFocusIn = (e: FocusEvent) => {
      focusInside = true;
      const card = (e.target as HTMLElement).closest(".project-card");
      focusInCard = Boolean(card);
      if (!card) return;
      const c = card.getBoundingClientRect();
      const v = viewport.getBoundingClientRect();
      velocity = 0;
      target = pos + (c.left + c.width / 2 - (v.left + v.width / 2));
    };
    const onFocusOut = (e: FocusEvent) => {
      const next = e.relatedTarget as HTMLElement | null;
      if (!next || !carousel.contains(next)) {
        focusInside = false;
        focusInCard = false;
      } else if (!next.closest(".project-card")) {
        focusInCard = false;
      }
    };
    // Browsers scroll overflow-hidden boxes to reveal focused elements; the transform does that job.
    const onScroll = () => {
      if (viewport.scrollLeft !== 0) viewport.scrollLeft = 0;
    };

    carousel.addEventListener("pointerenter", onEnter);
    carousel.addEventListener("pointerleave", onLeave);
    carousel.addEventListener("focusin", onFocusIn);
    carousel.addEventListener("focusout", onFocusOut);
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointercancel", onPointerUp);
    viewport.addEventListener("click", onClickCapture, true);
    viewport.addEventListener("scroll", onScroll);

    const resize = new ResizeObserver(measure);
    resize.observe(track);
    measure();

    // Only animate while the section is on screen.
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(viewport);

    return () => {
      stop();
      io.disconnect();
      resize.disconnect();
      carousel.removeEventListener("pointerenter", onEnter);
      carousel.removeEventListener("pointerleave", onLeave);
      carousel.removeEventListener("focusin", onFocusIn);
      carousel.removeEventListener("focusout", onFocusOut);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerUp);
      viewport.removeEventListener("pointercancel", onPointerUp);
      viewport.removeEventListener("click", onClickCapture, true);
      viewport.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <SectionHeader
        id="projects-title"
        eyebrow="Selected work / 03"
        title="Projects"
      />

      <div ref={carouselRef} className="projects-carousel" role="region" aria-roledescription="carousel" aria-label="Projects">
        <div ref={viewportRef} className="projects-viewport">
          <div ref={trackRef} className="projects-track">
            {SETS.map((kind, s) => (
              <ul
                key={s}
                className={`projects-set${kind === "clone" ? " projects-set--clone" : ""}`}
                aria-hidden={kind === "clone" ? true : undefined}
              >
                {projects.map((project, i) => (
                  <ProjectCard key={project.href} project={project} index={i} clone={kind === "clone"} />
                ))}
              </ul>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="carousel-arrow carousel-arrow--prev"
          aria-label="Previous project"
          onClick={() => nudgeRef.current(-1)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M14 8H2M6 4 2 8l4 4" />
          </svg>
        </button>
        <button
          type="button"
          className="carousel-arrow carousel-arrow--next"
          aria-label="Next project"
          onClick={() => nudgeRef.current(1)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M2 8h12M10 4l4 4-4 4" />
          </svg>
        </button>
      </div>
    </section>
  );
}
