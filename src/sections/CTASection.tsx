import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useModal } from '@/lib/modal-context';

export default function CTASection() {
  const { openContact } = useModal();

  return (
    <section className="border-t border-slate-100 bg-slate-950 py-24 dark:border-slate-800 lg:py-32">
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">

          {/* Left — statement */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Ready to ship
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              We are alert,{' '}
              <span className="font-light italic text-slate-500">make the call and update.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
              Live tools to spot the signal, make the call, and update fast.
            </p>
          </motion.div>

          {/* Right — actions */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="flex flex-col gap-3 lg:items-end"
          >
            <a
              href="#products"
              className="group inline-flex items-center gap-2 bg-white px-7 py-3.5 text-sm font-medium text-slate-950 transition-opacity hover:opacity-80"
            >
              See what we build
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={openContact}
              className="inline-flex items-center gap-2 border border-slate-700 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-slate-500"
            >
              Contact sales
            </button>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
