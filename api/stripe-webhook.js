import { getStripeClient, readRawBody } from './_lib/stripe.js';

async function forwardWebhook(payload) {
  if (!process.env.PAYMENT_WEBHOOK_FORWARD_URL) {
    return;
  }

  await fetch(process.env.PAYMENT_WEBHOOK_FORWARD_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

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
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret
    );

    if (event.type === 'checkout.session.completed') {
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

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Stripe webhook verification failed', error);
    return res.status(400).json({ error: 'Invalid webhook signature' });
  }
}
