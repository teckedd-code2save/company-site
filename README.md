# Serendepify Website

The official marketing website for Serendepify — an AI operations company making production systems understandable and controllable for lean software teams.

## About

Serendepify is led by Ground Control, an operational cockpit for practical cloud and VPS infrastructure. Convoy provides controlled rollout, while Forge improves the architecture and build context created upstream. The website presents these as three connected product layers around one commercial wedge: production operations.

The site is a single-page React application with GSAP scroll animations, Three.js visual effects, and a product showcase featuring live video surfaces and animated deployment loops.

## Products

- **Ground Control** — The primary product: a VPS-aware operational cockpit for health, services, logs, terminal, DNS, alerts, and assisted actions.
- **Convoy** — The controlled execution layer for repo-aware rehearsal, approval gates, canary rollout, and observation.
- **Forge** — The upstream context layer that turns product intent into architecture, scaffolding, and agent-ready build plans.

## Tech Stack

- React 19 + TypeScript 5
- Vite 7
- Tailwind CSS 3 + tw-animate-css
- Framer Motion (scroll and component animations)
- GSAP (production motion engine)
- Three.js + React Three Fiber (3D effects)
- Radix UI (accessible primitives)
- Stripe (payment integration)

## Quick Start

Prerequisites: Node.js 22+, npm 10+

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:5173`.

## Build

```bash
npm run build    # type-check + production build
npm run preview  # preview the production build locally
```

## Deployment

The site is deployed to Vercel. The `vercel.json` configuration is included in the repository.

## License

MIT
