# Serendepify Website

The official marketing website for Serendepify — a founder-led studio building agent systems that turn ideas into deployed products.

## About

Serendepify builds autonomous agent tooling for the full software lifecycle: from describing a system in plain English to a live production deployment. This website showcases three products — Convoy, Shipd, and b2dp — and the philosophy behind them: fewer handoffs, description becomes deployment.

The site is a single-page React application with GSAP scroll animations, Three.js visual effects, and a product showcase featuring live video surfaces and animated deployment loops.

## Products

- **Convoy** — Agentic deployment with rehearsal, canary rollout, and observability. Claude-native, fully autonomous.
- **Shipd** — Reads your repository and scores the best deployment options.
- **b2dp** — Business spec in, complete platform out. A CLI that provisions skills, configures MCP servers, and generates full applications.

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
