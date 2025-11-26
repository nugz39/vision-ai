interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={className}>
      <h2 className="font-display text-lg font-semibold text-nb-text md:text-xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-nb-muted">{subtitle}</p>}
    </div>
  );
}
