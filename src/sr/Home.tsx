import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useSerendepifyMotion } from './useSerendepifyMotion';
import { ImageSlot, LogoMark, Wordmark } from './ui';

const GC_URL = 'https://groundcontrol.serendepify.com';
const FORGE_URL = 'https://www.npmjs.com/package/@teckedd-code2save/b2dp';
const CONVOY_URL = 'https://convoy-home.vercel.app/';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

/* ── Small shared bits ──────────────────────────────────────────── */

function Diamond({ color = 'var(--sr-coral)' }: { color?: string }) {
  return <span style={{ color }}>◆</span>;
}

function FeatureItem({ children, color = 'var(--sr-coral)', textColor = 'var(--sr-text-55)' }: {
  children: ReactNode;
  color?: string;
  textColor?: string;
}) {
  return (
    <li style={{ display: 'flex', gap: 12, fontSize: '15.5px', fontWeight: 500, color: textColor }}>
      <Diamond color={color} /> {children}
    </li>
  );
}

const textLink: CSSProperties = {
  marginTop: 28,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 15,
  fontWeight: 700,
  color: 'var(--sr-text-90)',
  borderBottom: '2px solid var(--sr-coral)',
  paddingBottom: 3,
};

/* ── Nav ────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { href: '#lifecycle', label: 'Lifecycle' },
  { href: '#agents', label: 'For agents' },
  { href: '/products', label: 'Products' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#docs', label: 'Docs' },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const link: CSSProperties = { fontSize: '14.5px', fontWeight: 600, color: 'var(--sr-text-55)' };
  return (
    <>
      <header
        data-sr-nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          height: 'var(--nav-height)',
          borderBottom: '1px solid transparent',
          transition: 'background 0.35s, border-color 0.35s, backdrop-filter 0.35s',
        }}
      >
        <div
          className="sr-container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}
        >
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <LogoMark className="sr-mark" size={28} />
            <Wordmark />
          </a>
          <nav className="sr-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="sr-body sr-navlink" style={link}>
                {l.label}
              </a>
            ))}
            <a
              href={GC_URL}
              {...ext}
              data-sr-magnetic
              data-sr-strength="0.35"
              className="sr-btn sr-btn-primary"
              style={{ padding: '11px 20px', fontSize: '14.5px', fontWeight: 700 }}
            >
              <span data-sr-magnetic-inner style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Open Ground Control ↗
              </span>
            </a>
          </nav>
          <button
            className="sr-nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>
      {open && (
        <div className="sr-mobile-menu">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href={GC_URL}
            {...ext}
            className="sr-btn sr-btn-primary"
            style={{ marginTop: 16, justifyContent: 'center', fontWeight: 700 }}
            onClick={() => setOpen(false)}
          >
            Open Ground Control ↗
          </a>
        </div>
      )}
    </>
  );
}

/* ── Hero ───────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section id="top" style={{ position: 'relative', padding: '150px 0 96px', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.55,
          backgroundImage: 'radial-gradient(rgba(27,25,22,0.05) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          WebkitMaskImage: 'linear-gradient(180deg, #000 0%, transparent 85%)',
          maskImage: 'linear-gradient(180deg, #000 0%, transparent 85%)',
        }}
      />
      <div className="sr-container" style={{ position: 'relative' }}>
        <div data-sr-hero>
          <h1
            data-sr-hero-item
            data-sr-text
            className="sr-display"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(3.2rem, 8vw, 7rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.04em',
              color: 'var(--sr-text-90)',
              // 17ch is intended relative to the headline size, so it lives on
              // the h1 (matching how the CTA headline sets its own max-width),
              // not the body-font wrapper where `ch` would collapse to ~140px.
              maxWidth: '17ch',
            }}
          >
            Bring the idea. We own the rest.
          </h1>
        </div>
        <div
          className="sr-grid-2"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginTop: 44 }}
        >
          <div data-sr-hero style={{ maxWidth: '52ch' }}>
            <p data-sr-hero-item style={{ fontSize: 'var(--text-lg)', lineHeight: 1.68, color: 'var(--sr-text-55)', fontWeight: 500 }}>
              Describe a product in plain language. Serendepify's agents take it from there —{' '}
              <span style={{ color: 'var(--sr-text-90)', fontWeight: 700 }}>building</span> it,{' '}
              <span style={{ color: 'var(--sr-text-90)', fontWeight: 700 }}>shipping</span> it, and{' '}
              <span style={{ color: 'var(--sr-text-90)', fontWeight: 700 }}>operating</span> it in production. One continuous line of ownership.
            </p>
            <div data-sr-hero-item style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
              <a href="#lifecycle" data-sr-magnetic data-sr-strength="0.4" className="sr-btn sr-btn-primary" style={{ fontWeight: 700 }}>
                <span data-sr-magnetic-inner style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>See the lifecycle →</span>
              </a>
              <a href="#agents" className="sr-btn sr-btn-ghost" style={{ fontWeight: 600 }}>For agents</a>
            </div>
          </div>
          <div className="sr-hero-stats" data-sr-hero-item style={{ display: 'flex', gap: 40, justifyContent: 'flex-end' }}>
            <div>
              <div className="sr-display" style={{ fontSize: 40, fontWeight: 800, color: 'var(--sr-text-90)', letterSpacing: '-0.03em' }}>
                <span data-sr-count="3">3</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sr-text-55)', marginTop: 2 }}>products, one line</div>
            </div>
            <div>
              <div className="sr-display" style={{ fontSize: 40, fontWeight: 800, color: 'var(--sr-text-90)', letterSpacing: '-0.03em' }}>
                <span data-sr-count="100" data-sr-suffix="%">100%</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sr-text-55)', marginTop: 2 }}>owned, idea to prod</div>
            </div>
          </div>
        </div>
        <div
          data-sr-image
          className="sr-card"
          style={{ marginTop: 56, aspectRatio: '16 / 7', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}
        >
          <ImageSlot label="Ground Control — cockpit view" />
        </div>
      </div>
    </section>
  );
}

/* ── Flip-scroll beat ───────────────────────────────────────────── */

// The card morphs through the three stages of the line as it travels. It's the
// same piece of work the whole way down — built, shipped, then run — never
// changing hands.
const FLIP_STAGES = [
  { tag: 'your idea', title: 'Building', sub: 'Forge — b2dp CLI + your agent' },
  { tag: 'your build', title: 'Shipping', sub: 'Convoy — deploy to production' },
  { tag: 'in production', title: 'Running', sub: 'Ground Control — built for VPS' },
];

function FlipBeat() {
  const sectionRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);

  // Drive the card's content from scroll progress through the pinned section.
  // (The card's *position* is driven by the GSAP Flip scrub; we mirror the same
  // progress here so the copy changes as the card reaches each station.)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const start = section.offsetTop;
        const end = start + section.offsetHeight - window.innerHeight;
        const p = (window.scrollY - start) / Math.max(1, end - start);
        // thresholds nudged past the midpoints to line up with the scrubbed card
        const s = p < 0.4 ? 0 : p < 0.74 ? 1 : 2;
        setStage((prev) => (prev === s ? prev : s));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const stationName: CSSProperties = { fontSize: 26, fontWeight: 800, color: 'var(--sr-text-35)' };
  const stationSub: CSSProperties = { fontSize: 13, fontWeight: 600, color: 'var(--sr-text-35)' };
  const s = FLIP_STAGES[stage];

  return (
    <section ref={sectionRef} data-sr-flip-scroll style={{ height: '300vh', position: 'relative', background: 'var(--sr-bg)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div className="sr-container" style={{ paddingTop: 96 }}>
          <h2
            className="sr-display"
            data-sr-text
            style={{ fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.04, maxWidth: '18ch' }}
          >
            One product. It never changes hands.
          </h2>
          <p style={{ marginTop: 18, fontSize: 'var(--text-lg)', fontWeight: 500, color: 'var(--sr-text-55)', maxWidth: '46ch' }}>
            Watch a single build travel the whole line — same ownership, start to finish.
          </p>
        </div>

        <div data-sr-flip-marker className="sr-fmarker sr-fm0" />
        <div data-sr-flip-marker className="sr-fmarker sr-fm1" />
        <div data-sr-flip-marker className="sr-fmarker sr-fm2" />

        <div className="sr-fstation sr-fs0">
          <div className="sr-display" style={stationName}>Forge</div>
          <div style={stationSub}>builds it</div>
        </div>
        <div className="sr-fstation sr-fs1">
          <div className="sr-display" style={stationName}>Convoy</div>
          <div style={stationSub}>ships it</div>
        </div>
        <div className="sr-fstation sr-fs2">
          <div className="sr-display" style={stationName}>Ground Control</div>
          <div style={stationSub}>runs it</div>
        </div>

        <div
          data-sr-flip-target
          className="sr-fcard"
          style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--grad-coral)',
            boxShadow: 'var(--shadow-lg)',
            padding: 22,
            overflow: 'hidden',
          }}
        >
          <div
            key={stage}
            className="sr-fcard-content"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#fff' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{s.tag}</span>
            </div>
            <div>
              <div className="sr-display" style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {s.title}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginTop: 6 }}>{s.sub}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Lifecycle ──────────────────────────────────────────────────── */

type LifeRow = {
  num: string;
  name: string;
  tagline: string;
  body: string;
  features: string[];
  linkLabel: string;
  href: string;
  slotLabel: string;
};

const LIFECYCLE: LifeRow[] = [
  {
    num: '01',
    name: 'Forge',
    tagline: 'Vague idea in. Built product out.',
    body: 'A skill set that turns a fuzzy idea into a well-built product, driven by the coding agent of your choice. It plans the architecture, scaffolds the build, and hands your agent a path it can execute end to end.',
    features: [
      'Turns vague briefs into concrete build plans',
      'Bring your own agent — Claude, Cursor, whatever ships',
      'Architecture & scaffolding, not just boilerplate',
    ],
    linkLabel: 'Explore Forge',
    href: FORGE_URL,
    slotLabel: 'Forge — build / scaffold view',
  },
  {
    num: '02',
    name: 'Convoy',
    tagline: 'Point it at your code. It ships.',
    body: 'Convoy reads your actual codebase — stack, dependencies, config — picks the deployment path that fits, and carries the rollout all the way to production.',
    features: [
      'Repo-aware: detects the stack and the right target',
      'From codebase to live deploy in one pass',
      'Handles routing, domains, and rollout',
    ],
    linkLabel: 'View Convoy',
    href: CONVOY_URL,
    slotLabel: 'Convoy — deploy view',
  },
  {
    num: '03',
    name: 'Ground Control',
    tagline: 'Eyes on production, always.',
    body: 'The operations cockpit. Real logs, metrics and topology in one place, so your agent can reason about a live system — and ship the next change with confidence.',
    features: [
      'Live logs, metrics and service topology',
      'Multi-target deploys from one cockpit',
      'Agent-readable — built to be operated, not just watched',
    ],
    linkLabel: 'Open Ground Control',
    href: GC_URL,
    slotLabel: 'Ground Control — dashboard',
  },
];

function LifecycleText({ row }: { row: LifeRow }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span className="sr-display" style={{ fontSize: 19, fontWeight: 700, color: 'var(--sr-text-35)' }}>{row.num}</span>
        <h3 className="sr-display" style={{ fontSize: 'clamp(2.1rem, 3.6vw, 3.1rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
          {row.name}
        </h3>
      </div>
      <p className="sr-display" style={{ fontWeight: 600, fontSize: 21, color: 'var(--sr-coral)', marginTop: 8 }}>{row.tagline}</p>
      <p style={{ marginTop: 18, fontSize: '16.5px', lineHeight: 1.72, color: 'var(--sr-text-55)', fontWeight: 500, maxWidth: '46ch' }}>
        {row.body}
      </p>
      <ul style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {row.features.map((f) => <FeatureItem key={f}>{f}</FeatureItem>)}
      </ul>
      <a href={row.href} {...ext} style={textLink}>
        {row.linkLabel} <span style={{ color: 'var(--sr-coral)' }}>↗</span>
      </a>
    </div>
  );
}

function LifecycleImage({ row }: { row: LifeRow }) {
  return (
    <div
      data-sr-image
      className="sr-card"
      style={{ aspectRatio: '4 / 3', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}
    >
      <ImageSlot label={row.slotLabel} />
    </div>
  );
}

function Lifecycle() {
  return (
    <section id="lifecycle" className="sr-section">
      <div className="sr-container">
        <div style={{ maxWidth: 760, marginBottom: 'var(--space-6)' }}>
          <h2 className="sr-display" data-sr-text style={{ fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.04 }}>
            One agent owns the whole line.
          </h2>
          <p data-sr-reveal style={{ marginTop: 20, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--sr-text-55)', fontWeight: 500, maxWidth: '56ch' }}>
            From a fuzzy brief to a running system. Forge builds it, Convoy ships it, Ground Control keeps it alive — one continuous handoff, no glue in between.
          </p>
        </div>

        {/* Row 1: text left, image right */}
        <div
          data-sr-reveal
          className="sr-grid-2"
          style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 56, alignItems: 'center', paddingBottom: 'var(--space-6)' }}
        >
          <LifecycleText row={LIFECYCLE[0]} />
          <LifecycleImage row={LIFECYCLE[0]} />
        </div>

        {/* Row 2: image left, text right */}
        <div
          data-sr-reveal
          className="sr-grid-2"
          style={{ display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 56, alignItems: 'center', padding: 'var(--space-5) 0 var(--space-6)', borderTop: '1px solid var(--sr-stone)' }}
        >
          <LifecycleImage row={LIFECYCLE[1]} />
          <LifecycleText row={LIFECYCLE[1]} />
        </div>

        {/* Row 3: text left, image right */}
        <div
          data-sr-reveal
          className="sr-grid-2"
          style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 56, alignItems: 'center', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--sr-stone)' }}
        >
          <LifecycleText row={LIFECYCLE[2]} />
          <LifecycleImage row={LIFECYCLE[2]} />
        </div>
      </div>
    </section>
  );
}

/* ── Agents pipeline (dark) ─────────────────────────────────────── */

function AgentsPipeline() {
  return (
    <section id="agents" style={{ background: '#16150F', color: '#F5F4F0', padding: 'clamp(80px, 11vw, 150px) 0', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          aspectRatio: '2 / 1',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,106,64,0.13), transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <div className="sr-container" style={{ position: 'relative' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <p data-sr-reveal style={{ fontSize: 15, fontWeight: 700, color: 'var(--sr-coral-bright)', marginBottom: 22 }}>
            Built for the agents doing the work
          </p>
          <h2 data-sr-text className="sr-display" style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
            The pulse travels the pipeline.
          </h2>
          <p data-sr-reveal style={{ marginTop: 26, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'rgba(245,244,240,0.6)', fontWeight: 500 }}>
            One unbroken signal from idea to production. Every stage carries the same five things forward —{' '}
            <span
              data-sr-scramble
              data-sr-words="ownership|continuity|delivery|speed|quality"
              style={{ color: 'var(--sr-coral-bright)', fontWeight: 700, fontVariant: 'small-caps', letterSpacing: '0.02em' }}
            >
              ownership
            </span>
            .
          </p>
        </div>

        <div data-sr-draw data-sr-path data-sr-stagger="0.16" style={{ position: 'relative', marginTop: 'clamp(48px, 7vw, 88px)' }}>
          <svg viewBox="0 0 1120 300" style={{ width: '100%', overflow: 'visible' }}>
            <path
              d="M 40 200 C 200 200 200 120 360 120 C 520 120 520 200 680 200 C 840 200 840 110 1000 110 L 1080 110"
              fill="none"
              stroke="rgba(245,244,240,0.12)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              data-sr-path-line
              d="M 40 200 C 200 200 200 120 360 120 C 520 120 520 200 680 200 C 840 200 840 110 1000 110 L 1080 110"
              fill="none"
              stroke="var(--sr-coral-bright)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 7px rgba(255,106,64,0.55))' }}
            />

            <g>
              <circle data-sr-path cx="360" cy="120" r="27" fill="#16150F" stroke="rgba(245,244,240,0.55)" strokeWidth="2" />
              <path data-sr-path d="M 360 108 L 372 120 L 360 132 L 348 120 Z" fill="none" stroke="var(--sr-coral-bright)" strokeWidth="2.2" strokeLinejoin="round" />
              <text x="360" y="186" textAnchor="middle" className="sr-display" style={{ fontSize: '22px', fontWeight: 700, fill: '#F5F4F0' }}>Forge</text>
              <text x="360" y="208" textAnchor="middle" style={{ fontSize: '13px', fontWeight: 600, fill: 'rgba(245,244,240,0.5)' }}>builds it</text>
            </g>
            <g>
              <circle data-sr-path cx="680" cy="200" r="27" fill="#16150F" stroke="rgba(245,244,240,0.55)" strokeWidth="2" />
              <path data-sr-path d="M 668 200 L 690 200 M 683 192 L 691 200 L 683 208" fill="none" stroke="var(--sr-coral-bright)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="680" y="266" textAnchor="middle" className="sr-display" style={{ fontSize: '22px', fontWeight: 700, fill: '#F5F4F0' }}>Convoy</text>
              <text x="680" y="288" textAnchor="middle" style={{ fontSize: '13px', fontWeight: 600, fill: 'rgba(245,244,240,0.5)' }}>ships it</text>
            </g>
            <g>
              <circle data-sr-path cx="1000" cy="110" r="27" fill="#16150F" stroke="var(--sr-coral)" strokeWidth="2.5" />
              <circle data-sr-path cx="1000" cy="110" r="6" fill="none" stroke="var(--sr-coral-bright)" strokeWidth="2.2" />
              <path data-sr-path d="M 1000 110 L 1014 96" fill="none" stroke="var(--sr-coral-bright)" strokeWidth="2.2" strokeLinecap="round" />
              <text x="1000" y="176" textAnchor="middle" className="sr-display" style={{ fontSize: '22px', fontWeight: 700, fill: '#F5F4F0' }}>Ground Control</text>
              <text x="1000" y="198" textAnchor="middle" style={{ fontSize: '13px', fontWeight: 600, fill: 'rgba(245,244,240,0.5)' }}>runs it</text>
            </g>

            <circle data-sr-path-dot cx="40" cy="200" r="7" fill="var(--sr-coral-bright)" style={{ filter: 'drop-shadow(0 0 9px rgba(255,106,64,0.9))' }} />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ────────────────────────────────────────────────────── */

function Pricing() {
  return (
    <section id="pricing" className="sr-section">
      <div className="sr-container">
        <div style={{ maxWidth: 720, marginBottom: 'var(--space-6)' }}>
          <h2 className="sr-display" data-sr-text style={{ fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.04 }}>
            Start free. Pay when you ship.
          </h2>
          <p data-sr-reveal style={{ marginTop: 20, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--sr-text-55)', fontWeight: 500, maxWidth: '54ch' }}>
            Forge is open and free while in beta. Convoy and Ground Control scale with what you run in production.
          </p>
        </div>
        <div className="sr-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {/* Forge */}
          <div data-sr-reveal className="sr-card" style={{ background: 'var(--sr-paper)', padding: 32, display: 'flex', flexDirection: 'column', border: '1px solid var(--sr-stone)' }}>
            <h3 className="sr-display" style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>Forge</h3>
            <p style={{ marginTop: 6, fontSize: '14.5px', fontWeight: 600, color: 'var(--sr-coral)' }}>Beta · open</p>
            <div style={{ marginTop: 22, display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span className="sr-display" style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em' }}>$0</span>
            </div>
            <p style={{ marginTop: 4, fontSize: 14, fontWeight: 500, color: 'var(--sr-text-55)' }}>Bring your own coding agent.</p>
            <div style={{ height: 1, background: 'var(--sr-stone)', margin: '26px 0' }} />
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 13, flex: 1 }}>
              <FeatureItem>Full Forge skill set</FeatureItem>
              <FeatureItem>Unlimited build plans</FeatureItem>
              <FeatureItem>Community support</FeatureItem>
            </ul>
            <a href={FORGE_URL} {...ext} className="sr-btn sr-btn-ghost" style={{ marginTop: 26, width: '100%', justifyContent: 'center', fontWeight: 700 }}>Install Forge</a>
          </div>

          {/* Convoy (featured) */}
          <div data-sr-reveal className="sr-card" style={{ background: '#16150F', color: '#F5F4F0', padding: 32, display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-lg)', position: 'relative', transform: 'translateY(-8px)' }}>
            <div style={{ position: 'absolute', top: 20, right: 24, fontSize: '12.5px', fontWeight: 700, color: 'var(--sr-coral-bright)' }}>Most teams</div>
            <h3 className="sr-display" style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>Convoy</h3>
            <p style={{ marginTop: 6, fontSize: '14.5px', fontWeight: 600, color: 'rgba(245,244,240,0.55)' }}>Ship to production</p>
            <div style={{ marginTop: 22, display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span className="sr-display" style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em' }}>$29</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'rgba(245,244,240,0.5)' }}>/mo</span>
            </div>
            <p style={{ marginTop: 4, fontSize: 14, fontWeight: 500, color: 'rgba(245,244,240,0.55)' }}>Per developer, billed monthly.</p>
            <div style={{ height: 1, background: 'rgba(245,244,240,0.14)', margin: '26px 0' }} />
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 13, flex: 1 }}>
              <FeatureItem color="var(--sr-coral-bright)" textColor="rgba(245,244,240,0.78)">Everything in Forge</FeatureItem>
              <FeatureItem color="var(--sr-coral-bright)" textColor="rgba(245,244,240,0.78)">Repo-aware deploys, any stack</FeatureItem>
              <FeatureItem color="var(--sr-coral-bright)" textColor="rgba(245,244,240,0.78)">Custom domains & rollout</FeatureItem>
              <FeatureItem color="var(--sr-coral-bright)" textColor="rgba(245,244,240,0.78)">Ground Control included</FeatureItem>
            </ul>
            <a href={GC_URL} {...ext} data-sr-magnetic data-sr-strength="0.3" className="sr-btn sr-btn-primary" style={{ marginTop: 26, width: '100%', justifyContent: 'center', fontWeight: 700 }}>
              <span data-sr-magnetic-inner>Start shipping →</span>
            </a>
          </div>

          {/* Fleet */}
          <div data-sr-reveal className="sr-card" style={{ background: 'var(--sr-paper)', padding: 32, display: 'flex', flexDirection: 'column', border: '1px solid var(--sr-stone)' }}>
            <h3 className="sr-display" style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>Fleet</h3>
            <p style={{ marginTop: 6, fontSize: '14.5px', fontWeight: 600, color: 'var(--sr-coral)' }}>Enterprise</p>
            <div style={{ marginTop: 22, display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span className="sr-display" style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em' }}>Let's talk</span>
            </div>
            <p style={{ marginTop: 4, fontSize: 14, fontWeight: 500, color: 'var(--sr-text-55)' }}>For orgs running many systems.</p>
            <div style={{ height: 1, background: 'var(--sr-stone)', margin: '26px 0' }} />
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 13, flex: 1 }}>
              <FeatureItem>Everything in Convoy</FeatureItem>
              <FeatureItem>SSO, audit logs, roles</FeatureItem>
              <FeatureItem>Private regions & SLAs</FeatureItem>
              <FeatureItem>Dedicated support</FeatureItem>
            </ul>
            <a href="#cta" className="sr-btn sr-btn-ghost" style={{ marginTop: 26, width: '100%', justifyContent: 'center', fontWeight: 700 }}>Contact sales</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Docs / developers ──────────────────────────────────────────── */

function Docs() {
  const step = (n: string, title: string, body: string) => (
    <div style={{ display: 'flex', gap: 14 }}>
      <span className="sr-display" style={{ fontSize: 17, fontWeight: 800, color: 'var(--sr-coral)' }}>{n}</span>
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--sr-text-90)' }}>{title}</div>
        <div style={{ fontSize: '14.5px', fontWeight: 500, color: 'var(--sr-text-55)', marginTop: 2 }}>{body}</div>
      </div>
    </div>
  );
  return (
    <section id="docs" className="sr-section" style={{ background: 'var(--sr-paper)' }}>
      <div className="sr-container">
        <div className="sr-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <h2 className="sr-display" data-sr-text style={{ fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.04 }}>
              Made for developers and their agents.
            </h2>
            <p data-sr-reveal style={{ marginTop: 20, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--sr-text-55)', fontWeight: 500, maxWidth: '46ch' }}>
              One command drops Forge into your agent's toolbelt. Everything after that is plain language and clean APIs.
            </p>
            <div data-sr-reveal style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {step('01', 'Install the skill', 'Add Forge to Claude, Cursor, or any MCP-aware agent.')}
              {step('02', 'Describe the product', 'Plain language in. A concrete build plan out.')}
              {step('03', 'Ship with Convoy', 'Point it at the repo; watch it go live in Ground Control.')}
            </div>
            <a href={FORGE_URL} {...ext} style={{ ...textLink, marginTop: 30 }}>
              Read the docs <span style={{ color: 'var(--sr-coral)' }}>↗</span>
            </a>
          </div>
          <div data-sr-reveal className="sr-card" style={{ background: '#16150F', padding: 0, boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 18px', borderBottom: '1px solid rgba(245,244,240,0.1)' }}>
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
              <span className="sr-mono" style={{ marginLeft: 8, fontSize: 12, color: 'rgba(245,244,240,0.45)' }}>your-agent — forge</span>
            </div>
            <div className="sr-mono" style={{ padding: 22, fontSize: '13.5px', lineHeight: 1.95 }}>
              <div style={{ color: 'rgba(245,244,240,0.4)' }}>
                <span style={{ color: 'var(--sr-coral-bright)' }}>$</span> npx{' '}
                <span data-sr-typewriter data-sr-speed="0.04" style={{ color: '#F5F4F0' }}>@serendepify/forge init</span>
              </div>
              <div style={{ color: '#6ee7a8', marginTop: 10 }}>✓ Forge skill registered</div>
              <div style={{ color: 'rgba(245,244,240,0.6)' }}>› describe your product…</div>
              <div style={{ color: 'rgba(245,244,240,0.92)', marginTop: 8 }}>“a marketplace for local farmers”</div>
              <div style={{ color: 'rgba(245,244,240,0.4)', marginTop: 10 }}>planning architecture</div>
              <div style={{ color: '#6ee7a8' }}>
                ✓ <span data-sr-count="23" data-sr-duration="1.4">23</span> files scaffolded · ready for your agent
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── What's new (bento) ─────────────────────────────────────────── */

function WhatsNew() {
  return (
    <section id="whatsnew" className="sr-section">
      <div className="sr-container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
          <h2 className="sr-display" data-sr-text style={{ fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.04, maxWidth: '14ch' }}>
            What's new at Serendepify.
          </h2>
          <a href="#" style={{ fontSize: 15, fontWeight: 700, color: 'var(--sr-text-90)', borderBottom: '2px solid var(--sr-coral)', paddingBottom: 3 }}>All updates ↗</a>
        </div>
        <div className="sr-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridAutoRows: '200px', gap: 18 }}>
          {/* Large image card */}
          <div data-sr-reveal className="sr-card" style={{ gridColumn: 'span 4', gridRow: 'span 2', overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow-md)' }}>
            <ImageSlot absolute label="Ground Control — hero" background="var(--grad-dusk-sky)" labelColor="rgba(22,21,15,0.5)" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 35%, rgba(22,21,15,0.85))', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', left: 0, bottom: 0, padding: 30, pointerEvents: 'none' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--sr-coral-bright)' }}>Product</p>
              <h3 className="sr-display" style={{ marginTop: 8, fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em', color: '#F5F4F0', maxWidth: '18ch' }}>Ground Control is live</h3>
              <p style={{ marginTop: 8, fontSize: 15, fontWeight: 500, color: 'rgba(245,244,240,0.7)', maxWidth: '40ch' }}>Logs, metrics and topology in one cockpit your agent can actually operate.</p>
            </div>
          </div>
          {/* Coral text card */}
          <div data-sr-reveal className="sr-card" style={{ gridColumn: 'span 2', gridRow: 'span 1', background: 'var(--grad-coral)', padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-md)' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>Release</p>
            <h3 className="sr-display" style={{ fontSize: 23, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.1 }}>Convoy now reads any stack</h3>
          </div>
          {/* Paper text card */}
          <div data-sr-reveal className="sr-card" style={{ gridColumn: 'span 2', gridRow: 'span 1', background: 'var(--grad-paper)', border: '1px solid var(--sr-stone)', padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--sr-coral)' }}>Beta</p>
            <h3 className="sr-display" style={{ fontSize: 23, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--sr-text-90)', lineHeight: 1.1 }}>Forge opens to everyone</h3>
          </div>
          {/* 3-col image card */}
          <div data-sr-reveal className="sr-card" style={{ gridColumn: 'span 3', gridRow: 'span 1', overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow-md)' }}>
            <ImageSlot absolute label="Convoy — deploy" background="var(--grad-dusk)" labelColor="rgba(22,21,15,0.5)" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(22,21,15,0.8))', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', left: 0, bottom: 0, padding: 24, pointerEvents: 'none' }}>
              <h3 className="sr-display" style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: '#F5F4F0' }}>38-second deploys</h3>
            </div>
          </div>
          {/* Dark text card */}
          <div data-sr-reveal className="sr-card" style={{ gridColumn: 'span 3', gridRow: 'span 1', background: 'var(--grad-warm-dark)', padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-md)' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--sr-coral-bright)' }}>Engineering</p>
            <h3 className="sr-display" style={{ fontSize: 23, fontWeight: 800, letterSpacing: '-0.02em', color: '#F5F4F0', lineHeight: 1.1 }}>How the pulse stays unbroken</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA (dark) ─────────────────────────────────────────────────── */

function Cta() {
  return (
    <section id="cta" style={{ background: '#16150F', color: '#F5F4F0', padding: 'clamp(80px, 12vw, 160px) 0', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          aspectRatio: '2 / 1',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,106,64,0.16), transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <div className="sr-container" style={{ position: 'relative', textAlign: 'center' }}>
        <h2 data-sr-text className="sr-display" style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.98, maxWidth: '16ch', margin: '0 auto' }}>
          Bring the idea. We own the rest.
        </h2>
        <div data-sr-reveal style={{ marginTop: 42, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={GC_URL} {...ext} data-sr-magnetic data-sr-strength="0.4" className="sr-btn sr-btn-primary" style={{ fontWeight: 700, fontSize: 16, padding: '16px 30px' }}>
            <span data-sr-magnetic-inner style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>Open Ground Control ↗</span>
          </a>
          <a href={FORGE_URL} {...ext} className="sr-btn" style={{ fontWeight: 700, fontSize: 16, padding: '16px 30px', background: 'rgba(245,244,240,0.08)', color: '#F5F4F0', border: '1px solid rgba(245,244,240,0.2)' }}>
            Install Forge
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────────────── */

function Footer() {
  const colLink: CSSProperties = { fontSize: 14, fontWeight: 500, color: 'var(--sr-text-55)' };
  return (
    <footer style={{ background: 'var(--sr-bg)', borderTop: '1px solid var(--sr-stone)', padding: '64px 0 40px' }}>
      <div className="sr-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '30ch' }}>
            <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <LogoMark size={26} />
              <Wordmark size={18} />
            </a>
            <p style={{ marginTop: 16, fontSize: '14.5px', fontWeight: 500, lineHeight: 1.6, color: 'var(--sr-text-55)' }}>
              Bring the idea. We own the rest — from first brief to running production.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--sr-text-90)' }}>Product</span>
              <a href="#lifecycle" className="sr-navlink" style={colLink}>Lifecycle</a>
              <a href="#pricing" className="sr-navlink" style={colLink}>Pricing</a>
              <a href="#docs" className="sr-navlink" style={colLink}>Docs</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--sr-text-90)' }}>Products</span>
              <a href={FORGE_URL} {...ext} className="sr-navlink" style={colLink}>Forge</a>
              <a href={CONVOY_URL} {...ext} className="sr-navlink" style={colLink}>Convoy</a>
              <a href={GC_URL} {...ext} className="sr-navlink" style={colLink}>Ground Control</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--sr-stone)', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--sr-text-35)' }}>© 2026 Serendepify. All rights reserved.</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--sr-text-35)' }}>One continuous line of ownership.</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */

export default function Home() {
  useSerendepifyMotion();
  // `.sr-page` clips horizontal overflow with `overflow-x: clip` (not
  // `hidden`), which keeps `position: sticky` and ScrollTrigger working. See
  // the scroll-container note in sr.css.
  return (
    <div className="sr-page" style={{ background: 'var(--sr-bg)' }}>
      <div className="sr-scroll-progress" data-sr-scroll-progress />
      <Nav />
      <Hero />
      <FlipBeat />
      <Lifecycle />
      <AgentsPipeline />
      <Pricing />
      <Docs />
      <WhatsNew />
      <Cta />
      <Footer />
    </div>
  );
}
