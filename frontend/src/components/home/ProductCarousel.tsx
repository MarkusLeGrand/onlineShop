import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import PriceTag from '../ui/PriceTag';
import Rating from '../ui/Rating';

interface Props {
  products: Product[];
  title?: string;
  subtitle?: string;
  pathPrefix?: string;
}

export default function ProductCarousel({ products, title, subtitle, pathPrefix = '' }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {title && (
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">{title}</h2>
              {subtitle && <p className="text-muted mt-2">{subtitle}</p>}
            </div>
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-3 rounded-xl border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-3 rounded-xl border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              className="min-w-[300px] max-w-[300px] snap-start group animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                {/* Image */}
                <Link to={`${pathPrefix}/products/${product.slug}`} className="block relative aspect-[4/5] bg-gray-50 overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">Pas d'image</div>
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Quick actions */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="flex-1 bg-white/95 backdrop-blur-sm text-secondary py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors">
                      <ShoppingCart size={16} />
                      Ajouter
                    </button>
                    <button className="bg-white/95 backdrop-blur-sm p-2.5 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors">
                      <Heart size={16} />
                    </button>
                  </div>
                </Link>

                {/* Info */}
                <Link to={`${pathPrefix}/products/${product.slug}`} className="block p-4">
                  <p className="text-xs text-muted uppercase tracking-wider">{product.category_name}</p>
                  <h3 className="font-bold text-secondary mt-1 group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <PriceTag price={product.price} size="md" />
                    <Rating value={4.5} size={12} />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
