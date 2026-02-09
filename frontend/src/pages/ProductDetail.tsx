import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import client from '../api/client';
import type { Product } from '../types/product';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
import LoadingSpinner from '../components/LoadingSpinner';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import PriceTag from '../components/ui/PriceTag';
import Rating from '../components/ui/Rating';
import QuantitySelector from '../components/ui/QuantitySelector';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProductCard from '../components/ProductCard';

type Tab = 'description' | 'details' | 'reviews';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setLoading(true);
    setQuantity(1);
    client
      .get(`/products/${slug}`)
      .then((res) => {
        setProduct(res.data);
        // Fetch related products
        if (res.data.category_id) {
          client
            .get('/products', { params: { limit: 4, category: res.data.category_name?.toLowerCase() } })
            .then((r) => setRelated(r.data.products.filter((p: Product) => p.slug !== slug).slice(0, 4)))
            .catch(() => {});
        }
      })
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  const handleAddToCart = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    setAdding(true);
    try {
      await addItem(product!.id, quantity);
      toast.success('Produit ajouté au panier');
    } catch {
      toast.error("Erreur lors de l'ajout au panier");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!product) return null;

  const tabs: { key: Tab; label: string }[] = [
    { key: 'description', label: 'Description' },
    { key: 'details', label: 'Détails' },
    { key: 'reviews', label: 'Avis (12)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Produits', href: '/products' },
          { label: product.category_name, href: `/products?category=${product.category_name?.toLowerCase()}` },
          { label: product.name },
        ]}
      />

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image section */}
        <div>
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative group">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">
                Pas d'image
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.stock < 5 && product.stock > 0 && (
                <Badge variant="accent" size="md">Dernières pièces</Badge>
              )}
              {product.stock === 0 && (
                <Badge variant="danger" size="md">Rupture de stock</Badge>
              )}
            </div>

            {/* Actions overlay */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="bg-white/90 backdrop-blur-sm p-2.5 rounded-xl shadow-md hover:bg-primary hover:text-white transition-colors">
                <Heart size={20} />
              </button>
              <button className="bg-white/90 backdrop-blur-sm p-2.5 rounded-xl shadow-md hover:bg-primary hover:text-white transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Thumbnail row placeholder */}
          <div className="flex gap-3 mt-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${i === 0 ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
              >
                {product.image_url ? (
                  <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <Link
              to={`/products?category=${product.category_name?.toLowerCase()}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              {product.category_name}
            </Link>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-secondary mb-3">{product.name}</h1>

          <div className="flex items-center gap-4 mb-5">
            <Rating value={4.5} showValue count={12} size={18} />
          </div>

          <PriceTag price={product.price} size="xl" />

          <p className="text-gray-600 leading-relaxed mt-5 mb-6">{product.description}</p>

          {/* Stock status */}
          <div className="flex items-center gap-2 mb-6">
            {product.stock > 0 ? (
              <>
                <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse" />
                <span className="text-sm font-medium text-success">{product.stock} en stock — Livraison rapide</span>
              </>
            ) : (
              <>
                <div className="w-2.5 h-2.5 bg-danger rounded-full" />
                <span className="text-sm font-medium text-danger">Rupture de stock</span>
              </>
            )}
          </div>

          {/* Add to cart */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4 mb-8">
              <QuantitySelector value={quantity} max={product.stock} onChange={setQuantity} />
              <Button
                size="lg"
                onClick={handleAddToCart}
                loading={adding}
                icon={<ShoppingCart size={20} />}
                className="flex-1"
              >
                Ajouter au panier
              </Button>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 text-sm">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Truck size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-secondary">Livraison gratuite</p>
                <p className="text-muted text-xs">Dès 50&euro; d'achat</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="bg-emerald-50 p-2 rounded-lg">
                <RotateCcw size={18} className="text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-secondary">Retour gratuit</p>
                <p className="text-muted text-xs">Sous 30 jours</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="bg-purple-50 p-2 rounded-lg">
                <Shield size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-secondary">Garantie 2 ans</p>
                <p className="text-muted text-xs">Protection complète</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted hover:text-secondary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-3xl text-gray-600 leading-relaxed">
              <p>{product.description}</p>
              <p className="mt-4">
                Ce produit a été soigneusement sélectionné pour sa qualité exceptionnelle
                et son excellent rapport qualité-prix. Fabriqué avec des matériaux premium,
                il saura répondre à toutes vos attentes.
              </p>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="max-w-lg space-y-3">
              {[
                ['Référence', `SKU-${product.id.toString().padStart(5, '0')}`],
                ['Catégorie', product.category_name],
                ['Disponibilité', product.stock > 0 ? 'En stock' : 'Rupture'],
                ['Livraison', 'France métropolitaine'],
                ['Garantie', '2 ans constructeur'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2.5 border-b border-gray-50">
                  <span className="text-muted text-sm">{label}</span>
                  <span className="font-medium text-secondary text-sm">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-2xl space-y-6">
              {[
                { name: 'Marie L.', date: 'Il y a 3 jours', rating: 5, text: 'Excellent produit ! Conforme à la description, livraison rapide. Je recommande.' },
                { name: 'Pierre D.', date: 'Il y a 1 semaine', rating: 4, text: 'Bon rapport qualité-prix. Petit bémol sur l\'emballage mais le produit est top.' },
                { name: 'Sophie M.', date: 'Il y a 2 semaines', rating: 5, text: 'Parfait ! Exactement ce que je cherchais. La qualité est au rendez-vous.' },
              ].map((review, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary-light rounded-full flex items-center justify-center text-primary font-bold text-sm">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-secondary text-sm">{review.name}</p>
                        <p className="text-xs text-muted">{review.date}</p>
                      </div>
                    </div>
                    <Rating value={review.rating} size={14} />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-success">
                    <Check size={14} /> Achat vérifié
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-12 pt-12 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-secondary mb-6">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
