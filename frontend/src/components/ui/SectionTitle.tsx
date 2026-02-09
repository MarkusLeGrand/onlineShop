interface Props {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ title, subtitle, align = 'left' }: Props) {
  return (
    <div className={`mb-8 ${align === 'center' ? 'text-center' : ''}`}>
      <h2 className="text-2xl sm:text-3xl font-bold text-secondary">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-muted max-w-2xl ${align === 'center' ? 'mx-auto' : ''}">{subtitle}</p>
      )}
    </div>
  );
}
