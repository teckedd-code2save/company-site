import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { resolveContactLink } from '@/lib/site-config';

export default function Hero() {
  const demoLink = resolveContactLink();
  const isExternalDemo = demoLink !== '#contact';

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fbfbf8_0%,#f3f1ec_44%,#ebe7df_100%)] pt-16 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.94),rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.18),rgba(15,23,42,0)_70%)]" />
        <div className="absolute left-[8%] top-24 h-64 w-64 rounded-full bg-white/95 blur-3xl dark:bg-slate-700/20" />
        <div className="absolute right-[10%] top-20 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl dark:bg-sky-400/10" />
        <div className="absolute left-1/2 top-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-white/75 blur-3xl dark:bg-slate-600/10" />
        <div className="absolute left-1/2 top-[16%] h-[30rem] w-[60rem] -translate-x-1/2 rounded-[3.5rem] border border-white/50 bg-white/30 shadow-[0_56px_200px_rgba(15,23,42,0.18)] backdrop-blur-3xl dark:border-slate-700/40 dark:bg-slate-900/18" />
        <div className="absolute left-1/2 top-[23%] h-[20rem] w-[44rem] -translate-x-1/2 rounded-[2.8rem] border border-white/45 bg-white/22 backdrop-blur-3xl dark:border-slate-700/30 dark:bg-slate-900/14" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center py-14 sm:py-16 lg:py-24">
          <div className="max-w-3xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05 }}
              className="mx-auto max-w-5xl text-4xl font-semibold leading-[1.02] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-7xl"
            >
              Applied AI for real customer workflows.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8"
            >
              Products for teams turning AI into something customers can actually use.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
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
          </div>
        </div>
      </div>
    </section>
  );
}
