import { Link } from 'react-router-dom';
import { Package, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-gray-300 mt-auto">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Package size={18} className="text-white" />
              </div>
              <span className="text-xl font-black text-white">
                Online<span className="text-primary">Shop</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Votre destination shopping en ligne. Des produits de qualité,
              livrés rapidement et au meilleur prix.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Boutique</h3>
            <ul className="space-y-2.5">
              <li><Link to="/products" className="text-sm hover:text-primary transition-colors">Tous les produits</Link></li>
              <li><Link to="/products?category=electronique" className="text-sm hover:text-primary transition-colors">Électronique</Link></li>
              <li><Link to="/products?category=vetements" className="text-sm hover:text-primary transition-colors">Vêtements</Link></li>
              <li><Link to="/products?category=maison" className="text-sm hover:text-primary transition-colors">Maison</Link></li>
              <li><Link to="/products?category=sport" className="text-sm hover:text-primary transition-colors">Sport</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-semibold mb-4">Aide</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Livraison</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Retours & Remboursements</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Conditions générales</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Politique de confidentialité</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="shrink-0 mt-0.5 text-primary" />
                <span>123 Rue du Commerce<br />75001 Paris, France</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={16} className="shrink-0 text-primary" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={16} className="shrink-0 text-primary" />
                <span>contact@onlineshop.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} OnlineShop. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="bg-white/10 rounded px-2 py-1 font-medium">VISA</div>
              <div className="bg-white/10 rounded px-2 py-1 font-medium">MC</div>
              <div className="bg-white/10 rounded px-2 py-1 font-medium">PayPal</div>
              <div className="bg-white/10 rounded px-2 py-1 font-medium">Apple Pay</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
