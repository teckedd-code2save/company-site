import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const products = [
  {
    id: 'mpp-studio',
    eyebrow: 'API Infrastructure · Live',
    name: 'MPP Studio',
    headline: 'Your API charges itself.',
    sub: 'MPP Studio handles discovery, sandbox testing, and payment autonomously. Your workflow becomes a paid service without touching the billing layer.',
    cta: 'Open MPP Studio',
    link: 'https://agent-exchange-web.vercel.app/',
    image: '/images/products/mpp-studio-surface.png',
    flip: false,
    proof: {
      verb: 'Monetized with',
      statement: 'From sandbox to live payment — without writing a single billing integration.',
    },
  },
  {
    id: 'shipd',
    eyebrow: 'Deployment Intelligence · Live',
    name: 'Shipd',
    headline: 'Find the right deployment path.',
    sub: 'Point it at your repo. Shipd reads your stack, scores the platforms, and returns a deployment plan — without guesswork.',
    cta: 'See Shipd',
    link: 'https://shipd-eight.vercel.app/',
    image: '/images/products/shipd-surface.png',
    flip: true,
    proof: {
      verb: 'Shipped with',
      statement: 'Repo read. Platform scored. Deployment plan returned. Deployment invisibility, engineered.',
    },
  },
  {
    id: 'b2dp',
    eyebrow: 'Product Architecture · Active',
    name: 'B2DP',
    headline: 'Architecture from a brief.',
    sub: 'Describe what you\'re building in plain language. B2DP generates data models, services, and structure — ready to hand off or build from immediately.',
    cta: 'Explore B2DP',
    link: 'https://teckedd-code2save.github.io/ai-build-tools/',
    image: '/images/products/b2dp-surface.png',
    flip: false,
    proof: {
      verb: 'Designed with',
      statement: 'Business brief in — data models, services, and architecture out. Ready for engineers immediately.',
    },
  },
  {
    id: 'datafy',
    eyebrow: 'AI Data Grounding · Beta',
    name: 'Datafy MCP',
    headline: 'AI that knows what\'s real.',
    sub: 'Connect agents to live operational data through MCP. What they reason with reflects reality — not stale mocks or hallucinated context.',
    cta: 'Watch Datafy',
    link: 'https://www.youtube.com/watch?v=eUEZqX97i6I',
    image: 'https://i.ytimg.com/vi/eUEZqX97i6I/maxresdefault.jpg',
    flip: true,
    proof: {
      verb: 'Grounded by',
      statement: 'Analysis grounded in your own data.',
    },
  },
] as const;

// Pill tag grid for B2DP proof
const b2dpTags = [
  'MPP Studio', 'Agent Workflows', 'Data Models', 'Service Contracts',
  'Serendepify Platform', 'API Service Layer', 'Event Schemas', 'DB Architecture',
];

// Compact service cards for Shipd proof
const shipdServices = [
  { name: 'MPP Studio', tags: ['Next.js', 'Vercel'] },
  { name: 'Shipd', tags: ['Vite', 'Vercel'] },
  { name: 'B2DP', tags: ['GitHub Pages'] },
  { name: 'Datafy MCP', tags: ['Node.js', 'MCP'] },
];

function ProofStrip({ id, verb, name, statement }: { id: string; verb: string; name: string; statement: string }) {
  // B2DP — pill tag grid
  if (id === 'b2dp') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="border-t border-slate-100 bg-slate-50/60 dark:border-slate-800/60 dark:bg-slate-900/30"
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-baseline gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{verb}</p>
            <p className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">{name}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {b2dpTags.map((tag, i) => (
              <span
                key={tag}
                className={`inline-flex items-center border border-slate-200 px-3 py-1 text-xs font-medium tracking-wide text-slate-600 dark:border-slate-700 dark:text-slate-400 ${
                  i % 3 === 0 ? 'bg-slate-950 text-white border-slate-950 dark:bg-white dark:text-slate-950 dark:border-white' : 'bg-white dark:bg-transparent'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // Shipd — compact service cards
  if (id === 'shipd') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="border-t border-slate-100 bg-slate-50/60 dark:border-slate-800/60 dark:bg-slate-900/30"
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-baseline gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{verb}</p>
            <p className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">{name}</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-slate-200/70 dark:bg-slate-700/40 sm:grid-cols-4">
            {shipdServices.map((svc) => (
              <div key={svc.name} className="bg-white px-4 py-4 dark:bg-slate-900">
                <p className="text-sm font-semibold text-slate-950 dark:text-white">{svc.name}</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {svc.tags.map((t) => (
                    <span key={t} className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // Default — simple strip (MPP Studio, Datafy)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="border-t border-slate-100 bg-slate-50/60 dark:border-slate-800/60 dark:bg-slate-900/30"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          <div className="shrink-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              {verb}
            </p>
            <p className="mt-0.5 text-xl font-bold tracking-tight text-slate-950 dark:text-white">
              {name}
            </p>
          </div>
          <div className="hidden h-10 w-px bg-slate-200 dark:bg-slate-800 sm:block" />
          <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
            {statement}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductFlow() {
  return (
    <div id="products">
      {products.map((product) => (
        <div key={product.id}>
          {/* ── Product section ── */}
          <section
            id={product.id}
            className="border-t border-slate-100 dark:border-slate-800/60"
          >
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
              <div
                className={`flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 ${
                  product.flip ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, x: product.flip ? 24 : -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 lg:max-w-md"
                >
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                    {product.eyebrow}
                  </p>
                  <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                    {product.headline}
                  </h2>
                  <p className="mt-5 text-base leading-7 text-slate-500 dark:text-slate-400">
                    {product.sub}
                  </p>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-50 dark:text-white"
                  >
                    {product.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </motion.div>

                {/* Image — no shell, just the screenshot */}
                <motion.div
                  initial={{ opacity: 0, x: product.flip ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1"
                >
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full rounded-xl object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
                      style={{
                        height: '22rem',
                        boxShadow: '0 20px 60px rgba(15,23,42,0.13), 0 4px 16px rgba(15,23,42,0.07)',
                      }}
                    />
                  </a>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── Proof strip ── */}
          <ProofStrip
            id={product.id}
            verb={product.proof.verb}
            name={product.name}
            statement={product.proof.statement}
          />
        </div>
      ))}
    </div>
  );
}
