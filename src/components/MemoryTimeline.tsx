import { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, X } from 'lucide-react';
import { birthdayData } from '@/data/birthdayData';

export default function MemoryTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  return (
    <section ref={sectionRef} className="relative z-10 py-16 sm:py-24 px-3 sm:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl text-rose-500 font-bold text-center mb-3 sm:mb-4 px-2">
          Birlikte Biriktirdiğimiz Anılar
        </h2>
        <p className="font-body text-ink-700 text-sm sm:text-base text-center mb-12 sm:mb-16 px-4">
          Her biri kalbimde en özel yerde saklı.
        </p>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* Central connecting line (Desktop center, Mobile left/center) */}
          <div
            className={`absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-200 via-peach-200 to-gold-300 transition-all duration-1000 origin-top ${
              visible ? 'scale-y-100' : 'scale-y-0'
            }`}
          />

          {/* 4 Alternating Photo Cards */}
          <div className="space-y-10 sm:space-y-16">
            {birthdayData.memories.slice(0, 4).map((memory, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={memory.id ?? i}
                  className={`relative flex items-center transition-all duration-700 ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  } ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                  style={{ transitionDelay: `${i * 180}ms` }}
                >
                  {/* Timeline Dot (Heart Pin) */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-20">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-rose-300 to-peach-300 flex items-center justify-center shadow-md shadow-rose-200/60 border-2 border-white">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                    </div>
                  </div>

                  {/* Photo Card Container */}
                  <div
                    className={`w-full pl-14 sm:pl-0 sm:w-1/2 ${
                      isLeft ? 'sm:pr-10 md:pr-14' : 'sm:pl-10 md:pl-14'
                    }`}
                  >
                    <div
                      onClick={() => setPreviewImage(memory.image)}
                      className="group relative cursor-pointer select-none"
                    >
                      {/* Romantic soft glow backdrop */}
                      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-rose-200/40 via-peach-200/30 to-gold-300/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Polaroid / Gallery Photo Frame (No texts, image-only) */}
                      <div className="relative glass-card bg-white/90 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 border border-white/90 shadow-xl shadow-rose-200/30 transition-all duration-300 group-hover:scale-[1.03] group-hover:-translate-y-1">
                        {/* Decorative cute tape/heart on top */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-rose-100/90 border border-rose-200 shadow-sm flex items-center gap-1 z-10">
                          <Sparkles className="w-3 h-3 text-rose-400" />
                          <span className="text-[10px] font-heading font-medium text-rose-500">
                            Anı #{i + 1}
                          </span>
                        </div>

                        {/* Image display */}
                        <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-rose-50 shadow-inner">
                          <img
                            src={memory.image}
                            alt={`Anı ${i + 1}`}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />

                          {/* Subtle shine overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden bg-white/95 p-3 shadow-2xl border border-white/80"
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewImage}
              alt="Fotoğraf Önizleme"
              className="w-full max-h-[82vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
