import { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, Quote } from 'lucide-react';
import { birthdayData } from '@/data/birthdayData';

export default function WishCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const message =
    birthdayData.wishMessage ||
    birthdayData.wishes?.[0] ||
    'Senin için en güzel dileklerim burada saklı...';

  return (
    <section ref={sectionRef} className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl text-rose-500 font-bold text-center mb-3 sm:mb-4 px-2">
          Sana Dileklerim
        </h2>
        <p className="font-body text-ink-700 text-sm sm:text-base text-center mb-10 sm:mb-12 px-4">
          Tüm kalbimle senin için dilediğim özel mesaj.
        </p>

        {/* Single Centerpiece Wish Card */}
        <div
          className={`relative transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
          }`}
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-rose-200/50 via-peach-200/40 to-gold-300/40 blur-xl pointer-events-none" />

          {/* Main Card */}
          <div className="relative glass-card bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white/90 shadow-2xl shadow-rose-200/50">
            {/* Top Decorative Header */}
            <div className="flex items-center justify-between mb-6 border-b border-rose-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-peach-400 flex items-center justify-center text-white shadow-md shadow-rose-300/50">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-rose-600 text-base sm:text-lg">
                    Özel Bir Dilek
                  </h3>
                  <span className="font-body text-xs text-ink-700/60">
                    Sadece senin için yazıldı 💕
                  </span>
                </div>
              </div>

              <div className="text-rose-300/60">
                <Quote className="w-8 h-8 rotate-180" />
              </div>
            </div>

            {/* Custom Message Content */}
            <div className="my-4">
              <p className="font-body text-ink-800 text-base sm:text-lg leading-relaxed whitespace-pre-line text-left">
                {message}
              </p>
            </div>

            {/* Bottom Flourish */}
            <div className="mt-8 pt-4 border-t border-rose-100/70 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {[...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className="h-1.5 w-6 rounded-full bg-gradient-to-r from-rose-300 to-peach-300"
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-rose-400 font-script text-2xl sm:text-3xl">
                <span>Her zaman yanında</span>
                <Sparkles className="w-4 h-4 text-gold-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
