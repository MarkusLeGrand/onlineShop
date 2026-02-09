import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const testimonials = [
  {
    name: 'Marie Laurent',
    role: 'Acheteuse régulière',
    text: "L'expérience d'achat est incroyable. L'interface est intuitive, les produits sont de qualité et la livraison est toujours rapide. Je recommande à 100% !",
    rating: 5,
    avatar: 'ML',
    color: 'bg-gradient-to-br from-pink-400 to-rose-500',
  },
  {
    name: 'Pierre Dubois',
    role: 'Client depuis 2024',
    text: "J'ai découvert cette boutique il y a un an et je ne peux plus m'en passer. Le service client est exceptionnel et les prix sont très compétitifs.",
    rating: 5,
    avatar: 'PD',
    color: 'bg-gradient-to-br from-blue-400 to-indigo-500',
  },
  {
    name: 'Sophie Martin',
    role: 'Passionnée de tech',
    text: 'Les dernières nouveautés tech sont toujours disponibles ici avant tout le monde. Le système de notation des produits est très fiable.',
    rating: 4,
    avatar: 'SM',
    color: 'bg-gradient-to-br from-emerald-400 to-teal-500',
  },
  {
    name: 'Thomas Renard',
    role: 'Designer',
    text: "La sélection de produits est exceptionnelle. Chaque article semble être choisi avec soin. L'attention aux détails dans l'emballage est remarquable.",
    rating: 5,
    avatar: 'TR',
    color: 'bg-gradient-to-br from-amber-400 to-orange-500',
  },
];

export default function TestimonialsV2() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="bg-secondary py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">Témoignages</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Ce que disent nos clients</h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Main testimonial */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 text-center" key={current}>
            <Quote size={48} className="text-primary/30 mx-auto mb-6" />

            <p className="text-white text-lg sm:text-xl leading-relaxed mb-8 animate-fade-in-up">
              "{t.text}"
            </p>

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < t.rating ? 'text-accent fill-accent' : 'text-gray-600'}
                />
              ))}
            </div>

            {/* Avatar & Info */}
            <div className="flex items-center justify-center gap-4 animate-fade-in-up delay-100">
              <div className={`w-14 h-14 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                {t.avatar}
              </div>
              <div className="text-left">
                <p className="text-white font-bold">{t.name}</p>
                <p className="text-gray-400 text-sm">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-xl border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-primary w-8' : 'bg-white/20 w-2 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-xl border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
