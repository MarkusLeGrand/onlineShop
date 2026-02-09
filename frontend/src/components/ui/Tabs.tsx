import { useState } from 'react';

interface Tab {
  key: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface Props {
  tabs: Tab[];
  variant?: 'underline' | 'pills' | 'boxed';
  defaultTab?: string;
  className?: string;
}

export default function Tabs({ tabs, variant = 'underline', defaultTab, className = '' }: Props) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.key);

  const tabStyles = {
    underline: {
      container: 'border-b border-gray-200 flex gap-0',
      tab: (isActive: boolean) =>
        `px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
          isActive
            ? 'border-primary text-primary'
            : 'border-transparent text-muted hover:text-secondary hover:border-gray-300'
        }`,
    },
    pills: {
      container: 'flex gap-2 bg-gray-100 p-1 rounded-xl',
      tab: (isActive: boolean) =>
        `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-white text-primary shadow-sm'
            : 'text-muted hover:text-secondary'
        }`,
    },
    boxed: {
      container: 'flex gap-2',
      tab: (isActive: boolean) =>
        `px-5 py-2.5 text-sm font-medium rounded-xl border-2 transition-all duration-200 ${
          isActive
            ? 'border-primary bg-primary text-white'
            : 'border-gray-200 text-muted hover:border-primary hover:text-primary'
        }`,
    },
  };

  const style = tabStyles[variant];
  const activeContent = tabs.find((t) => t.key === active)?.content;

  return (
    <div className={className}>
      <div className={style.container}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`${style.tab(active === tab.key)} flex items-center gap-2 cursor-pointer`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-6 animate-fade-in-up" key={active}>
        {activeContent}
      </div>
    </div>
  );
}
