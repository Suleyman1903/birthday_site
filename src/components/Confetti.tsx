import { useEffect } from 'react';

type ConfettiPiece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
  shape: number;
  gravity: number;
};

const COLORS = [
  '#FF6B9D',
  '#FFB380',
  '#FFD966',
  '#FF7BA8',
  '#C2D9BD',
  '#FFE0EC',
  '#F6BE00',
];

type ConfettiProps = {
  active: boolean;
  duration?: number;
  count?: number;
};

export default function Confetti({ active, duration = 6000, count = 80 }: ConfettiProps) {
  useEffect(() => {
    if (!active) return;

    const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let pieces: ConfettiPiece[] = [];
    let raf = 0;
    let start = Date.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = (n: number) => {
      for (let i = 0; i < n; i++) {
        pieces.push({
          x: canvas.width / 2 + (Math.random() - 0.5) * 100,
          y: canvas.height / 3,
          vx: (Math.random() - 0.5) * 12,
          vy: Math.random() * -10 - 4,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 8 + 4,
          shape: Math.floor(Math.random() * 3),
          gravity: 0.25 + Math.random() * 0.15,
        });
      }
    };

    spawn(count);

    const draw = () => {
      const elapsed = Date.now() - start;
      if (elapsed > duration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces = pieces.filter((p) => p.y < canvas.height + 50);

      for (const p of pieces) {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 0) {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        } else if (p.shape === 1) {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active, duration, count]);

  return (
    <canvas
      id="confetti-canvas"
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-500 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
