import { useEffect, useState } from "react";

/** Shows once less than a quarter of the hero is on screen. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio < 0.25), {
      threshold: [0, 0.25],
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <a className={`to-top${visible ? " is-visible" : ""}`} href="#top" aria-label="Back to top">
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
        <path d="M7 12V2M3 6l4-4 4 4" />
      </svg>
    </a>
  );
}
