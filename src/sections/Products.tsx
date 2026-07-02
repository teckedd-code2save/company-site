import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const products = [
  {
    id: 'forge',
    name: 'Forge',
    category: 'Product Design',
    status: 'Active' as const,
    tagline: 'Brief to Data Product. Architecture out.',
    summary: 'Describe what you\'re building in plain language. Forge maps it to data models, services, and an architecture your agent can build from immediately.',
    highlights: [
      'Business logic mapped to data models and services',
      'AI-guided scaffolding from plain language input',
      'Output your team can hand off or build from directly',
    ],
    link: 'https://www.npmjs.com/package/@teckedd-code2save/forge',
    cta: 'Explore Forge',
    image: '/images/products/forge-surface.gif',
    kind: 'site' as const,
  },
  {
    id: 'shipd',
    name: 'Shipd',
    category: 'Developer Tooling',
    status: 'Live' as const,
    tagline: 'Point it at your repos.',
    summary: 'Stop guessing where to deploy. Shipd reads your actual codebase — stack, dependencies, config — and surfaces the platform that fits, with tradeoffs scored.',
    highlights: [
      'Repo-aware analysis, not template matching',
      'Platform comparison with cost and complexity scored',
      'From codebase to deploy plan in one session',
    ],
    link: 'https://shipd-seven.vercel.app/',
    cta: 'See Shipd',
    image: '/images/products/shipd-surface.gif',
    kind: 'app' as const,
  },
  {
    id: 'mpp-studio',
    name: 'MPP Studio',
    category: 'API Infrastructure',
    status: 'Live' as const,
    tagline: 'The payment layer for AI services.',
    summary: 'Register any HTTP API and get a proxy endpoint instantly. Test the full 402 payment flow with fake money, graduate to real USDC on Base Sepolia, and get discovered by AI agents that pay automatically per call.',
    highlights: [
      'HTTP 402 flows with fake-money sandbox testing',
      'Real USDC on Base Sepolia via Circle faucet',
      'Agents discover and pay automatically per call',
    ],
    link: 'https://agent-exchange-web.vercel.app/',
    cta: 'Open MPP Studio',
    image: '/images/products/mpp-studio-surface.gif',
    kind: 'app' as const,
  },
  {
    id: 'datafy',
    name: 'Datafy MCP',
    category: 'AI Grounding',
    status: 'Beta' as const,
    tagline: 'Grounded in your live business data.',
    summary: 'AI agents drift when their inputs are stale or invented. Datafy connects them to your live operational data via MCP — so what they know is what\'s actually true.',
    highlights: [
      'MCP-native grounding layer for AI agents',
      'Replaces static mock data with live operational signals',
      'Reduces hallucination at the input, not the output',
    ],
    link: 'https://www.npmjs.com/package/@teckedd-code2save/datafy',
    cta: 'View package',
    image: '/images/products/datafy-surface.png',
    kind: 'video' as const,
  },
] as const;

const statusColors = {
  Live: 'bg-emerald-500/15 text-emerald-700 border-emerald-300/50 dark:text-emerald-400',
  Active: 'bg-sky-500/15 text-sky-700 border-sky-300/50 dark:text-sky-400',
  Beta: 'bg-amber-500/15 text-amber-700 border-amber-300/50 dark:text-amber-400',
};

function ProductCard({
  name,
  category,
  status,
  tagline,
  summary,
  highlights,
  image,
  link,
  cta,
}: {
  name: string;
  category: string;
  status: 'Live' | 'Active' | 'Beta';
  tagline: string;
  summary: string;
  highlights: readonly string[];
  image: string;
  link: string;
  cta: string;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_4px_32px_rgba(15,23,42,0.07)] dark:border-slate-700/40 dark:bg-slate-900">

      {/* ── Image block ── floats as cutout against card bg */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden bg-[#0b1018] p-4 sm:p-5"
        style={{ borderRadius: '1.6rem 1.6rem 0 0' }}
      >
        <div className="flex h-[20rem] items-center justify-center rounded-[1.3rem] bg-[#0f1117] sm:h-[24rem] lg:h-[27rem]">
          <img
            src={image}
            alt={name}
            className="h-full w-full rounded-xl object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
            style={{
              boxShadow: '0 -4px 40px rgba(0,0,0,0.35)',
            }}
          />
        </div>
      </a>

      {/* ── Divider ── */}
      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* ── Text block ── detached from image */}
      <div className="flex flex-1 flex-col px-6 pb-7 pt-6 sm:px-7 sm:pb-8">

        {/* Category + status row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
            {category}
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${statusColors[status]}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {status}
          </span>
        </div>

        {/* Name — bold */}
        <h3 className="text-3xl font-medium leading-tight tracking-tight text-slate-950 dark:text-white lg:text-4xl">
          {name}
        </h3>

        {/* Tagline — light, italic */}
        <p className="mt-1 text-base font-light italic text-slate-500 dark:text-slate-400">
          {tagline}
        </p>

        {/* Summary — regular */}
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {summary}
        </p>

        {/* Highlights */}
        <ul className="mt-5 space-y-2">
          {highlights.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
              {point}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto pt-6">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-60 dark:text-white"
          >
            {cta}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
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
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;
    const left = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
    container.scrollTo({ left, behavior: 'smooth' });
    setActiveIndex(index);
  };

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#efe8dd_0%,#f6f1e8_40%,#fcfaf6_100%)] py-24 dark:bg-[linear-gradient(180deg,#020617_0%,#0a1628_100%)] lg:py-36"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[3%] top-24 h-[36rem] w-[36rem] rounded-full bg-rose-100/35 blur-[130px] dark:bg-indigo-900/15" />
        <div className="absolute right-[4%] top-[22%] h-[30rem] w-[30rem] rounded-full bg-amber-100/45 blur-[110px] dark:bg-sky-900/15" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-3xl sm:mb-20"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
            Live products
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            The tools exist.{' '}
            <span className="font-light text-slate-400 dark:text-slate-500">
              Use them.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 dark:text-slate-400 sm:text-lg">
            No pitch. No procurement loop. Built to earn their place in your stack.
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[6vw] pb-6 [scroll-padding-inline:6vw] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-[9vw] sm:[scroll-padding-inline:9vw] lg:px-[10vw] lg:[scroll-padding-inline:10vw]"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            ref={(node) => { cardRefs.current[index] = node; }}
            className={`w-[88vw] max-w-[26rem] shrink-0 snap-center transition-all duration-300 sm:w-[72vw] lg:w-[26rem] ${
              index === activeIndex ? 'opacity-100 scale-[1]' : 'opacity-60 scale-[0.97]'
            }`}
          >
            <ProductCard {...product} />
          </motion.div>
        ))}
      </div>

      {/* Dot nav */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {products.map((product, index) => (
          <button
            key={product.id}
            type="button"
            onClick={() => scrollToIndex(index)}
            aria-label={`View ${product.name}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'w-8 bg-slate-900 dark:bg-white'
                : 'w-2 bg-slate-300/80 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-500'
            }`}
          />
        ))}
      </div>

      <p className="mt-5 text-center text-xs font-light uppercase tracking-widest text-slate-400 dark:text-slate-500">
        More tools coming soon
      </p>
    </section>
  );
}
