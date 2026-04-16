import { motion } from 'framer-motion';
import { useModal } from '@/lib/modal-context';
import BranchDiagram from '@/components/BranchDiagram';

const principles = [
  {
    num: '01',
    tag: 'Four layers of the stack',
    title: 'Payment rails, deployment intelligence, architecture generation, data grounding.',
    body: 'We mapped the four hardest problems in AI deployment and built a product for each one — live today, not roadmapped.',
  },
  {
    num: '02',
    tag: 'Shipped, not promised',
    title: 'Live software you can use right now.',
    body: 'No waitlists. No private betas. MPP Studio, Shipd, B2DP, and Datafy are running in production — put them in front of your team today.',
  },
  {
    num: '03',
    tag: 'Founder delivery',
    title: 'We stay in until it works.',
    body: "One team, no handoff theater. We go from first principles to deployed product without disappearing after the wireframes.",
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
      className="bg-black py-20 lg:py-28"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
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
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: '#00E699' }}>
              Our operating thesis
            </p>
            <h2
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              Strong conviction.{' '}
              <span className="font-light" style={{ color: 'rgba(255,255,255,0.3)' }}>Zero compromise.</span>
            </h2>
          </div>
          <motion.button
            onClick={openContact}
            whileHover={{ scale: 1.04, opacity: 0.7 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="shrink-0 text-sm font-medium text-white lg:pb-1"
          >
            Work with us →
          </motion.button>
        </motion.div>

        {/* Bento grid — staggered */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-px lg:grid-cols-3"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          {/* Large identity card */}
          <motion.div
            variants={gridCard}
            className="col-span-1 p-8 text-white sm:p-10 lg:col-span-2 lg:row-span-2"
            style={{ background: '#080808' }}
          >
            {/* Animated mint accent bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 48, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
              className="mb-8 h-px"
              style={{ background: '#00E699' }}
            />

            {/* Branch diagram */}
            <div className="mb-8 h-40 w-full opacity-70">
              <BranchDiagram />
            </div>

            <p
              className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ letterSpacing: '-0.03em' }}
            >
              The AI economy rewards the early.{' '}
              <span style={{ color: 'rgba(255,255,255,0.22)', fontWeight: 300 }}>
                We build what's needed before it's needed.
              </span>
            </p>
            <p className="mt-6 max-w-md text-base leading-7" style={{ color: 'rgba(255,255,255,0.42)' }}>
              Every product in our stack is live proof of that conviction.
            </p>
            <motion.button
              onClick={openContact}
              whileHover={{ scale: 1.03, boxShadow: '0 0 22px rgba(255,255,255,0.14)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black"
            >
              Work with us
            </motion.button>
          </motion.div>

          {/* Principle cards */}
          {principles.map((p) => (
            <motion.div
              key={p.num}
              variants={gridCard}
              whileHover={{
                background: '#0d0d0d',
                transition: { duration: 0.2 },
              }}
              className="p-7 sm:p-8 cursor-default"
              style={{ background: '#000' }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4 block text-4xl font-bold tracking-tighter"
                style={{ color: 'rgba(0,230,153,0.10)' }}
              >
                {p.num}
              </motion.span>
              <span
                className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: '#00E699' }}
              >
                {p.tag}
              </span>
              <h3 className="text-base font-semibold leading-snug text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-6" style={{ color: 'rgba(255,255,255,0.42)' }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
