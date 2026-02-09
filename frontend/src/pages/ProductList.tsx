import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid3X3, List, SlidersHorizontal, ChevronDown, Search, Package } from 'lucide-react';
import client from '../api/client';
import type { Product } from '../types/product';
import type { Category } from '../types/category';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Breadcrumbs from '../components/ui/Breadcrumbs';

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

const sortLabels: Record<SortOption, string> = {
  newest: 'Plus récents',
  'price-asc': 'Prix croissant',
  'price-desc': 'Prix décroissant',
  name: 'Nom A-Z',
};

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [sortOpen, setSortOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const page = parseInt(searchParams.get('page') || '1');
  const categorySlug = searchParams.get('category') || '';
  const search = searchParams.get('q') || '';
  const limit = 12;

  useEffect(() => {
    client.get('/categories').then((res) => setCategories(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    client
      .get('/products', {
        params: { page, limit, category: categorySlug || undefined, search: search || undefined },
      })
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.total);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, categorySlug, search]);

  const totalPages = Math.ceil(total / limit);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const activeCategoryName = categories.find((c) => c.slug === categorySlug)?.name;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Produits', href: categorySlug ? '/products' : undefined },
          ...(activeCategoryName ? [{ label: activeCategoryName }] : []),
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary">
            {activeCategoryName || (search ? `Résultats pour "${search}"` : 'Tous les produits')}
          </h1>
          <p className="text-muted mt-1">{total} produit{total > 1 ? 's' : ''} trouvé{total > 1 ? 's' : ''}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors"
          >
            <SlidersHorizontal size={16} /> Filtres
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors"
            >
              {sortLabels[sortBy]} <ChevronDown size={14} />
            </button>
            {sortOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                  {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => { setSortBy(key); setSortOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm ${sortBy === key ? 'text-primary font-medium bg-primary-light/30' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {sortLabels[key]}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* View toggle */}
          <div className="hidden sm:flex border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'fixed inset-0 z-50 bg-black/50 md:static md:bg-transparent' : 'hidden'} md:block md:w-60 shrink-0`}>
          <div className={`${sidebarOpen ? 'absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-xl md:static md:shadow-none md:p-0 md:w-auto' : ''}`}>
            {sidebarOpen && (
              <div className="flex justify-between items-center mb-6 md:hidden">
                <h3 className="font-bold text-secondary">Filtres</h3>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
                  &times;
                </button>
              </div>
            )}

            {/* Search in sidebar */}
            <div className="mb-6">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filtrer..."
                  defaultValue={search}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = (e.target as HTMLInputElement).value;
                      setSearchParams(val ? { q: val } : {});
                    }
                  }}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-secondary text-sm uppercase tracking-wide mb-3">Catégories</h3>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => { setSearchParams({}); setSidebarOpen(false); }}
                    className={`text-sm w-full text-left px-3 py-2.5 rounded-xl transition-all ${!categorySlug ? 'bg-primary text-white font-medium shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`}
                  >
                    Toutes les catégories
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => { setSearchParams({ category: cat.slug }); setSidebarOpen(false); }}
                      className={`text-sm w-full text-left px-3 py-2.5 rounded-xl transition-all ${categorySlug === cat.slug ? 'bg-primary text-white font-medium shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price range placeholder */}
            <div className="mt-8">
              <h3 className="font-semibold text-secondary text-sm uppercase tracking-wide mb-3">Prix</h3>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary" />
                <span className="text-muted">-</span>
                <input type="number" placeholder="Max" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary" />
              </div>
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          {loading ? (
            <LoadingSpinner />
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-20">
              <Package className="mx-auto text-gray-200 mb-4" size={64} />
              <h3 className="text-lg font-semibold text-secondary mb-2">Aucun produit trouvé</h3>
              <p className="text-muted">Essayez de modifier vos filtres ou votre recherche.</p>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} variant="horizontal" />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <button
                    onClick={() => setSearchParams({ ...(categorySlug && { category: categorySlug }), page: String(Math.max(1, page - 1)) })}
                    disabled={page <= 1}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Précédent
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setSearchParams({ ...(categorySlug && { category: categorySlug }), page: String(p) })}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${p === page ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setSearchParams({ ...(categorySlug && { category: categorySlug }), page: String(Math.min(totalPages, page + 1)) })}
                    disabled={page >= totalPages}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
