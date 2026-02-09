import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { useState } from 'react';

export default function HeroBannerV3() {
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);

  return (
    <section className="relative h-screen max-h-[900px] min-h-[600px] overflow-hidden bg-black">
      {/* Split screen design */}
      <div className="absolute inset-0 flex">
        {/* Left half */}
        <div
          className={`relative w-1/2 bg-gradient-to-br from-gray-900 to-black transition-all duration-700 ${
            hoverSide === 'left' ? 'w-[60%]' : hoverSide === 'right' ? 'w-[40%]' : ''
          }`}
          onMouseEnter={() => setHoverSide('left')}
          onMouseLeave={() => setHoverSide(null)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        {/* Right half */}
        <div
          className={`relative w-1/2 bg-gradient-to-bl from-gray-900 to-black transition-all duration-700 ${
            hoverSide === 'right' ? 'w-[60%]' : hoverSide === 'left' ? 'w-[40%]' : ''
          }`}
          onMouseEnter={() => setHoverSide('right')}
          onMouseLeave={() => setHoverSide(null)}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-accent/10 to-transparent" />
        </div>

        {/* Center line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      {/* Rotating circles decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] animate-rotate-slow opacity-10">
        <div className="absolute inset-0 border border-white/20 rounded-full" />
        <div className="absolute inset-10 border border-white/15 rounded-full" />
        <div className="absolute inset-20 border border-white/10 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <div className="space-y-8 max-w-4xl">
          {/* Overline */}
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 animate-fade-in-down">
            Collection 2025 &mdash; Edition limitee
          </p>

          {/* Title */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-none animate-fade-in-up">
            <span className="block">L'ELEGANCE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
              REDEFINITE
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg max-w-xl mx-auto animate-fade-in-up delay-200">
            Une collection exclusive de produits premium, designés pour ceux qui
            ne font aucun compromis sur la qualité.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-6 animate-fade-in-up delay-300">
            <Link
              to="/products"
              className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105"
            >
              <span className="relative z-10">Découvrir</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-0 bg-white group-hover:bg-transparent transition-colors z-[5]" />
              <span className="relative z-10 group-hover:text-white transition-colors">Découvrir</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 group-hover:text-white transition-all" />
            </Link>

            <button className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
              <div className="w-14 h-14 border-2 border-white/20 rounded-full flex items-center justify-center group-hover:border-white/50 group-hover:scale-110 transition-all">
                <Play size={18} className="ml-1" />
              </div>
              <span className="text-sm font-medium">Voir le lookbook</span>
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="pt-12 animate-fade-in-up delay-500">
            <div className="w-6 h-10 border-2 border-white/20 rounded-full mx-auto flex justify-center">
              <div className="w-1.5 h-3 bg-white/40 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Side labels */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-600 -rotate-90 origin-center whitespace-nowrap">
          Femme &mdash; Homme &mdash; Enfant
        </p>
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-600 rotate-90 origin-center whitespace-nowrap">
          Premium Quality &mdash; Since 2024
        </p>
      </div>
    </section>
  );
}
