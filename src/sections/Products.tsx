import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, PlayCircle } from 'lucide-react';
import { resolveContactLink } from '@/lib/site-config';

const products = [
  {
    id: 'mpp-studio',
    name: 'MPP Studio',
    summary: 'Paid API infrastructure for agent-ready services.',
    proof: 'Sandboxed provider onboarding, machine-readable discovery, and a path from test calls to real payments.',
    tech: ['Payments', 'API contracts', 'Provider sandbox'],
    link: 'https://agent-exchange-web.vercel.app/',
    cta: 'Explore MPP Studio',
    image: '/images/products/mpp-studio-surface.png',
    kind: 'app',
  },
  {
    id: 'shipd',
    name: 'Shipd',
    summary: 'Deployment planning that starts from the repo, not guesswork.',
    proof: 'Connect a GitHub repository, inspect deployment signals, compare realistic platforms, and generate a plan before touching infra.',
    tech: ['GitHub sync', 'Platform comparison', 'Deployment planning'],
    link: 'https://shipd-eight.vercel.app/',
    cta: 'See Shipd',
    image: '/images/products/shipd-surface.png',
    kind: 'app',
  },
  {
    id: 'b2dp',
    name: 'B2DP',
    summary: 'Business requirements translated into build-ready backend structure.',
    proof: 'Shapes product ideas into entities, workflows, schemas, contracts, and scaffolding for actual implementation work.',
    tech: ['Business analysis', 'Schema design', 'Delivery scaffolding'],
    link: 'https://teckedd-code2save.github.io/ai-build-tools/',
    cta: 'Explore B2DP',
    image: '/images/products/b2dp-surface.png',
    kind: 'site',
  },
  {
    id: 'datafy',
    name: 'Datafy MCP',
    summary: 'AI outputs grounded in operational data instead of mock inputs.',
    proof: 'The demo shows Claude generating useful visualizations from live customer data, which is the real value proposition.',
    tech: ['Claude workflows', 'Operational data', 'Visual analytics'],
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
  proof,
  tech,
  image,
  link,
  cta,
  kind,
}: {
  name: string;
  summary: string;
  proof: string;
  tech: readonly string[];
  image: string;
  link: string;
  cta: string;
  kind: 'app' | 'site' | 'video';
}) {
  const demoLink = resolveContactLink();
  const isExternalDemo = demoLink !== '#contact';
  const Icon = kind === 'video' ? PlayCircle : ExternalLink;

  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950">
      <a href={link} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden">
        <img
          src={image}
          alt={name}
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </a>
      <div className="space-y-5 p-6 sm:p-7">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">{name}</h3>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300">{summary}</p>
          <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">{proof}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200"
          >
            {cta}
            <Icon className="h-4 w-4" />
          </a>
          <a
            href={demoLink}
            target={isExternalDemo ? '_blank' : undefined}
            rel={isExternalDemo ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
          >
            Discuss fit
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Products() {
  const demoLink = resolveContactLink();
  const isExternalDemo = demoLink !== '#contact';

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
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-20"
        >
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            Products
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
            Built products with something real to inspect.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
            Each one is shown through the surface a customer would actually judge: a live app, a workflow site, or a real usage demo.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 lg:grid-cols-2"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-16 text-center"
        >
          <a
            href={demoLink}
            target={isExternalDemo ? '_blank' : undefined}
            rel={isExternalDemo ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 hover:text-slate-600 dark:text-white dark:hover:text-slate-300"
          >
            Need help choosing the right fit?
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
