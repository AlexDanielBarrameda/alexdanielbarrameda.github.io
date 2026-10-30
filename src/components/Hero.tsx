import { useEffect, useState } from "react";
import ProfileFrame from "./ProfileFrame";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import { heroTitles, navItems } from "../data";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedInIcon, external: true },
  { label: "GitHub", href: "https://github.com", Icon: GitHubIcon, external: true },
  { label: "Email", href: "mailto:hello@example.com", Icon: MailIcon, external: false },
];

export default function Hero() {
  const [heroTitleIndex, setHeroTitleIndex] = useState(0);
  const title = heroTitles[heroTitleIndex];

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroTitleIndex((currentIndex) => (currentIndex + 1) % heroTitles.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header id="top" className="hero">
      <div className="hero__content">
        <ProfileFrame />
        <p className="hero__role">Software Developer</p>

        {/* Stable accessible name; the rotating text is visual only so screen readers aren't re-announced every 3s. */}
        <h1 className="hero__title">
          <span className="visually-hidden">Hi! I'm Dan</span>
          <span key={heroTitleIndex} className="hero__title-text" aria-hidden="true">
            <span className="hero__title-lead">{title.lead}</span>
            {title.accent}
          </span>
        </h1>
        <span className="accent-line accent-line--center accent-line--hero" aria-hidden="true" />

        <nav className="hero__nav" aria-label="Primary">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <ul className="socials" aria-label="Social links">
        {socials.map(({ label, href, Icon, external }) => (
          <li key={label}>
            <a
              className="social-link"
              href={href}
              aria-label={label}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            >
              <Icon />
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
