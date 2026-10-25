import { useMemo, type ReactNode } from 'react';
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
  'text-rose-200/35',
  'text-peach-200/30',
  'text-gold-200/30',
  'text-rose-300/30',
];

export default function FloatingDecorations() {
  // Reduced to 8 gentle particles for ultra-smooth 60/120 FPS on iOS
  const items = useMemo<Item[]>(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${(i * 11.5 + 6) % 88 + 6}%`,
      delay: `${(i * 1.2) % 6}s`,
      duration: `${10 + (i % 3) * 2}s`,
      size: 16 + (i % 3) * 6,
      icon: ICONS[i % ICONS.length],
      color: COLORS[i % COLORS.length],
    }));
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      style={{ contain: 'strict' }}
    >
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
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
            WebkitTransform: 'translate3d(0, 0, 0)',
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
