import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useModal } from '@/lib/modal-context';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';
import DrawnUnderline from '@/components/DrawnUnderline';
import LightningFlash from '@/components/LightningFlash';

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
      className="relative overflow-hidden py-24 lg:py-36"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#050505' }}
    >
      <LightningFlash intensity={0.04} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">

          {/* Left — statement */}
          <motion.div
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={colItem} className="mb-2 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: '#C084FC' }}>
              Open for work
            </motion.p>
            <DrawnUnderline className="mb-4" width={36} delay={0.3} />
            <motion.div variants={colItem}>
              <h2
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
                style={{ letterSpacing: '-0.03em' }}
              >
                <SplitText stagger={0.03}>
                  Tell us what you're building. We'll figure out the rest.
                </SplitText>
              </h2>
            </motion.div>
          </motion.div>

          {/* Right — actions */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="flex flex-col gap-3 lg:items-end"
          >
            <MagneticButton
              as="a"
              href="#products"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black"
            >
              See our products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              onClick={openContact}
              className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/45"
              style={{ borderColor: 'rgba(255,255,255,0.18)' }}
            >
              Open a conversation
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
