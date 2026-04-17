import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DURATION = 1.6;

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true);
      onComplete?.();
    }, DURATION * 1000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: '#000000' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center gap-10">
            {/* ── Rotating wireframe diamond ───────────────────────────── */}
            <div className="relative" style={{ width: 56, height: 56 }}>
              {/* Glow halo */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(212,165,176,0.18) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />

              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                className="relative overflow-visible"
              >
                {/* Outer octahedron / diamond wireframe */}
                <motion.g
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: '28px 28px' }}
                >
                  {/* Top triangle */}
                  <motion.path
                    d="M28 4 L52 28 L28 28 L4 28 Z"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {/* Bottom triangle */}
                  <motion.path
                    d="M28 52 L52 28 L28 28 L4 28 Z"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {/* Vertical spine */}
                  <motion.line
                    x1={28} y1={4} x2={28} y2={52}
                    stroke="rgba(212,165,176,0.6)"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {/* Center node */}
                  <motion.circle
                    cx={28} cy={28} r={3}
                    fill="#D4A5B0"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.6 }}
                  />
                  {/* Node pulse ring */}
                  <motion.circle
                    cx={28} cy={28} r={3}
                    fill="none"
                    stroke="#D4A5B0"
                    strokeWidth={1}
                    initial={{ opacity: 0 }}
                    animate={{ r: [3, 14, 3], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
                  />
                </motion.g>
              </svg>
            </div>

            {/* ── Progress bar ─────────────────────────────────────────── */}
            <div className="relative h-px w-28 overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{ background: '#D4A5B0' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
