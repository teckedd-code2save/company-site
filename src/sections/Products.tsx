import { motion } from 'framer-motion';
import { ExternalLink, PlayCircle } from 'lucide-react';

const products = [
  {
    id: 'mpp-studio',
    name: 'MPP Studio',
    summary: 'Paid API infrastructure for agent-ready services.',
    meta: 'Sandbox to live payments',
    link: 'https://agent-exchange-web.vercel.app/',
    cta: 'Explore MPP Studio',
    image: '/images/products/mpp-studio-surface.png',
    imageClassName: 'object-top',
    kind: 'app',
  },
  {
    id: 'shipd',
    name: 'Shipd',
    summary: 'Deployment planning that starts from the repo, not guesswork.',
    meta: 'Repo signals and platform comparison',
    link: 'https://shipd-eight.vercel.app/',
    cta: 'See Shipd',
    image: '/images/products/shipd-surface.png',
    imageClassName: 'object-top',
    kind: 'app',
  },
  {
    id: 'b2dp',
    name: 'B2DP',
    summary: 'Business requirements translated into build-ready backend structure.',
    meta: 'From idea to implementation structure',
    link: 'https://teckedd-code2save.github.io/ai-build-tools/',
    cta: 'Explore B2DP',
    image: '/images/products/b2dp-surface.png',
    imageClassName: 'object-top',
    kind: 'site',
  },
  {
    id: 'datafy',
    name: 'Datafy MCP',
    summary: 'AI outputs grounded in operational data instead of mock inputs.',
    meta: 'Operational data for AI workflows',
    link: 'https://www.youtube.com/watch?v=eUEZqX97i6I',
    cta: 'Watch Datafy in action',
    image: 'https://i.ytimg.com/vi/eUEZqX97i6I/maxresdefault.jpg',
    imageClassName: 'object-center',
    kind: 'video',
  },
] as const;

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
  summary,
  meta,
  image,
  imageClassName,
  link,
  cta,
  kind,
}: {
  name: string;
  summary: string;
  meta: string;
  image: string;
  imageClassName: string;
  link: string;
  cta: string;
  kind: 'app' | 'site' | 'video';
}) {
  const Icon = kind === 'video' ? PlayCircle : ExternalLink;

  return (
    <article className="group overflow-hidden rounded-[2.4rem] border border-white/40 bg-white/42 shadow-[0_32px_100px_rgba(15,23,42,0.12)] backdrop-blur-3xl dark:border-slate-700/40 dark:bg-slate-900/52">
      <a href={link} target="_blank" rel="noopener noreferrer" className="block overflow-hidden p-3 pb-0 sm:p-4 sm:pb-0">
        <div className="overflow-hidden rounded-[2rem] bg-slate-100/70 dark:bg-slate-800/70">
          <img
            src={image}
            alt={name}
            className={`h-[22rem] w-full object-cover sm:h-[28rem] lg:h-[34rem] ${imageClassName}`}
          />
        </div>
      </a>
      <div className="p-5 sm:p-6 lg:p-7">
        <p className="text-[10px] uppercase tracking-[0.26em] text-slate-400 dark:text-slate-500">{meta}</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">{name}</h3>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
          {summary}
        </p>
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
        {/* decorative rings */}
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
          className="space-y-10 lg:space-y-14"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
