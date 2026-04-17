import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'drawing' | 'fill' | 'fade' | 'done'>('drawing');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fill'), 1200);
    const t2 = setTimeout(() => setPhase('fade'), 1800);
    const t3 = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{ backgroundColor: '#000000' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'fade' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: phase === 'fade' ? 0.6 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col items-center gap-8">
          {/* Logo SVG draw */}
          <svg width="64" height="64" viewBox="0 0 64 64" className="overflow-visible">
            {/* Outer square stroke */}
            <motion.rect
              x="2" y="2" width="60" height="60" rx="12"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Inner fill */}
            <motion.rect
              x="2" y="2" width="60" height="60" rx="12"
              fill="#FFFFFF"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'fill' || phase === 'fade' ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
            {/* S mark */}
            <motion.path
              d="M22 24c0-4 3-6 8-6s8 3 8 6c0 5-6 5-8 7-2 2-2 5 0 7 2 2 6 2 8 0"
              fill="none"
              stroke={phase === 'drawing' ? '#FFFFFF' : '#000000'}
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>

          {/* Progress line */}
          <div className="relative h-px w-32 overflow-hidden bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#FFFFFF]"
              initial={{ width: '0%' }}
              animate={{ width: phase === 'drawing' ? '60%' : phase === 'fill' ? '100%' : '100%' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
