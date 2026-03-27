import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Globe, Award, Users, FlaskConical } from 'lucide-react';

const stats = [
  { icon: Users, value: 'Customer-led', label: 'Start with real user friction and operating bottlenecks' },
  { icon: Award, value: 'Delivery-minded', label: 'Tie every build to a usable release or commercial outcome' },
  { icon: FlaskConical, value: 'R&D-aware', label: 'Prototype quickly, but only ship what teams can adopt' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/teckedd-code2save', label: 'GitHub' },
  { icon: Globe, href: 'https://edward-entire.vercel.app/', label: 'Portfolio' },
  { icon: Twitter, href: 'https://twitter.com/EdwardsTwums', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/edward-twumasi/', label: 'LinkedIn' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Founder() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_60%,#f8fafc_100%)] py-24 lg:py-32 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-16 h-64 w-64 rounded-full bg-amber-100/70 blur-3xl dark:bg-slate-800/40" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-slate-100 blur-3xl dark:bg-slate-900/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(18rem,0.75fr)_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.65 }}
            className="mx-auto w-full max-w-md"
          >
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-950">
              <img
                src="/images/ceo-photo.jpg"
                alt="Serendepify founder portrait"
                className="h-[28rem] w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.span
              variants={itemVariants}
              className="inline-block rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            >
              Founder-led execution
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="mb-3 text-4xl font-bold tracking-tight text-slate-950 dark:text-white lg:text-5xl"
            >
              Build with someone who understands both the code and the commercial pressure.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mb-6 text-lg text-slate-600 dark:text-slate-300"
            >
              Product strategy · applied AI delivery · founder-style speed
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mb-8 leading-relaxed text-slate-600 dark:text-slate-300"
            >
              Serendepify is built around a simple belief: startups do not need
              more vague innovation language, they need sharper positioning,
              fast product decisions, and software they can put in front of
              prospects. That is the operating style behind the work here.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mb-8 grid gap-4 sm:grid-cols-3"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-[1.5rem] border border-slate-200 bg-white p-5 text-left shadow-sm dark:border-slate-800 dark:bg-slate-950"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900">
                      <Icon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                    </div>
                    <div className="text-lg font-bold text-slate-950 dark:text-white">{stat.value}</div>
                    <div className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-400 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-white"
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
