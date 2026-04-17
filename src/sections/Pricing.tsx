import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, LoaderCircle, Sparkles, RefreshCw } from 'lucide-react';
import { startCheckout } from '@/lib/checkout';
import { getPlanAction, resolveContactLink, resolvePaymentLink } from '@/lib/site-config';

type BillingMode = 'project' | 'retainer';

const plans = {
  project: [
    {
      key: 'starter' as const,
      name: 'Starter',
      badge: null,
      description: 'The entry point for teams that want to validate fit with a real stake in the outcome. One scoped deliverable, one product surface.',
      price: 20,
      priceNote: 'one-time',
      features: [
        'Access to one product surface of your choice',
        'Scoped evaluation with a concrete starting point',
        'Async support via email throughout',
        'One structured feedback session included',
        'Receipt and invoice issued on payment',
      ],
      cta: 'Get started',
      popular: false,
    },
    {
      key: 'delivery' as const,
      name: 'Delivery',
      badge: 'Most popular',
      description: 'For teams actively building. Includes product direction, implementation support, and a clear path to a shippable outcome.',
      price: 50,
      priceNote: 'one-time',
      features: [
        'Full access across all product surfaces',
        'Product direction and scoping session',
        'Implementation guidance and hands-on support',
        'Pilot launch preparation and hardening',
        'Priority async support throughout delivery',
        'Receipt and invoice issued on payment',
      ],
      cta: 'Start delivery',
      popular: true,
    },
    {
      key: 'enterprise' as const,
      name: 'Enterprise',
      badge: null,
      description: 'For organizations running broader rollouts, internal AI platforms, or multi-product integrations at scale.',
      price: null,
      priceNote: null,
      features: [
        'Custom scope, timeline, and delivery plan',
        'Dedicated implementation and integration support',
        'Governance and compliance framing included',
        'Custom commercial terms and invoicing',
        'Slack or dedicated async communication channel',
        'Executive briefing and stakeholder materials',
      ],
      cta: 'Talk to us',
      popular: false,
    },
  ],
  retainer: [
    {
      key: 'starter' as const,
      name: 'Starter',
      badge: null,
      description: 'Ongoing access for teams that want a consistent touchpoint — regular check-ins, product guidance, and iterative support each month.',
      price: 49,
      priceNote: 'per month',
      features: [
        'Monthly scoped engagement on one product surface',
        'Regular async check-ins and reviews',
        'Iterative feedback cycles throughout the month',
        'Email support with next-day response time',
        'Monthly receipt and invoice provided',
      ],
      cta: 'Start monthly',
      popular: false,
    },
    {
      key: 'delivery' as const,
      name: 'Delivery',
      badge: 'Most popular',
      description: 'For teams in active build mode. Monthly retainer with full product direction, implementation support, and continuous delivery momentum.',
      price: 149,
      priceNote: 'per month',
      features: [
        'Full product surface access, all tools included',
        'Monthly planning session with product direction',
        'Ongoing implementation and architecture support',
        'Launch support and iterative product hardening',
        'Priority support with same-day response',
        'Monthly receipt and invoice provided',
      ],
      cta: 'Start monthly',
      popular: true,
    },
    {
      key: 'enterprise' as const,
      name: 'Enterprise',
      badge: null,
      description: 'Dedicated monthly engagement for organizations running internal AI platforms, multi-product rollouts, or complex integrations.',
      price: null,
      priceNote: null,
      features: [
        'Custom monthly scope and delivery rhythm',
        'Dedicated implementation and integration support',
        'Governance, compliance, and reporting included',
        'Custom commercial terms and invoicing',
        'Slack channel and structured async workflow',
        'Quarterly executive briefings available',
      ],
      cta: 'Talk to us',
      popular: false,
    },
  ],
};

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
  const [billingMode, setBillingMode] = useState<BillingMode>('project');

  const activePlans = plans[billingMode];

  const navigate = (href: string) => {
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.assign(href);
    }
  };

  const handleCheckout = async (planKey: 'starter' | 'delivery' | 'enterprise') => {
    const demoLink = resolveContactLink();
    const fallbackHref = resolvePaymentLink(planKey, demoLink);
    const action = getPlanAction(planKey);

    if (action === 'contact' || action === 'pay') {
      navigate(fallbackHref);
      return;
    }

    try {
      setPendingPlan(planKey);
      const result = await startCheckout({ plan: planKey, billingMode });
      navigate(result.url || result.fallbackUrl || fallbackHref);
    } catch {
      navigate(fallbackHref);
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
            Pricing
          </p>
          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
            Simple, transparent pricing.
          </h2>

          {/* Billing mode toggle */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-2xl border border-slate-200/80 bg-white/80 p-1.5 shadow-sm backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/60">
            <button
              type="button"
              onClick={() => setBillingMode('project')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
                billingMode === 'project'
                  ? 'bg-slate-950 text-white shadow-sm dark:bg-white dark:text-black'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              One-time
            </button>
            <button
              type="button"
              onClick={() => setBillingMode('retainer')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
                billingMode === 'retainer'
                  ? 'bg-slate-950 text-white shadow-sm dark:bg-white dark:text-black'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Monthly
            </button>
          </div>
        </motion.div>

        <motion.div
          key={billingMode}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {activePlans.map((plan) => (
            <motion.div key={plan.name} variants={itemVariants} className="relative flex flex-col">
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-black">
                    <Sparkles className="h-3.5 w-3.5" />
                    {plan.badge}
                  </span>
                </div>
              )}
              <div className={`relative flex h-full flex-col rounded-2xl border bg-white/90 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.10)] backdrop-blur-3xl dark:bg-slate-900/80 ${
                plan.popular
                  ? 'border-indigo-300/70 ring-2 ring-indigo-400/30 dark:border-indigo-600/50 dark:ring-indigo-500/20'
                  : 'border-white/55 dark:border-slate-700/50'
              }`}>
                <h3 className="mb-1.5 text-lg font-semibold text-slate-950 dark:text-white">{plan.name}</h3>
                <p className="mb-5 text-sm leading-6 text-slate-500 dark:text-slate-400">{plan.description}</p>

                <div className="mb-5">
                  {plan.price !== null ? (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-semibold text-slate-950 dark:text-white">${plan.price}</span>
                      <span className="text-sm text-slate-400 dark:text-slate-500">{plan.priceNote} · starting from</span>
                    </div>
                  ) : (
                    <div className="text-2xl font-semibold text-slate-950 dark:text-white">Custom</div>
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

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center text-sm text-slate-400 dark:text-slate-500"
        >
          Stripe-secured · receipt issued on payment · <a href="#contact" className="underline underline-offset-2 hover:text-slate-600 dark:hover:text-slate-300">not sure which plan? get in touch</a>
        </motion.p>
      </div>
    </section>
  );
}
