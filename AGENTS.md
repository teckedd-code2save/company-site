# AGENTS.md — Serendepify Website

> This file is written for AI coding agents. It describes the project architecture, conventions, and workflows as they actually exist in the codebase.

---

## Project Overview

**Serendepify Website** is a marketing landing page for Serendepify — an AI-autonomy tooling company. It is a single-page React application (SPA) with rich visual effects, animated sections, and an integrated Stripe checkout flow.

Key characteristics:
- Dark-first visual identity (pure black `#000000` background, neon mint `#00E699` accent).
- Heavy use of scroll-triggered and micro-interaction animations via Framer Motion.
- WebGL particle field in the hero section using React Three Fiber + Three.js.
- Self-drawing SVG branch diagram representing the product stack.
- Graceful fallback behavior when Stripe or external APIs are unavailable.

---

## Technology Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | React 19 | SPA, no Next.js |
| Language | TypeScript 5.9 | Strict mode enabled |
| Build Tool | Vite 7.2.4 | `base: './'` configured for relative paths |
| Styling | Tailwind CSS 3.4.19 | Custom theme extended in `tailwind.config.js` |
| UI Library | shadcn/ui (New York style) | 40+ components in `src/components/ui/` |
| Animation | Framer Motion | Section reveals, hover effects, modals |
| 3D/WebGL | `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `three` | Hero particle field with Bloom |
| Icons | `lucide-react` | Standard icon library |
| Forms | `react-hook-form` + `zod` | Validation via `@hookform/resolvers` |
| Payments | `stripe` (server-side) | Serverless checkout + webhook handlers |
| Deployment | Vercel | Static build output to `dist/` |

---

## Directory Structure

```
api/                    # Vercel serverless API routes
  _lib/stripe.js        # Stripe client init, checkout config, raw body reader
  checkout.js           # POST handler: creates Stripe Checkout Sessions
  stripe-webhook.js     # POST handler: verifies Stripe webhooks, forwards events

src/
  components/           # Shared React components
    ui/                 # shadcn/ui components (40+ components)
    BranchDiagram.tsx   # Animated SVG product-stack diagram
    CheckoutNotice.tsx  # Displays ?checkout=success|cancelled banner
    ContactModal.tsx    # Full-screen contact modal
    HeroParticles.tsx   # WebGL particle field (React Three Fiber)
    Navbar.tsx          # Sticky navigation bar
    PricingModal.tsx    # Full-screen pricing modal
  sections/             # Page sections composed in App.tsx
    CTABanner.tsx
    CTASection.tsx
    ContactForm.tsx
    Features.tsx
    Footer.tsx
    Founder.tsx
    Hero.tsx
    Pricing.tsx
    ProductFlow.tsx
    Products.tsx
    Testimonials.tsx
    TrustLogos.tsx
  hooks/                # Custom React hooks
    use-live-proof.ts   # Fetches live NPM/GitHub stats for proof section
    use-mobile.ts       # Responsive breakpoint detector (768px)
  lib/                  # Utilities, config, and context
    checkout.ts         # Client-side checkout fetcher (`/api/checkout`)
    live-proof.ts       # NPM registry + GitHub API helpers
    modal-context.tsx   # React Context for pricing/contact modal state
    site-config.ts      # Environment-driven site config and payment link resolver
    utils.ts            # `cn()` — clsx + tailwind-merge utility
  App.tsx               # Root component: mounts sections + modals
  main.tsx              # React DOM entry point
  index.css             # Global styles, Tailwind directives, custom animations
  App.css               # App-specific styles (mostly unused)

public/                 # Static assets served at root
  images/               # Image assets
dist/                   # Vite build output (deploy target)
```

---

## Build and Dev Commands

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Production build (TypeScript check + Vite build)
npm run build

# Preview production build locally
npm run preview

# Lint TypeScript/React files
npm run lint
```

- The dev server runs on Vite's default port (usually `5173`).
- `npm run build` outputs to `dist/`.
- Vercel is configured to run `npm run build` and serve `dist/`.

---

## Code Style Guidelines

### TypeScript
- Strict mode is enabled (`strict: true` in `tsconfig.app.json`).
- `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch` are enabled.
- Path alias `@/` maps to `./src/`. Always prefer `@/components/ui/button` over relative paths for cross-module imports.
- Components are typed with `React.ComponentProps<"element">` where appropriate.

### Tailwind / Styling
- Use Tailwind utility classes as the primary styling method.
- Use the `cn()` utility from `@/lib/utils` for conditional or merged classes.
- Custom CSS variables are defined in `src/index.css` under `:root` (e.g., `--mint: #00E699`).
- Custom animations live in `tailwind.config.js` and `src/index.css`.
- The site respects `prefers-reduced-motion` (see `@media (prefers-reduced-motion: reduce)` in `src/index.css`).

### Component Patterns
- **Sections** (e.g., `Hero.tsx`, `Pricing.tsx`) are default exports in `src/sections/`.
- **UI primitives** (e.g., `button.tsx`) live in `src/components/ui/` and follow shadcn/ui conventions:
  - Use `cva` (class-variance-authority) for variant APIs.
  - Support `asChild` via `@radix-ui/react-slot`.
  - Attach `data-slot`, `data-variant`, and `data-size` attributes.
- **Modals** are controlled via `ModalProvider` in `src/lib/modal-context.tsx` rather than URL routes.

### Animation Conventions
- Framer Motion `motion.div` with `whileInView` is the standard pattern for scroll reveals.
- Hero entrance uses `variants` + `staggerChildren` for coordinated sequencing.
- WebGL components are lazy-loaded (`lazy(() => import(...))`) and wrapped in `<Suspense fallback={null}>`.
- SVG path drawing uses `motion.path` with `pathLength` animation rather than CSS `stroke-dashoffset`.

---

## Environment Variables

Copy `.env.example` to `.env` locally. Variables are split between client-side (`VITE_` prefix) and server-side.

### Client-side (VITE_*)
| Variable | Purpose |
|----------|---------|
| `VITE_GITHUB_ORG` | GitHub organization/username for live-proof section |
| `VITE_CONTACT_EMAIL` | Contact email displayed in the site |
| `VITE_CALENDLY_URL` | Fallback booking link for Enterprise/contact actions |
| `VITE_PAYMENT_STARTER_URL` | Direct payment fallback for Starter tier |
| `VITE_PAYMENT_DELIVERY_URL` | Direct payment fallback for Delivery tier |
| `VITE_PAYMENT_ENTERPRISE_URL` | Direct payment fallback for Enterprise tier |

### Server-side (API routes)
| Variable | Purpose |
|----------|---------|
| `SITE_URL` | Canonical site URL for Stripe success/cancel redirects |
| `STRIPE_SECRET_KEY` | Stripe API key for checkout sessions |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRICE_STARTER` | Price ID for Starter plan |
| `STRIPE_PRICE_DELIVERY_PROJECT` | Price ID for one-time Delivery plan |
| `STRIPE_PRICE_DELIVERY_RETAINER` | Price ID for monthly Delivery plan |
| `STRIPE_PRICE_ENTERPRISE` | Optional price ID for Enterprise plan |
| `PAYMENT_WEBHOOK_FORWARD_URL` | Optional external endpoint to receive successful checkout events |

> **Important:** The checkout API intentionally falls back to direct payment links or the contact flow when Stripe environment variables are missing. This allows local development without Stripe credentials.

---

## Deployment

The project is configured for **Vercel**:
- `vercel.json` specifies `"buildCommand": "npm run build"` and `"outputDirectory": "dist"`.
- API routes in `api/` are automatically deployed as Vercel serverless functions.
- `vite.config.ts` sets `base: './'` so assets resolve correctly in both dev and production.

CI is handled by `.github/workflows/ci.yml` — lint, `tsc -b` type-check, and production build on every push/PR to `main`, plus a Vercel production deploy (guarded on `VERCEL_TOKEN`/`VERCEL_ORG_ID`/`VERCEL_PROJECT_ID` secrets, so it's skipped until they're set). No Docker/container orchestration config is present.

---

## Testing

Vitest + React Testing Library (jsdom) is configured:

- Run once: `npm test` (the same command CI runs)
- Watch mode: `npm run test:watch`
- Unit/component tests colocate with their modules (`src/lib/utils.test.ts`, `src/sr/ui.test.tsx`); app-level smoke tests live in `src/__tests__/` (`App.test.tsx` covers both `/` and `/products` routes).
- `vitest.setup.ts` registers jest-dom matchers and stubs the browser APIs jsdom lacks (`matchMedia`, `IntersectionObserver`, `ResizeObserver`, `HTMLMediaElement.play/pause`) so render tests stay deterministic — the `sr/` components guard their animation/media paths with these APIs.
- Path alias `@/` resolves in tests via `vitest.config.ts` (mirrors the Vite config).

---

## Security Considerations

1. **Stripe webhook verification** — `api/stripe-webhook.js` uses `stripe.webhooks.constructEvent()` with the raw request body and signing secret. Do not parse the body with a JSON middleware before this handler.
2. **Environment secrets** — `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` must never be prefixed with `VITE_` and must never be logged or sent to the client.
3. **CORS / origin checks** — The checkout handler infers `baseUrl` from `req.headers.host` and `x-forwarded-proto`. In production, set `SITE_URL` explicitly to avoid protocol spoofing.
4. **No auth layer** — The site is a public marketing page. There are no protected routes, sessions, or JWT handling.

---

## Key Business Logic

### Pricing Flow
1. User clicks a CTA in `Pricing.tsx` (inline section) or `PricingModal.tsx` (full-screen modal).
2. `handleCheckout` resolves the plan action:
   - `contact` → opens the contact modal.
   - `pay` → redirects to a direct payment link.
   - `checkout` → calls `startCheckout()` which POSTs to `/api/checkout`.
3. The API creates a Stripe Checkout Session and returns `{ url }`.
4. On success/cancel, Stripe redirects back to `/?checkout=success` or `?checkout=cancelled`.
5. `CheckoutNotice.tsx` reads the query string and displays a banner.

### Live Proof Section
- `use-live-proof.ts` fetches real-time data from:
  - NPM Registry (`registry.npmjs.org`) for `@teckedd-code2save/datafy` and `@teckedd-code2save/b2dp`.
  - GitHub API (`api.github.com`) for the `agent-exchange` repository.
- If all requests fail, it gracefully falls back to static placeholder cards without breaking the UI.

---

## Reference Files

| File | What it does |
|------|--------------|
| `vite.config.ts` | Vite config with `@/` alias and `kimi-plugin-inspect-react` |
| `tailwind.config.js` | Full Tailwind theme extension (colors, shadows, animations, fonts) |
| `components.json` | shadcn/ui registry config (style: new-york, rsc: false, tsx: true) |
| `tsconfig.app.json` | TS config for the React app (`src/`) |
| `tsconfig.node.json` | TS config for Vite config file |
| `eslint.config.js` | Flat ESLint config with TS, React Hooks, and React Refresh rules |
| `VERCEL_STRIPE_SETUP.md` | Human-facing Stripe setup instructions |
