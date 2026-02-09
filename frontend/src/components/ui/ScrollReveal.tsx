import { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'flip' | 'bounce' | 'tilt';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const animationClasses: Record<string, { hidden: string; visible: string }> = {
  'fade-up': {
    hidden: 'opacity-0 translate-y-8',
    visible: 'opacity-100 translate-y-0',
  },
  'fade-down': {
    hidden: 'opacity-0 -translate-y-8',
    visible: 'opacity-100 translate-y-0',
  },
  'fade-left': {
    hidden: 'opacity-0 -translate-x-8',
    visible: 'opacity-100 translate-x-0',
  },
  'fade-right': {
    hidden: 'opacity-0 translate-x-8',
    visible: 'opacity-100 translate-x-0',
  },
  scale: {
    hidden: 'opacity-0 scale-90',
    visible: 'opacity-100 scale-100',
  },
  flip: {
    hidden: 'opacity-0 [transform:perspective(400px)_rotateX(20deg)]',
    visible: 'opacity-100 [transform:perspective(400px)_rotateX(0deg)]',
  },
  bounce: {
    hidden: 'opacity-0 scale-75',
    visible: 'opacity-100 scale-100',
  },
  tilt: {
    hidden: 'opacity-0 [transform:perspective(500px)_rotateY(-10deg)]',
    visible: 'opacity-100 [transform:perspective(500px)_rotateY(0deg)]',
  },
};

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.15,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const anim = animationClasses[animation];

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${isVisible ? anim.visible : anim.hidden} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
