import { getStripeClient, readRawBody } from './_lib/stripe.js';

/**
 * Optionally forward successful checkout events to an external endpoint
 * (e.g. a CRM, Slack bot, or internal dashboard).
 */
async function forwardWebhook(payload) {
  if (!process.env.PAYMENT_WEBHOOK_FORWARD_URL) {
    return;
  }

  try {
    const response = await fetch(process.env.PAYMENT_WEBHOOK_FORWARD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn(
        'Webhook forward failed:',
        response.status,
        await response.text().catch(() => ''),
      );
    }
  } catch (err) {
    console.warn('Webhook forward error:', err.message);
  }
}

/**
 * Vercel serverless config — disable automatic body parsing so we can
 * read the raw bytes required for Stripe signature verification.
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return res.status(503).json({ error: 'Webhook is not configured' });
  }

  try {
    const rawBody = await readRawBody(req);
    const signature = req.headers['stripe-signature'];

    if (!signature) {
      return res.status(400).json({ error: 'Missing stripe-signature header' });
    }

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret,
    );

    console.log(`Stripe webhook received: ${event.type}`);

    // ── Handle successful payments ────────────────────────────────────
    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      const session = event.data.object;
      await forwardWebhook({
        type: event.type,
        sessionId: session.id,
        customerEmail: session.customer_details?.email || session.customer_email,
        amountTotal: session.amount_total,
        currency: session.currency,
        metadata: session.metadata || {},
      });
    }

    // ── Handle subscription lifecycle (optional) ──────────────────────
    if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object;
      console.log(`Invoice paid: ${invoice.id}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Stripe webhook verification failed', error);
    return res.status(400).json({ error: 'Invalid webhook signature' });
  }
}
