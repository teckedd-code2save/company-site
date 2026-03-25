import { motion } from 'framer-motion';
import { Sparkles, Github, Twitter, Linkedin, MessageCircle } from 'lucide-react';

const footerLinks = {
  products: [
    { label: 'Datafy MCP', href: '#products' },
    { label: 'B2DP', href: '#products' },
    { label: 'REACHY AI', href: '#products' },
    { label: 'Urbanize', href: '#products' },
  ],
  resources: [
    { label: 'Company GitHub', href: 'https://github.com/teckedd-code2save' },
    { label: 'Request Demo', href: '#contact' },
    { label: 'Project Request', href: '#contact' },
  ],
  company: [
    { label: 'Why Us', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/edward-twumasi/' },
    { label: 'Portfolio', href: 'https://edward-entire.vercel.app/' },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/teckedd-code2save', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/EdwardsTwums', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/edward-twumasi/', label: 'LinkedIn' },
  { icon: MessageCircle, href: '#contact', label: 'Contact' },
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
      duration: 0.5 as const,
    },
  },
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-12"
        >
          <motion.div variants={itemVariants} className="col-span-2 lg:col-span-2">
            <a href="#" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <Sparkles className="h-5 w-5 text-slate-950" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">Serendepify</span>
            </a>
            <p className="mb-6 max-w-xs text-sm text-slate-400">
              Build practical AI systems, launch usable products, and move from idea to delivery with less friction.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:border-slate-600 hover:text-white"
                    aria-label={link.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="mb-4 font-semibold text-white">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="mb-4 font-semibold text-white">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="mb-4 font-semibold text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row"
        >
          <p className="text-sm text-slate-500">
            © 2025 Serendepify AI. Built for teams turning ideas into usable products.
          </p>
          <div className="flex gap-6">
            <a href="#pricing" className="text-sm text-slate-500 transition-colors hover:text-white">
              Pricing
            </a>
            <a href="#contact" className="text-sm text-slate-500 transition-colors hover:text-white">
              Contact
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
