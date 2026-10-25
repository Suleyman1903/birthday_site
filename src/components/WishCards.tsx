import { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, RotateCw, Mail, MailOpen } from 'lucide-react';
import { birthdayData } from '@/data/birthdayData';

export default function WishCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

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

  const handleFlip = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(40);
      } catch {
        // ignore
      }
    }
    setIsFlipped((prev) => !prev);
  };

  const message =
    birthdayData.wishMessage ||
    birthdayData.wishes?.[0] ||
    'Senin için en güzel dileklerim burada saklı...';

  const postcardImage =
    (birthdayData as unknown as { postcardImage?: string }).postcardImage ||
    '/images/IMG-20261016-WA0041.jpg';

  return (
    <section ref={sectionRef} className="relative z-10 py-16 sm:py-24 px-3 sm:px-6 overflow-hidden">
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-peach-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-500 text-xs font-heading font-medium mb-3 shadow-sm">
            <Mail className="w-3.5 h-3.5" />
            <span>Özel Kartpostal</span>
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          </div>
          <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl text-rose-500 font-bold mb-2 px-2">
            Sana Dileklerim
          </h2>
          <p className="font-body text-ink-700 text-xs sm:text-sm max-w-md mx-auto px-4 flex items-center justify-center gap-1.5">
            <span>Arkasındaki mektubu okumak için kartpostala dokun</span>
            <RotateCw className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
          </p>
        </div>

        {/* 3D Flippable Postcard Container */}
        <div
          className={`relative w-full max-w-lg md:max-w-xl mx-auto perspective-1000 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Card Inner with 3D Transform */}
          <div
            onClick={handleFlip}
            className={`relative w-full min-h-[480px] sm:min-h-[530px] rounded-3xl transition-transform duration-700 transform-style-3d cursor-pointer select-none group ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            style={{ willChange: 'transform' }}
            title="Kartpostalı çevirmek için tıkla"
          >
            {/* FRONT FACE (Photograph side) */}
            <div className="absolute inset-0 backface-hidden rounded-3xl bg-white/95 p-3.5 sm:p-5 border-2 border-white shadow-2xl shadow-rose-200/50 flex flex-col justify-between overflow-hidden">
              {/* Top Cute Washi-Tape Accent */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-rose-200/90 text-[10px] font-heading font-semibold text-rose-600 shadow-sm border border-rose-300/50 flex items-center gap-1 z-20">
                <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
                <span>En Özel Anımız</span>
                <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
              </div>

              {/* Main Photo Frame */}
              <div className="relative w-full flex-1 rounded-2xl overflow-hidden bg-rose-50 shadow-inner border border-rose-100/60 mt-1 flex items-center justify-center">
                <img
                  src={postcardImage}
                  alt="Özel Fotoğrafımız"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Hint Overlay on Photo Bottom */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-lg flex items-center gap-2 text-rose-600 text-xs font-heading font-medium">
                  <MailOpen className="w-3.5 h-3.5 text-rose-500" />
                  <span>Mektubu okumak için tıkla</span>
                  <RotateCw className="w-3 h-3 text-rose-400" />
                </div>
              </div>

              {/* Front Bottom Bar */}
              <div className="mt-3 flex items-center justify-between px-2 pt-1 border-t border-rose-100/60">
                <span className="font-script text-xl sm:text-2xl text-rose-500">
                  İyi ki varsın... 💕
                </span>
                <span className="text-[11px] font-heading text-ink-700/60 flex items-center gap-1">
                  <span>Ön Yüz</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                </span>
              </div>
            </div>

            {/* BACK FACE (Postcard letter side) */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-[#FFFDF9] p-5 sm:p-8 border-2 border-rose-200/70 shadow-2xl shadow-rose-200/50 flex flex-col justify-between overflow-y-auto no-scrollbar">
              {/* Top Header & Stamp Row */}
              <div className="flex items-start justify-between pb-3 border-b-2 border-rose-100/80 mb-3">
                {/* Left: Romantic Greeting */}
                <div>
                  <span className="font-heading text-xs tracking-wider uppercase text-rose-400 font-semibold">
                    Özel Doğum Günü Mektubu
                  </span>
                  <h3 className="font-script text-2xl sm:text-3xl text-rose-600 mt-0.5">
                    Sevgilerle... 💌
                  </h3>
                </div>

                {/* Right: Vintage Postage Stamp & Postmark */}
                <div className="flex items-center gap-2">
                  {/* Circular Postmark */}
                  <div className="hidden sm:flex flex-col items-center justify-center w-12 h-12 rounded-full border border-dashed border-rose-300 text-[8px] font-heading font-bold text-rose-400 text-center leading-tight rotate-[-12deg]">
                    <span>27 EKİM</span>
                    <span className="text-[7px]">ÖZEL</span>
                  </div>

                  {/* Stamp */}
                  <div className="w-14 h-16 sm:w-16 sm:h-20 rounded-lg bg-gradient-to-br from-rose-100 to-peach-100 border-2 border-dashed border-rose-300 p-1 flex flex-col items-center justify-between text-center shadow-inner">
                    <Heart className="w-4 h-4 fill-rose-400 text-rose-400 mt-1" />
                    <span className="text-[9px] font-heading font-bold text-rose-500 uppercase tracking-tighter">
                      AŞKLA
                    </span>
                    <span className="text-[8px] font-mono text-rose-400/80 mb-0.5">№ 001</span>
                  </div>
                </div>
              </div>

              {/* Heartfelt Note Content */}
              <div className="flex-1 my-2 py-1 pr-1">
                <p className="font-body text-ink-800 text-sm sm:text-base leading-relaxed whitespace-pre-line text-left">
                  {message}
                </p>
              </div>

              {/* Bottom Postcard Footer */}
              <div className="pt-3 border-t border-rose-100/80 flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5 text-rose-500 font-script text-xl sm:text-2xl">
                  <span>Her zaman yanında...</span>
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                </div>

                {/* Flip back button hint */}
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100/70 hover:bg-rose-200 text-rose-600 text-xs font-heading font-medium transition-colors">
                  <RotateCw className="w-3 h-3" />
                  <span>Fotoğrafa dön</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
