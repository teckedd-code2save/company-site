import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { resolveContactLink } from '@/lib/site-config';

const shippedWith = ['Payments', 'Data', 'Delivery systems'];

export default function Hero() {
  const demoLink = resolveContactLink();
  const isExternalDemo = demoLink !== '#contact';

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef3f8_48%,#e9eef5_100%)] pt-16 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.94),rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.18),rgba(15,23,42,0)_70%)]" />
        <div className="absolute left-[8%] top-24 h-64 w-64 rounded-full bg-white/95 blur-3xl dark:bg-slate-700/20" />
        <div className="absolute right-[10%] top-20 h-72 w-72 rounded-full bg-sky-100/80 blur-3xl dark:bg-sky-400/10" />
        <div className="absolute left-1/2 top-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-white/70 blur-3xl dark:bg-slate-600/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex min-h-[calc(100vh-4rem)] items-center py-14 sm:py-16 lg:py-24">
          <div className="max-w-xl text-center lg:text-left">
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
              className="mx-auto mt-5 max-w-lg text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8 lg:mx-0"
            >
              Products for teams turning AI into something customers can actually use.
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
              className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/80 bg-white/60 px-5 py-3 text-sm text-slate-600 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/35 dark:text-slate-300 lg:justify-start"
            >
              <span className="font-medium text-slate-900 dark:text-white">Shipping across</span>
              {shippedWith.map((item, index) => (
                <span key={item} className="inline-flex items-center gap-3">
                  {index > 0 ? <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500" /> : null}
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="pointer-events-none absolute inset-x-0 bottom-10 hidden px-4 lg:block"
        >
          <div className="mx-auto max-w-7xl">
            <div className="ml-auto h-40 max-w-3xl rounded-[2rem] border border-white/75 bg-white/30 shadow-[0_30px_120px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-slate-800/60 dark:bg-slate-950/18">
              <div className="grid h-full grid-cols-3 gap-4 p-6">
                <div className="rounded-[1.4rem] border border-white/70 bg-white/45 dark:border-slate-800/50 dark:bg-slate-900/30" />
                <div className="rounded-[1.4rem] border border-white/70 bg-white/35 dark:border-slate-800/50 dark:bg-slate-900/22" />
                <div className="rounded-[1.4rem] border border-white/70 bg-white/25 dark:border-slate-800/50 dark:bg-slate-900/15" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
