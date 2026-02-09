import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ParallaxSection from '../ui/ParallaxSection';
import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function ParallaxShowcase() {
  return (
    <ParallaxSection
      speed={0.4}
      bgColor="#0f172a"
      overlay={false}
      className="py-24"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/10 via-transparent to-purple-500/10" />
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <ScrollReveal animation="fade-right">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">Pourquoi nous choisir</p>
              <h2 className="text-4xl sm:text-5xl font-black text-white mt-4 leading-tight">
                Une expérience
                <br />
                <span className="gradient-text-blue">d'exception</span>
              </h2>
              <p className="text-gray-400 text-lg mt-6 leading-relaxed">
                Nous ne vendons pas que des produits, nous créons des expériences.
                Chaque détail est pensé pour votre satisfaction.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-right" delay={200}>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-4xl font-black text-white">
                    <AnimatedCounter end={99} suffix="%" />
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Clients satisfaits</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-4xl font-black text-white">
                    <AnimatedCounter end={24} suffix="h" />
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Livraison express</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-4xl font-black text-white">
                    <AnimatedCounter end={30} suffix=" j" />
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Retour gratuit</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-4xl font-black text-white">
                    <AnimatedCounter end={10} suffix="K+" />
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Références</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-right" delay={400}>
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-dark transition-colors"
              >
                Explorer le catalogue
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Right - Visual */}
          <ScrollReveal animation="fade-left" delay={200}>
            <div className="relative">
              {/* Decorative cards stack */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-400 rounded-3xl rotate-6 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-400 rounded-3xl -rotate-3 opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-gray-800 rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-center p-10 space-y-6">
                    <div className="w-20 h-20 bg-white/10 rounded-3xl mx-auto flex items-center justify-center animate-float">
                      <span className="text-4xl">🛍️</span>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm uppercase tracking-wider">Collection Premium</p>
                      <p className="text-white text-3xl font-black mt-2">2025</p>
                    </div>
                    <div className="flex justify-center gap-3">
                      {['bg-primary', 'bg-accent', 'bg-emerald-400', 'bg-purple-400'].map((c, i) => (
                        <div key={i} className={`w-4 h-4 ${c} rounded-full animate-pulse`} style={{ animationDelay: `${i * 200}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </ParallaxSection>
  );
}
