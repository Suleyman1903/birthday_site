import { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function Closing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 min-h-[90dvh] sm:min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:py-20 overflow-hidden">
      <div
        className={`flex flex-col items-center text-center max-w-xl transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
      >
        {/* Decorative hearts */}
        <div className="flex gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-300 fill-rose-300 animate-float-slow" />
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 fill-rose-400 animate-float-mid" />
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-300 fill-rose-300 animate-float-fast" />
        </div>

        <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-gold-300 mb-4 sm:mb-6 animate-float-slow" />

        <h2 className="font-script text-4xl xs:text-5xl sm:text-6xl text-rose-500 text-center mb-4 sm:mb-6 px-2">
          Seni çok seviyorum
        </h2>

        <p className="font-body text-ink-700 text-sm sm:text-base md:text-lg text-center max-w-md sm:max-w-xl leading-relaxed mb-6 sm:mb-8 px-2">
          Nice mutlu, sağlıklı, huzurlu yıllara, nice güzel anılara,
          ve nice birlikte gülümseten günlere...
        </p>

        <div className="flex items-center justify-center gap-2 sm:gap-3 max-w-full">
          <span className="h-px w-8 sm:w-20 bg-gradient-to-r from-transparent to-rose-300" />
          <span className="font-heading text-rose-400 text-xs sm:text-sm tracking-wider sm:tracking-widest uppercase px-1">
            Doğum Günün Kutlu Olsun
          </span>
          <span className="h-px w-8 sm:w-20 bg-gradient-to-l from-transparent to-rose-300" />
        </div>

        <p className="font-script text-2xl sm:text-3xl text-peach-400 mt-6 sm:mt-8">

        </p>
      </div>
    </section>
  );
}
