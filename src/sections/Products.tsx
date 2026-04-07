import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, PlayCircle } from 'lucide-react';

const products = [
  {
    id: 'mpp-studio',
    name: 'MPP Studio',
    category: 'API Infrastructure',
    status: 'Live' as const,
    summary: 'Charge for AI. The payment layer that makes agent outputs and API services billable.',
    highlights: [
      'Stripe-integrated — sandbox to production in one surface',
      'Built for agent-ready service delivery and API monetization',
      'Live checkout without backend complexity',
    ],
    link: 'https://agent-exchange-web.vercel.app/',
    cta: 'Open MPP Studio',
    image: '/images/products/mpp-studio-surface.png',
    imageClassName: 'object-top',
    kind: 'app' as const,
  },
  {
    id: 'shipd',
    name: 'Shipd',
    category: 'Developer Tooling',
    status: 'Live' as const,
    summary: 'Know exactly how to deploy any repo.',
    highlights: [
      'Scan your codebase — get the right platform recommendation',
      'Compare tradeoffs across cost, complexity, and scale',
      'Step-by-step deployment plan, no guesswork',
    ],
    link: 'https://shipd-seven.vercel.app/',
    cta: 'See Shipd',
    image: '/images/products/shipd-surface.png',
    imageClassName: 'object-top',
    kind: 'app' as const,
  },
  {
    id: 'b2dp',
    name: 'B2DP',
    category: 'Product Design',
    status: 'Active' as const,
    summary: 'Turn a business brief into a build-ready backend structure.',
    highlights: [
      'Business logic mapped to data models and service boundaries',
      'AI-guided architecture from plain language input',
      'Output engineers can act on immediately',
    ],
    link: 'https://teckedd-code2save.github.io/ai-build-tools/',
    cta: 'Explore B2DP',
    image: '/images/products/b2dp-surface.png',
    imageClassName: 'object-top',
    kind: 'site' as const,
  },
  {
    id: 'datafy',
    name: 'Datafy MCP',
    category: 'AI Grounding',
    status: 'Beta' as const,
    summary: 'Connect AI to real operational data. No more mock inputs.',
    highlights: [
      'MCP-native grounding layer — live data in, real outputs out',
      'Replaces static mocks with operational signals',
      'Reduces hallucination at the source, not after the fact',
    ],
    link: 'https://www.youtube.com/watch?v=eUEZqX97i6I',
    cta: 'Watch Datafy in action',
    image: 'https://i.ytimg.com/vi/eUEZqX97i6I/maxresdefault.jpg',
    imageClassName: 'object-center',
    kind: 'video' as const,
  },
] as const;

const statusColors = {
  Live: 'bg-emerald-500/15 text-emerald-700 border-emerald-300/60 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30',
  Active: 'bg-sky-500/15 text-sky-700 border-sky-300/60 dark:bg-sky-500/20 dark:text-sky-400 dark:border-sky-500/30',
  Beta: 'bg-amber-500/15 text-amber-700 border-amber-300/60 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function ProductCard({
  name,
  category,
  status,
  summary,
  highlights,
  image,
  imageClassName,
  link,
  cta,
  kind,
}: {
  name: string;
  category: string;
  status: 'Live' | 'Active' | 'Beta';
  summary: string;
  highlights: readonly string[];
  image: string;
  imageClassName: string;
  link: string;
  cta: string;
  kind: 'app' | 'site' | 'video';
}) {
  const Icon = kind === 'video' ? PlayCircle : ExternalLink;
  const isAnimatedMedia = image.endsWith('.gif') || image.endsWith('.webm') || image.endsWith('.mp4');
  const [activeHighlight, setActiveHighlight] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHighlight((i) => (i + 1) % highlights.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [highlights.length]);

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/18 bg-white/12 shadow-[0_8px_32px_rgba(15,23,42,0.07)] backdrop-blur-2xl dark:border-slate-700/22 dark:bg-slate-900/22">
      {/* Full-bleed image */}
      <a href={link} target="_blank" rel="noopener noreferrer" className="relative block overflow-hidden">
        {isAnimatedMedia ? (
          <video
            src={image}
            autoPlay
            muted
            loop
            playsInline
            className={`h-[24rem] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] sm:h-[27rem] lg:h-[32rem] ${imageClassName}`}
          />
        ) : (
          <img
            src={image}
            alt={name}
            className={`h-[24rem] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] sm:h-[27rem] lg:h-[32rem] ${imageClassName}`}
          />
        )}
        <div className="absolute left-3 top-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm ${statusColors[status]}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {status}
          </span>
        </div>
      </a>

      {/* Content */}
      <div className="px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
        {/* Category */}
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
          {category}
        </span>

        {/* Name */}
        <h3 className="mt-1.5 text-[1.75rem] font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {name}
        </h3>

        {/* Summary — punchy tagline */}
        <p className="mt-2 text-base font-normal leading-snug text-slate-500 dark:text-slate-400 sm:text-lg">
          {summary}
        </p>

        {/* Cycling highlight */}
        <div className="mt-5 border-t border-slate-200/60 pt-4 dark:border-slate-700/40">
          <div className="flex items-start gap-3 overflow-hidden" style={{ minHeight: '1.6rem' }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeHighlight}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="text-sm leading-snug text-slate-600 dark:text-slate-300"
              >
                {highlights[activeHighlight]}
              </motion.p>
            </AnimatePresence>
          </div>
          {/* Dot indicators */}
          <div className="mt-3 flex gap-1.5">
            {highlights.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveHighlight(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === activeHighlight
                    ? 'w-5 bg-slate-600 dark:bg-slate-300'
                    : 'w-1.5 bg-slate-300 dark:bg-slate-600'
                }`}
                aria-label={`Highlight ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-950 transition-colors hover:text-slate-500 dark:text-white dark:hover:text-slate-400"
        >
          {cta}
          <Icon className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export default function Products() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(cardCenter - containerCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    handleScroll();
    container.style.scrollSnapType = 'x mandatory';
    container.style.scrollBehavior = 'smooth';
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;
    container.scrollTo({
      left: card.offsetLeft - (container.clientWidth - card.clientWidth) / 2,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#efe8dd_0%,#f6f1e8_40%,#fcfaf6_100%)] py-24 dark:bg-[linear-gradient(180deg,#020617_0%,#0a1628_100%)] lg:py-36"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[3%] top-24 h-[36rem] w-[36rem] rounded-full bg-rose-100/45 blur-[130px] dark:bg-indigo-900/20" />
        <div className="absolute right-[4%] top-[22%] h-[30rem] w-[30rem] rounded-full bg-amber-100/55 blur-[110px] dark:bg-sky-900/20" />
        <div className="absolute bottom-32 left-[30%] h-[26rem] w-[44rem] rounded-full bg-stone-100/60 blur-[120px] dark:bg-violet-950/15" />
        <svg className="absolute left-[2%] top-[10%] h-[28rem] w-[28rem] text-indigo-400/20 dark:text-indigo-500/10" viewBox="0 0 448 448" fill="none">
          <circle cx="224" cy="224" r="100" stroke="currentColor" strokeWidth="1" />
          <circle cx="224" cy="224" r="160" stroke="currentColor" strokeWidth="1" />
          <circle cx="224" cy="224" r="220" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        <svg className="absolute right-[3%] bottom-[8%] h-[22rem] w-[22rem] text-sky-400/20 dark:text-sky-500/10" viewBox="0 0 352 352" fill="none">
          <circle cx="176" cy="176" r="80" stroke="currentColor" strokeWidth="1" />
          <circle cx="176" cy="176" r="130" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="176" cy="176" r="174" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-20"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
            Products
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[6vw] pb-6 [-ms-overflow-style:none] [scroll-padding-inline:6vw] [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-[9vw] sm:[scroll-padding-inline:9vw] lg:px-[10vw] lg:[scroll-padding-inline:10vw]"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                ref={(node) => { cardRefs.current[index] = node; }}
                className={`w-[88vw] max-w-[68rem] shrink-0 snap-center transition-all duration-300 sm:w-[76vw] lg:w-[66vw] ${
                  index === activeIndex ? 'scale-[1] opacity-100' : 'scale-[0.96] opacity-65'
                }`}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

          {/* Dot nav */}
          <div className="mt-7 flex items-center justify-center gap-2">
            {products.map((product, index) => (
              <button
                key={product.id}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`View ${product.name}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-7 bg-slate-900 dark:bg-white'
                    : 'w-2 bg-slate-300/90 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
