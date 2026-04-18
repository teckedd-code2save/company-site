import Stripe from 'stripe';

let stripeClient;

/**
 * Initialise and cache the Stripe client.
 * Returns `null` when `STRIPE_SECRET_KEY` is missing so callers can
 * fall back gracefully (e.g. redirect to a direct payment link).
 */
export function getStripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      // If you upgrade the `stripe` npm package, verify this API version
      // is still supported or let Stripe auto-negotiate by omitting it.
      apiVersion: '2025-02-24.acacia',
    });
  }

  return stripeClient;
}

/**
 * Resolve the canonical site URL for Stripe success/cancel redirects.
 * Prefers the explicit `SITE_URL` env var, then the request origin,
 * then infers from `Host` / `X-Forwarded-Proto` headers.
 */
export function getBaseUrl(req, originFromBody) {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL;
  }

  if (originFromBody) {
    return originFromBody;
  }

  const host = req.headers.host;
  const protocol =
    req.headers['x-forwarded-proto'] ||
    (host?.includes('localhost') ? 'http' : 'https');

  return `${protocol}://${host}`;
}

/**
 * Build the Stripe Checkout Session config for a given plan + billing mode.
 * Returns `null` for unknown plans so the API can return a 400.
 */
export function getCheckoutConfig(plan, billingMode) {
  const isRetainer = billingMode === 'retainer';

  const configs = {
    starter: {
      priceId: (isRetainer
        ? process.env.STRIPE_PRICE_STARTER_RETAINER
        : process.env.STRIPE_PRICE_STARTER) || '',
      fallbackUrl: process.env.VITE_PAYMENT_STARTER_URL || '#contact',
      label: isRetainer ? 'starter-retainer' : 'starter',
      mode: isRetainer ? 'subscription' : 'payment',
    },
    delivery: {
      priceId: (isRetainer
        ? process.env.STRIPE_PRICE_DELIVERY_RETAINER
        : process.env.STRIPE_PRICE_DELIVERY_PROJECT) || '',
      fallbackUrl: process.env.VITE_PAYMENT_DELIVERY_URL || '#contact',
      label: isRetainer ? 'delivery-retainer' : 'delivery-project',
      mode: isRetainer ? 'subscription' : 'payment',
    },
    enterprise: {
      priceId: process.env.STRIPE_PRICE_ENTERPRISE || '',
      fallbackUrl:
        process.env.VITE_PAYMENT_ENTERPRISE_URL ||
        process.env.VITE_CALENDLY_URL ||
        '#contact',
      label: 'enterprise',
      mode: 'payment',
    },
  };

  return configs[plan] || null;
}

/**
 * Read the raw request body as a Buffer.
 * Required for Stripe webhook signature verification because
 * JSON parsing would alter the payload bytes.
 */
export async function readRawBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return Buffer.concat(chunks);
}
