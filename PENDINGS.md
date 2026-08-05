# PENDINGS — Known Sharp Edges

This is a living document for the Serendepify website. Add entries when you discover a sharp edge, constraint, or failure mode; remove them once the underlying issue is resolved.

---

## 1. The live UI lives in `src/sr/` — `src/sections/` is dead code [Severity: HIGH]

**What:** `src/App.tsx` imports `Home` and `ProductsPage` from `./sr/`, and `src/main.tsx` imports `./sr/sr.css`. The `src/sections/` directory (About, Features, Hero, Pricing, etc.) has zero imports anywhere in the codebase.

**Why it matters:** AGENTS.md still documents `sections/` as the component home. An agent that follows AGENTS.md will edit dead files and "fix" things that have no effect on the rendered site.

**Mitigation:** Edit components under `src/sr/`. Treat `src/sections/` as legacy until it is deleted.

## 2. `serendepify-motion.js` is a vendored artifact [Severity: MEDIUM]

**What:** `src/sr/serendepify-motion.js` (~33 KB) and `serendepify-motion.d.ts` are checked-in generated/compiled files used by `useSerendepifyMotion.ts`.

**Why it matters:** Hand-editing the compiled JS breaks the type contract with its `.d.ts`; regenerating it without committing both files leaves the repo inconsistent.

**Mitigation:** Never edit `serendepify-motion.js` by hand — edit its source of truth and regenerate, committing the `.js` and `.d.ts` together.

## 3. Stripe webhook body must stay raw [Severity: HIGH]

**What:** `api/stripe-webhook.js` calls `stripe.webhooks.constructEvent()` with the raw request body and `STRIPE_WEBHOOK_SECRET`.

**Why it matters:** Any JSON body-parsing middleware before the handler destroys the signature and webhook verification fails (or worse, is skipped).

**Mitigation:** Do not add body parsers to the webhook route. If parsing is needed later, read the raw body explicitly and verify the signature first.

## 4. Stripe secrets must never reach the client [Severity: HIGH]

**What:** `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are server-side only.

**Why it matters:** Prefixing them with `VITE_` or logging them ships them to the browser bundle and exposes the account.

**Mitigation:** Keep server secrets out of `VITE_*` env vars and out of logs. Only `SITE_URL` and the `VITE_*` payment/contact links are client-safe.

## 5. Set `SITE_URL` explicitly in production [Severity: MEDIUM]

**What:** The checkout handler infers `baseUrl` from `req.headers.host` and `x-forwarded-proto` when `SITE_URL` is unset.

**Why it matters:** Relying on request headers enables protocol/host spoofing in Stripe redirect URLs.

**Mitigation:** Configure `SITE_URL` in the Vercel production environment.

## 6. Missing Stripe env vars fall back to payment links — on purpose [Severity: MEDIUM]

**What:** When Stripe environment variables are absent, checkout resolves to direct payment links (`VITE_PAYMENT_*_URL`) or the contact modal instead of calling `/api/checkout`.

**Why it matters:** This is intentional graceful degradation for local development. "Fixing" it by erroring when Stripe is unset would break local dev.

**Mitigation:** Leave the fallback in place. To test real checkout locally, set the server-side Stripe vars.

## 7. Autopilot stage keys must be unique [Severity: LOW]

**What:** The Autopilot animation in `src/sr/Home.tsx` broke twice from duplicate stage keys and duplicated transition snapshots (fixed in commits `6bdb0b7`, `86c6fe0`, `78613a6`).

**Why it matters:** Duplicate keys make stage transitions and snapshot diffs collide, producing broken hero motion that is hard to spot in review.

**Mitigation:** Give every Autopilot stage a unique key and regenerate snapshots when stages are added or reordered.

## 8. AGENTS.md is stale on Docker and layout [Severity: LOW]

**What:** AGENTS.md claims "No Docker, container orchestration, or CI config files are present" — but `Dockerfile` (node:22-alpine build → nginx:1.27-alpine runner) and `nginx.conf` exist, and the layout section is outdated (see #1).

**Why it matters:** Agents trust AGENTS.md and may duplicate infrastructure that already exists or misplace components.

**Mitigation:** Prefer the actual repo state over AGENTS.md claims; update AGENTS.md when touching either area.

## 9. No test framework [Severity: MEDIUM]

**What:** There are no `.test.` or `.spec.` files and no test runner configured.

**Why it matters:** The pricing flow, checkout fallbacks, and Autopilot animations have shipped several fixes without regression coverage.

**Mitigation:** Until Vitest infrastructure lands (tracked in open issues), verify with `npm run lint` and `npm run build` plus manual checks of checkout and hero motion.

## 10. Modals are context-driven, not route-driven [Severity: LOW]

**What:** Pricing and contact modals are controlled by `ModalProvider` in `src/lib/modal-context.tsx`, not URL routes.

**Why it matters:** Adding a route or `<Link>` to open a modal won't work; modal state is in-memory and resets on navigation.

**Mitigation:** Open modals via the `ModalProvider` API. The only query-string UI is `?checkout=success|cancelled`, read by `CheckoutNotice`.

## 11. Respect `prefers-reduced-motion` [Severity: LOW]

**What:** `src/index.css` includes a `@media (prefers-reduced-motion: reduce)` block.

**Why it matters:** New animations that bypass it degrade the site for motion-sensitive visitors.

**Mitigation:** Keep new scroll/WebGL animations compatible with the reduced-motion override.

## 12. Live-proof section degrades to static cards [Severity: LOW]

**What:** `use-live-proof.ts` fetches NPM registry and GitHub API stats; when all requests fail it renders static placeholder cards.

**Why it matters:** This looks like a bug but is deliberate — the section must never break the page.

**Mitigation:** Leave the fallback. If the proof section shows stale data, check the NPM package names and `VITE_GITHUB_ORG` before assuming a code bug.

---

## Deferred Work Items

Items explicitly tracked as future work, not sharp edges:

1. ~~CI pipeline (GitHub Actions: type-check, lint, build)~~ — **done** `9ada08c` (`.github/workflows/ci.yml`: lint, `tsc -b`, build on push/PR to main; guarded Vercel production deploy once `VERCEL_TOKEN`/`VERCEL_ORG_ID`/`VERCEL_PROJECT_ID` secrets are set).
2. Test infrastructure with Vitest — tracked in issue #52.
3. Deleting the legacy `src/sections/` tree once `src/sr/` is confirmed stable.
4. Updating AGENTS.md to match the `src/sr/` layout and existing Docker setup.
