import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import HeroBackdrop from '@/components/HeroBackdrop';
import { useModal } from '@/lib/modal-context';

const productLinks = [
  { label: 'Convoy', href: '#convoy', accent: true },
  { label: 'Shipd', href: '#shipd' },
  { label: 'Forge', href: '#forge' },
];

const easeEnter = [0.0, 0, 0.2, 1] as [number, number, number, number];

export default function Hero() {
  const { openContact } = useModal();

  return (
    <section className="relative min-h-[100dvh] overflow-hidden border-b border-white/10 bg-black">
      <HeroBackdrop />

      <motion.div
        className="relative z-10 flex min-h-[100dvh] items-center px-5 py-24 md:px-10"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeEnter }}
      >
        <div className="mx-auto w-full max-w-[1240px]">
          <motion.h1
            className="max-w-[900px] font-serif leading-[0.95] tracking-[-0.04em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: easeEnter }}
          >
            Autonomy from
            <br />
            Ideation to{' '}
            <span style={{ color: 'var(--mauve)' }}>production</span>,
            <br />
            and beyond.
          </motion.h1>

          <motion.p
            className="mt-7 max-w-[720px] text-lg leading-[1.6] text-[var(--fg-2)] md:text-[1.2rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease: easeEnter }}
          >
            From a spark of an idea to a deployed product. Our agents handle the
            architecture, routing, and rollout — so you ship at the speed of thought.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: easeEnter }}
          >
            <a
              href="#convoy"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform duration-200 hover:-translate-y-0.5"
            >
              View Convoy
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#products"
              className="rounded-full border border-white/14 px-7 py-3 text-sm font-medium text-white transition-colors hover:border-white/30"
            >
              Browse product line
            </a>
            <button
              onClick={openContact}
              className="rounded-full border border-transparent px-2 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/56 transition-colors hover:text-white"
            >
              Start a conversation
            </button>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: easeEnter }}
          >
            {productLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.18em] transition-colors"
                style={{ color: link.accent ? 'var(--mauve)' : 'var(--fg-2)' }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>

        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="h-10 w-px overflow-hidden bg-white/12">
          <div className="scroll-line h-full w-full bg-[#00D9FF]" />
        </div>
        <span className="font-mono text-[9px] text-white/28">scroll</span>
        <ArrowDown className="h-3.5 w-3.5 text-white/18" />
      </motion.div>
    </section>
  );
}
