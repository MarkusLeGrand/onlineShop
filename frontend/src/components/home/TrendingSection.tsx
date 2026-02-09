import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight, Eye, Heart } from 'lucide-react';
import type { Product } from '../../types/product';
import PriceTag from '../ui/PriceTag';
import ScrollReveal from '../ui/ScrollReveal';

interface Props {
  products: Product[];
  pathPrefix?: string;
}

export default function TrendingSection({ products, pathPrefix = '' }: Props) {
  if (products.length === 0) return null;

  const main = products[0];
  const rest = products.slice(1, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ScrollReveal animation="fade-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-red-50 rounded-xl">
            <TrendingUp size={20} className="text-red-500" />
          </div>
          <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Trending Now</span>
        </div>
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-secondary">Les plus populaires</h2>
          <Link to="/products" className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            Tout voir <ArrowRight size={18} />
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Main featured product */}
        <ScrollReveal animation="fade-right">
          <Link
            to={`${pathPrefix}/products/${main.slug}`}
            className="group relative block aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100"
          >
            {main.image_url ? (
              <img
                src={main.image_url}
                alt={main.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-gray-400">
                Pas d'image
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Top badge */}
            <div className="absolute top-6 left-6 bg-red-500 text-white text-sm font-bold px-4 py-1.5 rounded-full animate-pulse">
              #1 Best Seller
            </div>

            {/* Actions */}
            <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:bg-white transition-colors">
                <Heart size={18} />
              </button>
              <button className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:bg-white transition-colors">
                <Eye size={18} />
              </button>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-white/60 text-sm uppercase tracking-wider mb-2">{main.category_name}</p>
              <h3 className="text-white text-2xl sm:text-3xl font-black mb-3">{main.name}</h3>
              <p className="text-white/70 line-clamp-2 mb-4">{main.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-white text-2xl font-black">{main.price.toFixed(2)} &euro;</span>
                <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-medium group-hover:bg-white group-hover:text-secondary transition-all">
                  Voir le produit <ArrowRight size={14} className="inline ml-1" />
                </span>
              </div>
            </div>
          </Link>
        </ScrollReveal>

        {/* Grid of other products */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {rest.map((product, i) => (
            <ScrollReveal key={product.id} animation="fade-left" delay={i * 150}>
              <Link
                to={`${pathPrefix}/products/${product.slug}`}
                className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">Pas d'image</div>
                  )}
                  <div className="absolute top-3 left-3 bg-secondary/80 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                    #{i + 2}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted uppercase tracking-wider">{product.category_name}</p>
                  <h3 className="font-bold text-secondary mt-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <PriceTag price={product.price} size="sm" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
