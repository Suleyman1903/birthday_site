import { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';

type IntroScreenProps = {
  onOpen: () => void;
  name: string;
};

export default function IntroScreen({ onOpen, name }: IntroScreenProps) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(60);
      } catch {
        // ignore
      }
    }
    setOpening(true);
    setTimeout(onOpen, 1200);
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center p-4 min-h-[100dvh] overflow-hidden transition-all duration-1000 ${
        opening ? 'scale-125 opacity-0' : 'scale-100 opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center text-center max-w-xs sm:max-w-md w-full px-2">
        {/* Floating sparkles around gift - safely contained */}
        <Sparkles className="absolute -top-6 left-2 sm:-left-8 w-5 h-5 sm:w-6 sm:h-6 text-gold-300 animate-float-slow pointer-events-none" />
        <Sparkles className="absolute -top-3 right-4 sm:-right-4 w-5 h-5 text-rose-300 animate-float-mid pointer-events-none" />
        <Sparkles className="absolute top-24 left-4 sm:-left-4 w-4 h-4 text-peach-300 animate-float-fast pointer-events-none" />

        <p className="font-body text-ink-700 text-base sm:text-lg mb-6 tracking-wide px-2">
          Senin için özel bir sürpriz hazırladım...
        </p>

        {/* Gift box */}
        <button
          onClick={handleOpen}
          className="group relative transition-transform duration-300 hover:scale-105 active:scale-95 touch-manipulation cursor-pointer"
          aria-label="Sürprizi aç"
        >
          <div className="absolute inset-0 rounded-3xl bg-rose-300/40 blur-xl sm:blur-2xl animate-bounce-soft" />
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-rose-200 via-peach-100 to-gold-300 flex items-center justify-center shadow-xl shadow-rose-300/50 border-2 border-white/80">
            <Gift className="w-14 h-14 sm:w-16 sm:h-16 text-rose-500 group-hover:animate-wiggle" strokeWidth={1.5} />
          </div>
          {/* Ribbon */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-full bg-rose-400/50 rounded-full" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 sm:h-6 w-full bg-rose-400/50 rounded-full" />
        </button>

        <p className="font-heading text-lg sm:text-xl text-rose-400 mt-6 sm:mt-8 animate-bounce-soft">
          Hediye kutusuna dokun ↑
        </p>
        <p className="font-script text-3xl sm:text-4xl text-rose-500 mt-2">{name} 💕</p>
      </div>
    </div>
  );
}
