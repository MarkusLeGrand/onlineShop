import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            Restez informé
          </h2>
          <p className="text-gray-400 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir nos offres exclusives et nouveautés.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 text-success bg-success/10 rounded-xl py-4 px-6">
              <CheckCircle size={22} />
              <span className="font-medium">Merci ! Vous êtes inscrit.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email..."
                required
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <Button type="submit" icon={<Send size={18} />}>
                S'inscrire
              </Button>
            </form>
          )}

          <p className="text-gray-500 text-xs mt-4">
            Pas de spam. Désinscription en un clic.
          </p>
        </div>
      </div>
    </section>
  );
}
