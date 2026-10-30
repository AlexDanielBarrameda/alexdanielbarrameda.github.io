interface SectionHeaderProps {
  id: string;
  title: string;
  subtitle: string;
}

export default function SectionHeader({ id, title, subtitle }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <h2 id={id} className="section-title">
        {title}
      </h2>
      <span className="accent-line accent-line--center" aria-hidden="true" />
      <p className="section-subtitle">{subtitle}</p>
    </header>
  );
}
