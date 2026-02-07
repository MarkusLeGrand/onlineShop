import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import client from '../api/client';
import { useCartStore } from '../stores/cartStore';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await client.post('/orders', { shipping_address: address });
      await clearCart();
      toast.success('Commande passée avec succès !');
      navigate('/orders');
    } catch {
      toast.error('Erreur lors de la commande');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Passer commande</h1>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Récapitulatif</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between py-2 border-b last:border-0">
            <span className="text-gray-700">
              {item.product.name} x {item.quantity}
            </span>
            <span className="font-medium">
              {(item.product.price * item.quantity).toFixed(2)} &euro;
            </span>
          </div>
        ))}
        <div className="flex justify-between pt-4 text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">{total.toFixed(2)} &euro;</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Adresse de livraison</h2>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          rows={3}
          placeholder="Votre adresse complète..."
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {loading ? 'Traitement...' : 'Confirmer la commande'}
        </button>
      </form>
    </div>
  );
}
