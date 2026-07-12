import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { CONVOY_URL, FORGE_URL, GC_DEMO_URL, GC_URL, PRODUCT_MEDIA } from './media';
import { useSerendepifyMotion } from './useSerendepifyMotion';
import type { SlotMedia } from './ui';
import { ImageSlot, LogoMark, Wordmark } from './ui';

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
  { href: '#lifecycle', label: 'Platform' },
  { href: '#agents', label: 'How it works' },
  { href: '/products', label: 'Product pitch' },
  { href: '#pricing', label: 'Access' },
  { href: '#docs', label: 'For builders' },
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
            Production needs an operator.
          </h1>
        </div>
        <div
          className="sr-grid-2"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginTop: 44 }}
        >
          <div data-sr-hero style={{ maxWidth: '52ch' }}>
            <p data-sr-hero-item style={{ fontSize: 'var(--text-lg)', lineHeight: 1.68, color: 'var(--sr-text-55)', fontWeight: 500 }}>
              <span style={{ color: 'var(--sr-text-90)', fontWeight: 700 }}>Ground Control</span> gives lean software teams one place to understand health, services, logs, and operational actions. Convoy controls the rollout; Forge improves what enters the line. Built in Accra for teams running real software on practical infrastructure.
            </p>
            <div data-sr-hero-item style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
              <a href={GC_URL} {...ext} data-sr-magnetic data-sr-strength="0.4" className="sr-btn sr-btn-primary" style={{ fontWeight: 700 }}>
                <span data-sr-magnetic-inner style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>Open Ground Control ↗</span>
              </a>
              <a href="#lifecycle" className="sr-btn sr-btn-ghost" style={{ fontWeight: 600 }}>See the operating system</a>
              <a href={GC_DEMO_URL} {...ext} className="sr-demo-link">Watch the operations demo <span aria-hidden="true">▶</span></a>
            </div>
          </div>
          <div className="sr-hero-stats" data-sr-hero-item style={{ display: 'flex', gap: 40, justifyContent: 'flex-end' }}>
            <div>
              <div className="sr-display" style={{ fontSize: 40, fontWeight: 800, color: 'var(--sr-text-90)', letterSpacing: '-0.03em' }}>
                <span data-sr-count="1">1</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sr-text-55)', marginTop: 2 }}>operational cockpit</div>
            </div>
            <div>
              <div className="sr-display" style={{ fontSize: 40, fontWeight: 800, color: 'var(--sr-text-90)', letterSpacing: '-0.03em' }}>
                <span data-sr-count="3">3</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sr-text-55)', marginTop: 2 }}>connected product layers</div>
            </div>
          </div>
        </div>
        <div
          data-sr-image
          className="sr-card sr-hero-ops-card"
          style={{ marginTop: 56, aspectRatio: '16 / 8.4', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}
        >
          <ImageSlot
            absolute
            label="Ground Control — AI operations surface"
            media={PRODUCT_MEDIA.groundControl}
            mediaFit="contain"
            background="#111417"
          />
          <div className="sr-live-pill"><span /> Live early access</div>
          <div className="sr-ops-dock" aria-label="Ground Control capabilities">
            <div><small>Health</small><strong>Visible</strong></div>
            <div><small>Changes</small><strong>Reviewable</strong></div>
            <div><small>Rollouts</small><strong>Controlled</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  const proof = [
    ['Live cockpit', 'Ground Control is available as an early-access operational surface.'],
    ['Controlled rollout', 'Convoy exposes rehearsal, approval gates, canaries, and observation.'],
    ['Open build layer', 'Forge is published for teams shaping stronger build context upstream.'],
  ];

  return (
    <section className="sr-proof-strip" aria-label="Working product proof">
      <div className="sr-container sr-proof-grid">
        <div className="sr-proof-intro">
          <span>Working product proof</span>
          <strong>Not a slide-only concept.</strong>
        </div>
        {proof.map(([title, body], index) => (
          <article key={title} data-sr-reveal>
            <b>0{index + 1}</b>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── Flip-scroll beat ───────────────────────────────────────────── */

// The card morphs through the three stages of the line as it travels. It's the
// same piece of work the whole way down — built, shipped, then run — never
// changing hands.
const FLIP_STAGES = [
  { tag: 'live system', title: 'Observe', sub: 'Ground Control — health, services, logs' },
  { tag: 'operator decision', title: 'Decide', sub: 'Ground Control — context + reviewed actions' },
  { tag: 'controlled change', title: 'Act', sub: 'Convoy — rehearse, gate, verify' },
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
    <section ref={sectionRef} data-sr-flip-scroll className="sr-flip-section" style={{ position: 'relative', background: 'var(--sr-bg)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div className="sr-container" style={{ paddingTop: 96 }}>
          <h2
            className="sr-display"
            data-sr-text
            style={{ fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.04, maxWidth: '18ch' }}
          >
            One operating loop. Context stays attached.
          </h2>
          <p style={{ marginTop: 18, fontSize: 'var(--text-lg)', fontWeight: 500, color: 'var(--sr-text-55)', maxWidth: '46ch' }}>
            See the system, understand the change, then carry it through a controlled rollout.
          </p>
        </div>

        <div data-sr-flip-marker className="sr-fmarker sr-fm0" />
        <div data-sr-flip-marker className="sr-fmarker sr-fm1" />
        <div data-sr-flip-marker className="sr-fmarker sr-fm2" />

        <div className="sr-fstation sr-fs0">
          <div className="sr-display" style={stationName}>Ground Control</div>
          <div style={stationSub}>observes it</div>
        </div>
        <div className="sr-fstation sr-fs1">
          <div className="sr-display" style={stationName}>Operator</div>
          <div style={stationSub}>reviews the action</div>
        </div>
        <div className="sr-fstation sr-fs2">
          <div className="sr-display" style={stationName}>Convoy</div>
          <div style={stationSub}>executes safely</div>
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
  media: SlotMedia;
  mediaFit?: CSSProperties['objectFit'];
};

const LIFECYCLE: LifeRow[] = [
  {
    num: '01',
    name: 'Ground Control',
    tagline: 'See the whole system.',
    body: 'Ground Control is the operational cockpit for practical infrastructure: health, services, logs, terminal, DNS, alerts, and assisted actions in one VPS-aware surface.',
    features: [
      'Live context across health, memory, disk, and containers',
      'Service controls, logs, restart actions, and terminal access',
      'One reviewable surface for operators and their AI tools',
    ],
    linkLabel: 'Open Ground Control',
    href: GC_URL,
    slotLabel: 'Ground Control — services view',
    media: PRODUCT_MEDIA.groundControlServices,
    mediaFit: 'contain',
  },
  {
    num: '02',
    name: 'Convoy',
    tagline: 'Turn decisions into controlled rollouts.',
    body: 'Convoy carries approved changes from repository context into a controlled deployment run: scan, plan, rehearse, gate, promote, and observe.',
    features: [
      'Repo-aware planning from source, config, and environment',
      'Human-approved gates for secrets, PRs, and risky deploy steps',
      'Canary, promote, and observe loops with run memory',
    ],
    linkLabel: 'View Convoy',
    href: CONVOY_URL,
    slotLabel: 'Convoy — deploy view',
    media: PRODUCT_MEDIA.convoy,
    mediaFit: 'cover',
  },
  {
    num: '03',
    name: 'Forge',
    tagline: 'Shape better systems upstream.',
    body: 'Forge turns a fuzzy product brief into architecture, scaffolding, and an implementation path that a coding agent can follow before the system reaches production.',
    features: [
      'Concrete build plans from plain-language briefs',
      'Agent-agnostic workflows for modern coding tools',
      'Architecture and scaffolding instead of generic boilerplate',
    ],
    linkLabel: 'Explore Forge',
    href: FORGE_URL,
    slotLabel: 'Forge — build / scaffold view',
    media: PRODUCT_MEDIA.forge,
    mediaFit: 'contain',
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
      <ImageSlot label={row.slotLabel} media={row.media} mediaFit={row.mediaFit} background="#111417" />
    </div>
  );
}

function Lifecycle() {
  return (
    <section id="lifecycle" className="sr-section">
      <div className="sr-container">
        <div style={{ maxWidth: 760, marginBottom: 'var(--space-6)' }}>
          <h2 className="sr-display" data-sr-text style={{ fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.04 }}>
            Ground Control is the product. The line supports it.
          </h2>
          <p data-sr-reveal style={{ marginTop: 20, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--sr-text-55)', fontWeight: 500, maxWidth: '56ch' }}>
            Start where the pain is visible: production. Ground Control makes the system legible, Convoy carries controlled changes, and Forge improves the context created upstream.
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
            One cockpit, connected context
          </p>
          <h2 data-sr-text className="sr-display" style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
            Ground Control is where the loop closes.
          </h2>
          <p data-sr-reveal style={{ marginTop: 26, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'rgba(245,244,240,0.6)', fontWeight: 500 }}>
            Forge shapes the system and Convoy carries the change. Ground Control keeps the production state visible, so every layer works from shared{' '}
            <span
              data-sr-scramble
              data-sr-words="context|evidence|history|state|control"
              style={{ color: 'var(--sr-coral-bright)', fontWeight: 700, fontVariant: 'small-caps', letterSpacing: '0.02em' }}
            >
              context
            </span>
            .
          </p>
        </div>

        <div data-sr-draw data-sr-path data-sr-stagger="0.16" className="sr-system-hub">
          <svg viewBox="0 0 1120 360" role="img" aria-label="Forge supplies upstream context to Ground Control while Convoy carries controlled actions">
            <defs>
              <marker id="sr-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M 0 0 L 8 4 L 0 8 Z" fill="var(--sr-coral-bright)" />
              </marker>
            </defs>
            <path d="M 275 180 C 350 180 370 180 430 180" fill="none" stroke="rgba(245,244,240,0.12)" strokeWidth="2" />
            <path d="M 690 180 C 750 180 775 180 845 180" fill="none" stroke="rgba(245,244,240,0.12)" strokeWidth="2" />
            <path data-sr-path data-sr-path-line d="M 275 180 C 350 180 370 180 430 180" fill="none" stroke="var(--sr-coral-bright)" strokeWidth="3" strokeLinecap="round" markerEnd="url(#sr-arrow)" />
            <path data-sr-path data-sr-path-line d="M 690 180 C 750 180 775 180 845 180" fill="none" stroke="var(--sr-coral-bright)" strokeWidth="3" strokeLinecap="round" markerEnd="url(#sr-arrow)" />

            <g>
              <rect x="90" y="105" width="185" height="150" rx="30" fill="rgba(245,244,240,0.04)" stroke="rgba(245,244,240,0.24)" />
              <text x="182" y="164" textAnchor="middle" className="sr-display" style={{ fontSize: '24px', fontWeight: 800, fill: '#F5F4F0' }}>Forge</text>
              <text x="182" y="194" textAnchor="middle" style={{ fontSize: '13px', fontWeight: 600, fill: 'rgba(245,244,240,0.52)' }}>upstream context</text>
              <text x="182" y="216" textAnchor="middle" style={{ fontSize: '12px', fontWeight: 500, fill: 'rgba(245,244,240,0.38)' }}>plan · architecture · build</text>
            </g>

            <g>
              <rect x="430" y="65" width="260" height="230" rx="42" fill="rgba(255,106,64,0.12)" stroke="var(--sr-coral-bright)" strokeWidth="2.5" />
              <circle cx="560" cy="130" r="25" fill="none" stroke="var(--sr-coral-bright)" strokeWidth="2.5" />
              <circle cx="560" cy="130" r="6" fill="var(--sr-coral-bright)" />
              <text x="560" y="197" textAnchor="middle" className="sr-display" style={{ fontSize: '29px', fontWeight: 800, fill: '#F5F4F0' }}>Ground Control</text>
              <text x="560" y="229" textAnchor="middle" style={{ fontSize: '14px', fontWeight: 700, fill: 'var(--sr-coral-bright)' }}>observe · decide</text>
              <text x="560" y="253" textAnchor="middle" style={{ fontSize: '12px', fontWeight: 500, fill: 'rgba(245,244,240,0.48)' }}>health · services · logs · actions</text>
            </g>

            <g>
              <rect x="845" y="105" width="185" height="150" rx="30" fill="rgba(245,244,240,0.04)" stroke="rgba(245,244,240,0.24)" />
              <text x="937" y="164" textAnchor="middle" className="sr-display" style={{ fontSize: '24px', fontWeight: 800, fill: '#F5F4F0' }}>Convoy</text>
              <text x="937" y="194" textAnchor="middle" style={{ fontSize: '13px', fontWeight: 600, fill: 'rgba(245,244,240,0.52)' }}>controlled action</text>
              <text x="937" y="216" textAnchor="middle" style={{ fontSize: '12px', fontWeight: 500, fill: 'rgba(245,244,240,0.38)' }}>rehearse · gate · verify</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ── Access ─────────────────────────────────────────────────────── */

function AccessCapability({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div style={{ padding: '22px 0', borderTop: '1px solid rgba(245,244,240,0.12)' }}>
      <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--sr-coral-bright)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{eyebrow}</p>
      <h3 className="sr-display" style={{ marginTop: 7, fontSize: 24, fontWeight: 800, letterSpacing: 0, color: '#F5F4F0' }}>{title}</h3>
      <p style={{ marginTop: 8, fontSize: 15, lineHeight: 1.55, fontWeight: 500, color: 'rgba(245,244,240,0.66)' }}>{body}</p>
    </div>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="sr-section" style={{ background: 'var(--sr-paper)' }}>
      <div className="sr-container">
        <div style={{ maxWidth: 760, marginBottom: 'var(--space-6)' }}>
          <p data-sr-reveal style={{ fontSize: 13, fontWeight: 800, color: 'var(--sr-coral)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>
            Access
          </p>
          <h2 className="sr-display" data-sr-text style={{ fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: 0, lineHeight: 1.04 }}>
            Start with the operating layer.
          </h2>
          <p data-sr-reveal style={{ marginTop: 20, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--sr-text-55)', fontWeight: 500, maxWidth: '54ch' }}>
            Ground Control is the early-access operational cockpit. Convoy extends it into controlled rollout, while Forge remains the public entry point for better build context.
          </p>
        </div>
        <div data-sr-reveal className="sr-card" style={{ background: '#16150F', color: '#F5F4F0', padding: 'clamp(28px, 5vw, 48px)', boxShadow: 'var(--shadow-lg)' }}>
          <div className="sr-grid-2" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 42, alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--sr-coral-bright)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                Platform access
              </p>
              <h3 className="sr-display" style={{ marginTop: 14, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1, fontWeight: 800, letterSpacing: 0 }}>
                Observe, decide, act.
              </h3>
              <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.6, fontWeight: 500, color: 'rgba(245,244,240,0.66)' }}>
                Start with Ground Control to make a live environment legible. Bring in Convoy when an approved change needs a controlled path to production.
              </p>
              <div style={{ marginTop: 26, display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                <a href={GC_URL} {...ext} style={{ fontSize: 14, fontWeight: 800, color: 'var(--sr-coral-bright)', borderBottom: '1px solid currentColor', paddingBottom: 2 }}>
                  Open Ground Control ↗
                </a>
                <a href={CONVOY_URL} {...ext} style={{ fontSize: 14, fontWeight: 800, color: 'rgba(245,244,240,0.82)', borderBottom: '1px solid rgba(245,244,240,0.34)', paddingBottom: 2 }}>
                  Open Convoy ↗
                </a>
                <a href={FORGE_URL} {...ext} style={{ fontSize: 14, fontWeight: 800, color: 'rgba(245,244,240,0.82)', borderBottom: '1px solid rgba(245,244,240,0.34)', paddingBottom: 2 }}>
                  Install Forge ↗
                </a>
              </div>
            </div>
            <div>
              <AccessCapability
                eyebrow="Ground Control · early access"
                title="Understand production"
                body="Bring health, services, logs, terminal, DNS, alerts, and assisted actions into one operational surface."
              />
              <AccessCapability
                eyebrow="Convoy · early access"
                title="Rehearse and gate rollouts"
                body="Scan repos, stage deployment plans, approve risky steps, promote canaries, and observe production changes."
              />
              <AccessCapability
                eyebrow="Forge · public beta"
                title="Improve upstream context"
                body="Turn a plain-language brief into architecture, scaffolding, and an agent-ready implementation path."
              />
            </div>
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
              Better operations start upstream.
            </h2>
            <p data-sr-reveal style={{ marginTop: 20, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--sr-text-55)', fontWeight: 500, maxWidth: '46ch' }}>
              Forge gives coding agents a clearer build path; Convoy retains deployment context; Ground Control makes the running result observable and operable.
            </p>
            <div data-sr-reveal style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {step('01', 'Install the skill', 'Add Forge to Claude, Cursor, or any MCP-aware agent.')}
              {step('02', 'Describe the product', 'Plain language in. A concrete build plan out.')}
              {step('03', 'Roll out with Convoy', 'Point it at the repo; rehearse, gate, promote, and observe the rollout.')}
            </div>
            <a href={FORGE_URL} {...ext} style={{ ...textLink, marginTop: 30 }}>
              Explore Forge <span style={{ color: 'var(--sr-coral)' }}>↗</span>
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
                <span data-sr-typewriter data-sr-speed="0.04" style={{ color: '#F5F4F0' }}>@teckedd-code2save/forge init</span>
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
            Inside the operating system.
          </h2>
          <a href="#" style={{ fontSize: 15, fontWeight: 700, color: 'var(--sr-text-90)', borderBottom: '2px solid var(--sr-coral)', paddingBottom: 3 }}>All updates ↗</a>
        </div>
        <div className="sr-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridAutoRows: '200px', gap: 18 }}>
          {/* Large image card */}
          <div data-sr-reveal className="sr-card" style={{ gridColumn: 'span 4', gridRow: 'span 2', overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow-md)' }}>
            <ImageSlot absolute label="Ground Control — terminal" media={PRODUCT_MEDIA.groundControlTerminal} mediaFit="cover" background="#111417" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 35%, rgba(22,21,15,0.85))', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', left: 0, bottom: 0, padding: 30, pointerEvents: 'none' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--sr-coral-bright)' }}>Product</p>
              <h3 className="sr-display" style={{ marginTop: 8, fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em', color: '#F5F4F0', maxWidth: '18ch' }}>Ground Control operates the VPS</h3>
              <p style={{ marginTop: 8, fontSize: 15, fontWeight: 500, color: 'rgba(245,244,240,0.7)', maxWidth: '40ch' }}>Dashboard, services, terminal, alerts, and AI commands in one cockpit.</p>
            </div>
          </div>
          {/* Coral text card */}
          <div data-sr-reveal className="sr-card" style={{ gridColumn: 'span 2', gridRow: 'span 1', background: 'var(--grad-coral)', padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-md)' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>Release</p>
            <h3 className="sr-display" style={{ fontSize: 23, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.1 }}>Convoy now gates canary rollouts</h3>
          </div>
          {/* Paper text card */}
          <div data-sr-reveal className="sr-card" style={{ gridColumn: 'span 2', gridRow: 'span 1', background: 'var(--grad-paper)', border: '1px solid var(--sr-stone)', padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--sr-coral)' }}>Beta</p>
            <h3 className="sr-display" style={{ fontSize: 23, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--sr-text-90)', lineHeight: 1.1 }}>Forge opens to everyone</h3>
          </div>
          {/* 3-col image card */}
          <div data-sr-reveal className="sr-card" style={{ gridColumn: 'span 3', gridRow: 'span 1', overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow-md)' }}>
            <ImageSlot absolute label="Convoy — deploy" media={PRODUCT_MEDIA.convoy} mediaFit="cover" background="#111417" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(22,21,15,0.8))', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', left: 0, bottom: 0, padding: 24, pointerEvents: 'none' }}>
              <h3 className="sr-display" style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: '#F5F4F0' }}>Secrets, canaries, promote</h3>
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
          Make production understandable.
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
              An operational cockpit for lean software teams, with controlled rollout and better build context attached.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--sr-text-90)' }}>Product</span>
              <a href="#lifecycle" className="sr-navlink" style={colLink}>Platform</a>
              <a href="#pricing" className="sr-navlink" style={colLink}>Access</a>
              <a href="#docs" className="sr-navlink" style={colLink}>Docs</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--sr-text-90)' }}>Products</span>
              <a href={GC_URL} {...ext} className="sr-navlink" style={colLink}>Ground Control</a>
              <a href={CONVOY_URL} {...ext} className="sr-navlink" style={colLink}>Convoy</a>
              <a href={FORGE_URL} {...ext} className="sr-navlink" style={colLink}>Forge</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--sr-stone)', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--sr-text-35)' }}>© 2026 Serendepify. All rights reserved.</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--sr-text-35)' }}>Built in Accra. Designed for practical infrastructure.</span>
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
      <ProofStrip />
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
