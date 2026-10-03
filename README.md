# Serendepify Website

The official Serendepify website, presenting our products and client engineering services with equal prominence.

## About

Explore Haven, GroundControl, and RentAWeekend, or discuss product engineering, agents and integrations, interactive 3D, or deployment and operations. Convoy and Forge remain in the wider product catalogue.

The React application has dedicated home, products, services, company, and contact routes. Haven has a 30-second film captured from the real app, with chapter controls and optional descriptive captions. GroundControl and RentAWeekend have interactive walkthroughs. The contact flow prepares an email draft for the visitor to send; it does not submit to an unconfigured backend or claim delivery.

## Products

- **Haven** — Explore a sample home, arrange furniture, and plan a measured room. Includes a retailer path.
- **GroundControl** — An open-source, self-hosted VPS control plane with agent access through MCP and OAuth.
- **RentAWeekend** — Planning and local help for outings, housing, errands, and trips in Ghana.
- **Convoy** — Supervised deployment workflows.
- **Forge** — Engineering practices and context for coding agents.

## Tech Stack

- React 19 + TypeScript 5
- Vite 7
- Tailwind CSS 3 + tw-animate-css
- CSS entrance and interaction motion, respecting reduced motion
- Existing GSAP/Three.js tooling retained; product footage loads on request
- Radix UI (accessible primitives)
- Stripe API retained but dormant; no checkout in company pages

See [the release notes](docs/company-update-2026-10-03.md) for routes, media provenance, and validation.

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
