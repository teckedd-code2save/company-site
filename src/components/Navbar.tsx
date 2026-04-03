import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resolveContactLink } from '@/lib/site-config';

const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Capabilities', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const demoLink = resolveContactLink();
  const isExternalDemo = demoLink !== '#contact';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200 bg-white/92 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/88 dark:shadow-none'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="group flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 transition-transform group-hover:scale-105 dark:bg-white">
              <Sparkles className="h-4 w-4 text-white dark:text-black" />
            </div>
            <div>
              <span className="block text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Serendepify AI</span>
              <span className="hidden text-[10px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 sm:block">
                Applied AI products
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative text-sm font-medium text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-slate-900 transition-all group-hover:w-full dark:bg-white" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button className="rounded-full bg-slate-950 px-5 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200" asChild>
              <a href={demoLink} target={isExternalDemo ? '_blank' : undefined} rel={isExternalDemo ? 'noopener noreferrer' : undefined}>
                Book intro
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <button
            className="rounded-lg p-2 text-slate-700 dark:text-slate-200 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-t border-slate-200 bg-white py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-2 py-2 text-sm font-medium text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
                <Button className="w-full rounded-full bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-black" asChild>
                  <a href={demoLink} target={isExternalDemo ? '_blank' : undefined} rel={isExternalDemo ? 'noopener noreferrer' : undefined}>
                    Book intro
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
