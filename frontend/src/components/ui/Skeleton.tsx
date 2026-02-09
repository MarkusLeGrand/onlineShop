interface Props {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string;
  height?: string;
  count?: number;
  className?: string;
}

function SkeletonBase({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer ${className}`}
      style={{ backgroundSize: '200% 100%' }}
    />
  );
}

export default function Skeleton({ variant = 'text', width, height, count = 1, className = '' }: Props) {
  const items = Array.from({ length: count });

  if (variant === 'card') {
    return (
      <div className={`space-y-3 ${className}`}>
        <SkeletonBase className="w-full aspect-square rounded-2xl" />
        <SkeletonBase className="h-4 w-3/4" />
        <SkeletonBase className="h-3 w-1/2" />
        <SkeletonBase className="h-6 w-1/3" />
      </div>
    );
  }

  if (variant === 'circular') {
    return <SkeletonBase className={`rounded-full ${className}`} style-width={width || '48px'} />;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((_, i) => (
        <SkeletonBase
          key={i}
          className={`${variant === 'rectangular' ? 'rounded-xl' : 'rounded'}`}
          style-width={width}
          style-height={height || (variant === 'rectangular' ? '200px' : '16px')}
        />
      ))}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <SkeletonBase className="w-full aspect-square !rounded-none" />
      <div className="p-5 space-y-3">
        <SkeletonBase className="h-3 w-20" />
        <SkeletonBase className="h-5 w-3/4" />
        <SkeletonBase className="h-3 w-full" />
        <div className="flex justify-between items-center pt-2">
          <SkeletonBase className="h-6 w-20" />
          <SkeletonBase className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
