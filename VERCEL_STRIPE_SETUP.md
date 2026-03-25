# Vercel + Stripe Setup

This project is now wired for Vercel-hosted Stripe checkout with graceful fallback behavior.

## What You Need To Add

Add these environment variables in your Vercel project:

```env
SITE_URL=https://your-domain.com

STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_DELIVERY_PROJECT=price_...
STRIPE_PRICE_DELIVERY_RETAINER=price_...
STRIPE_PRICE_ENTERPRISE=price_...

VITE_GITHUB_ORG=teckedd-code2save
VITE_CONTACT_EMAIL=edwardktwumasi1000@gmail.com
VITE_CALENDLY_URL=

VITE_PAYMENT_STARTER_URL=
VITE_PAYMENT_DELIVERY_URL=
VITE_PAYMENT_ENTERPRISE_URL=

PAYMENT_WEBHOOK_FORWARD_URL=
```

## Required vs Optional

Required for real Stripe checkout:

- `SITE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_STARTER`
- `STRIPE_PRICE_DELIVERY_PROJECT`
- `STRIPE_PRICE_DELIVERY_RETAINER`

Optional:

- `STRIPE_PRICE_ENTERPRISE`
  Use this only if you want Enterprise to go through Stripe instead of a contact flow.
- `VITE_CALENDLY_URL`
  If set, Enterprise/contact actions can send people to your booking page.
- `VITE_PAYMENT_*`
  Fallback payment/contact links if Stripe is unavailable or not configured for a plan.
- `PAYMENT_WEBHOOK_FORWARD_URL`
  A backend endpoint, automation, or CRM intake URL that should receive completed checkout events.

## Stripe Dashboard Setup

Create these prices in Stripe:

1. `Starter`
   If this should stay free, you can leave `STRIPE_PRICE_STARTER` empty and rely on fallback behavior.
   If you want a paid starter offer, create a one-time price and use that price ID.

2. `Delivery Project`
   Create a one-time price.
   Put the resulting `price_...` in `STRIPE_PRICE_DELIVERY_PROJECT`.

3. `Delivery Retainer`
   Create a one-time or recurring price depending on how you want to charge.
   Put the resulting `price_...` in `STRIPE_PRICE_DELIVERY_RETAINER`.

4. `Enterprise`
   Optional.
   Only add this if you want an actual Stripe checkout for enterprise.

## Stripe Webhook

In Stripe, add a webhook endpoint pointing to:

```txt
https://your-domain.com/api/stripe-webhook
```

Subscribe at minimum to:

- `checkout.session.completed`

Then copy the webhook signing secret into:

- `STRIPE_WEBHOOK_SECRET`

## What The Site Does Now

- Pricing buttons call `/api/checkout`
- That endpoint creates a Stripe Checkout Session when Stripe is configured
- If Stripe is missing for a plan, the button falls back to your configured link or contact path
- `/api/stripe-webhook` verifies Stripe signatures and can forward successful payments to `PAYMENT_WEBHOOK_FORWARD_URL`

## Current Files

- Checkout API: [api/checkout.js](/Users/welcome/Documents/SoftwareEngineering/serendepify/serendepifywebsite/app/api/checkout.js)
- Webhook API: [api/stripe-webhook.js](/Users/welcome/Documents/SoftwareEngineering/serendepify/serendepifywebsite/app/api/stripe-webhook.js)
- Stripe helpers: [api/_lib/stripe.js](/Users/welcome/Documents/SoftwareEngineering/serendepify/serendepifywebsite/app/api/_lib/stripe.js)
- Pricing UI: [src/sections/Pricing.tsx](/Users/welcome/Documents/SoftwareEngineering/serendepify/serendepifywebsite/app/src/sections/Pricing.tsx)
- Env template: [.env.example](/Users/welcome/Documents/SoftwareEngineering/serendepify/serendepifywebsite/app/.env.example)

## Recommended Next Step

After you add the env vars in Vercel:

1. Redeploy the site
2. Run one test payment in Stripe test mode first
3. Confirm the webhook receives `checkout.session.completed`
4. Only then switch to live keys and live price IDs
