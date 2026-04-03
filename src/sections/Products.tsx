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
    kind: 'video',
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
    },
  },
};

function ProductCard({
  name,
  summary,
  meta,
  image,
  link,
  cta,
  kind,
}: {
  name: string;
  summary: string;
  meta: string;
  image: string;
  link: string;
  cta: string;
  kind: 'app' | 'site' | 'video';
}) {
  const Icon = kind === 'video' ? PlayCircle : ExternalLink;

  return (
    <article className="group overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/72 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-1 dark:border-slate-800/80 dark:bg-slate-950/65">
      <a href={link} target="_blank" rel="noopener noreferrer" className="relative block min-h-[42rem] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(15,23,42,0)_0%,rgba(15,23,42,0.18)_26%,rgba(15,23,42,0.42)_100%)] p-5 sm:p-6">
          <div className="rounded-[2rem] border border-white/70 bg-white/56 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-slate-800/70 dark:bg-slate-950/55">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">{meta}</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{name}</h3>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              {summary}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-colors group-hover:text-slate-600 dark:text-white dark:group-hover:text-slate-300">
              {cta}
              <Icon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}

export default function Products() {
  return (
    <section id="products" className="relative overflow-hidden bg-white py-20 dark:bg-slate-950 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-slate-100 blur-3xl dark:bg-slate-800/30" />
        <div className="absolute bottom-0 right-8 h-80 w-80 rounded-full bg-slate-100/80 blur-3xl dark:bg-slate-900/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
        >
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
            Products
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8 lg:space-y-10"
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
