import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      <motion.div
        className="blob-drift absolute"
        style={{
          y: orbY,
          top: '-15%',
          left: '-12%',
          width: 'min(720px, 80vw)',
          height: 'min(720px, 80vw)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 50%, rgba(0,230,153,0.30) 0%, rgba(0,230,153,0.10) 32%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      <motion.div
        className="blob-drift absolute"
        style={{
          y: orbY,
          bottom: '-22%',
          right: '-18%',
          width: 'min(820px, 90vw)',
          height: 'min(820px, 90vw)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 50%, rgba(0,217,255,0.28) 0%, rgba(0,217,255,0.08) 35%, transparent 65%)',
          filter: 'blur(48px)',
          animationDelay: '-8s',
        }}
      />

      <div
        className="absolute"
        style={{
          bottom: '-30%',
          left: '15%',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,80,60,0.28), transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          y: gridY,
          backgroundImage: 'radial-gradient(rgba(245,242,237,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.9) 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.9) 0%, transparent 75%)',
        }}
      />

      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(0,217,255,0.40) 50%, transparent 100%)',
          boxShadow: '0 0 18px rgba(0,217,255,0.22)',
        }}
        initial={{ top: '20%', opacity: 0 }}
        animate={{ top: ['20%', '80%', '20%'], opacity: [0, 0.45, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(0,230,153,0.34) 50%, transparent 100%)',
          boxShadow: '0 0 16px rgba(0,230,153,0.20)',
        }}
        initial={{ top: '70%', opacity: 0 }}
        animate={{ top: ['70%', '15%', '70%'], opacity: [0, 0.4, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      <div className="noise-bg" style={{ opacity: 0.045 }} />

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 55%, transparent 30%, rgba(0,0,0,0.55) 80%)',
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(180deg, transparent, #000000 90%)',
        }}
      />
    </div>
  );
}
