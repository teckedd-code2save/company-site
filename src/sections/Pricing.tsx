import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <section id="pricing" className="relative overflow-hidden bg-[linear-gradient(180deg,#f5efe6_0%,#f0e9df_52%,#e9e1d7_100%)] py-24 dark:bg-[linear-gradient(180deg,#0f172a_0%,#0a1628_100%)] lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[2%] top-16 h-[32rem] w-[32rem] rounded-full bg-amber-100/55 blur-[110px] dark:bg-indigo-900/18" />
        <div className="absolute right-[3%] bottom-16 h-[26rem] w-[26rem] rounded-full bg-rose-100/45 blur-[100px] dark:bg-violet-900/15" />
        <div className="absolute left-1/2 top-1/2 h-[20rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-[120px] dark:bg-sky-900/10" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <motion.div key={plan.name} variants={itemVariants} className="relative flex flex-col">
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-black">
                    <Sparkles className="h-3.5 w-3.5" />
                    Most popular
                  </span>
                </div>
              )}
              <div className={`relative flex h-full flex-col rounded-[1.8rem] border bg-white/90 p-6 shadow-[0_32px_90px_rgba(15,23,42,0.14)] backdrop-blur-3xl dark:bg-slate-900/80 sm:p-8 ${
                plan.popular
                  ? 'border-indigo-300/70 ring-2 ring-indigo-400/30 dark:border-indigo-600/50 dark:ring-indigo-500/20'
                  : 'border-white/55 dark:border-slate-700/50'
              }`}>
                <h3 className="mb-2 text-xl font-bold text-slate-950 dark:text-white sm:text-2xl">{plan.name}</h3>
                <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>

                <div className="mb-6">
                  {plan.price !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">${plan.price}</span>
                      <span className="text-slate-500 dark:text-slate-400">starting from</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">Custom</div>
                  )}
                </div>

                <Button
                  className="mb-8 w-full rounded-xl bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200"
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
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-500 dark:text-indigo-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

}
