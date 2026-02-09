import { Link } from 'react-router-dom';
import { Zap, Clock } from 'lucide-react';
import Button from '../ui/Button';

export default function PromoBanner() {
  return (
    <section className="bg-gradient-to-r from-primary to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-white space-y-5">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium">
              <Zap size={16} className="text-accent" />
              Offre Flash
            </div>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              Jusqu'à 50% de réduction<br />
              <span className="text-blue-200">sur l'électronique</span>
            </h2>
            <p className="text-blue-100 max-w-md">
              Profitez de nos offres exceptionnelles sur une sélection de produits tech.
              Quantités limitées !
            </p>
            <div className="flex items-center gap-6 pt-2">
              <Link to="/products?category=electronique">
                <Button variant="secondary" size="lg">
                  Voir les offres
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-blue-200 text-sm">
                <Clock size={16} />
                Se termine dans 2j 14h
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <p className="text-4xl font-black text-white">30%</p>
                <p className="text-blue-200 text-sm mt-1">Casques audio</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 translate-y-4">
                <p className="text-4xl font-black text-accent">50%</p>
                <p className="text-blue-200 text-sm mt-1">Accessoires</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 -translate-y-4">
                <p className="text-4xl font-black text-white">20%</p>
                <p className="text-blue-200 text-sm mt-1">Claviers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <p className="text-4xl font-black text-accent">40%</p>
                <p className="text-blue-200 text-sm mt-1">Webcams</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
