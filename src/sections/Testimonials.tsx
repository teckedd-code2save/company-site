import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Serendepify's MCP tools have completely transformed how we interact with our databases. The AI-powered query generation is incredibly accurate.",
    author: 'Morgan G.',
    role: 'Senior Engineer at TechCorp',
    avatar: 'MG',
  },
  {
    quote:
      'The b2dp CLI saved us weeks of setup time. What used to take days now happens in minutes. It is like having a senior backend engineer on demand.',
    author: 'Sarah K.',
    role: 'CTO at StartupXYZ',
    avatar: 'SK',
  },
  {
    quote:
      "REACHY AI's multi-lingual support is groundbreaking. Being able to process Twi and Hausa opens up entirely new markets for us.",
    author: 'David O.',
    role: 'AI Researcher',
    avatar: 'DO',
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
    <section className="py-24 lg:py-32 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4 dark:bg-purple-500/20 dark:text-purple-300">
            Loved by Developers
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight dark:text-white">
            What builders are saying
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-gray-200 dark:border-slate-700 dark:bg-slate-950">
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-6">
                    <Quote className="w-5 h-5 text-purple-600" />
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 leading-relaxed mb-6 dark:text-gray-300">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-black dark:text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
