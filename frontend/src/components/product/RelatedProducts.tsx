import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import PriceTag from '../ui/PriceTag';
import Rating from '../ui/Rating';
import ScrollReveal from '../ui/ScrollReveal';

interface Props {
  products: Product[];
  title?: string;
}

export default function RelatedProducts({ products, title = 'Vous aimerez aussi' }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  if (products.length === 0) return null;

  return (
    <ScrollReveal animation="fade-up">
      <div className="mt-16 pt-12 border-t border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-secondary">{title}</h2>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="p-2.5 rounded-xl border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll('right')} className="p-2.5 rounded-xl border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.slug}`}
              className="min-w-[240px] max-w-[240px] snap-start group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-square bg-gray-50 overflow-hidden">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">N/A</div>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-muted uppercase tracking-wider">{p.category_name}</p>
                <h3 className="font-bold text-secondary text-sm mt-1 line-clamp-1 group-hover:text-primary transition-colors">{p.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <PriceTag price={p.price} size="sm" />
                  <Rating value={4.5} size={10} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
