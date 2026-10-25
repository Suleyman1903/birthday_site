import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const ROMANTIC_COLORS = [
  '#FF6B9D', // Rose pink
  '#FFB380', // Soft peach
  '#FFD966', // Warm gold
  '#FF7BA8', // Romantic magenta
  '#C2D9BD', // Sage green accent
  '#FFE0EC', // Baby pink
  '#F6BE00', // Sparkling gold
];

// Helper for triggering smooth confetti bursts from anywhere
export function fireConfettiBurst() {
  // Center fountain burst
  confetti({
    particleCount: 65,
    spread: 80,
    origin: { x: 0.5, y: 0.65 },
    colors: ROMANTIC_COLORS,
    startVelocity: 38,
    gravity: 0.85,
    scalar: 1.05,
    ticks: 220,
    disableForReducedMotion: true,
  });

  // Staggered left & right celebratory cannons (150ms later)
  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 60,
      origin: { x: 0.05, y: 0.75 },
      colors: ROMANTIC_COLORS,
      startVelocity: 42,
      gravity: 0.9,
      scalar: 0.95,
      ticks: 200,
      disableForReducedMotion: true,
    });

    confetti({
      particleCount: 40,
      angle: 120,
      spread: 60,
      origin: { x: 0.95, y: 0.75 },
      colors: ROMANTIC_COLORS,
      startVelocity: 42,
      gravity: 0.9,
      scalar: 0.95,
      ticks: 200,
      disableForReducedMotion: true,
    });
  }, 160);
}

type ConfettiProps = {
  active: boolean;
  duration?: number;
};

export default function Confetti({ active }: ConfettiProps) {
  const prevActiveRef = useRef(false);

  useEffect(() => {
    // Only fire when transitioning from false -> true
    if (active && !prevActiveRef.current) {
      fireConfettiBurst();
    }
    prevActiveRef.current = active;
  }, [active]);

  // canvas-confetti handles its own lightweight canvas lifecycle automatically
  return null;
}
