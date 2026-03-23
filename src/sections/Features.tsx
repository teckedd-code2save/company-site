import { motion } from 'framer-motion';
import { Check, Zap, Server, Shield } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Fastest MCP implementation',
    description: 'Up to 10x faster database queries via AI tools with optimized connection pooling.',
  },
  {
    icon: Server,
    title: 'Serverless deployments',
    description: 'Deploy with one click, scale from zero to thousands of requests instantly.',
  },
  {
    icon: Shield,
    title: 'Enterprise-ready',
    description: 'SOC 2 compliant with private endpoints and 99.99% uptime guarantee.',
  },
];

const codeString = `import { datafy } from "@teckedd-code2save/datafy";

const result = await datafy.query({
  connection: "postgresql://...",
  prompt: "Show me monthly revenue by product",
  options: {
    maxRows: 100,
    timeout: 30000
  }
});

console.log(result.data);`;

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6 as const,
    },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium mb-6"
            >
              Built for Developers
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight"
            >
              Why choose{' '}
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Serendepify
              </span>
              ?
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-lg mb-10"
            >
              Built by developers, for developers. Our unified API and SDKs let
              you integrate AI infrastructure in minutes, not months.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 flex gap-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Check className="w-4 h-4 text-green-400" />
                <span>Free tier available</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Check className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl" />
            <div className="relative bg-dark-surface rounded-xl border border-dark-border overflow-hidden">
              {/* Code header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-dark-border">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-xs text-gray-500">example.ts</span>
              </div>

              {/* Code content */}
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
                  <code>
                    {codeString.split('\n').map((line, i) => (
                      <div key={i} className="flex">
                        <span className="text-gray-600 w-8 flex-shrink-0 select-none">
                          {i + 1}
                        </span>
                        <span>
                          {line.split(/(\s+)/).map((part, j) => {
                            if (
                              part.match(
                                /^(import|from|const|await|console)$/
                              )
                            ) {
                              return (
                                <span key={j} className="text-purple-400">
                                  {part}
                                </span>
                              );
                            }
                            if (part.match(/^["'].*["']$/)) {
                              return (
                                <span key={j} className="text-green-400">
                                  {part}
                                </span>
                              );
                            }
                            if (part.match(/^[0-9]+$/)) {
                              return (
                                <span key={j} className="text-orange-400">
                                  {part}
                                </span>
                              );
                            }
                            if (part.match(/^[{}()[\]:,.]$/)) {
                              return (
                                <span key={j} className="text-gray-400">
                                  {part}
                                </span>
                              );
                            }
                            return <span key={j}>{part}</span>;
                          })}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>

              {/* Copy button */}
              <div className="absolute top-4 right-4">
                <button className="px-3 py-1.5 bg-dark-border hover:bg-gray-700 text-gray-400 hover:text-white text-xs rounded-md transition-colors">
                  Copy
                </button>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                10x faster queries
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
