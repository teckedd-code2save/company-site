import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import { useModal } from '@/lib/modal-context';

type FlowNode = { name: string; role: string; tone: 'mauve' | 'coral' };

const workflowSteps: FlowNode[] = [
  { name: 'b2dp', role: 'describe', tone: 'coral' },
  { name: 'Shipd', role: 'route', tone: 'mauve' },
  { name: 'Convoy', role: 'deploy', tone: 'coral' },
  { name: 'Production', role: 'live system', tone: 'mauve' },
];

const easeEnter = [0.22, 1, 0.36, 1] as [number, number, number, number];

function DeploymentLane() {
  return (
    <div className="w-full">
      <div className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-0">
        <div
          className="pointer-events-none absolute hidden h-px sm:block"
          style={{
            top: 28,
            left: '12.5%',
            right: '12.5%',
            backgroundColor: 'rgba(255,255,255,0.08)',
          }}
        />
        <motion.div
          className="pointer-events-none absolute hidden h-px sm:block"
          initial={{ width: '0%' }}
          whileInView={{ width: '75%' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: easeEnter, delay: 0.3 }}
          style={{
            top: 28,
            left: '12.5%',
            background: 'linear-gradient(90deg, var(--coral), var(--mauve), var(--coral))',
            boxShadow: '0 0 12px rgba(0,217,255,0.28)',
          }}
        />

        {workflowSteps.map((node, index) => {
          const toneColor = node.tone === 'mauve' ? 'var(--mauve)' : 'var(--coral)';

          return (
            <motion.div
              key={node.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: easeEnter }}
              className="relative flex flex-col items-center text-center"
            >
              <motion.span
                className="relative z-[1] flex h-14 w-14 items-center justify-center rounded-full border bg-black font-mono text-[10px] font-medium tracking-widest"
                style={{
                  borderColor: node.tone === 'mauve' ? 'rgba(0,230,153,0.5)' : 'rgba(0,217,255,0.5)',
                  color: toneColor,
                  boxShadow:
                    node.tone === 'mauve'
                      ? '0 0 24px rgba(0,230,153,0.12)'
                      : '0 0 24px rgba(0,217,255,0.12)',
                }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.8 + index * 0.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.span>

              <span
                className="mt-4 font-sans font-medium"
                style={{
                  fontSize: '1rem',
                  color: 'var(--fg)',
                  letterSpacing: '-0.01em',
                }}
              >
                {node.name}
              </span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/34">
                {node.role}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Features() {
  const { openContact } = useModal();

  return (
    <section
      id="features"
      className="py-20 lg:py-28"
      style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, ease: easeEnter }}
        >
          <h2
            className="font-serif tracking-[-0.03em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.05 }}
          >
            How it <span style={{ color: 'var(--mauve)' }}>works</span>.
          </h2>
          <p className="mt-3 max-w-[640px] text-[14px] leading-[1.7] text-[var(--fg-2)]">
            Describe what you want. The system shapes the architecture, picks the deployment path, and executes the rollout — all in one continuous flow.
          </p>
        </motion.div>

        <div className="mt-16 rounded-[1.8rem] border border-white/10 bg-white/[0.02] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="relative hidden items-stretch gap-6 lg:flex">
            <div className="flex w-[200px] shrink-0 flex-col items-center justify-center">
              <div
                className="flex items-center justify-center"
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: '50%',
                  border: '1px solid rgba(0,217,255,0.5)',
                  backgroundColor: '#000000',
                  boxShadow: '0 0 32px rgba(0,217,255,0.14), inset 0 0 20px rgba(0,217,255,0.05)',
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
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/>
                  <path d="M9 18h6"/>
                  <path d="M10 22h4"/>
                </svg>
              </div>
              <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/34">
                Ideation
              </span>
            </div>

            <div className="pointer-events-none relative flex w-14 shrink-0 flex-col py-8">
              <div className="absolute left-0 top-8 bottom-8 w-px bg-[repeating-linear-gradient(180deg,rgba(0,217,255,0.55)_0,rgba(0,217,255,0.55)_4px,transparent_4px,transparent_10px)]" />
              <div className="flex flex-1 flex-col justify-center">
                <div className="h-px w-full bg-[repeating-linear-gradient(90deg,rgba(0,217,255,0.55)_0,rgba(0,217,255,0.55)_4px,transparent_4px,transparent_10px)]" />
              </div>
            </div>

            <div className="flex flex-1 items-center">
              <DeploymentLane />
            </div>
          </div>

          <div className="lg:hidden">
            <DeploymentLane />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, delay: 0.18, ease: easeEnter }}
          className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-[640px] text-sm leading-[1.8] text-white/42">
            Serendepify connects ideation to production: b2dp shapes the system, Shipd routes the path, and Convoy carries the rollout.
          </p>
          <MagneticButton
            onClick={openContact}
            className="inline-flex w-fit items-center rounded-full border border-white/14 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30"
          >
            Work with us
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
