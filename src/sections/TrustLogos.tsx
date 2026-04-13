import { motion } from 'framer-motion';

const logos = [
  { name: 'Stripe', symbol: 'S' },
  { name: 'Vercel', symbol: '▲' },
  { name: 'Supabase', symbol: '◐' },
  { name: 'GitHub', symbol: '◌' },
  { name: 'OpenAI', symbol: '◎' },
  { name: 'Anthropic', symbol: 'A' },
  { name: 'Vite', symbol: '⚡' },
  { name: 'TypeScript', symbol: 'TS' },
];

export default function TrustLogos() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200/60 bg-[linear-gradient(180deg,#f8fafc_0%,#f3f5f7_58%,#eef2f6_100%)] py-10 dark:border-slate-800/60 dark:bg-[linear-gradient(180deg,#0f172a_0%,#0b1220_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#f8fafc] via-transparent to-transparent dark:from-[#0f172a]" />
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#eef2f6] via-transparent to-transparent dark:from-[#0b1220]" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-7 text-center text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500/90 dark:text-slate-500"
      >
        Built with
      </motion.p>

      <div className="pause-on-hover overflow-hidden">
        <div className="marquee-track animate-marquee flex w-max items-center">
          {[0, 1].map((group) => (
            <div
              key={group}
              aria-hidden={group === 1}
              className="marquee-group flex shrink-0 items-center gap-12 pr-12"
            >
              {logos.map((logo) => (
                <div
                  key={`${logo.name}-${group}`}
                  className="flex shrink-0 items-center gap-3 text-slate-500/95 dark:text-slate-400/90"
                >
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {logo.symbol}
                  </span>
                  <span className="font-mono text-[13px] font-medium tracking-[0.08em] text-slate-600 dark:text-slate-400">
                    {logo.name}
                  </span>
                  <span className="ml-2 h-4 w-px bg-slate-300/70 dark:bg-slate-700/80" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
