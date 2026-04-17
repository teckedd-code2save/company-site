import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { useModal } from '@/lib/modal-context';
import MagneticButton from '@/components/MagneticButton';
import DrawnUnderline from '@/components/DrawnUnderline';

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
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#050505' }}>

      {/* Contact sales strip */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-lg font-semibold text-white">
              Building for the AI economy? Let's talk.
            </p>
            <DrawnUnderline className="my-2" width={40} delay={0.1} />
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Open to product collaborations, AI deployments, and founding-stage partnerships.
            </p>
          </div>
          <MagneticButton
            onClick={openContact}
            className="shrink-0 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-opacity hover:opacity-85"
          >
            Contact sales
          </MagneticButton>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Connection line — draws upward from bottom-left */}
        <motion.div
          className="pointer-events-none absolute -top-24 left-0 w-px origin-bottom bg-[#C084FC]/30"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: 96 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >

          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <a href="#" className="mb-4 flex items-center gap-2.5">
              <div className="h-5 w-5 rounded-sm" style={{ backgroundColor: '#C084FC' }} />
              <span className="text-sm font-semibold tracking-tight text-white">
                Serendepify AI
              </span>
            </a>
            <p className="max-w-xs text-sm leading-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
              We build the infrastructure of autonomous AI — transacting, deploying, reasoning, and grounding in production.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#C084FC';
                    e.currentTarget.style.color = '#C084FC';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={openPricing}
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  Pricing
                </button>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom */}
        <div
          className="mt-10 flex flex-col gap-2 pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2026 Serendepify AI. Infrastructure for the AI economy.
          </p>
          <div className="flex gap-5">
            <button
              onClick={openPricing}
              className="text-xs transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              Pricing
            </button>
            <button
              onClick={openContact}
              className="text-xs transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
