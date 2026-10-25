import { useState } from 'react';
import { Flame, Wind } from 'lucide-react';
import { birthdayData } from '@/data/birthdayData';

type CakeProps = {
  onAllBlown: () => void;
};

export default function Cake({ onAllBlown }: CakeProps) {
  const [lit, setLit] = useState<boolean[]>(Array(birthdayData.candles).fill(true));
  const [blowing, setBlowing] = useState<boolean[]>(Array(birthdayData.candles).fill(false));
  const [smoke, setSmoke] = useState<boolean[]>(Array(birthdayData.candles).fill(false));

  const blowCandle = (index: number) => {
    if (!lit[index] || blowing[index]) return;

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(30);
      } catch {
        // ignore
      }
    }

    // Trigger blowing animation
    setBlowing((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });

    // After puff duration, extinguish and show smoke
    setTimeout(() => {
      setLit((prevLit) => {
        const nextLit = [...prevLit];
        nextLit[index] = false;

        // Check if all are blown
        if (nextLit.every((v) => !v)) {
          if (typeof window !== 'undefined' && 'vibrate' in navigator) {
            try {
              navigator.vibrate([40, 30, 80]);
            } catch {
              // ignore
            }
          }
          setTimeout(onAllBlown, 700);
        }

        return nextLit;
      });

      setBlowing((prev) => {
        const next = [...prev];
        next[index] = false;
        return next;
      });

      setSmoke((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });

      // Clear smoke
      setTimeout(() => {
        setSmoke((prev) => {
          const next = [...prev];
          next[index] = false;
          return next;
        });
      }, 1200);
    }, 380);
  };

  const blowAllCandles = () => {
    let delay = 0;
    lit.forEach((isLit, i) => {
      if (isLit) {
        setTimeout(() => {
          blowCandle(i);
        }, delay);
        delay += 140;
      }
    });
  };

  const allBlown = lit.every((v) => !v);
  const litCount = lit.filter(Boolean).length;

  return (
    <section id="cake-section" className="relative min-h-[100dvh] flex flex-col items-center justify-center px-3 sm:px-4 z-10 py-16 sm:py-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-peach-100/40 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center text-center w-full max-w-lg">
        <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl text-rose-500 font-bold mb-2 px-2">
          Dilek Tut ve Mumları Üfle
        </h2>
        <p className="font-body text-ink-700 text-sm sm:text-base mb-8 sm:mb-10 text-center max-w-md px-4 leading-relaxed">
          Her mum için bir dilek tut, sonra üflemek için üzerine dokun.
        </p>

        {/* Cake Container */}
        <div className="relative flex flex-col items-center max-w-full">
          {/* Candles */}
          <div className="flex gap-3 sm:gap-5 items-end mb-2">
            {lit.map((isLit, i) => {
              const isBlowing = blowing[i];
              const isSmoking = smoke[i];

              return (
                <button
                  key={i}
                  onClick={() => blowCandle(i)}
                  className="group relative flex flex-col items-center justify-end p-2 -m-1 sm:p-2 sm:-m-0.5 min-w-[46px] min-h-[58px] transition-transform hover:scale-105 active:scale-95 touch-manipulation cursor-pointer select-none"
                  aria-label={`Mum ${i + 1} üfle`}
                >
                  {/* Wind / Breath Puff Effect (Runs smoothly on GPU) */}
                  {isBlowing && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex items-center justify-center">
                      <Wind className="w-6 h-6 text-sky-300 drop-shadow-[0_0_6px_rgba(186,230,253,0.8)] animate-wind-blow" />
                      <div className="absolute w-8 h-8 rounded-full bg-white/40 blur-[2px] animate-wind-blow" />
                    </div>
                  )}

                  {/* Rising Smoke Puff after extinguishing */}
                  {isSmoking && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300/70 blur-[1px] animate-smoke-puff" />
                      <div className="w-2 h-2 rounded-full bg-slate-200/50 blur-[1px] animate-smoke-puff -mt-1" />
                    </div>
                  )}

                  {/* Flame */}
                  {isLit && (
                    <div
                      className={`relative -mb-1 ${isBlowing ? 'animate-flame-out' : ''}`}
                      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-300/50 blur-sm animate-flicker" />
                      <Flame
                        className="relative w-5 h-6 text-gold-400 drop-shadow-[0_0_8px_rgba(246,190,0,0.6)] animate-flicker"
                        fill="currentColor"
                      />
                    </div>
                  )}

                  {/* Extinguished Wick */}
                  {!isLit && !isSmoking && (
                    <div className="w-5 h-6 flex items-center justify-center">
                      <div className="w-0.5 h-2 bg-stone-500 rounded-t-sm" />
                    </div>
                  )}

                  {/* Candle body */}
                  <div className="relative">
                    <div className="w-2.5 h-9 sm:h-10 rounded-sm bg-gradient-to-b from-rose-300 via-rose-200 to-peach-200" />
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-rose-400 rounded-sm" />
                    <div className="absolute top-1.5 w-full h-px bg-white/30" />
                    <div className="absolute top-3 w-full h-px bg-white/30" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Cake layers */}
          <div className="relative flex flex-col items-center max-w-full">
            {/* Top tier */}
            <div className="relative w-36 sm:w-48 h-16 sm:h-20 rounded-t-2xl bg-gradient-to-b from-rose-200 to-rose-300 shadow-lg shadow-rose-200/50">
              {/* Drips */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bg-cream-100"
                  style={{
                    left: `${i * 22 + 6}%`,
                    width: '8px',
                    height: `${8 + (i % 3) * 5}px`,
                    borderRadius: '0 0 6px 6px',
                  }}
                />
              ))}
              {/* Sprinkles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    top: `${30 + (i % 3) * 15}%`,
                    left: `${10 + i * 10}%`,
                    width: '4px',
                    height: '4px',
                    backgroundColor: ['#FF6B9D', '#FFD966', '#C2D9BD', '#FFB380'][i % 4],
                  }}
                />
              ))}
            </div>

            {/* Middle tier */}
            <div className="w-48 sm:w-64 h-20 sm:h-24 bg-gradient-to-b from-peach-200 to-peach-300 shadow-lg shadow-peach-200/50 flex items-center justify-center">
              <span className="font-script text-2xl sm:text-3xl text-rose-500">{birthdayData.introName}</span>
            </div>

            {/* Bottom tier */}
            <div className="relative w-64 max-w-[86vw] sm:w-80 h-16 sm:h-20 rounded-b-2xl bg-gradient-to-b from-rose-200 to-rose-300 shadow-lg shadow-rose-200/50">
              {/* Decorations */}
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    bottom: `${14 + (i % 2) * 16}px`,
                    left: `${12 + i * 11}%`,
                    width: '5px',
                    height: '5px',
                    backgroundColor: ['#FFD966', '#FF6B9D', '#8FB587', '#FFB380'][i % 4],
                  }}
                />
              ))}
            </div>

            {/* Cake plate */}
            <div className="w-72 max-w-[92vw] sm:w-96 h-3 mx-auto rounded-full bg-rose-200/50 shadow-lg mt-0.5" />
          </div>
        </div>

        {/* Action button & candle status */}
        {!allBlown && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="font-body text-ink-700/70 text-xs sm:text-sm">
              {litCount} mum kaldı...
            </p>
            <button
              onClick={blowAllCandles}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-rose-100/90 hover:bg-rose-200 text-rose-600 border border-rose-200/70 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              Hepsini Birden Üfle 🌬️
            </button>
          </div>
        )}

        {/* Message after blowing all candles */}
        <div
          className={`mt-8 sm:mt-12 transition-all duration-700 ${allBlown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
        >
          <p className="font-script text-3xl sm:text-4xl text-rose-500 text-center">
            Dileğin kabul olsun! ✨
          </p>
        </div>
      </div>
    </section>
  );
}
