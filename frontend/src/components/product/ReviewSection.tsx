import { useState } from 'react';
import { Star, ThumbsUp, Check, Camera } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';
import ScrollReveal from '../ui/ScrollReveal';

const reviews = [
  { name: 'Marie L.', date: 'Il y a 3 jours', rating: 5, text: 'Excellent produit ! Conforme à la description, livraison rapide. Je recommande vivement.', helpful: 12, avatar: 'ML', verified: true },
  { name: 'Pierre D.', date: 'Il y a 1 semaine', rating: 4, text: "Bon rapport qualité-prix. Petit bémol sur l'emballage mais le produit est top.", helpful: 8, avatar: 'PD', verified: true },
  { name: 'Sophie M.', date: 'Il y a 2 semaines', rating: 5, text: 'Parfait ! Exactement ce que je cherchais. La qualité est au rendez-vous. Livraison soignée.', helpful: 15, avatar: 'SM', verified: true },
  { name: 'Thomas R.', date: 'Il y a 3 semaines', rating: 3, text: "Correct dans l'ensemble. Le produit fait le job mais je m'attendais à mieux pour ce prix.", helpful: 3, avatar: 'TR', verified: false },
  { name: 'Camille B.', date: 'Il y a 1 mois', rating: 5, text: "Magnifique ! J'ai commandé pour offrir et le résultat a été au-delà de mes attentes.", helpful: 20, avatar: 'CB', verified: true },
];

const ratingDistribution = [
  { stars: 5, count: 45 },
  { stars: 4, count: 22 },
  { stars: 3, count: 8 },
  { stars: 2, count: 3 },
  { stars: 1, count: 1 },
];

export default function ReviewSection() {
  const [showForm, setShowForm] = useState(false);
  const [formRating, setFormRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const totalReviews = ratingDistribution.reduce((acc, r) => acc + r.count, 0);
  const avgRating = ratingDistribution.reduce((acc, r) => acc + r.stars * r.count, 0) / totalReviews;

  return (
    <div className="space-y-10">
      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-8 bg-gray-50 rounded-3xl p-8">
        {/* Score */}
        <div className="text-center md:border-r border-gray-200">
          <p className="text-6xl font-black text-secondary">{avgRating.toFixed(1)}</p>
          <div className="flex items-center justify-center gap-1 mt-2 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} className={i < Math.round(avgRating) ? 'text-accent fill-accent' : 'text-gray-300'} />
            ))}
          </div>
          <p className="text-muted text-sm">{totalReviews} avis vérifiés</p>
        </div>

        {/* Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map((r) => (
            <div key={r.stars} className="flex items-center gap-3">
              <span className="text-sm text-muted w-4">{r.stars}</span>
              <Star size={12} className="text-accent fill-accent" />
              <ProgressBar
                value={r.count}
                max={totalReviews}
                size="sm"
                color="accent"
                className="flex-1"
                animated={false}
              />
              <span className="text-xs text-muted w-8 text-right">{r.count}</span>
            </div>
          ))}
        </div>

        {/* Write review */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-muted mb-3">Partagez votre expérience</p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors cursor-pointer"
          >
            Écrire un avis
          </button>
        </div>
      </div>

      {/* Review form */}
      {showForm && (
        <ScrollReveal animation="fade-up">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <h4 className="font-bold text-secondary">Votre avis</h4>

            {/* Star selector */}
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted mr-2">Note :</span>
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setHoverRating(i + 1)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setFormRating(i + 1)}
                  className="cursor-pointer"
                >
                  <Star
                    size={24}
                    className={`transition-colors ${
                      i < (hoverRating || formRating) ? 'text-accent fill-accent' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              placeholder="Décrivez votre expérience avec ce produit..."
              className="w-full p-4 border border-gray-200 rounded-xl resize-none h-32 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />

            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors cursor-pointer">
                <Camera size={18} />
                Ajouter des photos
              </button>
              <div className="flex gap-3">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-muted hover:text-secondary transition-colors cursor-pointer">
                  Annuler
                </button>
                <button className="px-6 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors cursor-pointer">
                  Publier
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map((review, i) => (
          <ScrollReveal key={i} animation="fade-up" delay={i * 50}>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-secondary">{review.name}</p>
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 text-xs text-success bg-emerald-50 px-2 py-0.5 rounded-full">
                          <Check size={10} /> Vérifié
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className={j < review.rating ? 'text-accent fill-accent' : 'text-gray-200'} />
                  ))}
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>

              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-50">
                <button className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors cursor-pointer">
                  <ThumbsUp size={14} />
                  Utile ({review.helpful})
                </button>
                <button className="text-xs text-muted hover:text-primary transition-colors cursor-pointer">
                  Signaler
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
