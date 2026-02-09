import { Shield, Truck, RotateCcw, Headphones, Zap, Award } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import TiltCard from '../ui/TiltCard';

const features = [
  { icon: Truck, title: 'Livraison express', desc: 'Recevez vos commandes en 24h', stat: '24h', color: 'from-blue-500 to-cyan-400' },
  { icon: Shield, title: 'Paiement sécurisé', desc: 'Transactions 100% protégées', stat: '100%', color: 'from-emerald-500 to-teal-400' },
  { icon: RotateCcw, title: 'Retours gratuits', desc: 'Satisfait ou remboursé 30j', stat: '30j', color: 'from-purple-500 to-pink-400' },
  { icon: Headphones, title: 'Support 24/7', desc: 'Assistance à toute heure', stat: '24/7', color: 'from-amber-500 to-orange-400' },
  { icon: Zap, title: 'Click & Collect', desc: 'Retirez en 2h en magasin', stat: '2h', color: 'from-red-500 to-rose-400' },
  { icon: Award, title: 'Qualité certifiée', desc: 'Produits testés et approuvés', stat: '★★★★★', color: 'from-indigo-500 to-violet-400' },
];

export default function FeaturesGridV2() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ScrollReveal animation="fade-up">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">Nos engagements</p>
          <h2 className="text-3xl sm:text-4xl font-black text-secondary">Pourquoi nous faire confiance</h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature, i) => (
          <ScrollReveal key={feature.title} animation="scale" delay={i * 100}>
            <TiltCard maxTilt={8} className="group h-full">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 hover:shadow-2xl transition-shadow duration-500 h-full relative overflow-hidden">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Stat watermark */}
                <div className="absolute -bottom-2 -right-2 text-6xl font-black text-gray-50 group-hover:text-primary/5 transition-colors">
                  {feature.stat}
                </div>

                <div className="relative z-10">
                  <div className={`inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${feature.color} mb-5 shadow-lg`}>
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-secondary text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
