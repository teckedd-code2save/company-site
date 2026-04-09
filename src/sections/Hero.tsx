import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useModal } from '@/lib/modal-context';

export default function Hero() {
  const { openContact } = useModal();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0f172a 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Fade at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-slate-950" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Text block ── */}
        <div className="flex min-h-[65vh] items-end pb-16 pt-32 sm:pb-20 sm:pt-36">
          <div className="max-w-4xl">

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl font-medium leading-[0.98] tracking-tight text-slate-950 dark:text-white sm:text-7xl lg:text-[5.6rem]"
            >
              Engineering applied AI
              <br />
              <span className="font-light italic text-4xl text-slate-400 dark:text-slate-500 sm:text-5xl lg:text-[3.65rem]">
                for productivity and autonomy.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.14 }}
              className="mt-6 max-w-lg text-base leading-7 text-slate-500 dark:text-slate-400"
            >
              Agents that handle payments. AI grounded in your own data.
              Deployment decisions made without guesswork. We're building towards that future — right now.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#products"
                className="bg-slate-950 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-slate-950"
              >
                See what we build
              </a>
              <button
                onClick={openContact}
                className="text-sm font-medium text-slate-500 underline underline-offset-4 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
              >
                Book intro
              </button>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 sm:flex"
      >
        <ArrowDown className="h-3.5 w-3.5 animate-bounce text-slate-300 dark:text-slate-600" />
      </motion.div>
    </section>
  );
}
