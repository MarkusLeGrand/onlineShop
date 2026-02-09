import { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface Props {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure at least 4 images by repeating
  const allImages = images.length > 0
    ? [...images, ...images, ...images, ...images].slice(0, Math.max(4, images.length))
    : [];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!zoom || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const next = () => setActiveIndex((prev) => (prev + 1) % allImages.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  if (allImages.length === 0) {
    return (
      <div className="aspect-square bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 text-lg">
        Pas d'image disponible
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        ref={containerRef}
        className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden group cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onClick={() => setFullscreen(true)}
      >
        <img
          src={allImages[activeIndex]}
          alt={`${alt} - ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-300"
          style={zoom ? {
            transform: 'scale(2)',
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
          } : undefined}
        />

        {/* Navigation arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
        >
          <ChevronRight size={20} />
        </button>

        {/* Zoom indicator */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          {zoom ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
        </div>

        {/* Fullscreen button */}
        <button
          onClick={(e) => { e.stopPropagation(); setFullscreen(true); }}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        >
          <Maximize2 size={18} />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg font-medium">
          {activeIndex + 1} / {allImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {allImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              i === activeIndex
                ? 'border-primary shadow-md scale-105'
                : 'border-transparent hover:border-gray-300 opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Fullscreen overlay */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in-up"
          onClick={() => setFullscreen(false)}
          style={{ animationDuration: '200ms' }}
        >
          <img
            src={allImages[activeIndex]}
            alt={alt}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 p-4 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 p-4 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <ChevronRight size={24} />
          </button>
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            Cliquez n'importe où pour fermer
          </p>
        </div>
      )}
    </div>
  );
}
