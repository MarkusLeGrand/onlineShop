import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight } from 'lucide-react';

function getTimeLeft() {
  // Countdown to midnight
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end.getTime() - now.getTime());
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white text-secondary font-black text-2xl sm:text-3xl w-16 sm:w-20 h-16 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-white/60 text-xs mt-2 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function CountdownBanner() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-orange-500">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-black/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white text-sm font-medium mb-4">
              <Flame size={16} className="animate-pulse" />
              Vente flash
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Jusqu'à <span className="text-yellow-300">-50%</span> sur tout !
            </h2>
            <p className="text-white/70 mt-2">Offre valable aujourd'hui uniquement. Ne ratez pas cette occasion !</p>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3 sm:gap-4">
            <TimeBlock value={time.hours} label="Heures" />
            <span className="text-white text-3xl font-bold animate-pulse mt-[-20px]">:</span>
            <TimeBlock value={time.minutes} label="Minutes" />
            <span className="text-white text-3xl font-bold animate-pulse mt-[-20px]">:</span>
            <TimeBlock value={time.seconds} label="Secondes" />
          </div>

          {/* CTA */}
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 bg-white text-red-600 font-bold px-8 py-4 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            J'en profite
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
