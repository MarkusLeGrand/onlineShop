import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import type { Product } from '../types/product';
import Badge from './ui/Badge';
import Rating from './ui/Rating';
import PriceTag from './ui/PriceTag';

interface Props {
  product: Product;
  variant?: 'default' | 'compact' | 'horizontal';
  pathPrefix?: string;
}

export default function ProductCard({ product, variant = 'default', pathPrefix = '' }: Props) {
  if (variant === 'horizontal') {
    return (
      <Link
        to={`${pathPrefix}/products/${product.slug}`}
        className="group flex bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      >
        <div className="w-48 shrink-0 bg-gray-50 relative overflow-hidden">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">Pas d'image</div>
          )}
        </div>
        <div className="p-5 flex flex-col justify-between flex-1">
          <div>
            <p className="text-xs font-medium text-muted uppercase tracking-wide">{product.category_name}</p>
            <h3 className="font-bold text-secondary mt-1 group-hover:text-primary transition-colors">{product.name}</h3>
            <p className="text-sm text-muted mt-2 line-clamp-2">{product.description}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <PriceTag price={product.price} />
            <Rating value={4.5} size={14} />
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        to={`${pathPrefix}/products/${product.slug}`}
        className="group flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md transition-all duration-300"
      >
        <div className="w-16 h-16 rounded-lg bg-gray-50 shrink-0 overflow-hidden">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">N/A</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-secondary text-sm truncate group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="text-primary font-bold text-sm mt-0.5">{product.price.toFixed(2)} &euro;</p>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <Link to={`${pathPrefix}/products/${product.slug}`} className="block relative aspect-square bg-gray-50 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            Pas d'image
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.stock < 5 && product.stock > 0 && (
            <Badge variant="accent">Dernières pièces</Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="danger">Rupture</Badge>
          )}
        </div>

        {/* Hover actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors">
            <Heart size={16} />
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors">
            <Eye size={16} />
          </button>
        </div>

        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-primary/95 backdrop-blur-sm text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors">
            <ShoppingCart size={16} />
            Ajouter au panier
          </button>
        </div>
      </Link>

      {/* Info */}
      <Link to={`${pathPrefix}/products/${product.slug}`} className="block p-4 sm:p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted uppercase tracking-wide">{product.category_name}</span>
          <Rating value={4.5} size={12} />
        </div>
        <h3 className="font-bold text-secondary group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted mt-1 line-clamp-1">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <PriceTag price={product.price} size="md" />
          {product.stock > 0 && (
            <span className="text-xs text-success font-medium">En stock</span>
          )}
        </div>
      </Link>
    </div>
  );
}
