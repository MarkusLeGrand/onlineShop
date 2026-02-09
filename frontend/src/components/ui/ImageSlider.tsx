import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  title?: string;
  subtitle?: string;
}

interface Props {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  effect?: 'slide' | 'fade' | 'zoom';
  className?: string;
}

export default function ImageSlider({
  slides,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true,
  effect = 'slide',
  className = '',
}: Props) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, slides.length, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, slides.length, goTo]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next]);

  return (
    <div className={`relative overflow-hidden rounded-2xl group ${className}`}>
      {/* Slides */}
      <div className="relative aspect-[16/9]">
        {slides.map((slide, i) => {
          const isActive = i === current;
          let slideClass = '';

          if (effect === 'fade') {
            slideClass = `absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`;
          } else if (effect === 'zoom') {
            slideClass = `absolute inset-0 transition-all duration-700 ${isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'}`;
          } else {
            slideClass = 'absolute inset-0 transition-transform duration-500';
          }

          return (
            <div
              key={i}
              className={slideClass}
              style={effect === 'slide' ? { transform: `translateX(${(i - current) * 100}%)` } : undefined}
            >
              <img src={slide.image} alt={slide.title || ''} className="w-full h-full object-cover" />
              {(slide.title || slide.subtitle) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                  {slide.title && <h3 className="text-white text-2xl font-bold">{slide.title}</h3>}
                  {slide.subtitle && <p className="text-white/80 mt-1">{slide.subtitle}</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Arrows */}
      {showArrows && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'bg-white w-6' : 'bg-white/50 w-2 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
