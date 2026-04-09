import { motion } from 'framer-motion';
import { useModal } from '@/lib/modal-context';

const principles = [
  {
    num: '01',
    tag: 'Four capabilities',
    title: 'API monetization, deployment, architecture, grounding.',
    body: 'Each product targets a distinct layer of the AI build stack — live today, not roadmapped.',
  },
  {
    num: '02',
    tag: 'Live software',
    title: 'Open today. No demo call needed.',
    body: 'MPP Studio, Shipd, B2DP, and Datafy are live right now. Put them in front of your team, investors, or a real customer.',
  },
  {
    num: '03',
    tag: 'Full delivery',
    title: 'We stay until it ships.',
    body: 'One engagement, no handoff gaps. From architecture conversation to live product — we don\'t leave when the wireframes are done.',
  },
];

export default function Features() {
  const { openContact } = useModal();

  return (
    <section
      id="features"
      className="border-t border-slate-100 bg-white py-20 dark:border-slate-800/60 dark:bg-slate-950 lg:py-28"
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
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
              How we work
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Three principles.{' '}
              <span className="font-light text-slate-400 dark:text-slate-500">No exceptions.</span>
            </h2>
          </div>
          <button
            onClick={openContact}
            className="shrink-0 text-sm font-medium text-slate-500 underline underline-offset-4 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white lg:pb-1"
          >
            Work with us →
          </button>
        </motion.div>

        {/* Bento — gap-px creates the thin border lines */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="grid grid-cols-1 gap-px bg-slate-200/60 dark:bg-slate-800/60 lg:grid-cols-3"
        >
          {/* Large identity card — spans full row on mobile, 2 cols on lg */}
          <div className="col-span-1 bg-slate-950 p-8 text-white dark:bg-slate-900 sm:p-10 lg:col-span-2 lg:row-span-2">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Serendepify AI
            </p>
            <p className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              An applied AI practice.{' '}
              <span className="font-light text-slate-500">
                We build, we ship, we stay.
              </span>
            </p>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
              The products are live proof of that.
            </p>
            <button
              onClick={openContact}
              className="mt-8 inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-medium text-slate-950 transition-opacity hover:opacity-80"
            >
              Talk to us
            </button>
          </div>

          {/* Principle cards */}
          {principles.map((p, i) => (
            <div
              key={p.num}
              className={`bg-white p-7 dark:bg-slate-950 sm:p-8 ${i === 2 ? 'lg:col-span-1' : ''}`}
            >
              <span className="mb-4 block text-4xl font-bold tracking-tighter text-slate-100 dark:text-slate-800">
                {p.num}
              </span>
              <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                {p.tag}
              </span>
              <h3 className="text-base font-semibold leading-snug text-slate-950 dark:text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {p.body}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
