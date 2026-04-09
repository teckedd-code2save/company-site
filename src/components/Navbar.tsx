import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useModal } from '@/lib/modal-context';

const navLinks = [
  { label: 'Products',     href: '#products' },
  { label: 'How we work',  href: '#features' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openPricing, openContact } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-100 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="h-5 w-5 rounded-sm bg-slate-950 dark:bg-white" />
            <span className="text-sm font-semibold tracking-tight text-slate-950 dark:text-white">
              Serendepify AI
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={openPricing}
              className="px-4 py-2 text-sm text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
            >
              Pricing
            </button>
            <button
              onClick={openContact}
              className="bg-slate-950 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-slate-950"
            >
              Contact sales
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="p-2 text-slate-600 dark:text-slate-300 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-slate-100 bg-white pb-4 pt-2 dark:border-slate-800 dark:bg-slate-950 md:hidden"
          >
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-3 text-sm text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); openPricing(); }}
                className="px-2 py-3 text-left text-sm text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
              >
                Pricing
              </button>
              <button
                onClick={() => { setMobileOpen(false); openContact(); }}
                className="mt-2 bg-slate-950 py-3 text-center text-sm font-medium text-white dark:bg-white dark:text-slate-950"
              >
                Contact sales
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
