import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Check, LoaderCircle, RefreshCw, Receipt } from 'lucide-react';
import DrawnUnderline from '@/components/DrawnUnderline';
import { Button } from '@/components/ui/button';
import { useModal } from '@/lib/modal-context';
import { startCheckout } from '@/lib/checkout';
import { getPlanAction, resolveContactLink, resolvePaymentLink } from '@/lib/site-config';

const MAUVE = '#D4A5B0';

type BillingMode = 'project' | 'retainer';

const plans = {
  project: [
    {
      key: 'starter' as const,
      name: 'Starter',
      badge: null,
      description: 'Pick one product. Run a real evaluation with a concrete starting point.',
      price: 20,
      priceNote: 'one-time',
      features: [
        'One product surface of your choice',
        'Scoped evaluation, clear deliverable',
        'Async email support throughout',
        'One structured feedback session',
        'Receipt and invoice on payment',
      ],
      cta: 'Get started',
      popular: false,
    },
    {
      key: 'delivery' as const,
      name: 'Delivery',
      badge: 'Most popular',
      description: 'Full product access, direction, and a path to something shippable.',
      price: 50,
      priceNote: 'one-time',
      features: [
        'Full access across all product surfaces',
        'Product direction and scoping session',
        'Hands-on implementation support',
        'Pilot launch prep and hardening',
        'Priority async support',
        'Receipt and invoice on payment',
      ],
      cta: 'Start delivery',
      popular: true,
    },
    {
      key: 'enterprise' as const,
      name: 'Enterprise',
      badge: null,
      description: 'Custom scope for organisations with internal AI platforms at scale.',
      price: null,
      priceNote: null,
      features: [
        'Custom scope, timeline, delivery plan',
        'Dedicated implementation support',
        'Governance and compliance framing',
        'Custom commercial terms',
        'Dedicated async channel',
        'Executive briefing materials',
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
      description: 'A consistent monthly touchpoint — guidance, check-ins, and iterative support.',
      price: 49,
      priceNote: '/ month',
      features: [
        'Monthly engagement on one surface',
        'Regular async check-ins',
        'Iterative feedback throughout',
        'Email support, next-day response',
        'Monthly receipt and invoice',
      ],
      cta: 'Start monthly',
      popular: false,
    },
    {
      key: 'delivery' as const,
      name: 'Delivery',
      badge: 'Most popular',
      description: 'Active build mode, monthly. Full access, direction, and continuous delivery.',
      price: 149,
      priceNote: '/ month',
      features: [
        'Full access across all surfaces',
        'Monthly planning and direction',
        'Implementation and architecture support',
        'Launch support and hardening',
        'Priority same-day support',
        'Monthly receipt and invoice',
      ],
      cta: 'Start monthly',
      popular: true,
    },
    {
      key: 'enterprise' as const,
      name: 'Enterprise',
      badge: null,
      description: 'Dedicated monthly engagement for organisations with complex AI rollouts.',
      price: null,
      priceNote: null,
      features: [
        'Custom monthly scope and rhythm',
        'Dedicated implementation support',
        'Governance and compliance reporting',
        'Custom terms and invoicing',
        'Slack or dedicated async channel',
        'Quarterly executive briefings',
      ],
      cta: 'Talk to us',
      popular: false,
    },
  ],
};

export default function PricingModal() {
  const { pricingOpen, closePricing, openContact } = useModal();
  const [billingMode, setBillingMode] = useState<BillingMode>('project');
  const [pendingPlan, setPendingPlan] = useState<string | null>(null);

  const activePlans = plans[billingMode];

  const handleCheckout = async (planKey: 'starter' | 'delivery' | 'enterprise') => {
    const demoLink = resolveContactLink();
    const fallbackHref = resolvePaymentLink(planKey, demoLink);
    const action = getPlanAction(planKey);

    if (action === 'contact') { closePricing(); openContact(); return; }
    if (action === 'pay') { window.location.assign(fallbackHref); return; }

    try {
      setPendingPlan(planKey);
      const result = await startCheckout({ plan: planKey, billingMode });
      window.location.assign(result.url || result.fallbackUrl || fallbackHref);
    } catch {
      window.location.assign(fallbackHref);
    } finally {
      setPendingPlan(null);
    }
  };

  return (
    <AnimatePresence>
      {pricingOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
        >
          <motion.div
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-full"
          >
            {/* Top bar */}
            <div className="glass-strong sticky top-0 z-10 flex h-14 items-center justify-between border-b border-white/[0.06] px-6 sm:px-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Pricing
              </span>
              <button
                onClick={closePricing}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-10">
              {/* Header */}
              <div className="mb-14">
                <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Start small.{' '}
                  <span className="font-light text-white/35">
                    Scale when it works.
                  </span>
                </h1>
                <DrawnUnderline className="mt-4" width={64} delay={0.3} color={MAUVE} />
                <p className="mt-5 max-w-lg text-base text-white/50">
                  No procurement loops. No black-box quotes. Pick a tier and get going.
                </p>

                {/* Billing toggle */}
                <div className="glass-card mt-8 inline-flex items-center gap-1 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setBillingMode('project')}
                    className={`px-5 py-2 text-sm font-medium transition-all rounded-lg ${
                      billingMode === 'project'
                        ? 'bg-white text-black'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    One-time
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingMode('retainer')}
                    className={`flex items-center gap-1.5 px-5 py-2 text-sm font-medium transition-all rounded-lg ${
                      billingMode === 'retainer'
                        ? 'bg-white text-black'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    <RefreshCw className="h-3 w-3" />
                    Monthly
                  </button>
                </div>
              </div>

              {/* Plans */}
              <motion.div
                key={billingMode}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-4 md:grid-cols-3"
              >
                {activePlans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`glass-card relative flex flex-col rounded-2xl p-8 ${
                      plan.popular ? 'border-white/15' : ''
                    }`}
                    style={plan.popular ? { boxShadow: '0 4px 32px rgba(0,0,0,0.4), 0 0 24px rgba(212,165,176,0.08), inset 0 1px 0 rgba(255,255,255,0.06)' } : undefined}
                  >
                    {plan.badge && (
                      <span
                        className="mb-4 inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                        style={{ background: 'linear-gradient(135deg, #E898A8, #D4A5B0)', color: '#000' }}
                      >
                        {plan.badge}
                      </span>
                    )}

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                      {plan.name}
                    </p>

                    <div className="mt-4">
                      {plan.price !== null ? (
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-5xl font-semibold tracking-tight text-white">
                            ${plan.price}
                          </span>
                          <span className="text-sm text-white/40">
                            {plan.priceNote}
                          </span>
                        </div>
                      ) : (
                        <span className="text-4xl font-semibold tracking-tight text-white">
                          Custom
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-sm leading-6 text-white/45">
                      {plan.description}
                    </p>

                    <Button
                      className={`mt-6 w-full rounded-full py-5 text-sm font-medium transition-opacity hover:opacity-90 ${
                        plan.popular
                          ? 'bg-white text-black'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                      disabled={pendingPlan === plan.key}
                      onClick={() => void handleCheckout(plan.key)}
                    >
                      {pendingPlan === plan.key ? (
                        <><LoaderCircle className="h-4 w-4 animate-spin" /> Redirecting</>
                      ) : plan.cta}
                    </Button>

                    <ul className="mt-8 space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />
                          <span className="text-sm text-white/55">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>

              {/* Reassurance */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <Receipt className="h-3.5 w-3.5 shrink-0" />
                  Receipt and invoice on every payment
                </div>
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <Check className="h-3.5 w-3.5 shrink-0" />
                  Stripe-secured · no account required
                </div>
                <button
                  onClick={() => { closePricing(); openContact(); }}
                  className="text-sm text-white/40 underline underline-offset-2 transition-colors hover:text-white"
                >
                  Not sure which plan fits? Send a message →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
