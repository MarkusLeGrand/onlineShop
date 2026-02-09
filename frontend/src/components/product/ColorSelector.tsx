import { useState } from 'react';
import { Check } from 'lucide-react';

interface ColorOption {
  name: string;
  value: string;
  available?: boolean;
}

interface Props {
  colors: ColorOption[];
  onChange?: (color: ColorOption) => void;
  className?: string;
}

const defaultColors: ColorOption[] = [
  { name: 'Noir', value: '#0f172a', available: true },
  { name: 'Blanc', value: '#f8fafc', available: true },
  { name: 'Bleu', value: '#2563eb', available: true },
  { name: 'Rouge', value: '#ef4444', available: false },
  { name: 'Vert', value: '#10b981', available: true },
];

export default function ColorSelector({ colors = defaultColors, onChange, className = '' }: Props) {
  const [selected, setSelected] = useState(colors[0]);

  const handleSelect = (color: ColorOption) => {
    if (color.available === false) return;
    setSelected(color);
    onChange?.(color);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-secondary">Couleur:</span>
        <span className="text-sm text-muted">{selected.name}</span>
      </div>
      <div className="flex gap-3">
        {colors.map((color) => {
          const isSelected = selected.value === color.value;
          const isLight = color.value === '#f8fafc' || color.value === '#ffffff';
          return (
            <button
              key={color.value}
              onClick={() => handleSelect(color)}
              disabled={color.available === false}
              title={color.name}
              className={`
                relative w-10 h-10 rounded-full transition-all duration-200 cursor-pointer
                ${isSelected ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'hover:scale-110'}
                ${color.available === false ? 'opacity-30 cursor-not-allowed' : ''}
                ${isLight ? 'border border-gray-200' : ''}
              `}
              style={{ backgroundColor: color.value }}
            >
              {isSelected && (
                <Check
                  size={16}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isLight ? 'text-gray-800' : 'text-white'}`}
                  strokeWidth={3}
                />
              )}
              {color.available === false && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-gray-400 rotate-45 rounded" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
