import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, PlayCircle } from 'lucide-react';
import { resolveContactLink } from '@/lib/site-config';

const products = [
  {
    id: 'mpp-studio',
    tag: 'Main product surface',
    name: 'MPP Studio',
    description:
      'Infrastructure for providers who want to launch paid AI services with a safer path from testing to real payment flows.',
    context:
      'MPP Studio is built around provider sandboxing, machine-readable service discovery, and payment-aware API flows so teams can test, trust, and operationalize paid AI endpoints.',
    tech: ['HTTP 402 flows', 'Discovery surface', 'Sandbox to live payments'],
    primaryLink: 'https://agent-exchange-web.vercel.app/',
    primaryLabel: 'Explore MPP Studio',
    mediaTitle: 'Paid API infrastructure for agent-ready services',
    mediaCopy:
      'The live product shows how a provider can register a service, expose a machine-readable contract, and move from sandbox testing to real payment flows.',
    mediaSrc: '/images/products/mpp-studio-surface.png',
    accent: 'from-amber-200 via-orange-100 to-white',
  },
  {
    id: 'b2dp',
    tag: 'Implementation workflow',
    name: 'B2DP',
    description:
      'A business-to-backend workflow that helps turn product requirements into structured implementation output your team can actually build on.',
    context:
      'B2DP translates business ideas into entities, workflows, schemas, contracts, and scaffolding, which makes it useful for startups, agencies, and teams that want less drift between the product idea and the build.',
    tech: ['Business analysis', 'Schema generation', 'Delivery scaffolding'],
    primaryLink: 'https://teckedd-code2save.github.io/ai-build-tools/',
    primaryLabel: 'Open workflow site',
    mediaTitle: 'From business idea to delivery-ready backend structure',
    mediaCopy:
      'The site explains the workflow clearly: model the business, generate the stack, and produce the artifacts needed for real implementation work.',
    mediaSrc: '/images/products/b2dp-surface.png',
    accent: 'from-sky-200 via-cyan-100 to-white',
  },
  {
    id: 'datafy',
    tag: 'Developer product',
    name: 'Datafy MCP',
    description:
      'A real-data bridge that helps AI tools and assistants work with operational databases instead of disconnected mock inputs.',
    context:
      'The demo shows Datafy powering Claude-based visualizations with real customer data, which is a stronger signal than a static product mockup because the value is immediately visible.',
    tech: ['Claude workflows', 'Operational databases', 'Real-data visualizations'],
    primaryLink: 'https://www.youtube.com/watch?v=eUEZqX97i6I',
    primaryLabel: 'Watch Datafy in action',
    mediaTitle: 'Claude visualizations powered by your real data',
    mediaCopy:
      'The walkthrough focuses on a concrete outcome customers care about: getting useful AI output from their own live data, not a synthetic demo dataset.',
    mediaSrc: 'https://i.ytimg.com/vi/eUEZqX97i6I/maxresdefault.jpg',
    accent: 'from-emerald-200 via-lime-100 to-white',
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
  tech,
  mediaTitle,
  mediaCopy,
  mediaSrc,
  primaryLink,
  primaryLabel,
}: {
  name: string;
  tech: readonly string[];
  mediaTitle: string;
  mediaCopy: string;
  mediaSrc: string;
  primaryLink: string;
  primaryLabel: string;
}) {
  const demoLink = resolveContactLink();
  const isExternalDemo = demoLink !== '#contact';
  const isVideo = primaryLabel.toLowerCase().includes('watch');

  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:rounded-[2rem] dark:border-slate-800 dark:bg-slate-950">
      <a
        href={primaryLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block h-[34rem] overflow-hidden sm:h-[42rem]"
      >
        <img
          src={mediaSrc}
          alt={name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-x-0 bottom-0">
          <div className="bg-[linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,0.78)_22%,rgba(2,6,23,0.95)_100%)] px-6 pb-5 pt-8 sm:px-8 sm:pb-6 sm:pt-10">
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur">
              {name}
            </div>
            <h3 className="mt-3 max-w-2xl text-xl font-bold tracking-tight text-white sm:text-3xl">
            {mediaTitle}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
              {mediaCopy}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/80 backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur">
                {primaryLabel}
                {isVideo ? <PlayCircle className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
              </div>
              <a
                href={demoLink}
                target={isExternalDemo ? '_blank' : undefined}
                rel={isExternalDemo ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white/80 backdrop-blur transition-colors hover:text-white"
              >
                Request demo
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </a>
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
            Products built around real customer needs.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
            These products are presented through the strongest proof available for each one: a live app, a workflow site, or a real usage demo.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-12 sm:space-y-16 lg:space-y-20"
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
