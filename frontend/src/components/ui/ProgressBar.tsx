import { useEffect, useRef, useState } from 'react';

interface Props {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: 'default' | 'gradient' | 'striped';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'accent' | 'danger';
  animated?: boolean;
  className?: string;
}

const colorMap = {
  primary: 'bg-primary',
  success: 'bg-success',
  accent: 'bg-accent',
  danger: 'bg-danger',
};

const sizeMap = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

export default function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  variant = 'default',
  size = 'md',
  color = 'primary',
  animated = true,
  className = '',
}: Props) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    if (!animated) {
      setWidth(percentage);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(percentage), 100);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [percentage, animated]);

  const barBg = {
    default: colorMap[color],
    gradient: 'bg-gradient-to-r from-primary via-purple-500 to-accent',
    striped: `${colorMap[color]} bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]`,
  }[variant];

  return (
    <div ref={ref} className={className}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-secondary">{label}</span>}
          {showValue && <span className="text-sm font-semibold text-primary">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${sizeMap[size]}`}>
        <div
          className={`${sizeMap[size]} ${barBg} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
