import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '../stores/cartStore';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Cart() {
  const { items, total, isLoading, fetchCart, updateItem, removeItem } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      await updateItem(itemId, quantity);
    } catch {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleRemove = async (itemId: number) => {
    try {
      await removeItem(itemId);
      toast.success('Produit retiré du panier');
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Panier</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto text-gray-300 mb-4" size={64} />
          <p className="text-gray-500 mb-4">Votre panier est vide</p>
          <Link
            to="/products"
            className="inline-block bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-dark"
          >
            Découvrir nos produits
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white border rounded-lg p-4 flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded shrink-0">
                {item.product.image_url ? (
                  <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover rounded" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    N/A
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.product.slug}`} className="font-medium text-gray-900 hover:text-primary truncate block">
                  {item.product.name}
                </Link>
                <p className="text-sm text-gray-500">{item.product.price.toFixed(2)} &euro; / unité</p>
              </div>

              <div className="flex items-center border rounded-lg">
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-gray-100">
                  <Minus size={16} />
                </button>
                <span className="px-3 text-sm font-medium">{item.quantity}</span>
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-gray-100">
                  <Plus size={16} />
                </button>
              </div>

              <p className="font-bold text-gray-900 w-24 text-right">
                {(item.product.price * item.quantity).toFixed(2)} &euro;
              </p>

              <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700 p-1">
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <div className="bg-white border rounded-lg p-6 mt-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">{total.toFixed(2)} &euro;</span>
            </div>
            <Link
              to="/checkout"
              className="block mt-4 w-full bg-primary text-white py-3 rounded-lg font-medium text-center hover:bg-primary-dark transition-colors"
            >
              Passer la commande
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
