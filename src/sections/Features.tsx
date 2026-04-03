import { motion } from 'framer-motion';
import { ArrowRight, Compass, Rocket, Wrench } from 'lucide-react';
import { resolveContactLink } from '@/lib/site-config';

const strengths = [
  {
    icon: Compass,
    title: 'Clear commercial shape',
    description: 'Products are framed around workflows customers can understand, evaluate, and pay for.',
  },
  {
    icon: Wrench,
    title: 'Working surfaces',
    description: 'Live apps, demos, and repo-aware tools make the work easier to inspect than a pitch deck ever could.',
  },
  {
    icon: Rocket,
    title: 'From concept to rollout',
    description: 'Serendepify can move from idea shaping into implementation, launch support, and product hardening.',
  },
];

export default function Features() {
  const demoLink = resolveContactLink();
  const isExternalDemo = demoLink !== '#contact';

  return (
    <section id="features" className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] py-20 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)] lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              Capabilities
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
              What Serendepify brings to a product conversation.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
              The work is strongest when it connects a clear customer problem,
              a usable product surface, and a delivery path your team can act on.
            </p>
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
                className="rounded-[1.8rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
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
