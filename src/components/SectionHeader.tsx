interface SectionHeaderProps {
  id: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

export default function SectionHeader({ id, title, subtitle, eyebrow }: SectionHeaderProps) {
  return (
    <header className="section-header">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="section-title">
        {title}
      </h2>
      <span className="accent-line accent-line--center" aria-hidden="true" />
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </header>
  );
}
