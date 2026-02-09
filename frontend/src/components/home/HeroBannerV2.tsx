import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Star, TrendingUp } from 'lucide-react';
import Button from '../ui/Button';
import TypeWriter from '../ui/TypeWriter';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function HeroBannerV2() {
  return (
    <section className="relative min-h-[700px] overflow-hidden bg-secondary">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-blob delay-200" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[560px]">
          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-sm text-white animate-fade-in-up">
              <Zap size={16} className="text-accent" />
              <span>La plateforme e-commerce nouvelle génération</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] animate-fade-in-up delay-100">
              Le style qui vous
              <br />
              <span className="gradient-text">
                <TypeWriter words={['correspond', 'inspire', 'transforme', 'définit']} typingSpeed={80} />
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-md animate-fade-in-up delay-200">
              Une expérience shopping unique avec des milliers de produits sélectionnés
              par nos experts pour vous.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <Link to="/products">
                <Button size="lg" icon={<ArrowRight size={20} />}>
                  Commencer le shopping
                </Button>
              </Link>
              <Link to="/products?category=electronique">
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 hover:text-white">
                  Voir les tendances
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 animate-fade-in-up delay-400">
              <div>
                <p className="text-3xl font-black text-white">
                  <AnimatedCounter end={10} suffix="K+" />
                </p>
                <p className="text-sm text-gray-500 mt-1">Produits</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">
                  <AnimatedCounter end={50} suffix="K+" />
                </p>
                <p className="text-sm text-gray-500 mt-1">Clients</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">
                  <AnimatedCounter end={4.9} decimals={1} suffix="/5" />
                </p>
                <p className="text-sm text-gray-500 mt-1">Note moyenne</p>
              </div>
            </div>
          </div>

          {/* Right - Floating cards */}
          <div className="hidden lg:block relative h-[500px]">
            {/* Card 1 */}
            <div className="absolute top-0 right-0 w-72 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 animate-float">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-400 rounded-2xl flex items-center justify-center">
                  <Star size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">Best seller</p>
                  <p className="text-gray-400 text-sm">Cette semaine</p>
                </div>
              </div>
              <div className="space-y-2">
                {['Smartphone Pro', 'Sneakers Urban', 'Montre Luxe'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg" />
                    <div>
                      <p className="text-white text-sm font-medium">{item}</p>
                      <p className="text-gray-500 text-xs">#{i + 1} trending</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2 */}
            <div className="absolute bottom-10 left-0 w-64 bg-gradient-to-br from-primary to-purple-600 rounded-3xl p-6 animate-float-slow shadow-2xl shadow-primary/20">
              <TrendingUp size={32} className="text-white mb-3" />
              <p className="text-white/80 text-sm">Ventes cette semaine</p>
              <p className="text-white text-3xl font-black mt-1">
                +<AnimatedCounter end={127} suffix="%" />
              </p>
              <div className="flex gap-1 mt-4">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/20 rounded-full overflow-hidden" style={{ height: '60px' }}>
                    <div className="w-full bg-white/50 rounded-full mt-auto" style={{ height: `${h}%`, marginTop: `${100 - h}%` }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute top-1/2 left-1/4 bg-accent text-secondary font-black text-lg px-5 py-3 rounded-2xl animate-float shadow-xl shadow-accent/30" style={{ animationDelay: '1s' }}>
              -30% SOLDES
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
