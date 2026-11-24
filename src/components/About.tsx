import { aboutImageAlt, aboutImageUrl, aboutParagraphs } from "../data";

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="about__inner">
        <div className="portrait">
          <div className="portrait__frame">
            <img className="portrait__img" src={aboutImageUrl} alt={aboutImageAlt} loading="lazy" decoding="async" />
          </div>
          <span className="portrait__number" aria-hidden="true">
            01
          </span>
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
