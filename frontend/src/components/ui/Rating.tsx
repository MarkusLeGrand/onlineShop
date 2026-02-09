import { Star } from 'lucide-react';

interface Props {
  value: number;
  max?: number;
  size?: number;
  showValue?: boolean;
  count?: number;
}

export default function Rating({ value, max = 5, size = 16, showValue = false, count }: Props) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: max }, (_, i) => (
          <Star
            key={i}
            size={size}
            className={i < Math.floor(value) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
          />
        ))}
      </div>
      {showValue && <span className="text-sm font-medium text-gray-700 ml-1">{value.toFixed(1)}</span>}
      {count !== undefined && <span className="text-sm text-muted ml-1">({count})</span>}
    </div>
  );
}
