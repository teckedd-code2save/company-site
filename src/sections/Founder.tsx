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
      id="rd-focus"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #1a1a2e 100%)',
      }}
    >
      {/* Background particle effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${20 + i * 15}%`}
              y1="20%"
              x2={`${40 + i * 10}%`}
              y2="80%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
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
              How We Build
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight"
            >
              Customer insight{' '}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                meets R&D velocity
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-purple-300 text-lg mb-6"
            >
              Product Discovery · Applied AI Research · Platform Engineering
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 leading-relaxed mb-8"
            >
              Every release starts with direct user pain points and ends with
              measurable outcomes. We run focused R&D cycles, validate quickly
              with customers, and ship practical AI tooling that teams can adopt
              in days.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 mb-8"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-lg font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-xs leading-5 text-gray-500">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-dark-surface border border-dark-border flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-colors"
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
