import { Minus, Plus } from 'lucide-react';

interface Props {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md';
}

export default function QuantitySelector({ value, min = 1, max = 99, onChange, size = 'md' }: Props) {
  const btnClass = size === 'sm' ? 'p-1' : 'p-2';
  const iconSize = size === 'sm' ? 14 : 18;
  const textClass = size === 'sm' ? 'px-2 text-sm' : 'px-4';

  return (
    <div className="inline-flex items-center border border-gray-200 rounded-lg bg-white">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={`${btnClass} hover:bg-gray-50 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-l-lg transition-colors`}
      >
        <Minus size={iconSize} />
      </button>
      <span className={`${textClass} font-semibold text-secondary select-none border-x border-gray-200`}>
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={`${btnClass} hover:bg-gray-50 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-r-lg transition-colors`}
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
}
