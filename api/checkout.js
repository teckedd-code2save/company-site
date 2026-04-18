import { getBaseUrl, getCheckoutConfig, getStripeClient } from './_lib/stripe.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = getStripeClient();
  const { plan, billingMode = 'project', email, origin } = req.body || {};
  const checkout = getCheckoutConfig(plan, billingMode);
  const fallbackUrl =
    checkout?.fallbackUrl || process.env.VITE_CALENDLY_URL || '#contact';

  if (!checkout) {
    return res.status(400).json({
      error: 'Unknown checkout plan',
      fallbackUrl,
    });
  }

  if (!stripe || !checkout.priceId) {
    return res.status(503).json({
      error: 'Stripe is not configured for this plan yet',
      fallbackUrl,
    });
  }

  try {
    const baseUrl = getBaseUrl(req, origin);
    const session = await stripe.checkout.sessions.create({
      mode: checkout.mode,
      customer_email: email || undefined,
      line_items: [
        {
          price: checkout.priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?checkout=cancelled`,
      metadata: {
        plan: checkout.label,
        billingMode,
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout session creation failed', error);
    return res.status(500).json({
      error: 'Unable to create checkout session',
      fallbackUrl,
    });
  }
}
