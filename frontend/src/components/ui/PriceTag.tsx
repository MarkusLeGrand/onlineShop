interface Props {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizes = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl',
  xl: 'text-3xl',
};

export default function PriceTag({ price, originalPrice, size = 'md' }: Props) {
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className="flex items-baseline gap-2">
      <span className={`font-bold text-primary ${sizes[size]}`}>
        {price.toFixed(2)} &euro;
      </span>
      {hasDiscount && (
        <>
          <span className="text-muted line-through text-sm">{originalPrice.toFixed(2)} &euro;</span>
          <span className="text-xs font-semibold text-white bg-danger px-1.5 py-0.5 rounded">
            -{Math.round((1 - price / originalPrice) * 100)}%
          </span>
        </>
      )}
    </div>
  );
}
