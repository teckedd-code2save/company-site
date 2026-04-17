import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useModal } from '@/lib/modal-context';
import ScrambleText from '@/components/ScrambleText';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';
import HeroBlueprint from '@/components/HeroBlueprint';
import DrawnUnderline from '@/components/DrawnUnderline';
import LightningFlash from '@/components/LightningFlash';

const HeroParticles = lazy(() => import('@/components/HeroParticles'));

/* ── Animation variants ─────────────────────────────────────────────── */
const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
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
    <section className="relative overflow-hidden" style={{ backgroundColor: '#050505' }}>
      <LightningFlash intensity={0.03} />

      {/* ── Blueprint drawing layer ────────────────────────────────── */}
      <HeroBlueprint />

      {/* ── WebGL particle field ─────────────────────────────────────── */}
      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>

      {/* ── Bottom fade ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent" />

      {/* ── Left text-guard gradient ────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-black via-black/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex min-h-[72vh] items-end pb-24 pt-36 sm:pb-28 sm:pt-44">
          <motion.div
            className="max-w-4xl"
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >

            {/* Eyebrow */}
            <motion.div variants={heroItem} className="mb-6">
              <p
                className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: '#C084FC' }}
              >
                <ScrambleText delay={400} duration={900}>
                  Building for the AI economy
                </ScrambleText>
              </p>
              <DrawnUnderline width={32} delay={1.2} />
            </motion.div>

            {/* H1 */}
            <motion.div variants={heroItem} className="mb-2">
              <h1
                className="text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl sm:font-bold lg:text-[5.2rem] lg:leading-[0.98] drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
                style={{ letterSpacing: '-0.03em' }}
              >
                <SplitText trigger="animate" stagger={0.035} delay={0.6}>
                  We build the stack that makes AI autonomous.
                </SplitText>
              </h1>
            </motion.div>

            {/* Sub */}
            <motion.p
              variants={heroItem}
              className="mt-7 max-w-xl text-base leading-7 drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)]"
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
              <MagneticButton
                as="a"
                href="#products"
                className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black"
              >
                Explore our products
              </MagneticButton>

              <MagneticButton
                onClick={openContact}
                className="rounded-full border px-7 py-3 text-sm font-medium text-white transition-colors hover:border-white/45"
                style={{ borderColor: 'rgba(255,255,255,0.18)' }}
              >
                Start a conversation
              </MagneticButton>
            </motion.div>

          </motion.div>
        </div>

      </div>

      {/* ── Scroll hint ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
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
