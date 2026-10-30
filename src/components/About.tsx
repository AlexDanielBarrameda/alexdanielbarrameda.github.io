import { aboutParagraphs } from "../data";

function PortraitArt() {
  return (
    <svg className="portrait__art" viewBox="0 0 384 520" preserveAspectRatio="xMidYMax slice" focusable="false">
      <g className="portrait__grid">
        <line x1="284" y1="0" x2="284" y2="520" />
        <line x1="0" y1="354" x2="384" y2="354" />
        <line x1="236" y1="332" x2="176" y2="520" />
      </g>
      <g className="portrait__figure">
        <circle cx="292" cy="106" r="49" />
        <ellipse cx="206" cy="262" rx="41" ry="48" />
        <path d="M102 520 V438 A104 104 0 0 1 310 438 V520" />
      </g>
    </svg>
  );
}

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="about__inner">
        <div className="portrait" aria-hidden="true">
          <div className="portrait__frame">
            <PortraitArt />
            <span className="portrait__label">Lorem</span>
          </div>
          <span className="portrait__number">01</span>
        </div>

        <div className="about__copy">
          <h2 id="about-title" className="section-title">
            About
          </h2>
          <span className="accent-line" aria-hidden="true" />
          {aboutParagraphs.map((text) => (
            <p key={text.slice(0, 24)} className="body-copy">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
