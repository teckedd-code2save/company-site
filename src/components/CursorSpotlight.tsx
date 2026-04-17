import { useEffect, useRef } from 'react';

/*
 * Subtle cursor-following illumination on the pure-black background.
 * A soft radial gradient trails the mouse, revealing the background
 * slightly brighter wherever the cursor lands.
 */

export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const current = useRef({ x: -9999, y: -9999 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.style.opacity = '0';
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const tick = () => {
      const targetX = mouse.current.x;
      const targetY = mouse.current.y;

      if (current.current.x === -9999) {
        current.current.x = targetX;
        current.current.y = targetY;
      }

      // Lerp for smooth trailing
      current.current.x += (targetX - current.current.x) * 0.08;
      current.current.y += (targetY - current.current.y) * 0.08;

      el.style.background = `radial-gradient(600px circle at ${current.current.x}px ${current.current.y}px, rgba(255,255,255,0.055), transparent 40%)`;

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      aria-hidden="true"
    />
  );
}
