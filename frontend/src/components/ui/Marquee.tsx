interface Props {
  children: React.ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

const speedMap = {
  slow: '40s',
  normal: '25s',
  fast: '15s',
};

export default function Marquee({
  children,
  speed = 'normal',
  reverse = false,
  pauseOnHover = true,
  className = '',
}: Props) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex gap-8 w-max ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${speedMap[speed]} linear infinite`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
