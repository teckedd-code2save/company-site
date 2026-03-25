import { Activity, Database, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useLiveProof } from '@/hooks/use-live-proof';

const icons = [Database, Activity, Github];

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
  const { cards, status } = useLiveProof();

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
            Real proof layer
          </span>
          <h2 className="mb-4 mt-5 text-4xl font-bold tracking-tight text-slate-950 dark:text-white lg:text-5xl">
            Public signals buyers can verify.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            This section prefers live GitHub and NPM data. If those services are unavailable,
            the layout stays intact and falls back gracefully.
          </p>
        </motion.div>

        <div className="mb-8 flex justify-center">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
            {status === 'live' ? 'Live data loaded' : 'Fallback mode active'}
          </span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card, index) => {
            const Icon = icons[index] || Activity;

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
