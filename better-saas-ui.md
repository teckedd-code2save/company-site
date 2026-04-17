# Serendepify Visual Design System
> Neon-inspired, dark-first marketing site specification.

---

## 1. Philosophy

- **Dark mode is not a toggle; it is the identity.** Background is `#000000`. No gray gradients pretending to be dark.
- **One electric accent, used like spice.** Neon mint `#00E699` for CTAs, active states, and hero atmosphere.
- **Space is luxury.** Massive padding, lower-third headline placement, and full-bleed visuals.
- **Show, don’t tell.** Interactive demos, terminal aesthetics, and motion as information.

---

## 2. Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#000000` | Canvas |
| `accent-primary` | `#00E699` | CTAs, highlights, particle glow |
| `accent-secondary` | `#22d3ee` (cyan-400) | Secondary particle tint, code tokens |
| `text-primary` | `#FFFFFF` | Headlines |
| `text-secondary` | `rgba(255,255,255,0.55)` | Body copy |
| `text-tertiary` | `rgba(255,255,255,0.25)` | Inactive labels, dim branches |
| `border-subtle` | `rgba(255,255,255,0.10)` | Card borders, dividers |

---

## 3. Typography

- **Font:** Inter (geometric sans), JetBrains Mono for code.
- **Hero:** `clamp(3.5rem, 6vw, 5.6rem)`, weight 700, letter-spacing `-0.03em`, line-height `0.96`.
- **Eyebrow:** `11px`, uppercase, tracking `0.28em`, mint color.
- **Body:** `16–18px`, weight 400, line-height `1.6`, `text-secondary`.
- **Code/terminal:** `14px` mono, mint for keywords, cyan for strings.

---

## 4. Spatial Rules (Hero)

1. **100vh section**, `overflow-hidden`, `relative`.
2. **Headline sits in the lower third**, left-aligned, with generous bottom padding (`pb-20` to `pb-32`).
3. **Visual field occupies the right 60%** of the viewport; particles are biased toward positive X so the left text area remains clean.
4. **Left text-guard gradient:** a soft `from-black via-black/60 to-transparent` overlay on the left 55% ensures legibility without dimming the entire field.
5. **Bottom fade:** `h-64` gradient `from-black via-black/80 to-transparent` so content below scrolls in cleanly.

---

## 5. Motion Principles

### Ambient (always running)
- **Particle field:** two-layer WebGL scene.
  - *Stream layer:* 2,200 upward-drifting particles with sine-wave X motion, mouse repulsion, and per-particle color variation (mint → cyan → white).
  - *Constellation layer:* ~380 background nodes with faint nearest-neighbor connection lines, slow drift.
- **Bloom post-processing:** intensity `2.2`, `KernelSize.VERY_LARGE`, additive blending for neon glow.
- **Fog:** `#000000`, near `6`, far `22` so distant particles dissolve.

### Scroll-triggered
- Sections fade/slide up via Framer Motion `whileInView`.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (out-expo).
- Stagger children by `0.08–0.12s`.

### Micro-interactions
- Primary button hover: `scale(1.03)`, white glow `box-shadow: 0 0 22px rgba(255,255,255,0.14)`.
- Secondary button hover: border lightens to `rgba(255,255,255,0.45)`.
- Branch diagram: self-drawing SVG paths via `pathLength`, nodes pop with spring.

### Accessibility
- Respect `prefers-reduced-motion` — disable continuous animations and replace with static gradients.

---

## 6. Component Patterns

### Buttons
| Type | Style |
|------|-------|
| Primary | White bg, black text, `rounded-full`, `px-7 py-3` |
| Secondary | Transparent, `border-white/18`, white text, `rounded-full` |
| Ghost | No border, white text, arrow icon |

### Cards
- Background: transparent or `rgba(255,255,255,0.03)`.
- Border: `1px solid rgba(255,255,255,0.08)`.
- Hover: subtle lift + border brightens to `0.12`.

### Branch Diagram
- SVG paths draw from trunk to branches.
- Active branches: `rgba(255,255,255,0.55)` with soft drop-shadow glow.
- Dim branches: `rgba(255,255,255,0.20)`.
- Nodes pop in after their connecting branch finishes drawing.

---

## 7. Performance Budget

- Hero WebGL targets **60fps on MBP, 30fps on mid-tier mobile**.
- `dpr` capped at `1.5`; antialias off.
- Constellation connections computed every frame but limited to `420` line segments max.
- Lazy-load `HeroParticles` with `Suspense fallback={null}`.

---

## 8. Reference

- **Primary inspiration:** [Neon](https://neon.tech) — pure black, electric mint, volumetric particle hero, lower-third typography.
- **Secondary inspiration:** Vercel (spatial minimalism), Supabase (terminal credibility).
