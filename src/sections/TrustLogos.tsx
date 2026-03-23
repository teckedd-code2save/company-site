import { motion } from 'framer-motion';

const logos = [
  { name: 'Vercel', icon: '▲' },
  { name: 'GitHub', icon: '◉' },
  { name: 'Stripe', icon: 'S' },
  { name: 'Notion', icon: 'N' },
  { name: 'Linear', icon: 'L' },
  { name: 'Supabase', icon: '◐' },
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
    <section className="py-12 bg-white border-b border-gray-100 dark:bg-slate-950 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-gray-500 mb-8 dark:text-gray-400"
        >
          Trusted by developers at leading companies
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
        >
          {logos.map((logo) => (
            <motion.div
              key={logo.name}
              variants={itemVariants}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors cursor-default group dark:text-gray-500 dark:hover:text-gray-300"
            >
              <span className="text-2xl font-bold group-hover:scale-110 transition-transform">
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
