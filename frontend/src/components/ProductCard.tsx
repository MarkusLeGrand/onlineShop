import { Link } from 'react-router-dom';
import type { Product } from '../types/product';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="aspect-square bg-gray-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Pas d'image
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.category_name}</p>
        <p className="text-lg font-bold text-primary mt-2">
          {product.price.toFixed(2)} &euro;
        </p>
      </div>
    </Link>
  );
}
