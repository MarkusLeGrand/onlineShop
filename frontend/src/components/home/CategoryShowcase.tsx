import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Shirt, Home, Dumbbell } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const categories = [
  {
    name: 'Électronique',
    slug: 'electronique',
    description: 'Gadgets & Tech',
    icon: Monitor,
    gradient: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
  },
  {
    name: 'Vêtements',
    slug: 'vetements',
    description: 'Mode & Style',
    icon: Shirt,
    gradient: 'from-pink-500 to-rose-600',
    bgLight: 'bg-pink-50',
  },
  {
    name: 'Maison',
    slug: 'maison',
    description: 'Déco & Confort',
    icon: Home,
    gradient: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
  },
  {
    name: 'Sport',
    slug: 'sport',
    description: 'Fitness & Bien-être',
    icon: Dumbbell,
    gradient: 'from-orange-500 to-amber-600',
    bgLight: 'bg-orange-50',
  },
];

export default function CategoryShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle
        title="Parcourir par catégorie"
        subtitle="Trouvez exactement ce que vous cherchez"
        align="center"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/products?category=${cat.slug}`}
            className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="relative p-6 sm:p-8 flex flex-col items-center text-center space-y-4">
              <div className={`${cat.bgLight} group-hover:bg-white/20 p-4 rounded-2xl transition-colors duration-300`}>
                <cat.icon size={32} className="text-gray-700 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h3 className="font-bold text-secondary group-hover:text-white transition-colors duration-300">
                  {cat.name}
                </h3>
                <p className="text-sm text-muted group-hover:text-white/80 transition-colors duration-300 mt-1">
                  {cat.description}
                </p>
              </div>
              <ArrowRight size={18} className="text-muted group-hover:text-white transition-all duration-300 group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
