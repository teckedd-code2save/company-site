import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useModal } from '@/lib/modal-context';

/* ── Stagger variants ──────────────────────────────────────────────── */
const colVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as [number, number, number, number];

const colItem = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

export default function CTASection() {
  const { openContact } = useModal();

  return (
    <section
      className="relative overflow-hidden bg-black py-24 lg:py-36"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Animated ambient mint glow */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.22, 0.4, 0.22] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px]"
        style={{
          background: 'radial-gradient(circle, rgba(0,230,153,0.2) 0%, transparent 65%)',
        }}
      />
      {/* Secondary orb */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.22, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="pointer-events-none absolute -left-24 top-12 h-[380px] w-[380px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,230,153,0.1) 0%, transparent 70%)',
        }}
      />
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,230,153,1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">

          {/* Left — statement */}
          <motion.div
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={colItem} className="mb-4 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: '#00E699' }}>
              Open for work
            </motion.p>
            <motion.h2
              variants={colItem}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ letterSpacing: '-0.03em' }}
            >
              Tell us what you're building.{' '}
              <span className="font-light italic" style={{ color: 'rgba(255,255,255,0.3)' }}>
                We'll figure out the rest.
              </span>
            </motion.h2>
          </motion.div>

          {/* Right — actions */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="flex flex-col gap-3 lg:items-end"
          >
            <motion.a
              href="#products"
              whileHover={{ scale: 1.03, boxShadow: '0 0 22px rgba(255,255,255,0.14)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black"
            >
              See our products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.button
              onClick={openContact}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-medium text-white"
              style={{ borderColor: 'rgba(255,255,255,0.18)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)')}
            >
              Open a conversation
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
