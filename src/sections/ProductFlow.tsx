import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';
import BrowserFrame from '@/components/BrowserFrame';
import ProductLightbox from '@/components/ProductLightbox';
import DrawnUnderline from '@/components/DrawnUnderline';
import LightningFlash from '@/components/LightningFlash';
import MouseReactiveGrid from '@/components/MouseReactiveGrid';

/* ══════════════════════════════════════════════════════════════════════
   LoopVideo — imperative play() so autoplay always fires, even inside
   Framer Motion animated trees where the `autoPlay` attr is ignored.
═══════════════════════════════════════════════════════════════════════ */
function LoopVideo({ webm, mp4, className }: { webm: string; mp4: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ display: 'block' }}
    >
      <source src={webm} type="video/webm" />
      <source src={mp4}  type="video/mp4"  />
    </video>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   InterstitialQuote — 3-D scroll parallax + sticky pin breathing moment.
═══════════════════════════════════════════════════════════════════════ */
type QuoteVariant = 'left-heavy' | 'center-light' | 'right-mixed';

interface Quote {
  main:    string;
  sub:     string;
  source:  string;
  variant: QuoteVariant;
}

const VARIANT_STYLES: Record<QuoteVariant, {
  wrap: string;
  mainClass: string;
  mainStyle: React.CSSProperties;
  subClass: string;
  subStyle: React.CSSProperties;
  srcClass: string;
}> = {
  'left-heavy': {
    wrap:      'px-6 sm:px-12 lg:px-20 xl:px-28 text-left max-w-4xl',
    mainClass: 'text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-light leading-[1.04] tracking-tight',
    mainStyle: { letterSpacing: '-0.03em', color: '#fff' },
    subClass:  'mt-4 text-xl sm:text-2xl font-light leading-relaxed',
    subStyle:  { color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' },
    srcClass:  'mt-8 text-[10px] font-semibold uppercase tracking-[0.26em]',
  },
  'center-light': {
    wrap:      'px-6 sm:px-14 lg:px-24 text-center mx-auto max-w-3xl',
    mainClass: 'text-3xl sm:text-4xl lg:text-5xl font-extralight leading-[1.18] tracking-tight italic',
    mainStyle: { letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.85)' },
    subClass:  'mt-5 text-base font-normal leading-7',
    subStyle:  { color: 'rgba(255,255,255,0.42)' },
    srcClass:  'mt-7 text-[10px] font-semibold uppercase tracking-[0.26em]',
  },
  'right-mixed': {
    wrap:      'px-6 sm:px-12 lg:px-20 xl:px-28 text-right ml-auto max-w-4xl',
    mainClass: 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.08] tracking-tight',
    mainStyle: { letterSpacing: '-0.03em', color: '#fff' },
    subClass:  'mt-4 text-lg sm:text-xl font-light leading-relaxed',
    subStyle:  { color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' },
    srcClass:  'mt-7 text-[10px] font-semibold uppercase tracking-[0.26em]',
  },
};

function InterstitialQuote({ q }: { q: Quote }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -6]);
  const y       = useTransform(scrollYProgress, [0, 1],       [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0, 1, 1, 0]);

  const s = VARIANT_STYLES[q.variant];

  return (
    <div
      ref={ref}
      className="relative overflow-hidden py-28 lg:py-40"
      style={{ perspective: '1400px' }}
    >
      {/* Mouse-reactive dot grid */}
      <MouseReactiveGrid />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: q.variant === 'left-heavy'
            ? 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 100%)'
            : q.variant === 'right-mixed'
              ? 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 100%)'
              : 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 100%)',
        }}
      />

      <motion.div style={{ rotateX, y, opacity }} className={`relative ${s.wrap}`}>
        <p className={s.mainClass} style={s.mainStyle}>{q.main}</p>
        <p className={s.subClass}  style={s.subStyle}>{q.sub}</p>
        <p className={s.srcClass}  style={{ color: '#FFFFFF' }}>{q.source}</p>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Product data
═══════════════════════════════════════════════════════════════════════ */
const products = [
  {
    id:       'mpp-studio',
    eyebrow:  'API Infrastructure · Live',
    name:     'MPP Studio',
    headline: 'Turn your workflow into a revenue stream.',
    sub:      'MPP Studio handles the full monetization loop — discovery, sandbox, and live payment — without touching billing code. Ship once, charge forever.',
    cta:      'Open MPP Studio',
    link:     'https://agent-exchange-web.vercel.app/',
    videoSrc: '/images/products/mpp-studio-surface.webm',
    mp4Src:   '/images/products/mpp-studio-surface.mp4',
    isVideo:  true,
    flip:     false,
    proof: {
      verb:      'Monetized with',
      statement: 'From sandbox to live payment — without writing a single billing integration.',
    },
  },
  {
    id:       'shipd',
    eyebrow:  'Deployment Intelligence · Live',
    name:     'Shipd',
    headline: 'Read the codebase. Return a plan.',
    sub:      'Point Shipd at your repo. It scores every deployment path and returns a recommendation — so you ship with conviction, not guesswork.',
    cta:      'See Shipd',
    link:     'https://shipd-seven.vercel.app/',
    videoSrc: '/images/products/shipd-surface.webm',
    mp4Src:   '/images/products/shipd-surface.mp4',
    isVideo:  true,
    flip:     true,
    proof: {
      verb:      'Shipped with',
      statement: 'Repo read. Platform scored. Deployment plan returned. No more deployment guesswork.',
    },
  },
  {
    id:       'b2dp',
    eyebrow:  'Product Architecture · Active',
    name:     'B2DP',
    headline: 'Brief to architecture in minutes.',
    sub:      "Describe what you're building in plain language. B2DP returns data models, service contracts, and system structure — ready for engineers immediately.",
    cta:      'Explore B2DP',
    link:     'https://teckedd-code2save.github.io/ai-build-tools/',
    videoSrc: '/images/products/b2dp-surface.webm',
    mp4Src:   '/images/products/b2dp-surface.mp4',
    isVideo:  true,
    flip:     false,
    proof: {
      verb:      'Designed with',
      statement: 'Business brief in — data models, services, and architecture out. Ready for engineers immediately.',
    },
  },
  {
    id:       'datafy',
    eyebrow:  'AI Data Grounding · Beta',
    name:     'Datafy MCP',
    headline: 'Ground your agents in reality.',
    sub:      "Connect AI agents to your live operational data through MCP. They reason from what's true today — not stale training data or hallucinated context.",
    cta:      'Watch Datafy',
    link:     'https://www.youtube.com/watch?v=eUEZqX97i6I',
    videoSrc: null,
    mp4Src:   null,
    imgSrc:   '/images/products/datafy-surface.png',
    isVideo:  false,
    flip:     true,
    proof: {
      verb:      'Grounded by',
      statement: 'Analysis grounded in your own live data. Not approximations.',
    },
  },
] as const;

/* Interstitial content */
const interstitials: Quote[] = [
  {
    main:    'We went from idea to\ncharging customers in\nunder a week.',
    sub:     'No billing team. No integration sprint. The stack handled the parts that usually kill momentum.',
    source:  'Founder, AI tooling startup',
    variant: 'left-heavy',
  },
  {
    main:    '"The deployment decision used to take three days of debate. Now it takes three minutes."',
    sub:     'The shift isn\'t about the tools — it\'s about what your team stops worrying about.',
    source:  'Engineering lead, Series A company',
    variant: 'center-light',
  },
  {
    main:    'Every hour spent on\ninfrastructure is an hour\nnot spent on the product.',
    sub:     'That trade-off is optional now.',
    source:  'Serendepify AI · operating thesis',
    variant: 'right-mixed',
  },
];

/* ══════════════════════════════════════════════════════════════════════
   Proof strip
═══════════════════════════════════════════════════════════════════════ */
const b2dpTags = [
  'MPP Studio', 'Agent Workflows', 'Data Models', 'Service Contracts',
  'Serendepify Platform', 'API Service Layer', 'Event Schemas', 'DB Architecture',
];
const shipdServices = [
  { name: 'MPP Studio', tags: ['Next.js', 'Vercel'] },
  { name: 'Shipd',      tags: ['Vite', 'Vercel'] },
  { name: 'B2DP',       tags: ['GitHub Pages'] },
  { name: 'Datafy MCP', tags: ['Node.js', 'MCP'] },
];

function ProofStrip({ id, verb, name, statement }: {
  id: string; verb: string; name: string; statement: string;
}) {
  if (id === 'b2dp') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-none"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-baseline gap-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.3)' }}>{verb}</p>
            <p className="text-lg font-semibold tracking-tight text-white">{name}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {b2dpTags.map((tag, i) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-light tracking-wide"
                style={i % 3 === 0
                  ? { background: '#FFFFFF', color: '#000', border: '1px solid #FFFFFF' }
                  : { background: 'transparent', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (id === 'shipd') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-none"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-baseline gap-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.3)' }}>{verb}</p>
            <p className="text-lg font-semibold tracking-tight text-white">{name}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {shipdServices.map((svc) => (
              <div key={svc.name} className="glass-card rounded-xl px-4 py-4">
                <p className="text-sm font-light text-white">{svc.name}</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {svc.tags.map((t) => (
                    <span key={t} className="text-[10px] font-medium uppercase tracking-wider" style={{ color: '#FFFFFF' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-none"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          <div className="shrink-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.3)' }}>{verb}</p>
            <p className="mt-0.5 text-xl font-semibold tracking-tight text-white">{name}</p>
          </div>
          <div className="hidden h-10 w-px sm:block" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <p className="text-sm leading-6" style={{ color: 'rgba(255,255,255,0.5)' }}>{statement}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Helpers
═══════════════════════════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* Symmetric padding so text breathes equally on both sides regardless of flip */
const TEXT_PAD = 'p-10 sm:p-14 lg:p-16 xl:p-20';

/* ══════════════════════════════════════════════════════════════════════
   ProductFlow
═══════════════════════════════════════════════════════════════════════ */
export default function ProductFlow() {
  const [lightbox, setLightbox] = useState<{ open: boolean; type: 'video' | 'image'; src: string; srcFallback?: string; alt?: string }>({
    open: false,
    type: 'video',
    src: '',
  });

  const openLightbox = (product: typeof products[number]) => {
    if (product.isVideo && product.videoSrc) {
      setLightbox({ open: true, type: 'video', src: product.videoSrc, srcFallback: product.mp4Src || undefined, alt: product.name });
    } else if (!product.isVideo && product.imgSrc) {
      setLightbox({ open: true, type: 'image', src: product.imgSrc, alt: product.name });
    }
  };

  return (
    <>
      <div id="products">
        {products.map((product, idx) => (
          <div key={product.id}>

            {/* ── Product section ──────────────────────────────────────── */}
            <section
              id={product.id}
              className="overflow-hidden"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#000000' }}
            >
              {idx === 0 && <LightningFlash intensity={0.03} />}
              <div className={`flex flex-col lg:flex-row lg:items-stretch lg:min-h-[720px] ${product.flip ? 'lg:flex-row-reverse' : ''}`}>

                {/* Text panel */}
                <motion.div
                  initial={{ opacity: 0, x: product.flip ? 32 : -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className={`flex shrink-0 items-center lg:w-[480px] xl:w-[560px] ${TEXT_PAD}`}
                >
                  <div className="w-full">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: '#D4A5B0' }}>
                      {product.eyebrow}
                    </p>
                    <DrawnUnderline className="mb-4" width={28} delay={0.2} />
                    <h2
                      className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      <SplitText stagger={0.03} delay={0.1}>
                        {product.headline}
                      </SplitText>
                    </h2>
                    <p className="mt-5 text-base font-light leading-7" style={{ color: 'rgba(255,255,255,0.52)' }}>
                      {product.sub}
                    </p>
                    <MagneticButton
                      as="a"
                      href={product.link}
                      className="group mt-8 inline-flex items-center gap-1.5 rounded-full border px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/50"
                      style={{ borderColor: 'rgba(255,255,255,0.18)' }}
                    >
                      {product.cta}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </MagneticButton>
                  </div>
                </motion.div>

                {/* Media panel — framed in browser chrome, clickable */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.9, delay: 0.12 }}
                  className="relative flex-1 min-h-[520px] p-4 sm:p-6 lg:min-h-0 lg:p-10"
                  style={{ backgroundColor: '#000000' }}
                >
                  <BrowserFrame
                    className="h-full w-full cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]"
                    delay={0.3}
                    onClick={() => openLightbox(product)}
                  >
                    {product.isVideo && product.videoSrc ? (
                      <LoopVideo
                        webm={product.videoSrc}
                        mp4={product.mp4Src!}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full overflow-hidden">
                        <img
                          src={(product as { imgSrc?: string }).imgSrc ?? ''}
                          alt={product.name}
                          className="h-full w-full object-cover"
                          style={{
                            display: 'block',
                            animation: 'ken-burns 24s ease-in-out infinite alternate',
                          }}
                        />
                      </div>
                    )}
                  </BrowserFrame>

                  {/* Soft directional shadow for text-edge blending */}
                  <div
                    className={`pointer-events-none absolute inset-y-0 ${product.flip ? 'right-0' : 'left-0'}`}
                    style={{
                      width: '18%',
                      background: product.flip
                        ? 'linear-gradient(to left,  #000 0%, transparent 100%)'
                        : 'linear-gradient(to right, #000 0%, transparent 100%)',
                    }}
                  />
                </motion.div>

              </div>
            </section>

            {/* Proof strip */}
            <ProofStrip id={product.id} verb={product.proof.verb} name={product.name} statement={product.proof.statement} />

            {/* 3-D scroll quote */}
            {idx < products.length - 1 && (
              <InterstitialQuote q={interstitials[idx]} />
            )}

          </div>
        ))}
      </div>

      <style>{`
        @keyframes ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.08) translate(-1%, -1%); }
        }
      `}</style>

      <ProductLightbox
        open={lightbox.open}
        onClose={() => setLightbox((s) => ({ ...s, open: false }))}
        media={{ type: lightbox.type, src: lightbox.src, srcFallback: lightbox.srcFallback, alt: lightbox.alt }}
      />
    </>
  );
}
