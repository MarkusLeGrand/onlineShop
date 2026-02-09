import { useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  maxTilt?: number;
  glare?: boolean;
  className?: string;
}

export default function TiltCard({ children, maxTilt = 15, glare = true, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ transform: '', glarePos: { x: 50, y: 50 } });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const tiltX = (y - 0.5) * -maxTilt;
    const tiltY = (x - 0.5) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
      glarePos: { x: x * 100, y: y * 100 },
    });
  };

  const handleMouseLeave = () => {
    setStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)', glarePos: { x: 50, y: 50 } });
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden transition-transform duration-200 ease-out ${className}`}
      style={{ transform: style.transform, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${style.glarePos.x}% ${style.glarePos.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
          }}
        />
      )}
    </div>
  );
}
