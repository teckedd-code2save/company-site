import { motion } from 'framer-motion';

const logos = [
  { name: 'Stripe',     symbol: 'S'  },
  { name: 'Vercel',     symbol: '▲'  },
  { name: 'Supabase',   symbol: '◐'  },
  { name: 'GitHub',     symbol: '◌'  },
  { name: 'OpenAI',     symbol: '◎'  },
  { name: 'Anthropic',  symbol: 'A'  },
  { name: 'Vite',       symbol: '⚡' },
  { name: 'TypeScript', symbol: 'TS' },
];

export default function TrustLogos() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20"
      style={{
        borderTop:    '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background:   '#000',
      }}
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute left-0 top-0 z-10 h-full w-40"
          style={{ background: 'linear-gradient(to right, #000, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 z-10 h-full w-40"
          style={{ background: 'linear-gradient(to left, #000, transparent)' }}
        />
      </div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-sm font-semibold uppercase tracking-[0.28em]"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        Built with
      </motion.p>

      {/* Marquee */}
      <div className="pause-on-hover overflow-hidden">
        <div className="marquee-track animate-marquee flex w-max items-center">
          {[0, 1].map((group) => (
            <div
              key={group}
              aria-hidden={group === 1}
              className="marquee-group flex shrink-0 items-center gap-20 pr-20"
            >
              {logos.map((logo) => (
                <motion.div
                  key={`${logo.name}-${group}`}
                  className="flex shrink-0 items-center gap-4 cursor-default"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                  whileHover={{ color: 'rgba(0,230,153,0.9)', scale: 1.07 }}
                  transition={{ duration: 0.18 }}
                >
                  {/* Symbol */}
                  <span
                    className="text-xl font-semibold"
                    style={{ color: 'rgba(255,255,255,0.85)' }}
                  >
                    {logo.symbol}
                  </span>
                  {/* Name */}
                  <span className="font-mono text-base font-semibold tracking-[0.06em]">
                    {logo.name}
                  </span>
                  {/* Divider */}
                  <span
                    className="ml-4 h-6 w-px"
                    style={{ background: 'rgba(255,255,255,0.14)' }}
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
