import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, PlayCircle, CheckCircle2 } from 'lucide-react';

const products = [
  {
    id: 'mpp-studio',
    name: 'MPP Studio',
    category: 'API Infrastructure',
    status: 'Live' as const,
    summary: 'Turn AI-generated outputs into paid services. MPP Studio gives teams the API infrastructure to monetize agent workflows — from sandbox testing through to live production payments.',
    meta: 'Sandbox to live payments',
    highlights: [
      'Stripe-integrated payment layer, ready out of the box',
      'Sandbox environment that mirrors production exactly',
      'Built for agent-ready service delivery and API monetization',
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
    summary: 'Deployment decisions that start with your codebase, not assumptions. Shipd reads repo signals to surface the right platforms, tradeoffs, and rollout paths — no guesswork required.',
    meta: 'Repo signals and platform comparison',
    highlights: [
      'Repo-aware analysis that reads your actual stack',
      'Platform comparison with cost and complexity scoring',
      'From codebase to deploy plan in one session',
    ],
    link: 'https://shipd-eight.vercel.app/',
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
    summary: 'Translate business requirements into a build-ready backend architecture before a single line of code is written. B2DP bridges the gap between business intent and technical execution.',
    meta: 'From idea to implementation structure',
    highlights: [
      'Business logic mapped directly to data models and services',
      'AI-guided architecture scaffolding from plain language input',
      'Output teams can hand off to engineers or use to build immediately',
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
    summary: 'Ground AI outputs in operational data instead of mock inputs. Datafy MCP connects AI workflows to live data through the Model Context Protocol — reducing hallucination at the source.',
    meta: 'Operational data for AI workflows',
    highlights: [
      'MCP-native data grounding layer for AI agents',
      'Replaces static mock data with live operational signals',
      'Directly reduces AI hallucination at the input level',
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
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

function ProductCard({
  name,
  category,
  status,
  summary,
  meta,
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
  meta: string;
  highlights: readonly string[];
  image: string;
  imageClassName: string;
  link: string;
  cta: string;
  kind: 'app' | 'site' | 'video';
}) {
  const Icon = kind === 'video' ? PlayCircle : ExternalLink;
  const isAnimatedMedia = image.endsWith('.gif') || image.endsWith('.webm') || image.endsWith('.mp4');

  return (
    <article className="group overflow-hidden rounded-[1.7rem] border border-white/18 bg-white/12 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-slate-700/22 dark:bg-slate-900/22">
      {/* Image area */}
      <a href={link} target="_blank" rel="noopener noreferrer" className="relative block overflow-hidden p-1.5 sm:p-2">
        <div className="relative overflow-hidden rounded-[1.35rem] bg-white/14 dark:bg-slate-900/24">
          {isAnimatedMedia ? (
            <video
              src={image}
              autoPlay
              muted
              loop
              playsInline
              className={`h-[20rem] w-full object-cover sm:h-[25rem] lg:h-[31rem] ${imageClassName}`}
            />
          ) : (
            <img
              src={image}
              alt={name}
              className={`h-[20rem] w-full object-cover sm:h-[25rem] lg:h-[31rem] ${imageClassName}`}
            />
          )}
          {/* Status badge over image */}
          <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${statusColors[status]}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {status}
            </span>
          </div>
        </div>
      </a>

      {/* Content area */}
      <div className="px-4 pb-5 pt-4 sm:px-5 sm:pb-6 lg:px-6 lg:pb-7">
        {/* Category + meta row */}
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-slate-100/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
            {category}
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">· {meta}</span>
        </div>

        {/* Name */}
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl lg:text-[2.4rem]">
          {name}
        </h3>

        {/* Summary */}
        <p className="mt-2.5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-7">
          {summary}
        </p>

        {/* Highlights */}
        <ul className="mt-5 space-y-2.5">
          {highlights.map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400 dark:text-slate-500" />
              <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">{point}</span>
            </li>
          ))}
        </ul>

        {/* CTA link */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-colors hover:text-slate-500 dark:text-white dark:hover:text-slate-300"
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

    if (!container) {
      return;
    }

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

    if (!container || !card) {
      return;
    }

    const left = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;

    container.scrollTo({
      left,
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
        <div className="absolute right-[12%] bottom-12 h-[20rem] w-[20rem] rounded-full bg-sky-100/35 blur-[90px] dark:bg-blue-900/15" />
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
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Four focused tools — each targeting a different layer of the AI build stack. All live, all accessible today.
          </p>
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
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[6vw] pb-6 [scroll-padding-inline:6vw] [scroll-snap-type:x_mandatory] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-[9vw] sm:[scroll-padding-inline:9vw] lg:px-[10vw] lg:[scroll-padding-inline:10vw]"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className={`w-[88vw] max-w-[72rem] shrink-0 snap-center transition-all duration-300 sm:w-[78vw] lg:w-[70vw] ${
                  index === activeIndex ? 'opacity-100 scale-[1]' : 'opacity-70 scale-[0.96]'
                }`}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-center gap-2">
            {products.map((product, index) => (
              <button
                key={product.id}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`View ${product.name}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex
                    ? 'w-8 bg-slate-900 dark:bg-white'
                    : 'w-2.5 bg-slate-300/90 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
