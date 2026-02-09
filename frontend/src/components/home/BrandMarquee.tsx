import Marquee from '../ui/Marquee';

const brands = [
  { name: 'TechPro', color: '#2563eb' },
  { name: 'UrbanStyle', color: '#7c3aed' },
  { name: 'EcoLife', color: '#10b981' },
  { name: 'LuxeHome', color: '#f59e0b' },
  { name: 'SportMax', color: '#ef4444' },
  { name: 'DigitalHub', color: '#06b6d4' },
  { name: 'ModaVita', color: '#ec4899' },
  { name: 'ArtisanCo', color: '#8b5cf6' },
];

export default function BrandMarquee() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted font-medium">
          Nos marques partenaires
        </p>
      </div>
      <Marquee speed="slow" pauseOnHover>
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex items-center gap-3 px-8 py-3 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg" style={{ backgroundColor: brand.color }}>
              {brand.name.charAt(0)}
            </div>
            <span className="font-bold text-secondary text-lg whitespace-nowrap">{brand.name}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
