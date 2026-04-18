import { motion } from 'framer-motion';
import LightningFlash from '@/components/LightningFlash';

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#000000' }}
    >
      <LightningFlash intensity={0.03} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: '#D4A5B0' }}>
            Mission
          </p>
          <blockquote
            className="text-3xl font-light leading-snug tracking-tight text-white sm:text-4xl lg:text-5xl"
            style={{ letterSpacing: '-0.02em' }}
          >
            &ldquo;We build AI infrastructure that actually works &mdash; payment layers,
            deployment intelligence, data architecture, and agent grounding. Each tool
            is built because we needed it first, then refined for teams like yours.&rdquo;
          </blockquote>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: '#D4A5B0' }}>
            Vision
          </p>
          <blockquote
            className="text-3xl font-light leading-snug tracking-tight text-white sm:text-4xl lg:text-5xl"
            style={{ letterSpacing: '-0.02em' }}
          >
            &ldquo;AI tools should be judged by what they ship, not what they promise.
            We are building toward a stack where every piece earns its place through
            real usage.&rdquo;
          </blockquote>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Early-stage, founder-led, and shipping in public.{' '}
            <a
              href="#contact"
              className="underline underline-offset-2 transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              Get in touch
            </a>{' '}
            if you are looking for a builder who ships.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
