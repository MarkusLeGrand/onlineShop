import { useState } from 'react';

interface SizeOption {
  label: string;
  available?: boolean;
}

interface Props {
  sizes?: SizeOption[];
  onChange?: (size: SizeOption) => void;
  className?: string;
}

const defaultSizes: SizeOption[] = [
  { label: 'XS', available: true },
  { label: 'S', available: true },
  { label: 'M', available: true },
  { label: 'L', available: false },
  { label: 'XL', available: true },
  { label: 'XXL', available: true },
];

export default function SizeSelector({ sizes = defaultSizes, onChange, className = '' }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (size: SizeOption) => {
    if (size.available === false) return;
    setSelected(size.label);
    onChange?.(size);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-secondary">Taille:</span>
          {selected && <span className="text-sm text-muted">{selected}</span>}
        </div>
        <button className="text-xs text-primary hover:underline font-medium">Guide des tailles</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isSelected = selected === size.label;
          return (
            <button
              key={size.label}
              onClick={() => handleSelect(size)}
              disabled={size.available === false}
              className={`
                min-w-[48px] h-12 px-4 rounded-xl text-sm font-semibold transition-all duration-200 border-2 cursor-pointer
                ${isSelected
                  ? 'border-primary bg-primary text-white shadow-md shadow-primary/20 scale-105'
                  : size.available !== false
                    ? 'border-gray-200 text-secondary hover:border-primary hover:text-primary'
                    : 'border-gray-100 text-gray-300 cursor-not-allowed line-through'
                }
              `}
            >
              {size.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
