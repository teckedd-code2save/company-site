import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';
import { startCheckout } from '@/lib/checkout';
import { resolveContactLink, resolvePaymentLink } from '@/lib/site-config';

const plans = [
  {
    name: 'Starter',
    description: 'A simple entry point for teams who want to try the product direction and see fit quickly.',
    price: 20,
    features: [
      'Entry-level access to get started',
      'A low-risk way to evaluate the workflow',
      'Good fit for early exploration and testing',
    ],
    cta: 'Try it',
    popular: false,
  },
  {
    name: 'Delivery',
    description: 'For teams that want help shaping, building, and getting a usable product into the world.',
    price: 50,
    features: [
      'Product direction and implementation support',
      'Faster movement from idea to usable release',
      'Best fit for teams preparing a real launch',
    ],
    cta: 'Request demo',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For organizations that need broader scope, governance, integrations, or a tailored engagement.',
    price: null,
    features: [
      'Custom rollout and internal workflow planning',
      'Larger implementation scope',
      'Tailored commercial engagement',
    ],
    cta: 'Talk to sales',
    popular: false,
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
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

export default function Pricing() {
  const handleCheckout = async (planName: string) => {
    const demoLink = resolveContactLink();

    if (planName === 'Delivery' || planName === 'Enterprise') {
      window.location.href = demoLink;
      return;
    }

    const fallbackHref = resolvePaymentLink('starter', demoLink);

    try {
      const result = await startCheckout({
        plan: 'starter',
        billingMode: 'project',
      });

      window.location.href = result.url || result.fallbackUrl || fallbackHref;
    } catch {
      window.location.href = fallbackHref;
    }
  };

  return (
    <section id="pricing" className="bg-gray-50 py-24 dark:bg-slate-950 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            Pricing
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-black dark:text-white lg:text-5xl">
            Simple ways to get started
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Choose a starting point, request a demo, or talk to us about a broader engagement.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={itemVariants}>
              <Card
                className={`relative h-full ${
                  plan.popular
                    ? 'border-2 border-slate-900 shadow-xl dark:border-white'
                    : 'border-gray-200 dark:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-black">
                      <Sparkles className="h-4 w-4" />
                      Most popular
                    </span>
                  </div>
                )}

                <CardContent className="p-8">
                  <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">{plan.name}</h3>
                  <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>

                  <div className="mb-6">
                    {plan.price !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-black dark:text-white">${plan.price}</span>
                        <span className="text-gray-500 dark:text-gray-400">starting from</span>
                      </div>
                    ) : (
                      <div className="text-4xl font-bold text-black dark:text-white">Custom</div>
                    )}
                  </div>

                  <Button
                    className={`mb-8 w-full ${
                      plan.popular
                        ? 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200'
                        : 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200'
                    }`}
                    onClick={() => void handleCheckout(plan.name)}
                  >
                    {plan.cta}
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
