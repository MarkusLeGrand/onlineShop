interface Props {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  blur?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
}

const blurMap = { sm: 'backdrop-blur-sm', md: 'backdrop-blur-md', lg: 'backdrop-blur-xl' };

export default function GlassCard({
  children,
  variant = 'light',
  blur = 'md',
  hover = true,
  className = '',
}: Props) {
  const base = variant === 'light'
    ? 'bg-white/15 border-white/20'
    : 'bg-black/20 border-white/10';

  return (
    <div
      className={`
        rounded-2xl border p-6
        ${base}
        ${blurMap[blur]}
        ${hover ? 'hover:bg-white/25 hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
