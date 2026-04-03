import { motion } from 'framer-motion';

const logos = [
  { name: 'Stripe', icon: 'S' },
  { name: 'Vercel', icon: '▲' },
  { name: 'Supabase', icon: '◐' },
  { name: 'GitHub', icon: '◌' },
  { name: 'OpenAI', icon: '◎' },
  { name: 'Anthropic', icon: 'A' },
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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function TrustLogos() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ebe7df_0%,#f5f1e9_58%,#f7f3ec_100%)] py-12 dark:bg-[linear-gradient(180deg,#0f172a_0%,#0b1220_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[12%] top-0 h-44 w-44 rounded-full bg-white/60 blur-3xl dark:bg-slate-500/10" />
        <div className="absolute right-[10%] bottom-0 h-40 w-40 rounded-full bg-amber-100/55 blur-3xl dark:bg-sky-500/10" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-base font-semibold tracking-tight text-slate-700 dark:text-slate-200"
        >
          Building with
        </motion.h3>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative flex flex-wrap items-center justify-center gap-x-8 gap-y-5 px-2 py-2 md:gap-x-12"
        >
          {logos.map((logo) => (
            <motion.div
              key={logo.name}
              variants={itemVariants}
              className="flex cursor-default items-center gap-2.5 text-slate-600 dark:text-slate-300"
            >
              <span className="text-xl font-bold text-slate-700 dark:text-slate-200">
                {logo.icon}
              </span>
              <span className="text-base font-semibold">{logo.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
