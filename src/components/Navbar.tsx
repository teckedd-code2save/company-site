import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useModal } from '@/lib/modal-context';
import MagneticButton from '@/components/MagneticButton';

const navLinks = [
  { label: 'Stack', href: '#products' },
  { label: 'About',    href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openContact } = useModal();

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
          ? 'glass-strong border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
      style={{ backgroundColor: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="overflow-visible">
              <rect x="2" y="2" width="24" height="24" rx="5" stroke="white" strokeWidth="2"/>
              <path d="M18 10H12C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14H16C17.1 14 18 14.9 18 16C18 17.1 17.1 18 16 18H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-base font-semibold tracking-tight text-white">
              Serendepify
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            <motion.button
              onClick={openContact}
              whileHover={{ opacity: 1 }}
              className="px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              Contact
            </motion.button>
            <MagneticButton
              as="a"
              href="https://convoy-home.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black"
            >
              View Convoy
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button
            className="p-2 text-white/60 md:hidden"
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
            className="glass-strong border-t border-white/[0.06] pb-5 pt-3 md:hidden"
          >
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-3 text-sm text-white/70 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); openContact(); }}
                className="px-2 py-3 text-left text-sm text-white/70 hover:text-white"
              >
                Contact
              </button>
              <a
                href="https://convoy-home.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-3 rounded-full bg-white py-3 text-center text-sm font-medium text-black"
              >
                View Convoy
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
