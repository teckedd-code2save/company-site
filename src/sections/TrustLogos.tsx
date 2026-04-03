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
  hidden: { opacity: 0, y: 20 },
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
    <section className="border-b border-gray-100 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="rounded-[2rem] border border-white/80 bg-white/72 px-6 py-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/60"
        >
          <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-400">What we ship with</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {logos.map((logo) => (
              <motion.div
                key={logo.name}
                variants={itemVariants}
                className="group flex cursor-default items-center gap-2 text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <span className="text-2xl font-bold transition-transform group-hover:scale-110">
                  {logo.icon}
                </span>
                <span className="text-lg font-semibold">{logo.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
