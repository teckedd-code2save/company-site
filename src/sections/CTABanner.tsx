import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { resolveContactLink } from '@/lib/site-config';

export default function CTABanner() {
  const demoLink = resolveContactLink();
  const isExternalDemo = demoLink !== '#contact';

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] py-20 dark:bg-slate-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-10 top-10 h-20 w-20 rounded-lg bg-slate-300 opacity-35"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 right-10 h-16 w-16 rounded-full bg-slate-400 opacity-30"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-950 dark:text-white lg:text-5xl">
            Want to see which product fits your team?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-slate-600 dark:text-gray-300">
            Request a demo to walk through the products, ask questions, and decide where to start.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group rounded-lg bg-slate-950 px-8 py-6 text-base font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              <a href={demoLink} target={isExternalDemo ? '_blank' : undefined} rel={isExternalDemo ? 'noopener noreferrer' : undefined}>
                Request demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-lg border-2 border-slate-900 px-8 py-6 text-base font-medium text-slate-900 transition-colors hover:bg-slate-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
              asChild
            >
              <a href="#contact">Contact sales</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
