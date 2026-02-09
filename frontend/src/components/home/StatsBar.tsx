import { Package, Users, Star, Truck } from 'lucide-react';

const stats = [
  { icon: Package, value: '10K+', label: 'Produits', color: 'text-primary' },
  { icon: Users, value: '50K+', label: 'Clients satisfaits', color: 'text-emerald-500' },
  { icon: Star, value: '4.8/5', label: 'Note moyenne', color: 'text-accent' },
  { icon: Truck, value: '24h', label: 'Livraison express', color: 'text-purple-500' },
];

export default function StatsBar() {
  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <stat.icon size={24} className={stat.color} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-secondary">{stat.value}</p>
              <p className="text-muted text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
