import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLiveProof } from '@/hooks/use-live-proof';
import SplitText from '@/components/SplitText';
import DrawnUnderline from '@/components/DrawnUnderline';
import LightningFlash from '@/components/LightningFlash';

/* Testimonials removed until we have named, verifiable social proof.
   The live metrics strip below provides real, checkable signals instead. */

function LivePill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-light uppercase tracking-wider text-white/60">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E898A8] opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E898A8]" />
      </span>
      Live
    </span>
  );
}

export default function SocialProof() {
  const { cards } = useLiveProof();

  return (
    <section
      id="social-proof"
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#000000' }}
    >
      <LightningFlash intensity={0.03} />
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: '#D4A5B0' }}>
            Live signals
          </p>
          <DrawnUnderline className="mb-3 mx-auto" width={40} delay={0.2} />
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl" style={{ letterSpacing: '-0.02em' }}>
            <SplitText stagger={0.03}>Check the proof, not the pitch.</SplitText>
          </h2>
        </motion.div>

        {/* Live metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <div className="mb-4 flex items-center gap-2">
            <LivePill />
            <span className="text-sm font-light uppercase tracking-wider text-white/40">Package & repository signals</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, idx) => (
              <a
                key={idx}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card relative rounded-2xl p-6 transition-colors"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FFFFFF]">{card.eyebrow}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-white/20 transition-colors group-hover:text-white/60" />
                </div>
                <p className="text-lg font-semibold tracking-tight text-white">{card.headline}</p>
                <p className="mt-2 text-sm leading-6 text-white/50">{card.detail}</p>
                <span className="mt-4 inline-block text-xs font-light text-white/30 transition-colors group-hover:text-white/70">
                  {card.cta} →
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
