import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, LoaderCircle, Sparkles } from 'lucide-react';
import { startCheckout } from '@/lib/checkout';
import { getPlanAction, resolveContactLink, resolvePaymentLink } from '@/lib/site-config';

const plans = [
  {
    key: 'starter',
    name: 'Starter',
    description: 'A small paid entry point for teams that want to validate fit quickly.',
    price: 20,
    features: [
      'Low-friction evaluation',
      'Fast path into a product conversation',
      'Useful when you need a concrete starting point',
    ],
    cta: 'Buy starter access',
    popular: false,
  },
  {
    key: 'delivery',
    name: 'Delivery',
    description: 'For teams that want help shaping, building, and shipping a usable product.',
    price: 50,
    features: [
      'Product direction and implementation support',
      'Best fit for pilots and launch work',
      'Can route to checkout or a direct conversation',
    ],
    cta: 'Start delivery',
    popular: true,
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    description: 'For broader rollouts, internal platforms, integrations, or custom commercial scope.',
    price: null,
    features: [
      'Custom scope and governance',
      'Larger implementation surface',
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
  const [pendingPlan, setPendingPlan] = useState<string | null>(null);

  const handleCheckout = async (planKey: 'starter' | 'delivery' | 'enterprise') => {
    const demoLink = resolveContactLink();
    const fallbackHref = resolvePaymentLink(planKey, demoLink);
    const action = getPlanAction(planKey);

    if (action === 'contact' || action === 'pay') {
      window.location.assign(fallbackHref);
      return;
    }

    try {
      setPendingPlan(planKey);
      const result = await startCheckout({
        plan: planKey,
        billingMode: 'project',
      });

      window.location.assign(result.url || result.fallbackUrl || fallbackHref);
    } catch {
      window.location.assign(fallbackHref);
    } finally {
      setPendingPlan(null);
    }
  };

  return (
    <section id="pricing" className="bg-gray-50 py-20 dark:bg-slate-950 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center sm:mb-12"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
            Pricing
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={itemVariants}>
              <Card
                className={`relative h-full ${
                  plan.popular
                    ? 'border-2 border-slate-900 shadow-xl dark:border-white'
                    : 'border-white/80 dark:border-slate-800/80'
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

                <CardContent className="rounded-[1.8rem] bg-white/72 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:bg-slate-950/60 sm:p-8">
                  <h3 className="mb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">{plan.name}</h3>
                  <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>

                  <div className="mb-6">
                    {plan.price !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-black dark:text-white sm:text-4xl">${plan.price}</span>
                        <span className="text-gray-500 dark:text-gray-400">starting from</span>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold text-black dark:text-white sm:text-4xl">Custom</div>
                    )}
                  </div>

                  <Button
                    className={`mb-8 w-full ${
                      plan.popular
                        ? 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200'
                        : 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200'
                    }`}
                    disabled={pendingPlan === plan.key}
                    onClick={() => void handleCheckout(plan.key)}
                  >
                    {pendingPlan === plan.key ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Redirecting
                      </>
                    ) : (
                      plan.cta
                    )}
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
