import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Shield } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useCartStore } from '../../stores/cartStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { items } = useCartStore();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold text-primary">
              OnlineShop
            </Link>
            <div className="hidden sm:flex gap-6">
              <Link to="/products" className="text-gray-600 hover:text-gray-900">
                Produits
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <Link to="/cart" className="relative text-gray-600 hover:text-gray-900">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                {user.is_admin && (
                  <Link to="/admin" className="text-gray-600 hover:text-gray-900" title="Admin">
                    <Shield size={20} />
                  </Link>
                )}
                <span className="text-sm text-gray-600 hidden sm:inline">
                  {user.full_name}
                </span>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-gray-900"
                  title="Déconnexion"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                  <User size={20} />
                  <span className="text-sm">Connexion</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
