import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { resolveContactLink } from '@/lib/site-config';

const momentumPoints = [
  'Products shaped around real workflows and real commercial use cases.',
  'From AI service infrastructure to business-to-backend delivery systems.',
  'Built to help customers move from curiosity to implementation.',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Hero() {
  const demoLink = resolveContactLink();
  const isExternalDemo = demoLink !== '#contact';

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fcfcfd_0%,#f2f5f8_58%,#eef2f5_100%)] pt-16 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-12rem] top-16 h-[28rem] w-[28rem] rounded-full bg-white/80 blur-3xl dark:bg-slate-800/20" />
        <div className="absolute right-[-8rem] top-20 h-[24rem] w-[24rem] rounded-full bg-slate-200/45 blur-3xl dark:bg-slate-700/20" />
        <div className="absolute inset-x-0 top-0 h-px bg-slate-200/70 dark:bg-slate-800/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid min-h-[calc(100vh-4rem)] items-center gap-10 py-12 sm:gap-12 sm:py-16 lg:gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.95fr)] lg:py-24"
        >
          <div className="max-w-2xl text-center lg:text-left">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-200">
                <span className="h-2 w-2 rounded-full bg-slate-900 dark:bg-slate-200" />
                Product studio for teams building practical AI systems
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-7xl"
            >
              Applied AI for real customer workflows.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8 lg:mx-0 lg:text-xl"
            >
              Serendepify AI builds and packages applied AI products across service
              infrastructure, backend delivery workflows, and real-data tools,
              so customers can see something concrete, not just hear a pitch.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="group w-full rounded-lg bg-slate-950 px-8 py-5 text-base font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 sm:w-auto sm:py-6"
              >
                <a href="#products">
                  See products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-lg border-2 border-slate-300 bg-white px-8 py-5 text-base font-medium text-slate-900 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-transparent dark:text-white dark:hover:bg-slate-900 sm:w-auto sm:py-6"
              >
                  <a href={demoLink} target={isExternalDemo ? '_blank' : undefined} rel={isExternalDemo ? 'noopener noreferrer' : undefined}>
                  Start a conversation
                </a>
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 grid gap-3 text-left sm:grid-cols-3"
            >
              {momentumPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-white/80 bg-white/80 px-4 py-4 text-sm leading-6 text-slate-600 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300"
                >
                  {point}
                </div>
              ))}
            </motion.div>

          </div>

          <motion.div variants={itemVariants} className="relative mx-auto mt-2 w-full max-w-[18rem] sm:max-w-[24rem] lg:mt-0 lg:max-w-none">
            <div className="relative mx-auto aspect-square w-full max-w-[18rem] sm:max-w-[24rem] lg:max-w-[34rem]">
              <div className="absolute inset-[9%] rounded-full border border-white/70 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.98),rgba(226,232,240,0.85)_45%,rgba(148,163,184,0.16)_100%)] shadow-[0_40px_120px_rgba(15,23,42,0.16)] dark:border-slate-700/60 dark:bg-[radial-gradient(circle_at_35%_30%,rgba(248,250,252,0.22),rgba(51,65,85,0.38)_45%,rgba(2,6,23,0.92)_100%)]" />
              <div className="absolute inset-[15%] rounded-full border border-slate-300/70 dark:border-slate-600/50" />
              <div className="absolute inset-[22%] rounded-full border border-slate-300/50 dark:border-slate-600/35" />
              <div className="absolute left-1/2 top-[12%] h-[76%] w-px -translate-x-1/2 bg-slate-300/80 dark:bg-slate-600/60" />
              <div className="absolute left-[20%] top-1/2 h-px w-[60%] -translate-y-1/2 bg-slate-300/80 dark:bg-slate-600/60" />
              <div className="absolute left-[24%] top-[30%] h-px w-[52%] rotate-[18deg] bg-slate-300/55 dark:bg-slate-600/40" />
              <div className="absolute left-[26%] top-[64%] h-px w-[48%] -rotate-[14deg] bg-slate-300/45 dark:bg-slate-600/35" />

              {[
                'Paid AI services',
                'Backend orchestration',
                'Real-data workflows',
              ].map((label, index) => (
                <motion.div
                  key={label}
                  animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
                  transition={{ duration: 6 + index, repeat: Infinity, ease: 'easeInOut' }}
                  className={[
                    'absolute left-[6%] top-[18%]',
                    'absolute right-[4%] top-[44%]',
                    'absolute left-[12%] bottom-[14%]',
                  ][index]}
                >
                  <div className="hidden rounded-2xl border border-white/80 bg-white/85 px-4 py-3 text-sm font-medium text-slate-700 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-200 sm:block">
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
