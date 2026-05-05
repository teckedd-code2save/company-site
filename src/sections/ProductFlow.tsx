import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type Product = {
  id: string;
  number: string;
  tag: string;
  status: string;
  tone: 'mauve' | 'coral';
  title: string;
  blurb: string;
  detail: string;
  stack: string[];
  link: string;
  visual: 'convoy' | 'video' | 'image';
  videoSrc?: string;
  mp4Src?: string;
  imgSrc?: string;
};

const products: Product[] = [
  {
    id: 'convoy',
    number: '01',
    tag: 'deployment operator',
    status: 'flagship',
    tone: 'mauve',
    title: 'Convoy',
    blurb: 'Agentic deployment with rehearsal, canary rollout, and observability — from first commit to live system.',
    detail:
      'Convoy is what Shipd grows into when you are ready to ship. The agent stays in the loop, rehearses every deploy, and observes the canary — Claude-native, fully autonomous. Check Convoy home.',
    stack: ['Opus 4.7', 'Claude Code', 'deployment loops', 'observability'],
    link: 'https://convoy-home.vercel.app/',
    visual: 'convoy',
  },
  {
    id: 'shipd',
    number: '02',
    tag: 'deployment intelligence',
    status: 'live',
    tone: 'coral',
    title: 'Shipd',
    blurb: 'Reads your repository and scores the best deployment options.',
    detail:
      'Shipd helps you plan and score the best options before you commit to an infra path. Need more than planning? Convoy carries the rollout with the agent in the loop.',
    stack: ['repo scan', 'platform scoring', 'comparison view'],
    link: 'https://shipd-seven.vercel.app/',
    visual: 'video',
    videoSrc: '/images/products/shipd-surface.webm',
    mp4Src: '/images/products/shipd-surface.mp4',
  },
  {
    id: 'b2dp',
    number: '03',
    tag: 'product builder',
    status: 'active',
    tone: 'coral',
    title: 'b2dp',
    blurb: 'A business spec in. A complete end-to-end platform out.',
    detail:
      'b2dp is a business-to-data-platform CLI. Provision skills, configure MCP servers, and generate full applications with the agent of your choice — Claude, Gemini, Codex, and more.',
    stack: ['skills system', 'CLI', 'MCP servers', 'agent orchestrator'],
    link: 'https://www.npmjs.com/package/@teckedd-code2save/b2dp',
    visual: 'video',
    videoSrc: '/images/products/b2dp-surface.webm',
    mp4Src: '/images/products/b2dp-surface.mp4',
  },
];

const easeEnter = [0.0, 0, 0.2, 1] as [number, number, number, number];

function LoopVideo({ webm, mp4 }: { webm: string; mp4: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.muted = true;
    element.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      muted
      playsInline
      preload="auto"
      className="h-full w-full object-cover"
      style={{ display: 'block' }}
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}

function ConvoyCanvas() {
  const phases = ['rehearse', 'ship', 'observe'];

  return (
    <div className="group/media relative h-full min-h-[520px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#090909] transition-transform duration-300 hover:scale-[1.01]">
      <div className="noise-bg" style={{ opacity: 0.03 }} />
      <div className="grid-drift absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgba(0,230,153,0.18),transparent_32%),radial-gradient(circle_at_76%_72%,rgba(0,217,255,0.16),transparent_34%)]" />

      <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span>Convoy operator loop</span>
          <span>no code writes</span>
        </div>

        <div className="mt-10 grid gap-8">
          <div className="relative flex items-center justify-between gap-4">
            <div className="absolute left-[10%] right-[10%] top-1/2 h-px -translate-y-1/2 bg-white/10" />
            <motion.div
              className="absolute left-[10%] right-[10%] top-1/2 h-px -translate-y-1/2"
              style={{
                background:
                  'linear-gradient(90deg, rgba(0,230,153,0.85), rgba(0,217,255,0.35), rgba(0,230,153,0.85))',
              }}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            />
            {phases.map((phase, index) => (
              <div key={phase} className="relative z-10 flex flex-1 flex-col items-center text-center">
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-black/70 font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: index === 1 ? 'var(--coral)' : 'var(--fg)' }}
                  animate={{ y: [0, -4, 0], boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 0 28px rgba(0,217,255,0.14)', '0 0 0 rgba(0,0,0,0)'] }}
                  transition={{ duration: 3 + index * 0.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.div>
                <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/62">
                  {phase}
                </span>
              </div>
            ))}
          </div>

          <div className="grid gap-3">
            {[
              '$ convoy rehearse --env production',
              '> rollout strategy selected: canary',
              '> observation loop armed for post-deploy anomalies',
            ].map((line, index) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18 + index * 0.08, duration: 0.5, ease: easeEnter }}
                className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white/76"
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/34">
          <span>human approval at each gate</span>
          <span>stateful loop</span>
        </div>
      </div>
    </div>
  );
}

function MediaPanel({ product }: { product: Product }) {
  return (
    <div className="group/media relative h-full min-h-[520px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#090909] transition-transform duration-300 hover:scale-[1.01]">
      <div className="noise-bg" style={{ opacity: 0.03 }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(0,230,153,0.10),transparent_26%),radial-gradient(circle_at_78%_82%,rgba(0,217,255,0.10),transparent_28%)]" />

      <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/38">
          live surface
        </span>
      </div>

      <div className="relative h-[calc(100%-57px)] overflow-hidden">
        <div className="absolute left-6 right-6 top-5 z-20 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/44">
          <span>{product.status}</span>
          <span className="h-px flex-1 bg-white/10" />
          <span>{product.tag}</span>
        </div>

        {product.visual === 'video' && product.videoSrc && product.mp4Src ? (
          <LoopVideo webm={product.videoSrc} mp4={product.mp4Src} />
        ) : product.visual === 'image' && product.imgSrc ? (
          <motion.img
            src={product.imgSrc}
            alt={product.title}
            className="h-full w-full object-cover"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          />
        ) : (
          <ConvoyCanvas />
        )}

        {product.visual !== 'convoy' && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-5 top-20 h-px w-[30%] bg-white/12" />
              <div className="absolute right-6 top-28 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#00D9FF] animate-pulse-dot" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/38">
                  stepper active
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  const reverse = index % 2 === 1;
  const toneColor = product.tone === 'mauve' ? 'var(--mauve)' : 'var(--coral)';

  const ctaText =
    product.id === 'convoy'
      ? 'Check it out'
      : product.id === 'shipd'
        ? 'Explore Shipd'
        : 'Get the CLI';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.75, ease: easeEnter, delay: index * 0.04 }}
    >
      <div
        id={product.id}
        className={`grid items-center gap-10 lg:gap-[4.5rem] ${reverse ? 'lg:grid-cols-[1.05fr_0.95fr]' : 'lg:grid-cols-[0.95fr_1.05fr]'}`}
      >
        <div className={reverse ? 'lg:order-2' : ''}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/28">
              {product.number}
            </span>
            <span className="h-px w-8 bg-white/12" />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: toneColor }}
            >
              {product.tag}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/36">
              {product.status}
            </span>
          </div>

          <div
            className="mt-6 font-mono text-[6rem] leading-none text-white/6 sm:text-[7rem] lg:text-[8rem]"
            aria-hidden="true"
          >
            {product.number}
          </div>

          <h3
            className="mt-[-2.8rem] max-w-[620px] font-serif tracking-[-0.03em] text-[var(--fg)] sm:mt-[-3.1rem]"
            style={{ fontSize: 'clamp(2.6rem, 5vw, 5rem)', lineHeight: 0.98 }}
          >
            {product.title}
          </h3>

          <p className="mt-5 max-w-[560px] text-[1.1rem] leading-[1.65] text-[var(--fg)]">
            {product.blurb}
          </p>
          <p className="mt-3 max-w-[560px] text-sm leading-[1.7] text-white/48">
            {product.detail}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/48"
              >
                {item}
              </span>
            ))}
          </div>

          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/72 transition-colors hover:text-white"
          >
            {ctaText}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className={reverse ? 'lg:order-1' : ''}>
          <MediaPanel product={product} />
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductFlow() {
  return (
    <section
      id="products"
      className="relative overflow-hidden border-t border-white/10 bg-black"
    >
      <div className="noise-bg" style={{ opacity: 0.03 }} />
      <div className="mx-auto max-w-[1240px] px-5 py-[110px] md:px-10 md:py-[150px]">
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
            The full stack.
            <span style={{ color: 'var(--mauve)' }}> From idea to production.</span>
          </h2>
          <p className="mt-5 max-w-[640px] text-base leading-[1.75] text-[var(--fg-2)]">
            Three products. One continuous path: describe the system, choose the deployment path, then let the operator carry the rollout - with you in charge.
          </p>
        </motion.div>

        <div className="flex flex-col gap-20 lg:gap-28">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="border-t border-white/10 pt-12 first:border-t-0 first:pt-0"
            >
              <ProductRow product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
