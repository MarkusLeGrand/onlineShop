import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield, MessageSquare, FileText, BarChart3 } from 'lucide-react';
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
import Button from '../components/ui/Button';
import Tabs from '../components/ui/Tabs';
import ScrollReveal from '../components/ui/ScrollReveal';
import ImageGallery from '../components/product/ImageGallery';
import ColorSelector from '../components/product/ColorSelector';
import SizeSelector from '../components/product/SizeSelector';
import ReviewSection from '../components/product/ReviewSection';
import ProductSpecs from '../components/product/ProductSpecs';
import RelatedProducts from '../components/product/RelatedProducts';

export default function ProductDetailV2() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setLoading(true);
    setQuantity(1);
    client
      .get(`/products/${slug}`)
      .then((res) => {
        setProduct(res.data);
        if (res.data.category_id) {
          client
            .get('/products', { params: { limit: 8, category: res.data.category_name?.toLowerCase() } })
            .then((r) => setRelated(r.data.products.filter((p: Product) => p.slug !== slug).slice(0, 8)))
            .catch(() => {});
        }
      })
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  const handleAddToCart = async () => {
    if (!token) { navigate('/login'); return; }
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

  const images = product.image_url ? [product.image_url] : [];

  const productTabs = [
    {
      key: 'description',
      label: 'Description',
      icon: <FileText size={16} />,
      content: (
        <div className="prose max-w-3xl text-gray-600 leading-relaxed space-y-4">
          <p>{product.description}</p>
          <p>
            Ce produit a été soigneusement sélectionné pour sa qualité exceptionnelle
            et son excellent rapport qualité-prix. Fabriqué avec des matériaux premium,
            il saura répondre à toutes vos attentes.
          </p>
          <ul className="space-y-2 mt-4">
            <li>Design moderne et élégant</li>
            <li>Matériaux durables et éco-responsables</li>
            <li>Finitions soignées, contrôle qualité rigoureux</li>
            <li>Compatible avec tous les standards actuels</li>
          </ul>
        </div>
      ),
    },
    {
      key: 'specs',
      label: 'Caractéristiques',
      icon: <BarChart3 size={16} />,
      content: <ProductSpecs product={product} />,
    },
    {
      key: 'reviews',
      label: 'Avis (79)',
      icon: <MessageSquare size={16} />,
      content: <ReviewSection />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <ScrollReveal animation="fade-down">
        <Breadcrumbs
          items={[
            { label: 'Produits', href: '/products' },
            { label: product.category_name, href: `/products?category=${product.category_name?.toLowerCase()}` },
            { label: product.name },
          ]}
        />
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mt-4">
        {/* Left - Image Gallery with zoom */}
        <ScrollReveal animation="fade-right">
          <ImageGallery images={images} alt={product.name} />
        </ScrollReveal>

        {/* Right - Product info */}
        <ScrollReveal animation="fade-left" delay={200}>
          <div className="flex flex-col lg:sticky lg:top-24">
            {/* Category */}
            <Link
              to={`/products?category=${product.category_name?.toLowerCase()}`}
              className="text-sm font-medium text-primary hover:underline mb-2"
            >
              {product.category_name}
            </Link>

            <h1 className="text-2xl sm:text-3xl font-black text-secondary mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-5">
              <Rating value={4.5} showValue count={79} size={18} />
              <span className="text-muted text-sm">|</span>
              <span className="text-sm text-success font-medium">
                {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <PriceTag price={product.price} size="xl" />
              <span className="text-sm text-muted line-through">{(product.price * 1.3).toFixed(2)} &euro;</span>
              <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-lg">-30%</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Color Selector */}
            <ColorSelector className="mb-6" />

            {/* Size Selector */}
            <SizeSelector className="mb-6" />

            {/* Add to cart */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-6">
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

            {/* Secondary actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium text-sm transition-all cursor-pointer ${
                  wishlisted
                    ? 'border-red-200 bg-red-50 text-red-500'
                    : 'border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-500'
                }`}
              >
                <Heart size={18} className={wishlisted ? 'fill-red-500' : ''} />
                {wishlisted ? 'Dans les favoris' : 'Ajouter aux favoris'}
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-primary hover:text-primary font-medium text-sm transition-all cursor-pointer">
                <Share2 size={18} />
                Partager
              </button>
            </div>

            {/* Trust features */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-100">
              {[
                { icon: Truck, label: 'Livraison gratuite', sub: 'Dès 50€', color: 'bg-blue-50 text-blue-600' },
                { icon: RotateCcw, label: 'Retour gratuit', sub: '30 jours', color: 'bg-emerald-50 text-emerald-600' },
                { icon: Shield, label: 'Garantie 2 ans', sub: 'Protection', color: 'bg-purple-50 text-purple-600' },
              ].map((f) => (
                <div key={f.label} className="text-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`inline-flex p-2.5 rounded-xl ${f.color} mb-2`}>
                    <f.icon size={18} />
                  </div>
                  <p className="text-xs font-semibold text-secondary">{f.label}</p>
                  <p className="text-xs text-muted">{f.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Tabs - Description, Specs, Reviews */}
      <div className="mt-16">
        <Tabs tabs={productTabs} variant="pills" />
      </div>

      {/* Related Products Carousel */}
      <RelatedProducts products={related} />
    </div>
  );
}
