import { motion } from 'framer-motion';

const logos = [
  { name: 'OpenAI', icon: '◎' },
  { name: 'Anthropic', icon: 'A' },
  { name: 'Vercel', icon: '▲' },
  { name: 'Stripe', icon: 'S' },
  { name: 'Supabase', icon: '◐' },
  { name: 'Linear', icon: 'L' },
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
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          Built with the modern tools teams already trust for AI, infrastructure, and payments
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
