# Handoff: Serendepify Marketing Website

## Overview
The Serendepify company website — a marketing site for an AI product studio whose
positioning is **"Bring the idea. We own the rest."** It presents one continuous arc of
agentic ownership across three products:

- **Forge** — turns a vague idea into a built product (skill set for a coding agent). *Beta.*
- **Convoy** — reads your codebase and ships it to production. *Live.*
- **Ground Control** — the operations cockpit that keeps it running. *Live / flagship.*

The brand language to keep front-and-center everywhere: **ownership · continuity · delivery · speed · quality.**

Target repo for commit: **convoy-site** (confirm — `convoy-home` / `serendepify-frontend`
are the other candidates). The site lives at `serendepify.ai`.

---

## About the Design Files
The files in this bundle are **design references authored in HTML/JS** — high-fidelity
prototypes that show the intended look, motion, and behavior. They are **not meant to be
shipped verbatim.** They use a lightweight in-house runtime (`support.js`, the `.dc.html`
"Design Component" format) that exists only for the design tool.

**Your task is to recreate these designs in the target codebase's real environment**
(Next.js / React is the likely target given the `serendepify-frontend` stack) using its
established component patterns, routing, and build pipeline. Re-implement the markup as
real components; **keep the two genuine production assets as-is** because they are framework-
agnostic and already final:

1. **`sr/tokens.css`** — the brand design-token stylesheet. Ship this (or port the `:root`
   custom properties into your styling system). Every value below comes from it.
2. **`sr/serendepify-motion.js`** — the GSAP motion engine. It is a standalone, data-attribute
   driven library (`window.SerendepifyMotion`). You can keep it as-is and drive it from React
   via a `useEffect` that calls `SerendepifyMotion.init()` after mount, OR port its techniques
   to your animation lib. Keeping it is the fast path and preserves the motion exactly.

`sr/image-slot.js` is a **design-tool-only** drag-and-drop placeholder (`<image-slot>`). In
production, replace every `<image-slot>` with a real `<img>`/`<picture>` pointing at the actual
product screenshot. The slots mark **exactly where real imagery goes** (see Assets).

---

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, radii, shadows, and motion are all
specified in `sr/tokens.css` and reproduced below. Recreate pixel-for-pixel using these tokens.

---

## How to run the references
Open any `.dc.html` in a browser via a static server from the bundle root (so relative paths to
`sr/` and `support.js` resolve):

```bash
npx serve design_handoff_serendepify_site
# then open "Serendepify Site.dc.html"
```

The `<helmet>` block at the top of each file loads fonts, GSAP (+ plugins), tokens, and the
engine. The logic class at the bottom (`class Component extends DCLogic`) only does one
production-relevant thing: it waits for fonts, then calls `SerendepifyMotion.init()`. In your
app, do the equivalent in a top-level effect.

---

## Pages / Screens

### 1. `Serendepify Site.dc.html` — Home (primary, long-scroll)
Section order, top to bottom:

1. **Fixed nav** (`72px` tall). Left: logo mark + `serendepify.` wordmark. Right links:
   Lifecycle · For agents · Products · Pricing · Docs, then a primary button **"Open Ground
   Control ↗"**. Transparent at top; on scroll past `40px` it gains
   `background: rgba(231,229,223,0.82)` + `backdrop-filter: blur(16px)` + a hairline bottom
   border (handled by the engine adding class `sr-nav-scrolled`). Nav links have an animated
   coral underline on hover (width 0→100%, `var(--ease-back)`).
2. **Hero.** Huge Schibsted Grotesk headline **"Bring the idea. We own the rest."**
   (`font-weight 800`, `clamp(3.2rem, 8vw, 7rem)`, `letter-spacing -0.04em`, `line-height 0.98`,
   color `--sr-text-90`, `max-width 17ch`). Below, two-column row: left = body paragraph
   (with **building / shipping / operating** emphasized at weight 700) + two buttons
   ("See the lifecycle →" primary, "For agents" ghost); right = two stat blocks (`3` products,
   `100%` owned — count-up animated). Full-width 16:7 image card below (real Ground Control
   screenshot). Faint dot-grid texture fades in the background (radial mask). The headline
   animates in with a **SplitText** char reveal; hero children stagger up via `data-sr-hero`.
3. **Flip-scroll beat** ("One product. It never changes hands."). A `340vh` section with a
   `position:sticky` 100vh stage. A coral product card (**orchard-bot**) travels & resizes
   through three ghost station labels — Forge → Convoy → Ground Control — as you scroll,
   driven by GSAP **Flip** scrubbed to scroll. See Interactions for exact mechanics.
4. **Lifecycle** (`id="lifecycle"`). Heading "One agent owns the whole line." Then three
   alternating two-column rows (text ↔ image), one per product. Each: number + name
   (Schibsted 800), an italic-feel coral tagline, a paragraph, a 3-item feature list with
   coral ◆ bullets, and a text link with a coral underline. Image side is a 4:3 `sr-card` with
   a real screenshot; it clip-reveals on scroll (`data-sr-reveal="clip"`) and has a gentle
   parallax (`data-sr-parallax data-sr-speed="0.85"`). Rows are separated by `1px --sr-stone`
   rules.
5. **For agents** (`id="agents"`) — **dark section**, `background:#16150F`, light text. Centered:
   small coral kicker "Built for the agents doing the work", SplitText headline **"The pulse
   travels the pipeline."**, and a paragraph ending in a **scramble-decode** word that cycles
   `ownership | continuity | delivery | speed | quality`. Below: the signature **pipeline
   diagram** — a flowing connected SVG spine that draws itself on, a glowing **pulse dot +
   trail** that travels the spine via MotionPath, and three station nodes (rings + line icons +
   sentence-case labels "Forge / builds it", "Convoy / ships it", "Ground Control / runs it")
   that draw on. Radial coral glow behind. This is the brand's hero motion moment — keep it.
6. **Pricing** (`id="pricing"`). "Start free. Pay when you ship." Three cards in a 3-col grid:
   **Forge** ($0, paper card, `--sr-stone` border), **Convoy** ($29/mo, dark `#16150F` card,
   lifted `translateY(-8px)`, "Most teams" marker, primary CTA), **Fleet** (Let's talk, paper
   card). Each: name, sub-label, price, 1px divider, feature list with coral ◆ bullets, full-
   width button.
7. **Docs / developers** (`id="docs"`) — `background: --sr-paper`. Two columns: left = heading
   "Made for developers and their agents." + a 3-step numbered list (Install / Describe / Ship);
   right = a dark terminal card (mac traffic-lights) with a **typewriter** command
   (`npx @serendepify/forge init`), green check lines, and a count-up ("23 files scaffolded").
8. **What's new** — ElevenLabs-style **bento grid** (6-col, 200px rows). Mixed card types:
   a large 4×2 image card with bottom gradient + overlaid title (Ground Control), a solid
   **coral** text card, a paper text card, a 3-col image card, a dark text card. This is the
   reference look the client explicitly asked for — image-only, text-only, and colorful cards
   mixed in a bento.
9. **CTA** — dark `#16150F`, centered SplitText headline "Bring the idea. We own the rest.",
   two buttons (Open Ground Control / Install Forge), radial coral glow.
10. **Footer** — light, logo + tagline, two link columns (Product / Products), bottom legal row.

A 2px coral **scroll-progress bar** is fixed to the very top (`data-sr-scroll-progress`).

### 2. `Serendepify Products.dc.html` — Products (full-screen snap)
A standalone, scroll-hijacked experience: 4 full-screen sections (intro + one per product),
navigated by wheel/touch via GSAP **Observer**, with `outer/inner` clip-reveal transitions and a
per-section **SplitText** heading reveal (random char stagger). Dark background. Each product
section has a full-bleed real screenshot (`<image-slot>` → real `<img>`) with a left-to-right
dark gradient scrim for text legibility, a coral kicker ("01 · Forge · builds it"), a large
two-line headline, a paragraph, and (last section) an "Open Ground Control" button. Top-left
back-link returns to the home page. Requires the `.snap` structural CSS in the file's
`<helmet>` (sections `position:fixed; inset:0; visibility:hidden`; `.outer/.inner` full-size
overflow-hidden; `.bg` covering; `.section-heading` etc.).

### 3. `Serendepify Motion Library.dc.html` — Internal motion component gallery
A documentation/showcase page (not necessarily public) demonstrating all 20+ engine techniques
as labeled cards, each with a live demo and its copy-paste data-attribute snippet, plus a
sticky scroll-spy table of contents. Useful as the **engineering reference** for which
`data-sr-*` attribute produces which animation. Ship internally or as `/motion`.

---

## The Motion Engine (`sr/serendepify-motion.js`)
A single IIFE that registers `window.SerendepifyMotion` with an `init()` that scans the DOM for
`data-sr-*` attributes and wires GSAP. **GSAP 3.13 + plugins required**: ScrollTrigger,
MotionPathPlugin, DrawSVGPlugin, SplitText, ScrambleTextPlugin, Observer, Flip (all free in
3.13). Load order: GSAP core + plugins, then the engine, then call `init()` after fonts load.
`prefers-reduced-motion` is respected (heavy motion is skipped).

Attribute → behavior (full list, with the exact options each reads):

| Attribute | Effect | Key options (data-sr-…) |
|---|---|---|
| `data-sr-text` | SplitText char/word reveal up-in | — |
| `data-sr-scramble` | Scramble-decode through a word list | `words="A|B|C"` |
| `data-sr-typewriter` | Typewriter with cursor | `text`, `speed`(0.05) |
| `data-sr-image` + `data-sr-reveal="clip"` | Clip-path image reveal on scroll | — |
| `data-sr-parallax` (+ child `data-sr-depth`) | Layered parallax | `speed`, `depth` per layer |
| `data-sr-kenburns` | Slow zoom/pan on image | `zoom`(1.15), `pan`(right) |
| `data-sr-card` | Card entrance + hover lift | — |
| `data-sr-tilt` | 3D tilt on hover + glare | `max-tilt`(15), `glare`, `glare-opacity` |
| `data-sr-card-flip` | 3D flip front/back | `trigger="click|hover"` |
| `data-sr-hero` (+ child `data-sr-hero-item`) | Staggered hero entrance | — |
| `data-sr-marquee` (+ `data-sr-marquee-track`) | Infinite marquee | `speed`(18), `pause-on-hover` |
| `data-sr-grid` (+ `data-sr-grid-item`) | Elastic grid stagger from a point | `cols`, `from="center"` |
| `data-sr-count` | Count-up number | `duration`, `suffix` (e.g. `%`) |
| `data-sr-magnetic` (+ `data-sr-magnetic-inner`) | Magnetic button follow | `strength`(0.4) |
| `data-sr-reveal` | Generic scroll reveal (also `="clip"`) | `y`(40), `duration` |
| `data-sr-scrub` | Scroll-scrubbed property | `property`, `from`, `to`, `start`, `end` |
| `data-sr-snap` | Full-screen Observer section snap | structural `outer/inner/bg/section-heading` |
| `data-sr-flip-scroll` (+ `data-sr-flip-marker`, `data-sr-flip-target`) | Scrubbed FLIP between markers | — |
| `data-sr-draw` (+ child `data-sr-path`) | DrawSVG stroke-on (add `data-sr-draw-loop` for looping gradient) | `duration`, `stagger` |
| `data-sr-path` (+ `data-sr-path-line`, `data-sr-path-dot`) | MotionPath travel + auto draw-on of the line, with glow trail | `duration`, `repeat` |
| `data-sr-logo` | Logo entrance (scale/rotate in) | — |
| `data-sr-nav` | Adds `sr-nav-scrolled` past 40px scroll | — |
| `data-sr-scroll-progress` | Top scroll-progress bar width | — |

**React integration note:** mount the markup, then in a `useEffect(() => { SerendepifyMotion.init(); }, [])`
after `document.fonts.ready`. Re-initializers exist (`refreshText`, `refreshCards`, `refreshReveal`,
`refreshAll`) for content added after first paint. Guard against double-init in StrictMode
(the reference uses a `window.__srSiteInited` flag).

---

## Design Tokens (from `sr/tokens.css` — source of truth)

### Colors
| Token | Hex | Use |
|---|---|---|
| `--sr-ink` | `#0B0B0C` | True black (rare) |
| `--sr-ink-warm` | `#16150F` | Dark section / dark card background |
| `--sr-coral` | `#E8542A` | Primary brand accent |
| `--sr-coral-bright` | `#FF6A40` | Bright accent / glow / motion |
| `--sr-paper` | `#F5F4F0` | Light surface (cards, light sections) |
| `--sr-stone` | `#ECEAE3` | Hairline borders / dividers |
| `--sr-bg` | `#E7E5DF` | Page background |
| `--sr-text-90` | `#1B1916` | Primary text |
| `--sr-text-55` | `#6E6A62` | Secondary text |
| `--sr-text-35` | `#9A968C` | Faint text |
| `--sr-text-20` | `#8A8780` | Faintest |
| Dark theme | `--sr-dark-bg #0A0A0B`, `--sr-dark-surface #16150F`, `--sr-dark-text #F5F4F0`, `--sr-dark-muted rgba(245,244,240,.55)`, `--sr-dark-border rgba(255,255,255,.09)` | Add `.sr-dark` to a container |

### Typography
- **Display:** `Schibsted Grotesk` (headings; weights 400–900, here mostly **800**).
- **Body:** `Hanken Grotesk` (weights 400–700; body usually **500**, emphasis **700**).
- **Mono:** `JetBrains Mono` (kickers, code, small labels).
- Scale: `--text-xs 11px`, `--text-sm 13px`, `--text-base 15px`, `--text-lg 19px`,
  `--text-xl clamp(1.7rem,3.2vw,2.6rem)`, `--text-2xl clamp(2.2rem,5vw,4.2rem)`,
  `--text-3xl clamp(3rem,6vw,5.4rem)`. Hero/CTA headlines go larger inline
  (`clamp(2.8rem,7vw,6rem)` … `clamp(3.2rem,8vw,7rem)`), `letter-spacing -0.03em…-0.045em`.
- **No pills, no all-caps thin labels** as section eyebrows — the client explicitly rejected
  these. Use solid sentence-case labels / heavy weights instead.

### Spacing
`--space-1 4` · `2 8` · `3 14` · `4 22` · `5 36` · `6 56` · `7 90` · `8 140` (px). Sections use
`--sr-section` = `var(--space-7) 0`. Container `--max-width 1200px`, `--page-padding clamp(22px,5vw,48px)`.

### Radii
`--radius-sm 8` · `md 12` · `lg 18` · `xl 20` · `pill 999`.

### Shadows
- `--shadow-sm 0 1px 3px rgba(0,0,0,.06)`
- `--shadow-md 0 8px 24px rgba(0,0,0,.10)`
- `--shadow-lg 0 26px 60px rgba(27,25,22,.18)`
- `--shadow-glow 0 12px 32px rgba(255,106,64,.30)`

### Easing & duration
`--ease-out cubic-bezier(.22,1,.36,1)`, `--ease-back cubic-bezier(.2,.7,.2,1)`,
`--ease-spring cubic-bezier(.34,1.56,.64,1)`. Durations `fast .25s / normal .45s / slow .8s /
slower 1.3s`. Layout: `--nav-height 72px`.

---

## Interactions & Behavior (precise)
- **Nav:** fixed; engine toggles `sr-nav-scrolled` past 40px (bg blur + hairline border). Links:
  coral underline grows 0→100% on hover over 0.32s `ease-back`.
- **Buttons:** `.sr-btn` lifts `translateY(-2px)` on hover (0.25s). Primary = ink bg / paper text;
  coral = bright-coral bg / ink text; ghost = transparent + 1px border. Magnetic buttons
  translate toward the cursor at `strength` 0.3–0.4 and spring back on leave.
- **Hero:** SplitText chars rise in (`yPercent 120→0`, opacity, 0.7s `power3.out`, stagger 0.018);
  hero items stagger up. **Always render visible by default** — the reference adds a safety net
  that force-clears opacity/transform if the rAF ticker hasn't advanced ~1.5s after load, so
  content is never stuck hidden. Reproduce this guarantee (e.g. animate *from* hidden only once
  GSAP confirms it's running, or use CSS that defaults visible).
- **Flip-scroll beat:** wrapper `height:340vh` provides scroll length; an inner
  `position:sticky; top:0; height:100vh; overflow:hidden` stage stays pinned. Three invisible
  `data-sr-flip-marker` boxes define target geometries (left/top/width/height); the visible
  `data-sr-flip-target` card starts at marker 0. The engine records `Flip.getState` of each
  marker and, on a `ScrollTrigger` scrubbed over the wrapper (scrub 2), `Flip.fit`s the card to
  each successive marker — so it translates **and** resizes through the three stations. Ghost
  station labels sit at the marker centers.
- **Agents pipeline:** the spine `<path>` is `data-sr-path-line`; the engine draws it on
  (DrawSVG) when scrolled into view and runs a `data-sr-path-dot` along it via MotionPath
  (5s loop) with a cloned glow element trailing. Station rings/icons live in the same
  `data-sr-draw`+`data-sr-path` wrapper and draw on with a 0.16 stagger. Keep the spine a single
  flowing curve (not a straight line with dots) — that distinction was an explicit client note.
- **Products page:** GSAP Observer hijacks wheel/touch; each step animates `outer/inner` yPercent
  in opposite directions for a clip wipe, parallaxes the `.bg`, and re-splits + staggers the
  heading chars (random order). Wraps around. Provide a non-hijacked fallback for reduced motion
  / no-Observer (reveal section 0).
- **Scroll progress bar:** width = scrollTop / scrollable height.
- **Reduced motion:** `prefers-reduced-motion: reduce` collapses transitions; the engine skips
  the heavy timelines. Honor it.

---

## State Management
The site is largely stateless/presentational. State you'll actually need:
- **Nav scrolled** boolean (or just the engine's class toggle).
- **Active section** for any scroll-spy (the Motion Library page uses an IntersectionObserver
  with `rootMargin: -40% 0px -40% 0px` to set the active TOC link).
- **Products page** current-section index (Observer-driven; wraps via modulo).
- **Image slots** become real image `src`s — static, no state.
No data fetching is required for the marketing pages.

---

## Assets
- **Logo mark** — `assets/serendepify-symbol.svg` (dark), `serendepify-symbol-white.svg` (light),
  `serendepify-favicon.svg`. It is two rotated arcs (an ink arc + a coral arc), `rotate(118deg)`,
  `stroke-width ~6.5`, round caps, dash patterns `74 58` (ink) and `24 200` offset `-80` (coral).
  The inline SVG used across the pages matches these files. Keep this exact mark — it is the
  finalized brand logo.
- **Wordmark:** `serendepify` + a coral period `.` (Schibsted Grotesk, weight 700).
- **Product screenshots (TO BE SUPPLIED):** every `<image-slot>` is a placeholder for a real
  screenshot. Locations & intended content:
  - Home hero (16:7): a Ground Control hero/cockpit shot.
  - Lifecycle rows (4:3 each): Forge build/scaffold view, Convoy deploy view, Ground Control
    dashboard.
  - What's-new bento: a Ground Control hero shot (large card) and a Convoy deploy shot (3-col card).
  - Products page (full-bleed per section): Forge, Convoy, Ground Control screenshots.
  Use real product UI; until then the gradient/placeholder treatments stand in.
- **Fonts:** Google Fonts — Schibsted Grotesk, Hanken Grotesk, JetBrains Mono. Self-host for prod.
- **GSAP 3.13** + plugins (ScrollTrigger, MotionPath, DrawSVG, SplitText, ScrambleText, Observer,
  Flip). Free in 3.13; add via npm `gsap` and register plugins.

---

## Files in this bundle
- `Serendepify Site.dc.html` — home page (all sections above).
- `Serendepify Products.dc.html` — full-screen snap products page.
- `Serendepify Motion Library.dc.html` — motion technique gallery / engineering reference.
- `sr/tokens.css` — **production-ready** brand tokens (ship or port).
- `sr/serendepify-motion.js` — **production-ready** GSAP motion engine (keep or port).
- `sr/image-slot.js` — design-tool placeholder only; replace `<image-slot>` with real `<img>`.
- `support.js` — design-tool runtime for the `.dc.html` format; **not for production** (it only
  exists so the reference files open in a browser). Ignore when porting.
- `assets/serendepify-symbol*.svg`, `serendepify-favicon.svg` — finalized logo assets.

## Recommended implementation path (Next.js/React)
1. Port `sr/tokens.css` `:root` into your global stylesheet (or a `theme` module).
2. `npm i gsap`; copy `sr/serendepify-motion.js` into `lib/` and `init()` it in a client effect
   after `document.fonts.ready`. Keep the `data-sr-*` attributes on your JSX — they're the
   contract the engine reads.
3. Build sections as components (`<Hero>`, `<Lifecycle>`, `<AgentsPipeline>`, `<Pricing>`,
   `<WhatsNewBento>`, `<Cta>`, `<Footer>`) using the exact tokens/markup from the reference.
4. Make Products a route (`/products`) with the snap engine; Motion Library optional at `/motion`.
5. Swap every `<image-slot>` for a real `<Image>`/`<img>` once screenshots are supplied.
6. Self-host fonts; respect `prefers-reduced-motion`; verify the hero-visibility safety net.
