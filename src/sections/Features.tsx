import { motion } from 'framer-motion';
import { useModal } from '@/lib/modal-context';

import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';
import DrawnUnderline from '@/components/DrawnUnderline';
import LightningFlash from '@/components/LightningFlash';

const principles = [
  {
    num: '01',
    tag: 'The core stack',
    title: 'Payment rails, deployment intelligence, architecture generation, data grounding.',
    body: 'We mapped the hardest problems in AI deployment and built a product for each one — running in production, not on a roadmap.',
  },
  {
    num: '02',
    tag: 'Shipped, not promised',
    title: 'Live software you can use right now.',
    body: 'MPP Studio, Shipd, B2DP, and Datafy MCP are running in production. Put them in front of your team today.',
  },
  {
    num: '03',
    tag: 'End-to-end delivery',
    title: 'From first principles to shipped product.',
    body: "One team, no handoffs. We move from brief to deployed product — and stay accountable for the outcome.",
  },
];

/* ── Stagger variants ──────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const gridContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const gridCard = {
  hidden:   { opacity: 0, y: 28 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function Features() {
  const { openContact } = useModal();

  return (
    <section
      id="features"
      className="py-20 lg:py-28"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#000000' }}
    >
      <LightningFlash intensity={0.035} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em]" style={{ color: '#D4A5B0' }}>
              How we build
            </p>
            <DrawnUnderline className="mb-3" width={40} delay={0.2} />
            <h2
              className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
              style={{ letterSpacing: '-0.03em' }}
            >
              <SplitText stagger={0.035}>
                Strong conviction. Zero compromise.
              </SplitText>
            </h2>
          </div>
          <MagneticButton
            onClick={openContact}
            className="shrink-0 text-sm font-light text-white lg:pb-1"
          >
            Work with us →
          </MagneticButton>
        </motion.div>

        {/* Bento grid — staggered */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-4 lg:grid-cols-3"
        >
          {/* Large identity card */}
          <motion.div
            variants={gridCard}
            className="glass-card col-span-1 rounded-2xl p-8 text-white sm:p-10 lg:col-span-2 lg:row-span-2"
          >
            <p
              className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ letterSpacing: '-0.03em' }}
            >
              <SplitText stagger={0.03} delay={0.2}>
                The AI economy rewards the early. We build what's needed before it's needed.
              </SplitText>
            </p>
            <p className="mt-6 max-w-md text-base leading-7" style={{ color: 'rgba(255,255,255,0.42)' }}>
              Every product in our stack is live proof of that conviction.
            </p>
            <MagneticButton
              onClick={openContact}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black"
            >
              Work with us
            </MagneticButton>
          </motion.div>

          {/* Principle cards */}
          {principles.map((p) => (
            <motion.div
              key={p.num}
              variants={gridCard}
              whileHover="hover"
              initial="rest"
              className="group relative cursor-default glass-card rounded-2xl p-7 sm:p-8"
            >
              {/* Hover border trace */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <motion.rect
                  x={0}
                  y={0}
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  variants={{
                    rest: { pathLength: 0, opacity: 0 },
                    hover: { pathLength: 1, opacity: 0.6 },
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>

              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4 block text-4xl font-semibold tracking-tighter"
                style={{ color: 'rgba(255,255,255,0.08)' }}
              >
                {p.num}
              </motion.span>
              <span
                className="mb-3 inline-block text-sm font-light uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {p.tag}
              </span>
              <h3 className="text-base font-light leading-snug text-white">
                {p.title}
              </h3>
              <p className="mt-3 text-base font-light leading-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
