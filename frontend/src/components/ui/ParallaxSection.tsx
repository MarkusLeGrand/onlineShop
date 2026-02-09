import { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  speed?: number;
  bgImage?: string;
  bgColor?: string;
  overlay?: boolean;
  className?: string;
}

export default function ParallaxSection({
  children,
  speed = 0.5,
  bgImage,
  bgColor,
  overlay = true,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      setOffset(scrolled * speed * 0.3);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax background */}
      <div
        className="absolute inset-0 -top-20 -bottom-20"
        style={{
          transform: `translateY(${offset}px)`,
          backgroundImage: bgImage ? `url(${bgImage})` : undefined,
          backgroundColor: bgColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-black/40" />}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
