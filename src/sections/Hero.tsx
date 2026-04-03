import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { resolveContactLink } from '@/lib/site-config';

const proofPoints = [
  '4 product surfaces',
  'Live apps and demos',
  'Payments, delivery, and data workflows',
];

export default function Hero() {
  const demoLink = resolveContactLink();
  const isExternalDemo = demoLink !== '#contact';

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fbfbfc_0%,#f1f5f9_60%,#edf2f7_100%)] pt-16 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10rem] top-12 h-[24rem] w-[24rem] rounded-full bg-white/90 blur-3xl dark:bg-slate-800/30" />
        <div className="absolute right-[-9rem] top-20 h-[22rem] w-[22rem] rounded-full bg-slate-200/50 blur-3xl dark:bg-slate-700/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-4rem)] items-center gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:py-24">
          <div className="max-w-2xl text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-200">
                <span className="h-2 w-2 rounded-full bg-slate-900 dark:bg-slate-200" />
                Serendepify AI
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05 }}
              className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-7xl"
            >
              Applied AI for real customer workflows.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8 lg:mx-0 lg:text-xl"
            >
              Serendepify builds products that make AI easier to buy, deploy, and
              use, from paid service infrastructure to delivery workflows and
              real-data tooling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="group w-full rounded-full bg-slate-950 px-8 py-5 text-base font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 sm:w-auto sm:py-6"
              >
                <a href="#products">
                  View products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-full border-2 border-slate-300 bg-white px-8 py-5 text-base font-medium text-slate-900 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-transparent dark:text-white dark:hover:bg-slate-900 sm:w-auto sm:py-6"
              >
                <a href={demoLink} target={isExternalDemo ? '_blank' : undefined} rel={isExternalDemo ? 'noopener noreferrer' : undefined}>
                  Book intro
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mt-8 flex flex-wrap justify-center gap-3 text-left lg:justify-start"
            >
              {proofPoints.map((point) => (
                <div key={point} className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300">
                  {point}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="relative mx-auto w-full max-w-3xl lg:max-w-none"
          >
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_14rem]">
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_30px_90px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-950">
                <img
                  src="/images/products/mpp-studio-surface.png"
                  alt="MPP Studio interface"
                  className="aspect-[16/11] w-full rounded-[1.4rem] object-cover object-top"
                />
                <div className="px-2 pb-1 pt-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Featured product</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">MPP Studio</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Paid API infrastructure for agent-ready services.</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950">
                  <img
                    src="/images/products/shipd-surface.png"
                    alt="Shipd dashboard"
                    className="aspect-[4/5] w-full rounded-[1.1rem] object-cover object-top"
                  />
                </div>
                <div className="rounded-[1.6rem] border border-slate-200 bg-white px-5 py-4 shadow-[0_20px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Also shipping</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">Shipd</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Deployment planning before code or infra changes.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
