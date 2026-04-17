import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface LightningFlashProps {
  className?: string;
  intensity?: number; // 0–1
}

export default function LightningFlash({ className = '', intensity = 0.04 }: LightningFlashProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {inView && (
        <>
          {/* Main flash */}
          <motion.div
            className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, transparent 0%, rgba(192,132,252,${intensity}) 40%, rgba(255,255,255,${intensity * 0.6}) 50%, rgba(192,132,252,${intensity}) 60%, transparent 100%)` }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 1, 0.4, 0], scaleY: [0, 1, 1, 0] }}
            transition={{ duration: 0.6, times: [0, 0.2, 0.5, 1], ease: 'easeOut' }}
          />
          {/* Secondary flicker */}
          <motion.div
            className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, transparent 0%, rgba(255,255,255,${intensity * 0.5}) 50%, transparent 100%)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0, 0.4, 0] }}
            transition={{ duration: 0.4, delay: 0.15, times: [0, 0.15, 0.3, 0.5, 1] }}
          />
          {/* Thin vertical strike */}
          <motion.div
            className="absolute left-1/2 top-0 h-full w-px"
            style={{ background: `linear-gradient(180deg, transparent, rgba(192,132,252,0.4), transparent)` }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 0] }}
            transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
          />
        </>
      )}
    </div>
  );
}
