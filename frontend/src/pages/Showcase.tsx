import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layout, ShoppingBag, Sparkles, Monitor, Palette, Layers, Star, Zap, Eye, Code2, Boxes } from 'lucide-react';
import client from '../api/client';
import type { Product } from '../types/product';
import ScrollReveal from '../components/ui/ScrollReveal';
import AnimatedCounter from '../components/ui/AnimatedCounter';

const homeVersions = [
  {
    path: '/',
    title: 'Home V1 — Classic',
    description: 'Design classique avec hero gradient, grille de catégories, sections produits et testimonials.',
    tags: ['Hero Banner', 'Stats Bar', 'Categories', 'Products Grid', 'Promo Banner', 'Features', 'Testimonials', 'Newsletter'],
    color: 'from-blue-500 to-cyan-500',
    icon: Layout,
  },
  {
    path: '/v2',
    title: 'Home V2 — Magazine',
    description: 'Style éditorial avec effets TypeWriter, compteurs animés, cards flottantes, parallax et countdown.',
    tags: ['TypeWriter', 'Animated Blobs', 'Brand Marquee', 'Interactive Categories', 'Trending Bento', 'Countdown Timer', 'Product Carousel', 'Parallax', 'Tilt Cards', 'Dark Testimonials'],
    color: 'from-purple-500 to-pink-500',
    icon: Sparkles,
  },
  {
    path: '/v3',
    title: 'Home V3 — Luxury',
    description: 'Design minimaliste et luxueux avec fullscreen hero, split-screen hover, typographie forte et espacement généreux.',
    tags: ['Fullscreen Hero', 'Split Screen', 'Minimal Grid', 'Category Pills', 'Values Section', 'Marquee Band', 'Counter Stats', 'CTA Section'],
    color: 'from-gray-800 to-gray-900',
    icon: Monitor,
  },
];

const productVersions = [
  {
    prefix: '',
    title: 'Product V1 — Standard',
    description: 'Page produit classique avec image, infos, tabs inline et produits similaires.',
    tags: ['Image Zoom', 'Thumbnails', 'Tabs', 'Reviews', 'Related Grid', 'Badges', 'Rating'],
    color: 'from-emerald-500 to-teal-500',
    icon: ShoppingBag,
  },
  {
    prefix: '/v2',
    title: 'Product V2 — Gallery',
    description: 'Galerie d\'images avec zoom, sélecteurs couleur/taille, tabs pilules, section avis complète avec formulaire.',
    tags: ['Image Gallery', 'Zoom Cursor', 'Fullscreen View', 'Color Selector', 'Size Selector', 'Pills Tabs', 'Review Form', 'Star Selector', 'Specs Grid', 'FAQ Accordion', 'Related Carousel', 'Wishlist Toggle'],
    color: 'from-amber-500 to-orange-500',
    icon: Palette,
  },
  {
    prefix: '/v3',
    title: 'Product V3 — Immersive',
    description: 'Hero fullscreen avec overlay, sticky purchase panel, accordéon FAQ et stats animées.',
    tags: ['Fullscreen Hero', 'Gradient Overlay', 'Sticky Sidebar', 'Color Dots', 'Dynamic Price', 'Animated Stats', 'FAQ Accordion', 'Clean Grid Related'],
    color: 'from-red-500 to-rose-500',
    icon: Layers,
  },
];

const uiComponents = [
  'ScrollReveal', 'AnimatedCounter', 'GlassCard', 'Marquee', 'TiltCard', 'TypeWriter',
  'Skeleton', 'Modal', 'Accordion', 'Tabs', 'ProgressBar', 'Tooltip',
  'ParallaxSection', 'ImageSlider', 'ImageGallery', 'ColorSelector',
  'SizeSelector', 'ReviewSection', 'ProductSpecs', 'RelatedProducts',
  'HeroBanner x3', 'ProductCarousel', 'BrandMarquee', 'CountdownBanner',
  'InteractiveCategories', 'TestimonialsV2', 'TrendingSection',
  'ParallaxShowcase', 'NewsletterV2', 'FeaturesGridV2',
];

export default function Showcase() {
  const [sampleSlug, setSampleSlug] = useState<string | null>(null);

  useEffect(() => {
    client
      .get('/products', { params: { limit: 1 } })
      .then((res) => {
        const products: Product[] = res.data.products;
        if (products.length > 0) setSampleSlug(products[0].slug);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary py-24 sm:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <ScrollReveal animation="fade-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-white text-sm mb-8">
              <Code2 size={16} className="text-accent" />
              Portfolio Frontend
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Showcase de
              <br />
              <span className="gradient-text">composants</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Exploration des différentes approches UI/UX pour un site e-commerce.
              Chaque version démontre des patterns, animations et composants différents.
            </p>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="grid grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { value: 3, label: 'Pages Home', suffix: '' },
                { value: 3, label: 'Pages Produit', suffix: '' },
                { value: 30, label: 'Composants', suffix: '+' },
                { value: 20, label: 'Animations', suffix: '+' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-black text-white">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Home versions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollReveal animation="fade-up">
          <div className="flex items-center gap-3 mb-2">
            <Eye size={20} className="text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Pages d'accueil</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-secondary mb-4">3 versions de la Home</h2>
          <p className="text-muted max-w-2xl mb-12">
            Chaque version utilise une approche de design différente : classique, magazine éditorial et luxe minimaliste.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {homeVersions.map((version, i) => (
            <ScrollReveal key={version.path} animation="fade-up" delay={i * 150}>
              <Link
                to={version.path}
                className="group block bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Header gradient */}
                <div className={`relative h-48 bg-gradient-to-br ${version.color} p-6 flex flex-col justify-between`}>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <version.icon size={24} className="text-white" />
                  </div>
                  <div className="flex items-center gap-2 text-white font-bold text-lg">
                    Voir la page
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-secondary mb-2">{version.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">{version.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {version.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-muted px-2.5 py-1 rounded-lg font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Product versions */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag size={20} className="text-primary" />
              <span className="text-sm font-bold text-primary uppercase tracking-wider">Pages Produit</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-secondary mb-4">3 versions du détail produit</h2>
            <p className="text-muted max-w-2xl mb-12">
              Différentes approches pour présenter un produit : standard, galerie interactive et immersive fullscreen.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {productVersions.map((version, i) => {
              const to = sampleSlug ? `${version.prefix}/products/${sampleSlug}` : '/products';
              return (
                <ScrollReveal key={version.prefix} animation="fade-up" delay={i * 150}>
                  <Link
                    to={to}
                    className="group block bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                  >
                    {/* Header gradient */}
                    <div className={`relative h-48 bg-gradient-to-br ${version.color} p-6 flex flex-col justify-between`}>
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <version.icon size={24} className="text-white" />
                      </div>
                      <div className="flex items-center gap-2 text-white font-bold text-lg">
                        Voir la page
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-black text-secondary mb-2">{version.title}</h3>
                      <p className="text-muted text-sm leading-relaxed mb-4">{version.description}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {version.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-gray-100 text-muted px-2.5 py-1 rounded-lg font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Components showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollReveal animation="fade-up">
          <div className="flex items-center gap-3 mb-2">
            <Boxes size={20} className="text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Composants</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-secondary mb-4">
            <AnimatedCounter end={30} suffix="+" /> composants créés
          </h2>
          <p className="text-muted max-w-2xl mb-12">
            Tous les composants UI réutilisables développés pour ce projet.
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap gap-3">
          {uiComponents.map((component, i) => (
            <ScrollReveal key={component} animation="scale" delay={i * 30}>
              <div className="group bg-white border border-gray-200 rounded-xl px-4 py-2.5 hover:border-primary hover:bg-primary/5 hover:shadow-md transition-all duration-300 cursor-default">
                <div className="flex items-center gap-2">
                  <Star size={12} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-sm font-medium text-secondary">{component}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="bg-secondary py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal animation="fade-up">
            <Zap size={32} className="text-accent mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Stack technique</h2>
            <p className="text-gray-400 mb-12">Technologies utilisées pour ce projet</p>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'React 19', desc: 'UI Library' },
              { name: 'TypeScript', desc: 'Type Safety' },
              { name: 'Tailwind CSS', desc: 'Styling' },
              { name: 'Vite', desc: 'Build Tool' },
              { name: 'Zustand', desc: 'State' },
              { name: 'React Router', desc: 'Routing' },
              { name: 'Lucide', desc: 'Icons' },
              { name: 'FastAPI', desc: 'Backend' },
            ].map((tech, i) => (
              <ScrollReveal key={tech.name} animation="scale" delay={i * 75}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                  <p className="text-white font-bold">{tech.name}</p>
                  <p className="text-gray-500 text-xs mt-1">{tech.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
