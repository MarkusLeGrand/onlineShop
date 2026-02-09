import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Clock, Sparkles } from 'lucide-react';
import client from '../api/client';
import type { Product } from '../types/product';
import LoadingSpinner from '../components/LoadingSpinner';
import HeroBannerV2 from '../components/home/HeroBannerV2';
import BrandMarquee from '../components/home/BrandMarquee';
import InteractiveCategories from '../components/home/InteractiveCategories';
import ProductCarousel from '../components/home/ProductCarousel';
import CountdownBanner from '../components/home/CountdownBanner';
import TrendingSection from '../components/home/TrendingSection';
import FeaturesGridV2 from '../components/home/FeaturesGridV2';
import TestimonialsV2 from '../components/home/TestimonialsV2';
import NewsletterV2 from '../components/home/NewsletterV2';
import ParallaxShowcase from '../components/home/ParallaxShowcase';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function HomeV2() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get('/products', { params: { limit: 12 } })
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const featured = products.slice(0, 4);
  const trending = products.slice(0, 5);
  const newArrivals = products.slice(4, 8);
  const allProducts = products.slice(0, 8);

  return (
    <div>
      {/* 1. Hero Banner V2 - Animated gradient + TypeWriter */}
      <HeroBannerV2 />

      {/* 2. Brand Marquee - Infinite scroll */}
      <BrandMarquee />

      {/* 3. Interactive Categories - Hover effects */}
      <InteractiveCategories />

      {/* 4. Trending Section - Bento grid layout */}
      {loading ? (
        <div className="py-16"><LoadingSpinner /></div>
      ) : (
        <TrendingSection products={trending} pathPrefix="/v2" />
      )}

      {/* 5. Countdown Banner - Flash sale */}
      <CountdownBanner />

      {/* 6. Product Carousel - Horizontal scroll */}
      {!loading && (
        <ProductCarousel
          products={allProducts}
          title="Sélection de la semaine"
          subtitle="Nos experts ont choisi ces produits pour vous"
          pathPrefix="/v2"
        />
      )}

      {/* 7. Parallax Showcase - Stats + Why us */}
      <ParallaxShowcase />

      {/* 8. New Arrivals - Grid with reveal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal animation="fade-up">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-accent font-semibold text-sm mb-2">
                <Clock size={18} />
                Nouveautés
              </div>
              <SectionTitle title="Derniers arrivages" subtitle="Les nouveautés fraîchement ajoutées" />
            </div>
            <Link
              to="/products"
              className="hidden sm:flex items-center gap-1.5 text-primary font-semibold hover:gap-3 transition-all"
            >
              Tout voir <ArrowRight size={18} />
            </Link>
          </div>
        </ScrollReveal>

        {loading ? (
          <LoadingSpinner />
        ) : newArrivals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, i) => (
              <ScrollReveal key={product.id} animation="fade-up" delay={i * 100}>
                <ProductCard product={product} pathPrefix="/v2" />
              </ScrollReveal>
            ))}
          </div>
        ) : null}
      </section>

      {/* 9. Features Grid V2 - Tilt cards */}
      <FeaturesGridV2 />

      {/* 10. Testimonials V2 - Carousel dark */}
      <TestimonialsV2 />

      {/* 11. Newsletter V2 - Gradient + animated shapes */}
      <NewsletterV2 />
    </div>
  );
}
