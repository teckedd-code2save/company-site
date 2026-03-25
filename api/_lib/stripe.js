import Stripe from 'stripe';

let stripeClient;

export function getStripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    });
  }

  return stripeClient;
}

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

export function getCheckoutConfig(plan, billingMode) {
  const configs = {
    starter: {
      priceId: process.env.STRIPE_PRICE_STARTER || '',
      fallbackUrl: process.env.VITE_PAYMENT_STARTER_URL || '#contact',
      label: 'starter',
    },
    delivery: {
      priceId:
        billingMode === 'retainer'
          ? process.env.STRIPE_PRICE_DELIVERY_RETAINER || ''
          : process.env.STRIPE_PRICE_DELIVERY_PROJECT || '',
      fallbackUrl: process.env.VITE_PAYMENT_DELIVERY_URL || '#contact',
      label: billingMode === 'retainer' ? 'delivery-retainer' : 'delivery-project',
    },
    enterprise: {
      priceId: process.env.STRIPE_PRICE_ENTERPRISE || '',
      fallbackUrl:
        process.env.VITE_PAYMENT_ENTERPRISE_URL ||
        process.env.VITE_CALENDLY_URL ||
        '#contact',
      label: 'enterprise',
    },
  };

  return configs[plan] || null;
}

export async function readRawBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return Buffer.concat(chunks);
}
