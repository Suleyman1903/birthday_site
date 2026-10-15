import { useEffect, useState } from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { birthdayData } from '@/data/birthdayData';

type HeroProps = {
  active: boolean;
};

export default function Hero({ active }: HeroProps) {
  const [visible, setVisible] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(t);
    }
  }, [active]);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < 45);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const cakeEl = document.getElementById('cake-section');
    if (cakeEl) {
      cakeEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-12 sm:py-20 z-10 overflow-hidden">
      {/* Soft glow backdrop */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-rose-200/30 blur-3xl pointer-events-none" />

      <div
        className={`relative flex flex-col items-center text-center max-w-2xl w-full transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="font-body text-rose-400 text-sm sm:text-base md:text-lg tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-2">
          Mutlu Yıllar
        </p>

        <h1 className="font-script text-6xl xs:text-7xl sm:text-8xl md:text-9xl text-shimmer leading-tight sm:leading-none py-1">
          {birthdayData.name}
        </h1>

        <div className="my-4 sm:my-6 flex items-center justify-center gap-2 sm:gap-4 max-w-full">
          <span className="hidden sm:inline-block h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-rose-300" />
          <span className="font-heading text-lg sm:text-2xl text-rose-500 font-semibold px-2">
            {birthdayData.age}. Yaş Günün Kutlu Olsun
          </span>
          <span className="hidden sm:inline-block h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-rose-300" />
        </div>

        <p className="font-body text-ink-700 text-sm sm:text-base md:text-lg max-w-xl text-center leading-relaxed px-2 sm:px-4">
          {birthdayData.message}
        </p>

        <p className="font-script text-3xl sm:text-4xl text-peach-400 mt-6 sm:mt-8">{birthdayData.date}</p>
      </div>

      {/* Theme-matching Scroll Down Indicator (Fades out smoothly on scroll) */}
      <div
        onClick={scrollToNext}
        className={`absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-all duration-500 cursor-pointer select-none group ${
          visible && atTop
            ? 'opacity-90 translate-y-0'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
        aria-label="Aşağı kaydır"
      >
        <span className="font-heading text-[11px] sm:text-xs tracking-wider text-rose-400 font-semibold group-hover:text-rose-500 transition-colors flex items-center gap-1">
          <span>Aşağı Kaydır</span>
          <Heart className="w-3 h-3 text-rose-400 fill-rose-300 animate-pulse" />
        </span>

        {/* Pill with bouncing gradient indicator */}
        <div className="w-5 sm:w-6 h-9 sm:h-10 rounded-full border-2 border-rose-300/80 bg-white/60 backdrop-blur-sm p-1 flex items-start justify-center shadow-sm shadow-rose-200/50 group-hover:border-rose-400 transition-all">
          <div className="w-1.5 h-2.5 rounded-full bg-gradient-to-b from-rose-400 to-peach-400 animate-bounce" />
        </div>

        <ChevronDown className="w-4 h-4 text-rose-400 group-hover:text-rose-500 animate-bounce-soft -mt-1" />
      </div>
    </section>
  );
}
