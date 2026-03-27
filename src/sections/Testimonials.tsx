import { ArrowUpRight, Globe, PlayCircle, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const links = [
  {
    name: 'MPP Studio',
    eyebrow: 'Live app',
    headline: 'Open the current studio surface',
    detail:
      'This is the main live experience to share when someone wants to see the direction, interface, and product feel.',
    href: 'https://agent-exchange-web.vercel.app/',
    cta: 'Open app',
    icon: Globe,
  },
  {
    name: 'AI Build Tools',
    eyebrow: 'Workflow site',
    headline: 'Show the build workflow clearly',
    detail:
      'Use this when you want a cleaner explanation of the implementation workflow and what you are helping teams move through.',
    href: 'https://teckedd-code2save.github.io/ai-build-tools/',
    cta: 'Open site',
    icon: Wrench,
  },
  {
    name: 'Datafy demo',
    eyebrow: 'Demo video',
    headline: 'Let buyers watch the product in use',
    detail:
      'A walkthrough does more work than a vanity metric here. It helps people understand what Datafy actually does and how it fits.',
    href: 'https://www.youtube.com/watch?v=eUEZqX97i6I',
    cta: 'Watch video',
    icon: PlayCircle,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

export default function Testimonials() {
  return (
    <section id="proof" className="bg-white py-24 dark:bg-slate-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
            Useful links
          </span>
          <h2 className="mb-4 mt-5 text-4xl font-bold tracking-tight text-slate-950 dark:text-white lg:text-5xl">
            Show people the product, not vanity stats.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            These are better proof points for this stage: the live studio surface, the workflow site, and a real usage demo for Datafy.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {links.map((card) => {
            const Icon = card.icon;

            return (
              <motion.div key={card.name} variants={itemVariants}>
                <Card className="h-full border-slate-200 bg-white transition-shadow duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950">
                  <CardContent className="p-8">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                      <Icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                    </div>

                    <div className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      {card.eyebrow}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white">{card.headline}</h3>
                    <p className="mb-6 mt-4 leading-relaxed text-slate-700 dark:text-slate-300">{card.detail}</p>

                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-colors hover:text-slate-600 dark:text-white dark:hover:text-slate-300"
                    >
                      {card.cta}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
