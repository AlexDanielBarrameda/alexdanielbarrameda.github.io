import { useState, type FormEvent } from "react";
import SectionHeader from "./SectionHeader";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import { contactEmail, displayUrl, githubUrl, linkedinUrl } from "../data";

const contactItems = [
  { label: "Email", value: contactEmail, href: `mailto:${contactEmail}`, Icon: MailIcon, external: false },
  { label: "GitHub", value: displayUrl(githubUrl), href: githubUrl, Icon: GitHubIcon, external: true },
  { label: "LinkedIn", value: displayUrl(linkedinUrl), href: linkedinUrl, Icon: LinkedInIcon, external: true },
];

// Grow the message box with its content (CSS caps it with max-height, then it scrolls).
function autoGrow(e: FormEvent<HTMLTextAreaElement>) {
  const el = e.currentTarget;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight + el.offsetHeight - el.clientHeight}px`;
}

export default function Contact() {
  const [status, setStatus] = useState("");

  // No backend yet: hand the message to the visitor's email app, prefilled.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name"));
    const subject = encodeURIComponent(`Hello from ${name}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n${name}\n${data.get("email")}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setStatus("Opening your email app with the message filled in.");
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <SectionHeader
        id="contact-title"
        title="Contact"
        subtitle="Open to new opportunities and collaborations."
      />

      <div className="contact">
        <div className="contact__intro">
          <p className="body-copy">
            Have a project in mind, a role you think I’d be a great fit for, or simply want to say hello? I’d be glad
            to hear from you.
          </p>
          <ul className="contact__list">
            {contactItems.map(({ label, value, href, Icon, external }) => (
              <li key={label}>
                <a
                  className="contact-item"
                  href={href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <span className="contact-item__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="contact-item__text">
                    <span className="contact-item__label">{label}</span>
                    <span className="contact-item__value">{value}</span>
                    {external && <span className="visually-hidden"> (opens in a new tab)</span>}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="field__label" htmlFor="contact-name">
              Name
            </label>
            <input className="field__input" id="contact-name" name="name" type="text" autoComplete="name" required />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="contact-email">
              Email
            </label>
            <input
              className="field__input"
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="contact-message">
              Message
            </label>
            <textarea
              className="field__input field__input--area"
              id="contact-message"
              name="message"
              rows={6}
              required
              onInput={autoGrow}
            />
          </div>

          <button className="button contact__submit" type="submit">
            Send message
            <svg className="button__arrow" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
              <path d="M1 7h11M8 3l4 4-4 4" />
            </svg>
          </button>
          <p className="contact__status" role="status">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
