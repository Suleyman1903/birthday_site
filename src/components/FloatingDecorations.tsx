import { useEffect, useMemo, type ReactNode } from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

type Item = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  icon: ReactNode;
  color: string;
};

const ICONS = [
  <Heart key="heart" className="w-full h-full fill-current" />,
  <Star key="star" className="w-full h-full fill-current" />,
  <Sparkles key="sparkles" className="w-full h-full" />,
];

const COLORS = [
  'text-rose-200/40',
  'text-peach-200/35',
  'text-gold-200/35',
  'text-rose-300/35',
];

export default function FloatingDecorations() {
  const items = useMemo<Item[]>(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 5.4 + (i % 3) * 2.1) % 92 + 4}%`,
      delay: `${(i * 0.55) % 8}s`,
      duration: `${8 + (i % 4) * 1.5}s`,
      size: 14 + (i % 4) * 5,
      icon: ICONS[i % ICONS.length],
      color: COLORS[i % COLORS.length],
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {items.map((item) => (
        <div
          key={item.id}
          className={`absolute -bottom-12 ${item.color} animate-rise opacity-0 pointer-events-none`}
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            width: `${item.size}px`,
            height: `${item.size}px`,
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
