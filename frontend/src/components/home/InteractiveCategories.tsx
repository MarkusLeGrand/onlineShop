import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Smartphone, Shirt, Home, Dumbbell, Headphones, Watch } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const categories = [
  { name: 'Électronique', slug: 'electronique', icon: Smartphone, color: 'from-blue-500 to-cyan-400', count: 245 },
  { name: 'Vêtements', slug: 'vetements', icon: Shirt, color: 'from-purple-500 to-pink-400', count: 532 },
  { name: 'Maison', slug: 'maison', icon: Home, color: 'from-amber-500 to-orange-400', count: 189 },
  { name: 'Sport', slug: 'sport', icon: Dumbbell, color: 'from-emerald-500 to-teal-400', count: 312 },
  { name: 'Audio', slug: 'audio', icon: Headphones, color: 'from-red-500 to-rose-400', count: 156 },
  { name: 'Accessoires', slug: 'accessoires', icon: Watch, color: 'from-indigo-500 to-violet-400', count: 423 },
];

export default function InteractiveCategories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ScrollReveal animation="fade-up">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">Explorez</p>
          <h2 className="text-3xl sm:text-4xl font-black text-secondary">Nos catégories</h2>
          <p className="text-muted mt-3 max-w-lg mx-auto">
            Parcourez notre sélection par catégorie et trouvez exactement ce que vous cherchez
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((cat, i) => (
          <ScrollReveal key={cat.slug} animation="scale" delay={i * 100}>
            <Link
              to={`/products?category=${cat.slug}`}
              className="group relative block overflow-hidden rounded-3xl aspect-square"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} transition-transform duration-700 ${hoveredIndex === i ? 'scale-110' : 'scale-100'}`} />

              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>

              {/* Icon */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${hoveredIndex === i ? 'scale-150 opacity-10' : 'scale-100 opacity-20'}`}>
                <cat.icon size={120} className="text-white" strokeWidth={1} />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6 text-white z-10">
                <div className={`w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-all duration-300 ${hoveredIndex === i ? 'scale-110 bg-white/30' : ''}`}>
                  <cat.icon size={26} />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black">{cat.name}</h3>
                      <p className="text-white/60 text-sm mt-0.5">{cat.count} produits</p>
                    </div>
                    <div className={`w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 ${hoveredIndex === i ? 'bg-white text-black scale-110' : ''}`}>
                      <ArrowUpRight size={18} className={`transition-transform duration-300 ${hoveredIndex === i ? 'rotate-0' : '-rotate-45'}`} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
