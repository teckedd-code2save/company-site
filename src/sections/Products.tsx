import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Terminal,
  Database,
  Mic,
  Building2,
  Bot,
} from 'lucide-react';

const products = [
  {
    id: 'datafy',
    tag: 'NPM Package',
    name: '@teckedd-code2save/datafy',
    description:
      'Zero-dependency, token-efficient Database MCP gateway connecting AI clients to PostgreSQL, MySQL, SQL Server, SQLite, MariaDB, Redis, and Elasticsearch.',
    tech: ['MCP', 'Node.js', 'Multi-Database'],
    icon: Database,
    color: 'from-blue-500 to-cyan-500',
    visualBg: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    image: '/images/products/datafy.svg',
    href: 'https://www.npmjs.com/package/@teckedd-code2save/datafy',
    ctaLabel: 'View on NPM',
  },
  {
    id: 'b2dp',
    tag: 'NPM Package',
    name: '@teckedd-code2save/b2dp',
    description:
      'Business-to-Data-Platform CLI that sets up the b2dp skill ecosystem across AI coding agents, including MCP server configuration and health checks.',
    tech: ['CLI', 'AI Workflow', 'Orchestration'],
    icon: Terminal,
    color: 'from-purple-500 to-violet-500',
    visualBg: 'from-purple-500/20 via-violet-500/10 to-transparent',
    image: '/images/products/b2dp.svg',
    href: 'https://www.npmjs.com/package/@teckedd-code2save/b2dp',
    ctaLabel: 'View on NPM',
  },
  {
    id: 'reachy',
    tag: 'Platform',
    name: 'REACHY AI',
    description:
      'Multi-lingual speech platform supporting English, French, Twi, and Hausa. Fine-tuned Whisper models for low-resource settings in healthcare and beyond.',
    tech: ['Python', 'FastAPI', 'Whisper'],
    icon: Mic,
    color: 'from-green-500 to-emerald-500',
    visualBg: 'from-green-500/20 via-emerald-500/10 to-transparent',
    image: '/images/products/reachy.svg',
    href: '#',
    ctaLabel: 'Explore Project',
  },
  {
    id: 'agent-exchange',
    tag: 'GitHub Project',
    name: 'Agent Exchange',
    description:
      'Marketplace and collaboration platform for autonomous agents, with reusable workflows and shared integrations for faster product delivery.',
    tech: ['TypeScript', 'Automation', 'Marketplace'],
    icon: Bot,
    color: 'from-fuchsia-500 to-purple-600',
    visualBg: 'from-fuchsia-500/20 via-purple-500/10 to-transparent',
    image: '/images/products/agent-exchange.svg',
    href: 'https://github.com/teckedd-code2save/agent-exchange',
    ctaLabel: 'View on GitHub',
  },
  {
    id: 'urbanize',
    tag: 'GitHub Project',
    name: 'Urbanize',
    description:
      'A customer-facing urban workflow product that helps teams manage planning, requests, and real-time engagement across city operations.',
    tech: ['Web App', 'Operations', 'Civic Tech'],
    icon: Building2,
    color: 'from-cyan-500 to-blue-600',
    visualBg: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    image: '/images/products/urbanize.svg',
    href: 'https://github.com/teckedd-code2save/urbanize',
    ctaLabel: 'View on GitHub',
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

export default function Products() {
  return (
    <section id="products" className="py-24 lg:py-32 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gray-300/30 blur-3xl dark:bg-slate-700/30" />
        <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-gray-200/30 blur-3xl dark:bg-slate-800/30" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-4 dark:bg-slate-800 dark:text-gray-200">
            Impact & Contributions
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight dark:text-white">
            Projects, tools, and packages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
            A focused set of production projects and open packages built around
            developer workflows and customer outcomes.
          </p>
        </motion.div>

        {/* Project Story Blocks */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-10 lg:space-y-12 max-w-5xl mx-auto"
        >
          {products.map((product, index) => {
            const Icon = product.icon;
            const textOnRight = Math.floor(index / 2) % 2 === 0;
            const visualOnLeft = textOnRight;
            const imageInitial =
              index % 3 === 0
                ? { opacity: 0, x: 40, y: 40 }
                : index % 3 === 1
                ? { opacity: 0, x: -30, y: 30 }
                : { opacity: 0, x: 30, y: -20 };
            const textInitial =
              index % 3 === 0
                ? { opacity: 0, x: -40, y: -30 }
                : index % 3 === 1
                ? { opacity: 0, x: 30, y: -25 }
                : { opacity: 0, x: -30, y: 20 };
            return (
              <motion.div key={product.id} variants={itemVariants}>
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-8 lg:py-10">
                  <motion.div
                    initial={imageInitial}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, delay: 0.05 }}
                    className={visualOnLeft ? 'order-1' : 'order-2 lg:order-1'}
                  >
                    <div className="relative">
                      <div className={`absolute -inset-4 bg-gradient-to-r ${product.visualBg} rounded-2xl blur-xl`} />
                      <div className="relative bg-dark-surface rounded-xl overflow-hidden h-[240px] sm:h-[280px] lg:h-[320px] shadow-[0_20px_52px_rgba(0,0,0,0.28)] dark:shadow-[0_24px_66px_rgba(0,0,0,0.52)]">
                        <img
                          src={product.image}
                          alt={`${product.name} preview`}
                          className="absolute inset-0 w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="relative h-full flex items-center justify-center z-10">
                          <div
                            className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${product.color} flex items-center justify-center shadow-[0_20px_45px_rgba(0,0,0,0.35)]`}
                          >
                            <Icon className="w-12 h-12 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={textInitial}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.75, delay: 0.1 }}
                    className={visualOnLeft ? 'order-2' : 'order-1 lg:order-2'}
                  >
                    <Badge
                      variant="secondary"
                      className="mb-4 bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-800"
                    >
                      {product.tag} · {String(index + 1).padStart(2, '0')}
                    </Badge>

                    <h3 className="text-3xl lg:text-4xl font-extrabold text-black mb-5 dark:text-white tracking-tight">
                      {product.name}
                    </h3>

                    <p className="text-gray-700 mb-8 leading-relaxed dark:text-gray-300 text-lg font-medium">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-2.5 mb-8">
                      {product.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1.5 bg-gray-50 text-gray-600 text-sm rounded-full dark:bg-slate-800 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={product.href}
                      target={product.href.startsWith('http') ? '_blank' : undefined}
                      rel={product.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center text-sm font-semibold text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                    >
                      {product.ctaLabel}
                      <ArrowRight className="ml-1.5 w-4 h-4" />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/teckedd-code2save"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-black hover:text-gray-700 font-medium dark:text-white dark:hover:text-gray-300"
          >
            See all projects on GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
