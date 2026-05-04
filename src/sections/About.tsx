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
          <blockquote
            className="text-3xl font-light leading-snug tracking-tight text-white sm:text-4xl lg:text-5xl"
            style={{ letterSpacing: '-0.02em' }}
          >
            &ldquo;We build agent systems that turn ideas into deployed products. No handoffs. No drift. Just autonomy that ships.&rdquo;
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
          <blockquote
            className="text-3xl font-light leading-snug tracking-tight text-white sm:text-4xl lg:text-5xl"
            style={{ letterSpacing: '-0.02em' }}
          >
            &ldquo;The future of software isn't more tools — it's fewer handoffs. We're building the stack where description becomes deployment.&rdquo;
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
