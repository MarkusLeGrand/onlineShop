import { Quote } from 'lucide-react';
import Rating from '../ui/Rating';
import SectionTitle from '../ui/SectionTitle';

const testimonials = [
  {
    name: 'Marie Laurent',
    role: 'Cliente fidèle',
    avatar: 'ML',
    rating: 5,
    text: "Service impeccable ! Les produits sont de grande qualité et la livraison est toujours rapide. Je recommande à 100%.",
    color: 'bg-blue-500',
  },
  {
    name: 'Thomas Dubois',
    role: 'Nouveau client',
    avatar: 'TD',
    rating: 5,
    text: "J'ai été agréablement surpris par la qualité des vêtements. Le rapport qualité-prix est vraiment excellent.",
    color: 'bg-emerald-500',
  },
  {
    name: 'Sophie Martin',
    role: 'Cliente régulière',
    avatar: 'SM',
    rating: 4,
    text: "Le site est super intuitif et le service client est très réactif. Mes commandes arrivent toujours en parfait état.",
    color: 'bg-purple-500',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-surface-alt py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Ce que disent nos clients"
          subtitle="Rejoignez des milliers de clients satisfaits"
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <Quote size={32} className="text-primary/20 mb-4" />
              <p className="text-gray-600 leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-secondary text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.role}</p>
                </div>
                <div className="ml-auto">
                  <Rating value={t.rating} size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
