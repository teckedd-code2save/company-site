import { motion } from 'framer-motion';
import { ArrowRight, Compass, Rocket, Wrench } from 'lucide-react';
import { resolveContactLink } from '@/lib/site-config';

const strengths = [
  {
    icon: Compass,
    title: 'Starts from what you have',
    description: 'Shipd reads your repo. Datafy reads your operational data. The tools work with real systems from the start — not idealised inputs or blank-slate assumptions.',
  },
  {
    icon: Wrench,
    title: 'Clear scope, clear output',
    description: 'Each product has a defined input and a defined output. You know what you are getting before you start — no open-ended loops or vague deliverables.',
  },
  {
    icon: Rocket,
    title: 'From prototype to production',
    description: 'Serendepify moves from concept through build to launch support under one engagement, without handoff gaps or scope that evaporates after the first call.',
  },
];

export default function Features() {
  const demoLink = resolveContactLink();
  const isExternalDemo = demoLink !== '#contact';

  return (
    <section id="features" className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f8fa_0%,#eef1f4_48%,#e7ebf0_100%)] py-24 dark:bg-[linear-gradient(180deg,#0a1628_0%,#0f172a_100%)] lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[4%] top-16 h-[26rem] w-[26rem] rounded-full bg-slate-200/45 blur-[100px] dark:bg-violet-900/15" />
        <div className="absolute left-[6%] top-1/2 h-[22rem] w-[22rem] -translate-y-1/2 rounded-full bg-zinc-200/40 blur-[90px] dark:bg-indigo-900/15" />
        <div className="absolute left-1/2 bottom-0 h-[18rem] w-[40rem] -translate-x-1/2 rounded-full bg-white/70 blur-[100px] dark:bg-sky-900/10" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.65 }}
          >
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
              How we work
            </h2>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.75 }}
          className="mt-14 grid gap-6 lg:grid-cols-[repeat(3,minmax(0,1fr))]"
        >
          {strengths.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[1.8rem] border border-white/55 bg-white/90 p-7 shadow-[0_28px_80px_rgba(15,23,42,0.13)] backdrop-blur-3xl dark:border-slate-700/50 dark:bg-slate-900/78"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100/80 text-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-8 flex justify-center"
        >
          <a
            href={demoLink}
            target={isExternalDemo ? '_blank' : undefined}
            rel={isExternalDemo ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-colors hover:text-slate-600 dark:text-white dark:hover:text-slate-300"
          >
            Book a walkthrough
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
