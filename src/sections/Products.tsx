import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { resolveContactLink } from '@/lib/site-config';

const products = [
  {
    id: 'datafy',
    tag: 'Self-serve infrastructure',
    name: 'Datafy MCP',
    description:
      'A database gateway that helps AI tools work with operational data across PostgreSQL, MySQL, SQL Server, SQLite, Redis, and Elasticsearch.',
    context:
      'Designed for organizations that need a reliable bridge between AI workflows and existing systems.',
    tech: ['MCP', 'Multi-database', 'Operational data'],
    image: 'https://opengraph.githubassets.com/1/teckedd-code2save/company-site',
    imageAlt: 'Serendepify infrastructure preview',
    layout: 'copy-left',
  },
  {
    id: 'b2dp',
    tag: 'Implementation workflow',
    name: 'B2DP',
    description:
      'A guided workflow for moving from business requirements to a usable backend and delivery foundation much faster.',
    context:
      'Useful when a team needs direction, structure, and momentum at the start of a product build.',
    tech: ['Workflow design', 'Backend setup', 'Delivery acceleration'],
    image: '/images/products/b2dp-surface.png',
    imageAlt: 'Serendepify workflow preview',
    layout: 'copy-right',
  },
  {
    id: 'reachy',
    tag: 'Applied product',
    name: 'REACHY AI',
    description:
      'A multilingual healthcare voice experience designed for teams serving users across lower-resource language environments.',
    context:
      'Well suited to organizations exploring voice, healthcare access, and guided AI interactions for real people.',
    tech: ['Healthcare AI', 'Voice UI', 'Multilingual support'],
    image: '/images/products/reachy-surface.png',
    imageAlt: 'Reachy AI mobile product screens',
    layout: 'stacked',
  },
  {
    id: 'agent-exchange',
    tag: 'Platform play',
    name: 'Agent Exchange',
    description:
      'A platform concept for reusable agent workflows, shared integrations, and coordinated automation across teams.',
    context:
      'A strong fit for teams thinking beyond a single feature and toward a broader automation layer.',
    tech: ['Automation', 'Shared workflows', 'Platform design'],
    image: 'https://opengraph.githubassets.com/1/teckedd-code2save/agent-exchange',
    imageAlt: 'Agent Exchange product preview',
    layout: 'copy-left',
  },
  {
    id: 'urbanize',
    tag: 'Vertical product',
    name: 'Urbanize',
    description:
      'A city and operations product focused on planning, comparison, and decision support across urban workflows.',
    context:
      'A good fit for teams working on maps, planning interfaces, or operational visibility tools.',
    tech: ['Maps', 'Planning tools', 'Decision support'],
    image: '/images/products/urbanize-surface.png',
    imageAlt: 'Urbanize time-travel comparison map interface',
    layout: 'copy-right',
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

function ProductMedia({ image, imageAlt, name }: { image: string; imageAlt: string; name: string }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_32px_90px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <span className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />
        <span className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />
        <span className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />
        <span className="ml-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          {name}
        </span>
      </div>
      <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 dark:bg-[linear-gradient(180deg,#0f172a_0%,#020617_100%)] sm:p-6">
        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-[0_18px_40px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
          <img src={image} alt={imageAlt} className="h-[20rem] w-full object-cover object-top sm:h-[24rem]" />
        </div>
      </div>
    </div>
  );
}

function ProductCopy({
  tag,
  name,
  description,
  context,
  tech,
}: {
  tag: string;
  name: string;
  description: string;
  context: string;
  tech: readonly string[];
}) {
  const demoLink = resolveContactLink();
  const isExternalDemo = demoLink !== '#contact';

  return (
    <div className="max-w-xl">
      <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        {tag}
      </div>
      <h3 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white lg:text-4xl">
        {name}
      </h3>
      <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{description}</p>
      <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        {context}
      </div>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {tech.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
          >
            {item}
          </span>
        ))}
      </div>
      <a
        href={demoLink}
        target={isExternalDemo ? '_blank' : undefined}
        rel={isExternalDemo ? 'noopener noreferrer' : undefined}
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-colors hover:text-slate-600 dark:text-white dark:hover:text-slate-300"
      >
        Request demo
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

export default function Products() {
  const demoLink = resolveContactLink();
  const isExternalDemo = demoLink !== '#contact';

  return (
    <section id="products" className="relative overflow-hidden bg-white py-24 dark:bg-slate-950 lg:py-32">
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
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            Products
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 dark:text-white lg:text-5xl">
            Products designed around real workflows.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Each product reflects a different kind of customer need, from data infrastructure to operational software and guided AI experiences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16 lg:space-y-24"
        >
          {products.map((product) => {
            if (product.layout === 'stacked') {
              return (
                <motion.article
                  key={product.id}
                  variants={itemVariants}
                  className="grid gap-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/60 lg:p-8"
                >
                  <ProductMedia image={product.image} imageAlt={product.imageAlt} name={product.name} />
                  <div className="mx-auto max-w-2xl text-center lg:text-left">
                    <ProductCopy {...product} />
                  </div>
                </motion.article>
              );
            }

            const copyFirst = product.layout === 'copy-left';

            return (
              <motion.article
                key={product.id}
                variants={itemVariants}
                className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
              >
                <div className={copyFirst ? 'order-1' : 'order-2 lg:order-1'}>
                  <ProductCopy {...product} />
                </div>
                <div className={copyFirst ? 'order-2' : 'order-1 lg:order-2'}>
                  <ProductMedia image={product.image} imageAlt={product.imageAlt} name={product.name} />
                </div>
              </motion.article>
            );
          })}
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
