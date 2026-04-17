import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const y = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const scale = useSpring(1, { stiffness: 400, damping: 20 });

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      setHidden(false);
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor-hover]');
      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.body.addEventListener('mouseleave', onLeave);
    document.body.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.body.removeEventListener('mouseleave', onLeave);
      document.body.removeEventListener('mouseenter', onEnter);
    };
  }, [x, y]);

  useEffect(() => {
    scale.set(hovered ? 2.2 : 1);
  }, [hovered, scale]);

  // Don't render on coarse pointer devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cursor-dot { display: none !important; }
        }
      `}</style>
      <motion.div
        ref={cursorRef}
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[10000] mix-blend-difference"
        style={{
          x,
          y,
          scale,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          className={`rounded-full transition-opacity duration-200 ${hidden ? 'opacity-0' : 'opacity-100'}`}
          style={{
            width: 10,
            height: 10,
            backgroundColor: '#FFFFFF',
            boxShadow: hovered
              ? '0 0 20px rgba(255,255,255,0.5)'
              : '0 0 8px rgba(255,255,255,0.35)',
          }}
        />
      </motion.div>
    </>
  );
}
