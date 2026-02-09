import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Minus } from 'lucide-react';
import client from '../api/client';
import type { Product } from '../types/product';
import LoadingSpinner from '../components/LoadingSpinner';
import HeroBannerV3 from '../components/home/HeroBannerV3';
import ScrollReveal from '../components/ui/ScrollReveal';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import Marquee from '../components/ui/Marquee';

export default function HomeV3() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    client
      .get('/products', { params: { limit: 12 } })
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    { name: 'Tout', slug: '' },
    { name: 'Electronique', slug: 'electronique' },
    { name: 'Vetements', slug: 'vetements' },
    { name: 'Maison', slug: 'maison' },
  ];

  const displayProducts = products.slice(0, 6);

  return (
    <div className="bg-white">
      {/* 1. Hero - Minimalist luxury fullscreen */}
      <HeroBannerV3 />

      {/* 2. Marquee band */}
      <div className="bg-black py-4 overflow-hidden">
        <Marquee speed="fast">
          {['NOUVELLE COLLECTION', 'LIVRAISON GRATUITE', 'RETOURS 30 JOURS', 'QUALITE PREMIUM', 'EDITION LIMITEE', 'BEST SELLERS'].map((text) => (
            <span key={text} className="text-white/40 text-sm font-bold tracking-[0.3em] flex items-center gap-6">
              {text} <Minus size={12} />
            </span>
          ))}
        </Marquee>
      </div>

      {/* 3. Featured products - Minimalist grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted mb-4">Catalogue</p>
              <h2 className="text-4xl sm:text-5xl font-black text-secondary leading-tight">
                Nos produits<br />
                <span className="text-muted">sélectionnés</span>
              </h2>
            </div>

            {/* Category filters */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-full">
              {categories.map((cat, i) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(i)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                    activeCategory === i
                      ? 'bg-secondary text-white shadow-md'
                      : 'text-muted hover:text-secondary'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((product, i) => (
              <ScrollReveal key={product.id} animation="fade-up" delay={i * 100}>
                <Link to={`/v3/products/${product.slug}`} className="group block">
                  {/* Image */}
                  <div className="relative aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden mb-5">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        Pas d'image
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-white/95 backdrop-blur-sm text-secondary py-3 rounded-xl text-center font-semibold text-sm">
                        Voir le produit
                      </div>
                    </div>

                    {/* Category tag */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-secondary text-xs font-medium px-3 py-1.5 rounded-full">
                      {product.category_name}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-secondary text-lg group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted text-sm mt-1">{product.description?.slice(0, 60)}...</p>
                    </div>
                    <p className="text-lg font-black text-secondary whitespace-nowrap ml-4">
                      {product.price.toFixed(2)} &euro;
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal animation="fade-up" delay={300}>
          <div className="text-center mt-16">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 bg-secondary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors"
            >
              Voir toute la collection
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. Split section - Image + text */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Left - Image */}
            <ScrollReveal animation="fade-right">
              <div className="relative h-full min-h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-white/50 rounded-3xl mx-auto flex items-center justify-center animate-float">
                      <span className="text-5xl">✨</span>
                    </div>
                    <p className="text-secondary/40 font-bold text-lg">Collection Premium</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right - Content */}
            <ScrollReveal animation="fade-left" delay={200}>
              <div className="flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0">
                <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-4">Notre philosophie</p>
                <h2 className="text-3xl sm:text-4xl font-black text-secondary leading-tight mb-6">
                  L'art de sélectionner<br />le meilleur pour vous
                </h2>
                <p className="text-muted leading-relaxed mb-8">
                  Chaque produit de notre catalogue a été rigoureusement sélectionné par nos experts.
                  Nous privilégions la qualité, le design et la durabilité pour vous offrir
                  une expérience d'achat exceptionnelle.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div>
                    <p className="text-3xl font-black text-secondary">
                      <AnimatedCounter end={10} suffix="K" />
                    </p>
                    <p className="text-xs text-muted mt-1 uppercase tracking-wider">Produits</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-secondary">
                      <AnimatedCounter end={50} suffix="K" />
                    </p>
                    <p className="text-xs text-muted mt-1 uppercase tracking-wider">Clients</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-secondary">
                      <AnimatedCounter end={99} suffix="%" />
                    </p>
                    <p className="text-xs text-muted mt-1 uppercase tracking-wider">Satisfaction</p>
                  </div>
                </div>

                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 text-secondary font-bold hover:text-primary transition-colors"
                >
                  En savoir plus
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Values section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-4">Nos valeurs</p>
            <h2 className="text-4xl sm:text-5xl font-black text-secondary">Ce qui nous définit</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-4 gap-px bg-gray-200 rounded-3xl overflow-hidden">
          {[
            { number: '01', title: 'Qualité', desc: 'Des produits testés et approuvés par nos experts' },
            { number: '02', title: 'Design', desc: "L'esthétique au service du quotidien" },
            { number: '03', title: 'Service', desc: 'Un accompagnement personnalisé à chaque étape' },
            { number: '04', title: 'Durabilité', desc: 'Des choix responsables pour demain' },
          ].map((value, i) => (
            <ScrollReveal key={value.number} animation="fade-up" delay={i * 150}>
              <div className="bg-white p-8 sm:p-10 hover:bg-gray-50 transition-colors group h-full">
                <p className="text-5xl font-black text-gray-100 group-hover:text-primary/10 transition-colors mb-6">
                  {value.number}
                </p>
                <h3 className="text-xl font-black text-secondary mb-3">{value.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{value.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 6. CTA Banner - Minimalist */}
      <section className="bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <ScrollReveal animation="scale">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">Prêt à commencer ?</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-8">
              Trouvez votre<br />prochain coup de coeur
            </h2>
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 bg-white text-secondary px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Explorer la boutique
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
