import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-cyan-200 overflow-hidden pt-16 dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating pixel blocks - top right */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 right-10 w-32 h-32 opacity-80"
        >
          <img
            src="/images/pixel-blocks.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Main pixel art - left side */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-0 w-64 h-64 lg:w-96 lg:h-96 opacity-90"
        >
          <img
            src="/images/hero-shapes.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Scattered pixels - bottom right */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-32 right-20 w-24 h-24"
        >
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-sm ${
                  i % 3 === 0
                    ? 'bg-purple-500'
                    : i % 2 === 0
                    ? 'bg-yellow-400'
                    : 'bg-cyan-400'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Additional floating elements */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-yellow-300 rounded-lg opacity-60 rotate-12"
        />

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-purple-400 rounded-full opacity-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-800 dark:bg-slate-900/80 dark:text-gray-200">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              AI Infrastructure for Developers
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-black leading-[1.1] mb-6 dark:text-white"
          >
            Autonomous AI
            <br />
            platform for{' '}
            <span className="relative">
              builders
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 10C50 2 150 2 198 10"
                  stroke="#A855F7"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8 max-w-xl dark:text-gray-300"
          >
            Customer-first AI tooling infrastructure, from database MCP servers
            to autonomous agent platforms. Build, validate, and scale faster with
            practical systems teams can adopt immediately.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="rounded-lg bg-black hover:bg-gray-800 text-white px-8 py-6 text-base font-medium group dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Get started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-lg border-2 border-black hover:bg-black hover:text-white px-8 py-6 text-base font-medium transition-colors dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              Contact Sales
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-cyan-200 dark:border-slate-900"
                />
              ))}
            </div>
            <span>
              Trusted by <strong className="text-black dark:text-white">50,000+</strong>{' '}
              developers
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-slate-900" />
    </section>
  );
}
