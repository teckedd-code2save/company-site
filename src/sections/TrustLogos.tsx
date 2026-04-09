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

// Duplicate for seamless loop
const marqueeItems = [...logos, ...logos];

export default function TrustLogos() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200/60 bg-[linear-gradient(180deg,#ebe7df_0%,#f5f1e9_58%,#f7f3ec_100%)] py-10 dark:border-slate-800/60 dark:bg-[linear-gradient(180deg,#0f172a_0%,#0b1220_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#ebe7df] via-transparent to-transparent dark:from-[#0f172a] z-10" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#f7f3ec] via-transparent to-transparent dark:from-[#0b1220] z-10" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500"
      >
        Built with
      </motion.p>

      <div className="pause-on-hover overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-10">
          {marqueeItems.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex shrink-0 items-center gap-2.5 text-slate-500 dark:text-slate-400"
            >
              <span className="text-base font-bold text-slate-600 dark:text-slate-300">
                {logo.symbol}
              </span>
              <span className="text-sm font-semibold tracking-tight">{logo.name}</span>
              <span className="ml-4 h-4 w-px bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
