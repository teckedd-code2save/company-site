import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for side projects and experimentation',
    price: { monthly: 0, yearly: 0 },
    features: [
      'Up to 1,000 API calls/month',
      '2 database connections',
      'Community support',
      'Basic MCP tools',
      'Public documentation',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For teams building production applications',
    price: { monthly: 49, yearly: 39 },
    features: [
      'Up to 100,000 API calls/month',
      'Unlimited connections',
      'Priority support',
      'Custom MCP tools',
      'Advanced analytics',
      'Team collaboration',
      'SLA guarantee',
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For organizations with advanced needs',
    price: { monthly: null, yearly: null },
    features: [
      'Unlimited API calls',
      'Unlimited everything',
      'Dedicated support',
      'SLA guarantee',
      'On-premise option',
      'Custom integrations',
      'Security audit',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

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
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4 dark:bg-purple-500/20 dark:text-purple-300">
            Simple Pricing
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight dark:text-white">
            Scale as you grow
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
            Start free, upgrade when you need. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center items-center gap-4 mb-12"
        >
          <span
            className={`text-sm font-medium ${!isYearly ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-14 h-7 bg-gray-200 rounded-full p-1 transition-colors"
            style={{ backgroundColor: isYearly ? '#8B5CF6' : '#E5E7EB' }}
          >
            <motion.div
              animate={{ x: isYearly ? 28 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-5 h-5 bg-white rounded-full shadow-sm"
            />
          </button>
          <span
            className={`text-sm font-medium ${isYearly ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Yearly
          </span>
          {isYearly && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Save 20%
            </span>
          )}
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={itemVariants}>
              <Card
                className={`h-full relative ${
                  plan.popular
                    ? 'border-2 border-purple-500 shadow-xl'
                    : 'border-gray-200 dark:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-purple-500 text-white text-sm font-medium rounded-full">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                <CardContent className="p-8">
                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-black mb-2 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 dark:text-gray-400">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    {plan.price.monthly !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-black dark:text-white">
                          ${isYearly ? plan.price.yearly : plan.price.monthly}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">/month</span>
                      </div>
                    ) : (
                      <div className="text-4xl font-bold text-black dark:text-white">
                        Custom
                      </div>
                    )}
                    {isYearly && plan.price.yearly !== null && (
                      <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                        Billed annually
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <Button
                    className={`w-full mb-8 ${
                      plan.popular
                        ? 'bg-purple-500 hover:bg-purple-600 text-white'
                        : 'bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </Button>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm dark:text-gray-300">{feature}</span>
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
