import { Shield, Truck, RotateCcw, Headphones, CreditCard, Gift } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Livraison gratuite',
    description: 'Sur toutes les commandes de plus de 50€',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: RotateCcw,
    title: 'Retours faciles',
    description: 'Retour gratuit sous 30 jours',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Shield,
    title: 'Paiement sécurisé',
    description: 'Vos données sont protégées à 100%',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Headphones,
    title: 'Support 24/7',
    description: 'Une équipe à votre écoute',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: CreditCard,
    title: 'Paiement flexible',
    description: 'CB, PayPal, Apple Pay, 3x sans frais',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: Gift,
    title: 'Programme fidélité',
    description: 'Cumulez des points à chaque achat',
    color: 'bg-amber-50 text-amber-600',
  },
];

export default function FeaturesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-4`}>
              <feature.icon size={22} />
            </div>
            <h3 className="font-bold text-secondary mb-1">{feature.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
