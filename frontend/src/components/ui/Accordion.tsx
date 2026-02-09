import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

interface Props {
  items: AccordionItem[];
  variant?: 'default' | 'bordered' | 'separated';
  allowMultiple?: boolean;
  className?: string;
}

export default function Accordion({ items, variant = 'default', allowMultiple = false, className = '' }: Props) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggle = (index: number) => {
    if (allowMultiple) {
      setOpenItems((prev) => prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]);
    } else {
      setOpenItems((prev) => prev.includes(index) ? [] : [index]);
    }
  };

  const containerClass = {
    default: 'divide-y divide-gray-100',
    bordered: 'border border-gray-200 rounded-2xl divide-y divide-gray-100 overflow-hidden',
    separated: 'space-y-3',
  }[variant];

  const itemClass = {
    default: '',
    bordered: '',
    separated: 'border border-gray-200 rounded-xl overflow-hidden',
  }[variant];

  return (
    <div className={`${containerClass} ${className}`}>
      {items.map((item, i) => {
        const isOpen = openItems.includes(i);
        return (
          <div key={i} className={itemClass}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {item.icon && <span className="text-primary">{item.icon}</span>}
                <span className="font-semibold text-secondary">{item.title}</span>
              </div>
              <ChevronDown
                size={18}
                className={`text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
