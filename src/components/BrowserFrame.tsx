import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface BrowserFrameProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

const draw = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

export default function BrowserFrame({ children, className = '', delay = 0, onClick }: BrowserFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className={`relative ${className}`} onClick={onClick} role="button" tabIndex={onClick ? 0 : undefined} onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}>
      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-10 items-center gap-2 rounded-t-2xl border-b border-white/10 px-4 glass-strong">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        <div className="ml-3 flex h-5 flex-1 items-center rounded-md border border-white/10 bg-white/[0.04] px-2">
          <span className="text-[10px] text-white/30">localhost:3000</span>
        </div>
      </div>

      {/* Drawing border lines */}
      {inView && (
        <>
          {/* top */}
          <motion.div
            className="absolute left-0 right-0 top-0 z-10 h-px origin-left bg-white/15"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ ...draw, delay }}
          />
          {/* right */}
          <motion.div
            className="absolute bottom-0 right-0 top-0 z-10 w-px origin-top bg-white/15"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ ...draw, delay: delay + 0.2 }}
          />
          {/* bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-10 h-px origin-right bg-white/15"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ ...draw, delay: delay + 0.4 }}
          />
          {/* left */}
          <motion.div
            className="absolute bottom-0 left-0 top-0 z-10 w-px origin-bottom bg-white/15"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ ...draw, delay: delay + 0.6 }}
          />

          {/* Mint glow corner accents */}
          <motion.div
            className="absolute -left-px -top-px z-10 h-4 w-4"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: delay + 0.8 }}
          />
          <motion.div
            className="absolute -bottom-px -right-px z-10 h-4 w-4"
            style={{
              background: 'linear-gradient(315deg, rgba(255,255,255,0.4) 0%, transparent 60%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: delay + 0.9 }}
          />
        </>
      )}

      {/* Content */}
      <div className="h-full w-full overflow-hidden rounded-2xl border border-white/10 pt-10">
        {children}
      </div>
    </div>
  );
}
