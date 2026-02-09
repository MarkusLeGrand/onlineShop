import { useState } from 'react';
import { Send, CheckCircle, Sparkles } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

export default function NewsletterV2() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-indigo-700" />

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-xl animate-float" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-rotate-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ScrollReveal animation="scale">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-white text-sm mb-6">
            <Sparkles size={16} />
            Rejoignez la communauté
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Recevez nos offres exclusives
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-10">
            Inscrivez-vous à notre newsletter et bénéficiez de -15% sur votre première commande
            ainsi que des offres réservées aux abonnés.
          </p>

          {submitted ? (
            <div className="animate-bounce-in">
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-5 text-white">
                <CheckCircle size={24} className="text-emerald-300" />
                <span className="font-semibold">Merci ! Vérifiez votre boîte mail.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email..."
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-white/90 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                S'inscrire
                <Send size={18} />
              </button>
            </form>
          )}

          <p className="text-white/30 text-xs mt-6">
            En vous inscrivant, vous acceptez de recevoir nos communications marketing.
            Désinscription possible à tout moment.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
