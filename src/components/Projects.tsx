import SectionHeader from "./SectionHeader";
import { pad, projects } from "../data";

function ProjectArt() {
  return (
    <svg className="project-card__art" viewBox="0 0 376 270" preserveAspectRatio="none" focusable="false">
      <g className="project-card__grid">
        <line x1="106" y1="0" x2="106" y2="270" />
        <line x1="0" y1="202" x2="376" y2="202" />
      </g>
      <rect className="project-card__shadow" x="74" y="64" width="264" height="174" />
      <rect className="project-card__frame" x="62" y="52" width="264" height="174" />
      <path className="project-card__diamond" d="M194 99 L235 140 L194 181 L153 140 Z" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <SectionHeader
        id="projects-title"
        title="Projects"
        subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit with clarity."
      />
      <ul className="projects-grid">
        {projects.map((project, i) => {
          const titleId = `project-${i + 1}-title`;
          return (
            <li key={project.title} className="project-card">
              <div className="project-card__visual" aria-hidden="true">
                <ProjectArt />
                <span className="project-card__category">{project.category}</span>
                <span className="project-card__number">{pad(i + 1)}</span>
              </div>
              <div className="project-card__body">
                <h3 id={titleId} className="project-card__title">
                  {project.title}
                </h3>
                <p className="project-card__desc">{project.description}</p>
                <a className="button" href={project.href} aria-describedby={titleId}>
                  Lorem ipsum
                  <svg className="button__arrow" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
                    <path d="M1 7h11M8 3l4 4-4 4" />
                  </svg>
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
