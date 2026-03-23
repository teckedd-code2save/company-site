import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="py-20 bg-cyan-200 relative overflow-hidden dark:bg-slate-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-lg opacity-60"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-10 right-10 w-16 h-16 bg-purple-400 rounded-full opacity-50"
        />
        <motion.div
          animate={{
            y: [0, -8, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 right-1/4 w-8 h-8 bg-cyan-400 rounded-sm opacity-70"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight dark:text-white">
            Ready to ship faster?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto dark:text-gray-300">
            Join 50,000+ developers building with Serendepify AI. Start free,
            scale as you grow.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="rounded-lg bg-black hover:bg-gray-800 text-white px-8 py-6 text-base font-medium group dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-lg border-2 border-black hover:bg-black hover:text-white px-8 py-6 text-base font-medium transition-colors dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
              asChild
            >
              <a href="#contact">Contact Sales</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
