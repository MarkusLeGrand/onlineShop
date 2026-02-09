import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield, Star, ChevronDown, Check, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import client from '../api/client';
import type { Product } from '../types/product';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
import LoadingSpinner from '../components/LoadingSpinner';
import QuantitySelector from '../components/ui/QuantitySelector';
import ScrollReveal from '../components/ui/ScrollReveal';
import Accordion from '../components/ui/Accordion';
import AnimatedCounter from '../components/ui/AnimatedCounter';

export default function ProductDetailV3() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  useEffect(() => {
    setLoading(true);
    setQuantity(1);
    client
      .get(`/products/${slug}`)
      .then((res) => {
        setProduct(res.data);
        if (res.data.category_id) {
          client
            .get('/products', { params: { limit: 6, category: res.data.category_name?.toLowerCase() } })
            .then((r) => setRelated(r.data.products.filter((p: Product) => p.slug !== slug).slice(0, 4)))
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

  const colors = [
    { name: 'Noir Onyx', value: '#0f172a' },
    { name: 'Blanc Nacre', value: '#f1f5f9' },
    { name: 'Bleu Saphir', value: '#2563eb' },
    { name: 'Vert Emeraude', value: '#10b981' },
  ];

  return (
    <div className="bg-white">
      {/* Full-width hero image */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[800px] bg-gray-100 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-xl">Image à venir</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top navigation */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
          <Link to="/products" className="text-white/70 hover:text-white text-sm font-medium transition-colors flex items-center gap-2">
            <ChevronDown size={16} className="rotate-90" />
            Retour aux produits
          </Link>
          <div className="flex gap-3">
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-full hover:bg-white/20 transition-all">
              <Heart size={18} />
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-full hover:bg-white/20 transition-all">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
          <div className="max-w-7xl mx-auto">
            <p className="text-white/50 text-xs uppercase tracking-[0.3em] mb-3">{product.category_name}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">{product.name}</h1>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 animate-bounce">
          <ChevronDown size={24} className="text-white/40" />
        </div>
      </section>

      {/* Product details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left - Main info (3 cols) */}
          <div className="lg:col-span-3 space-y-10">
            {/* Price + Rating */}
            <ScrollReveal animation="fade-up">
              <div className="flex items-center gap-6 pb-8 border-b border-gray-100">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-secondary">{product.price.toFixed(2)} &euro;</span>
                    <span className="text-lg text-muted line-through">{(product.price * 1.3).toFixed(2)} &euro;</span>
                  </div>
                  <p className="text-sm text-red-500 font-medium mt-1">Economisez {((product.price * 0.3)).toFixed(2)} &euro;</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="flex items-center gap-1 justify-end">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={18} className={i < 4 ? 'text-accent fill-accent' : 'text-gray-200'} />
                    ))}
                  </div>
                  <p className="text-sm text-muted mt-1">79 avis vérifiés</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal animation="fade-up" delay={100}>
              <div>
                <h2 className="text-xl font-black text-secondary mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Ce produit a été soigneusement sélectionné pour sa qualité exceptionnelle et son
                  excellent rapport qualité-prix. Les matériaux premium utilisés garantissent une
                  durabilité et un confort d'utilisation optimaux.
                </p>
              </div>
            </ScrollReveal>

            {/* Product highlights */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Matériau', value: 'Premium composite' },
                  { label: 'Origine', value: 'Union Européenne' },
                  { label: 'Garantie', value: '2 ans constructeur' },
                  { label: 'Référence', value: `SKU-${product.id.toString().padStart(5, '0')}` },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-xs text-muted uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="font-bold text-secondary">{item.value}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* FAQ Accordion */}
            <ScrollReveal animation="fade-up" delay={300}>
              <h2 className="text-xl font-black text-secondary mb-4">Questions fréquentes</h2>
              <Accordion
                variant="separated"
                items={[
                  { title: 'Quels sont les délais de livraison ?', content: 'Livraison standard en 3-5 jours ouvrés. Express en 24h disponible pour 9.99€.' },
                  { title: 'Puis-je retourner le produit ?', content: 'Oui, vous disposez de 30 jours pour retourner votre article gratuitement.' },
                  { title: 'Ce produit est-il garanti ?', content: 'Garantie constructeur de 2 ans. Extension de garantie disponible au panier.' },
                  { title: 'Quels modes de paiement acceptez-vous ?', content: 'CB, Visa, Mastercard, PayPal, Apple Pay et paiement en 3x sans frais dès 100€.' },
                ]}
              />
            </ScrollReveal>
          </div>

          {/* Right - Sticky purchase panel (2 cols) */}
          <div className="lg:col-span-2">
            <ScrollReveal animation="fade-left">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                  {/* Stock */}
                  <div className="flex items-center gap-2 mb-6">
                    {product.stock > 0 ? (
                      <>
                        <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-success">En stock &mdash; Expédié sous 24h</span>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 bg-danger rounded-full" />
                        <span className="text-sm font-semibold text-danger">Rupture de stock</span>
                      </>
                    )}
                  </div>

                  {/* Color */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-secondary mb-3">
                      Couleur: <span className="text-muted">{colors[selectedColor].name}</span>
                    </p>
                    <div className="flex gap-3">
                      {colors.map((color, i) => (
                        <button
                          key={color.value}
                          onClick={() => setSelectedColor(i)}
                          className={`w-10 h-10 rounded-full transition-all cursor-pointer ${
                            i === selectedColor ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'hover:scale-110'
                          } ${color.value === '#f1f5f9' ? 'border border-gray-300' : ''}`}
                          style={{ backgroundColor: color.value }}
                        >
                          {i === selectedColor && (
                            <Check size={16} className={`mx-auto ${color.value === '#f1f5f9' ? 'text-gray-800' : 'text-white'}`} strokeWidth={3} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity + Add to cart */}
                  {product.stock > 0 && (
                    <>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-secondary mb-3">Quantité</p>
                        <QuantitySelector value={quantity} max={product.stock} onChange={setQuantity} />
                      </div>

                      <button
                        onClick={handleAddToCart}
                        disabled={adding}
                        className="w-full bg-secondary text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <ShoppingCart size={22} />
                        {adding ? 'Ajout en cours...' : `Ajouter au panier — ${(product.price * quantity).toFixed(2)} €`}
                      </button>
                    </>
                  )}

                  {/* Trust badges */}
                  <div className="mt-6 space-y-3">
                    {[
                      { icon: Truck, text: 'Livraison gratuite dès 50€' },
                      { icon: RotateCcw, text: 'Retour gratuit sous 30 jours' },
                      { icon: Shield, text: 'Garantie constructeur 2 ans' },
                    ].map((f) => (
                      <div key={f.text} className="flex items-center gap-3 text-sm text-muted">
                        <f.icon size={16} className="text-primary shrink-0" />
                        {f.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-2xl p-4 text-center">
                    <p className="text-xl font-black text-secondary"><AnimatedCounter end={127} /></p>
                    <p className="text-xs text-muted mt-1">Ventes ce mois</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 text-center">
                    <p className="text-xl font-black text-secondary"><AnimatedCounter end={4.5} decimals={1} /></p>
                    <p className="text-xs text-muted mt-1">Note moyenne</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 text-center">
                    <p className="text-xl font-black text-secondary"><AnimatedCounter end={98} suffix="%" /></p>
                    <p className="text-xs text-muted mt-1">Satisfaction</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fade-up">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted mb-2">Suggestions</p>
                  <h2 className="text-3xl font-black text-secondary">Vous aimerez aussi</h2>
                </div>
                <Link to="/products" className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                  Tout voir <ArrowRight size={18} />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ScrollReveal key={p.id} animation="fade-up" delay={i * 100}>
                  <Link to={`/products/${p.slug}`} className="group block">
                    <div className="aspect-square bg-white rounded-2xl overflow-hidden mb-4">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">N/A</div>
                      )}
                    </div>
                    <p className="text-xs text-muted uppercase tracking-wider">{p.category_name}</p>
                    <h3 className="font-bold text-secondary mt-1 group-hover:text-primary transition-colors">{p.name}</h3>
                    <p className="font-black text-secondary mt-2">{p.price.toFixed(2)} &euro;</p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
