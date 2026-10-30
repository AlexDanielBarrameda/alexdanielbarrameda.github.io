import SectionHeader from "./SectionHeader";
import { pad, skills } from "../data";

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <SectionHeader
        id="skills-title"
        title="Skills"
        subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod."
      />
      <ul className="skills-grid">
        {skills.map((name, i) => (
          <li key={name} className="skill-card">
            <span className="skill-card__index" aria-hidden="true">
              {pad(i + 1)}
            </span>
            <h3 className="skill-card__name">{name}</h3>
            <span className="skill-card__arc" aria-hidden="true" />
            <span className="skill-card__dot" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </section>
  );
}
