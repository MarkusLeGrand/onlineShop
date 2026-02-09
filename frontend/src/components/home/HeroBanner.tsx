import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-gray-900 to-primary-dark">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/3 w-64 h-64 bg-blue-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-16">
          {/* Left content */}
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm">
              <Sparkles size={16} className="text-accent" />
              <span>Nouvelle collection disponible</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
              Découvrez le
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent">
                shopping du futur
              </span>
            </h1>

            <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
              Des produits soigneusement sélectionnés, livrés chez vous en un clic.
              Qualité premium, prix imbattables.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/products">
                <Button size="lg" icon={<ArrowRight size={20} />}>
                  Explorer la boutique
                </Button>
              </Link>
              <Link to="/products?category=electronique">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                  Meilleures ventes
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-8 pt-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                Livraison gratuite
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                Retours 30 jours
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                Paiement sécurisé
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-primary to-blue-400 rounded-3xl rotate-6 opacity-80" />
              <div className="absolute inset-4 bg-gradient-to-br from-accent to-amber-400 rounded-3xl -rotate-6 opacity-80" />
              <div className="absolute inset-8 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-6xl font-black text-primary">-30%</p>
                  <p className="text-secondary font-semibold mt-2">Sur tout le site</p>
                  <p className="text-muted text-sm mt-1">Offre limitée</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
