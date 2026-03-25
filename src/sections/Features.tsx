import { motion } from 'framer-motion';
import { ArrowRight, Compass, Rocket, Wrench } from 'lucide-react';
import { resolveContactLink } from '@/lib/site-config';

const strengths = [
  {
    icon: Compass,
    title: 'Sharper product direction',
    description: 'We help narrow the use case, define the workflow, and focus the build on something customers will actually use.',
  },
  {
    icon: Wrench,
    title: 'Working systems, not slide decks',
    description: 'The goal is usable software, tested flows, and practical implementation decisions that move a team forward.',
  },
  {
    icon: Rocket,
    title: 'Support from first version to launch',
    description: 'We help teams get from early concept to rollout with less confusion and fewer wasted cycles.',
  },
];

const steps = [
  'Clarify the use case and the buyer problem.',
  'Design the right workflow and product scope.',
  'Build, test, and prepare the first usable release.',
  'Support rollout, demos, and the next iteration.',
];

export default function Features() {
  const demoLink = resolveContactLink();
  const isExternalDemo = demoLink !== '#contact';

  return (
    <section id="features" className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] py-20 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)] lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 sm:gap-12 lg:gap-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              Why teams choose Serendepify
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
              The right help from first idea to launch.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
              Serendepify works best when a team needs product thinking, technical delivery,
              and a faster path to something real in front of users.
            </p>

            <div className="mt-10 space-y-6">
              {strengths.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.75 }}
            className="grid gap-6"
          >
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950 lg:p-8">
              <div className="border-b border-slate-200 pb-5 dark:border-slate-800">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">What working together looks like</p>
                <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">A clear process that keeps the work moving.</p>
              </div>

              <div className="mt-6 grid gap-4">
                {steps.map((item, index) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white dark:bg-white dark:text-slate-950">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] dark:border-slate-800 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Need a walkthrough?</p>
              <p className="mt-4 text-2xl font-semibold leading-9">
                Request a demo to see which product or engagement fits your team.
              </p>
              <a
                href={demoLink}
                target={isExternalDemo ? '_blank' : undefined}
                rel={isExternalDemo ? 'noopener noreferrer' : undefined}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-white"
              >
                Request demo
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
