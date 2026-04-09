import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { useModal } from '@/lib/modal-context';

const footerLinks = {
  products: [
    { label: 'MPP Studio', href: 'https://agent-exchange-web.vercel.app/' },
    { label: 'Shipd',      href: 'https://shipd-eight.vercel.app/' },
    { label: 'B2DP',       href: 'https://teckedd-code2save.github.io/ai-build-tools/' },
    { label: 'Datafy MCP', href: 'https://www.youtube.com/watch?v=eUEZqX97i6I' },
  ],
  company: [
    { label: 'How we work', href: '#features' },
    { label: 'LinkedIn',    href: 'https://www.linkedin.com/in/edward-twumasi/' },
    { label: 'Portfolio',   href: 'https://edward-entire.vercel.app/' },
  ],
};

const socials = [
  { icon: Github,   href: 'https://github.com/teckedd-code2save', label: 'GitHub' },
  { icon: Twitter,  href: 'https://twitter.com/EdwardsTwums',      label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/edward-twumasi/', label: 'LinkedIn' },
];

export default function Footer() {
  const { openContact, openPricing } = useModal();

  return (
    <footer className="border-t border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950">

      {/* Contact sales strip */}
      <div className="border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-lg font-semibold text-slate-950 dark:text-white">
              Let's figure out if we're the right fit.
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Open to new work, partnerships, and grant collaborations.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openContact}
            className="shrink-0 bg-slate-950 px-7 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-slate-950"
          >
            Contact sales
          </motion.button>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">

          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <a href="#" className="mb-4 flex items-center gap-2.5">
              <div className="h-5 w-5 bg-slate-950 dark:bg-white" />
              <span className="text-sm font-semibold tracking-tight text-slate-950 dark:text-white">
                Serendepify AI
              </span>
            </a>
            <p className="max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
              Autonomous AI, engineered. APIs that charge. Systems that deploy. Architecture that writes itself.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center border border-slate-200 text-slate-400 transition-colors hover:border-slate-400 hover:text-slate-950 dark:border-slate-800 dark:hover:border-slate-600 dark:hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950 dark:text-white">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950 dark:text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={openPricing}
                  className="text-sm text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                >
                  Pricing
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-2 border-t border-slate-100 pt-8 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">
            © 2026 Serendepify AI. Autonomous AI, engineered.
          </p>
          <div className="flex gap-5">
            <button
              onClick={openPricing}
              className="text-xs text-slate-400 transition-colors hover:text-slate-950 dark:hover:text-white"
            >
              Pricing
            </button>
            <button
              onClick={openContact}
              className="text-xs text-slate-400 transition-colors hover:text-slate-950 dark:hover:text-white"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
