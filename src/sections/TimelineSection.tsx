import { motion } from 'framer-motion';

const easeEnter = [0.22, 1, 0.36, 1] as [number, number, number, number];

type EvolutionNode = {
  number: string;
  name: string;
  role: string;
  description: string;
  tone: 'mauve' | 'coral';
};

const evolutionChain: EvolutionNode[] = [
  {
    number: '01',
    name: 'Shipd',
    role: 'first deploy',
    description:
      'Repo-aware deployment intelligence. Scored tradeoffs and surfaced the right platform path.',
    tone: 'coral',
  },
  {
    number: '02',
    name: 'Convoy',
    role: 'flagship operator',
    description:
      'Does what Shipd does, then carries you through deployment with agentic intelligence — rehearse, ship, observe.',
    tone: 'mauve',
  },
  {
    number: '03',
    name: 'b2dp',
    role: 'system shape',
    description:
      'Skills and CLI for building products from a short description. Shapes the architecture before any deploy happens.',
    tone: 'coral',
  },
];

function OriginNode() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex items-center justify-center"
        style={{
          width: 88,
          height: 88,
          borderRadius: '50%',
          border: '1px solid rgba(232,152,168,0.5)',
          backgroundColor: '#000000',
          boxShadow:
            '0 0 32px rgba(232,152,168,0.14), inset 0 0 20px rgba(232,152,168,0.05)',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--coral)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      </div>
      <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/34">
        Origin
      </span>
    </div>
  );
}

function Connector() {
  return (
    <div className="pointer-events-none relative flex w-14 shrink-0 flex-col py-8">
      <div className="absolute left-0 top-8 bottom-8 w-px dash-march-v" />
      <div className="flex flex-1 flex-col justify-center">
        <div className="h-px w-full dash-march-h" />
      </div>
    </div>
  );
}

function EvolutionChain() {
  return (
    <div className="w-full">
      <div className="relative">
        {/* Background track */}
        <div
          className="pointer-events-none absolute hidden h-px sm:block"
          style={{
            top: 28,
            left: '8%',
            right: '8%',
            backgroundColor: 'rgba(255,255,255,0.08)',
          }}
        />
        {/* Animated gradient track */}
        <motion.div
          className="pointer-events-none absolute hidden h-px sm:block"
          initial={{ width: '0%' }}
          whileInView={{ width: '84%' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: easeEnter, delay: 0.3 }}
          style={{
            top: 28,
            left: '8%',
            background:
              'linear-gradient(90deg, var(--coral), var(--mauve), var(--coral))',
            boxShadow: '0 0 12px rgba(232,152,168,0.28)',
          }}
        />

        <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {evolutionChain.map((node, index) => {
            const toneColor =
              node.tone === 'mauve' ? 'var(--mauve)' : 'var(--coral)';
            const glowColor =
              node.tone === 'mauve'
                ? 'rgba(212,165,176,0.12)'
                : 'rgba(232,152,168,0.12)';
            const borderColor =
              node.tone === 'mauve'
                ? 'rgba(212,165,176,0.5)'
                : 'rgba(232,152,168,0.5)';

            return (
              <motion.div
                key={node.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: easeEnter,
                }}
                className="relative flex flex-col items-center text-center"
              >
                <motion.span
                  className="relative z-[1] flex h-14 w-14 items-center justify-center rounded-full border bg-black font-mono text-[10px] font-medium tracking-widest"
                  style={{
                    borderColor,
                    color: toneColor,
                    boxShadow: `0 0 24px ${glowColor}`,
                  }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 2.8 + index * 0.4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                >
                  {node.number}
                </motion.span>

                <span
                  className="mt-4 font-sans font-medium"
                  style={{
                    fontSize: '1.05rem',
                    color: 'var(--fg)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {node.name}
                </span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/34">
                  {node.role}
                </span>
                <p className="mt-3 max-w-[260px] text-[13px] leading-[1.7] text-white/50">
                  {node.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative overflow-hidden border-t border-white/10 bg-black"
    >
      <div className="noise-bg" style={{ opacity: 0.03 }} />
      <div className="mx-auto max-w-[1200px] px-5 py-[90px] md:px-10 md:py-[130px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, ease: easeEnter }}
          className="mb-16 max-w-[760px]"
        >
          <h2
            className="font-serif tracking-[-0.035em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.8rem)', lineHeight: 0.98 }}
          >
            From origin to{' '}
            <span style={{ color: 'var(--mauve)' }}>operator</span>.
          </h2>
          <p className="mt-5 max-w-[640px] text-base leading-[1.75] text-[var(--fg-2)]">
            Shipd was built first. Convoy is what Shipd wanted to become —
            agentic deployment from first commit to live canary. b2dp shapes the
            system before any deploy happens.
          </p>
        </motion.div>

        <div className="relative hidden items-stretch gap-6 lg:flex">
          <div className="flex w-[200px] shrink-0 flex-col items-center justify-center">
            <OriginNode />
          </div>

          <Connector />

          <div className="flex flex-1 items-center">
            <EvolutionChain />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-10 lg:hidden">
          <OriginNode />
          <EvolutionChain />
        </div>
      </div>
    </section>
  );
}
