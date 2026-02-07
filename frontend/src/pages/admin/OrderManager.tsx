import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import client from '../../api/client';
import type { Order } from '../../types/order';
import LoadingSpinner from '../../components/LoadingSpinner';

const statusOptions = [
  { value: 'pending', label: 'En attente' },
  { value: 'paid', label: 'Payée' },
  { value: 'shipped', label: 'Expédiée' },
  { value: 'delivered', label: 'Livrée' },
  { value: 'cancelled', label: 'Annulée' },
];

export default function OrderManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    client
      .get('/admin/orders')
      .then((res) => setOrders(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: number, status: string) => {
    try {
      await client.patch(`/admin/orders/${orderId}/status`, { status });
      toast.success('Statut mis à jour');
      fetchOrders();
    } catch {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Commandes</h1>

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">#</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Total</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Articles</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Adresse</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">#{order.id}</td>
                <td className="px-4 py-3 text-gray-600 text-sm">
                  {new Date(order.created_at).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{order.total.toFixed(2)} &euro;</td>
                <td className="px-4 py-3 text-gray-600 text-sm">
                  {order.items.map((item) => `${item.product.name} x${item.quantity}`).join(', ')}
                </td>
                <td className="px-4 py-3 text-gray-600 text-sm max-w-48 truncate">
                  {order.shipping_address}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="text-sm border rounded px-2 py-1 outline-none focus:ring-2 focus:ring-primary"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
