import SectionHeader from "./SectionHeader";
import { pad, skillGroups } from "../data";

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <SectionHeader id="skills-title" title="Skills" />
      <ul className="skills-grid">
        {skillGroups.map((group, i) => (
          <li key={group.title} className="skill-card">
            <div className="skill-card__head">
              <span className="skill-card__index" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <h3 className="skill-card__name">{group.title}</h3>
            </div>
            <ul className="skill-card__tags">
              {group.items.map((item) => (
                <li key={item} className="skill-tag">
                  {item}
                </li>
              ))}
            </ul>
            <span className="skill-card__arc" aria-hidden="true" />
            <span className="skill-card__dot" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </section>
  );
}
