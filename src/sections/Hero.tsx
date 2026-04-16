import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useModal } from '@/lib/modal-context';

const HeroParticles = lazy(() => import('@/components/HeroParticles'));

/* ── Animation variants ─────────────────────────────────────────────── */
const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const heroItem = {
  hidden:   { opacity: 0, y: 22 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export default function Hero() {
  const { openContact } = useModal();

  return (
    <section className="relative overflow-hidden bg-black">

      {/* ── WebGL particle field ─────────────────────────────────────── */}
      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>

      {/* ── Breathing ambient orbs ──────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -left-48 -top-48 h-[700px] w-[700px] rounded-full animate-glow-breathe"
        style={{ background: 'radial-gradient(circle, rgba(0,230,153,0.10) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute right-[-15%] top-[15%] h-[550px] w-[550px] rounded-full animate-glow-breathe-slow"
        style={{
          background: 'radial-gradient(circle, rgba(0,230,153,0.05) 0%, transparent 70%)',
          animationDelay: '-3.5s',
        }}
      />

      {/* ── Dot grid ────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,230,153,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Bottom fade ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex min-h-[72vh] items-end pb-20 pt-36 sm:pb-24 sm:pt-44">
          <motion.div
            className="max-w-4xl"
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >

            {/* Eyebrow */}
            <motion.p
              variants={heroItem}
              className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: '#00E699' }}
            >
              Building for the AI economy
            </motion.p>

            {/* H1 */}
            <motion.h1
              variants={heroItem}
              className="text-6xl font-bold leading-[0.96] tracking-tight text-white sm:text-7xl lg:text-[5.6rem]"
              style={{ letterSpacing: '-0.03em' }}
            >
              We build the stack that<br />
              <span className="font-light italic" style={{ color: 'rgba(255,255,255,0.38)' }}>
                makes AI autonomous.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={heroItem}
              className="mt-7 max-w-xl text-base leading-7"
              style={{ color: 'rgba(255,255,255,0.52)' }}
            >
              The transition from AI-assisted to AI-autonomous is already underway.
              We build the tools that close that gap — agents that transact,
              systems that self-deploy, architecture that writes itself.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={heroItem}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03, boxShadow: '0 0 22px rgba(255,255,255,0.14)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black"
              >
                Explore our products
              </motion.a>
              <motion.button
                onClick={openContact}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="rounded-full border px-7 py-3 text-sm font-medium text-white"
                style={{ borderColor: 'rgba(255,255,255,0.18)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)')}
              >
                Start a conversation
              </motion.button>
            </motion.div>

          </motion.div>
        </div>

      </div>

      {/* ── Scroll hint ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 sm:flex"
      >
        <ArrowDown
          className="h-3.5 w-3.5 animate-bounce"
          style={{ color: 'rgba(255,255,255,0.18)' }}
        />
      </motion.div>
    </section>
  );
}
