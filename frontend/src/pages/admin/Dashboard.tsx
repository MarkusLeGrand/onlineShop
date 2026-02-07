import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import client from '../../api/client';
import LoadingSpinner from '../../components/LoadingSpinner';

interface Stats {
  total_orders: number;
  total_revenue: number;
  total_users: number;
  total_products: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get('/admin/stats')
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  const cards = [
    { label: 'Commandes', value: stats?.total_orders ?? 0, icon: ShoppingCart, color: 'text-blue-600 bg-blue-50' },
    { label: 'Revenus', value: `${(stats?.total_revenue ?? 0).toFixed(2)} \u20ac`, icon: DollarSign, color: 'text-green-600 bg-green-50' },
    { label: 'Utilisateurs', value: stats?.total_users ?? 0, icon: Users, color: 'text-purple-600 bg-purple-50' },
    { label: 'Produits', value: stats?.total_products ?? 0, icon: Package, color: 'text-orange-600 bg-orange-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${card.color}`}>
                <card.icon size={20} />
              </div>
              <span className="text-sm text-gray-500">{card.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          to="/admin/products"
          className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-gray-900 mb-1">Gérer les produits</h3>
          <p className="text-sm text-gray-500">Ajouter, modifier ou supprimer des produits</p>
        </Link>
        <Link
          to="/admin/orders"
          className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-gray-900 mb-1">Gérer les commandes</h3>
          <p className="text-sm text-gray-500">Voir et mettre à jour le statut des commandes</p>
        </Link>
      </div>
    </div>
  );
}
