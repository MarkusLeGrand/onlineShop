interface Props {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'success' | 'danger' | 'muted';
  size?: 'sm' | 'md';
}

const variants = {
  primary: 'bg-primary-light text-primary-dark',
  accent: 'bg-amber-100 text-amber-800',
  success: 'bg-emerald-100 text-emerald-800',
  danger: 'bg-red-100 text-red-800',
  muted: 'bg-gray-100 text-gray-600',
};

const sizes = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
};

export default function Badge({ children, variant = 'primary', size = 'sm' }: Props) {
  return (
    <span className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
