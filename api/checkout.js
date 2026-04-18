import { getBaseUrl, getCheckoutConfig, getStripeClient } from './_lib/stripe.js';

const ALLOWED_ORIGINS = [
  process.env.SITE_URL,
].filter(Boolean);

function setCorsHeaders(res, origin) {
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : '*';
  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  setCorsHeaders(res, origin);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const { plan, billingMode = 'project', email, origin: originFromBody } = body;

  // ── Input validation ────────────────────────────────────────────────
  if (!plan || !['starter', 'delivery', 'enterprise'].includes(plan)) {
    return res.status(400).json({
      error: 'Invalid or missing plan. Must be starter, delivery, or enterprise.',
    });
  }

  if (!['project', 'retainer'].includes(billingMode)) {
    return res.status(400).json({
      error: 'Invalid billingMode. Must be project or retainer.',
    });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const stripe = getStripeClient();
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

  // ── Create Stripe Checkout Session ──────────────────────────────────
  try {
    const baseUrl = getBaseUrl(req, originFromBody);
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
