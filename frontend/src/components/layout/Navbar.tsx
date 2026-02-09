import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Shield, Search, Menu, X, Package, Heart, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useCartStore } from '../../stores/cartStore';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { items } = useCartStore();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-secondary text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          <p className="hidden sm:block">Livraison gratuite dès 50&euro; d'achat</p>
          <p className="sm:hidden text-center w-full">Livraison gratuite dès 50&euro;</p>
          <div className="hidden sm:flex items-center gap-4">
            <a href="#" className="hover:text-blue-300 transition-colors">Aide</a>
            <a href="#" className="hover:text-blue-300 transition-colors">Suivi commande</a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Package size={18} className="text-white" />
                </div>
                <span className="text-xl font-black text-secondary">
                  Online<span className="text-primary">Shop</span>
                </span>
              </Link>

              <div className="hidden lg:flex items-center gap-1">
                <Link to="/products" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary rounded-lg hover:bg-primary-light/50 transition-all">
                  Tous les produits
                </Link>
                <div className="relative group">
                  <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary rounded-lg hover:bg-primary-light/50 transition-all flex items-center gap-1">
                    Catégories <ChevronDown size={14} />
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to="/products?category=electronique" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary-light/30">Électronique</Link>
                    <Link to="/products?category=vetements" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary-light/30">Vêtements</Link>
                    <Link to="/products?category=maison" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary-light/30">Maison</Link>
                    <Link to="/products?category=sport" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary-light/30">Sport</Link>
                  </div>
                </div>
                <div className="relative group">
                  <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary rounded-lg hover:bg-primary-light/50 transition-all flex items-center gap-1">
                    Versions <ChevronDown size={14} />
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to="/showcase" className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-light/30">Showcase</Link>
                    <div className="border-t border-gray-50 my-1" />
                    <p className="px-4 py-1 text-xs text-muted uppercase tracking-wider">Pages Home</p>
                    <Link to="/" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary-light/30">V1 — Classic</Link>
                    <Link to="/v2" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary-light/30">V2 — Magazine</Link>
                    <Link to="/v3" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary-light/30">V3 — Luxury</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Search */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </form>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              {/* Mobile search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <button className="hidden sm:flex p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
                <Heart size={20} />
              </button>

              {/* Cart */}
              <Link
                to={user ? '/cart' : '/login'}
                className="relative p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {user.full_name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden lg:inline text-sm font-medium">{user.full_name.split(' ')[0]}</span>
                    <ChevronDown size={14} className="hidden lg:inline" />
                  </button>

                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-50">
                          <p className="font-semibold text-secondary text-sm">{user.full_name}</p>
                          <p className="text-xs text-muted">{user.email}</p>
                        </div>
                        <Link to="/orders" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-primary-light/30">
                          <Package size={16} /> Mes commandes
                        </Link>
                        {user.is_admin && (
                          <Link to="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-primary-light/30">
                            <Shield size={16} /> Administration
                          </Link>
                        )}
                        <div className="border-t border-gray-50 mt-1 pt-1">
                          <button
                            onClick={() => { logout(); setProfileOpen(false); }}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full"
                          >
                            <LogOut size={16} /> Déconnexion
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                    <User size={18} /> Connexion
                  </Link>
                  <Link to="/register" className="hidden sm:flex px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors">
                    S'inscrire
                  </Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden border-t border-gray-100 p-4">
            <form onSubmit={handleSearch} className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher..."
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white focus:border-primary"
              />
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-3 space-y-1">
              <Link to="/products" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg">
                Tous les produits
              </Link>
              <Link to="/products?category=electronique" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg pl-6">
                Électronique
              </Link>
              <Link to="/products?category=vetements" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg pl-6">
                Vêtements
              </Link>
              <Link to="/products?category=maison" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg pl-6">
                Maison
              </Link>
              <Link to="/products?category=sport" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg pl-6">
                Sport
              </Link>
              {!user && (
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg">
                    Connexion
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-primary bg-primary-light/50 rounded-lg text-center">
                    S'inscrire
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
