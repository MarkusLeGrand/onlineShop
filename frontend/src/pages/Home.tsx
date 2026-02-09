import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Clock } from 'lucide-react';
import client from '../api/client';
import type { Product } from '../types/product';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import HeroBanner from '../components/home/HeroBanner';
import CategoryShowcase from '../components/home/CategoryShowcase';
import PromoBanner from '../components/home/PromoBanner';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import StatsBar from '../components/home/StatsBar';
import FeaturesGrid from '../components/home/FeaturesGrid';
import SectionTitle from '../components/ui/SectionTitle';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get('/products', { params: { limit: 8 } })
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const featured = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  return (
    <div>
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Stats bar */}
      <StatsBar />

      {/* 3. Categories */}
      <CategoryShowcase />

      {/* 4. Featured products */}
      <section className="bg-surface-alt py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-2">
                <TrendingUp size={18} />
                Tendances
              </div>
              <SectionTitle title="Produits populaires" subtitle="Les plus demandés cette semaine" />
            </div>
            <Link
              to="/products"
              className="hidden sm:flex items-center gap-1.5 text-primary font-semibold hover:gap-3 transition-all"
            >
              Tout voir <ArrowRight size={18} />
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Promo Banner */}
      <PromoBanner />

      {/* 6. New arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-accent font-semibold text-sm mb-2">
              <Clock size={18} />
              Nouveautés
            </div>
            <SectionTitle title="Derniers arrivages" subtitle="Les nouveautés fraîchement ajoutées" />
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1.5 text-primary font-semibold hover:gap-3 transition-all"
          >
            Tout voir <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : newArrivals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} variant="horizontal" />
            ))}
          </div>
        ) : null}
      </section>

      {/* 7. Features grid */}
      <FeaturesGrid />

      {/* 8. Testimonials */}
      <Testimonials />

      {/* 9. Newsletter */}
      <Newsletter />
    </div>
  );
}
