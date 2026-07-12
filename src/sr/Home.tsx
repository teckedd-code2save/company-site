import { useState } from 'react';
import { siteConfig } from '@/lib/site-config';
import { CONVOY_URL, FORGE_URL, GC_URL, PRODUCT_MEDIA } from './media';
import { ImageSlot, LogoMark, Wordmark } from './ui';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

const LOOP_STEPS = [
  {
    id: 'map',
    number: '01',
    label: 'Map',
    title: 'Know which customer journeys can break.',
    body: 'Gemini connects the code change to service topology, schemas, existing tests, and confirmed customer flows to map the real blast radius.',
    status: '6 journeys affected',
    detail: 'Payment update · checkout, orders, receipts, refunds',
    output: ['payment handler changed', 'authorization contract affected', 'order and inventory flows linked', '6 customer journeys selected'],
  },
  {
    id: 'exercise',
    number: '02',
    label: 'Exercise',
    title: 'Run the release as customers would.',
    body: 'Daytona creates a disposable Release Twin for the exact commit and artifact. Synthetic customers exercise functional journeys before speed and resource checks begin.',
    status: 'Customer journeys running',
    detail: 'Daytona twin · synthetic data · provider test mode',
    output: ['release twin started', 'successful checkout passed', 'decline path passed', 'duplicate webhook created two orders'],
  },
  {
    id: 'repair',
    number: '03',
    label: 'Repair',
    title: 'A failure becomes a tested correction.',
    body: 'Gemini reproduces the failed journey, verifies the cause, applies the smallest candidate in Daytona, and reruns related flows before preparing a draft fix PR.',
    status: 'Repair verified',
    detail: '19 tests passed · 5 related journeys rechecked',
    output: ['duplicate order reproduced', 'idempotency guard missing', 'candidate patch applied in twin', 'draft repair PR ready for review'],
  },
  {
    id: 'release',
    number: '04',
    label: 'Release',
    title: 'The same artifact earns promotion.',
    body: 'After human approval and rebuild, GroundControl starts a bounded canary on the operator\'s VPS, observes deterministic health policy, then promotes or rolls back.',
    status: 'Canary healthy',
    detail: '5% traffic · p95 386ms · error rate 0.2%',
    output: ['approved artifact deployed', 'customer probes passed', 'health remained within policy', 'ready for controlled promotion'],
  },
] as const;

type LoopStep = (typeof LOOP_STEPS)[number]['id'];

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ['GroundControl', '#groundcontrol'],
    ['Loop', '#loop'],
    ['Products', '#products'],
    ['Company', '#company'],
  ];

  return (
    <header className="v4-nav">
      <div className="v4-shell v4-nav-inner">
        <a href="#top" className="v4-brand" aria-label="Serendepify home"><LogoMark size={28} /><Wordmark /></a>
        <nav className={`v4-links${open ? ' open' : ''}`} aria-label="Primary navigation">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="v4-nav-cta" href={GC_URL} {...ext}>Open GroundControl ↗</a>
        </nav>
        <button className="v4-menu" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span /><span />
        </button>
      </div>
    </header>
  );
}

function LoopSurface({ step = 'release', compact = false }: { step?: LoopStep; compact?: boolean }) {
  const active = LOOP_STEPS.find((item) => item.id === step) ?? LOOP_STEPS[0];
  return (
    <div className={`rh-window${compact ? ' compact' : ''}`} aria-label="GroundControl Loop product prototype">
      <div className="rh-window-bar">
        <div className="rh-dots"><i /><i /><i /></div>
        <span>GroundControl / Loop / LR-142</span>
        <b>Product preview</b>
      </div>
      <div className="rh-window-body">
        <aside className="rh-sidebar">
          <span className="rh-side-label">Loop stages</span>
          {LOOP_STEPS.map((item) => (
            <div key={item.id} className={item.id === active.id ? 'active' : ''}><i>{item.number}</i><span>{item.label}</span></div>
          ))}
        </aside>
        <main className="rh-main" aria-live="polite">
          <div className="rh-run-head">
            <div><span>Release Twin</span><h3>{active.status}</h3></div>
            <em><i /> production protected</em>
          </div>
          <div className="rh-terminal">
            <div className="rh-terminal-top"><span>evidence stream</span><b>{active.detail}</b></div>
            {active.output.map((line, index) => (
              <div className="rh-log" key={line}><span>{String(index + 1).padStart(2, '0')}</span><i className={index === active.output.length - 1 ? 'ok' : ''}>◆</i><code>{line}</code></div>
            ))}
          </div>
          <div className="rh-evidence">
            <div><small>Reproduction</small><strong>{active.id === 'map' ? 'Pending' : 'Verified'}</strong></div>
            <div><small>Confidence</small><strong>{active.id === 'repair' || active.id === 'release' ? 'High' : 'Collecting'}</strong></div>
            <div><small>Next action</small><strong>{active.id === 'release' ? 'Promote' : active.label}</strong></div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="v4-hero" id="top">
      <div className="v4-shell v4-hero-grid">
        <div className="v4-hero-copy">
          <p className="v4-kicker">Serendepify · Infrastructure software from Accra</p>
          <h1>Every release,<br /><span>tested through</span><br />the real journey.</h1>
          <p className="v4-lede">GroundControl Loop takes the exact artifact from CI, exercises the customer journeys it can affect inside a Daytona Release Twin, repairs reproducible failures with Gemini, and guards the path onto infrastructure you own.</p>
          <div className="v4-actions">
            <a className="v4-button primary" href="#loop">Explore Loop <span>↓</span></a>
            <a className="v4-button ghost" href={GC_URL} {...ext}>Open GroundControl ↗</a>
          </div>
          <div className="v4-signal"><i /><span><b>Product preview</b> · Change-aware journey testing, repair, canary, and rollback</span></div>
        </div>
        <div className="v4-hero-product"><LoopSurface compact /></div>
      </div>
    </section>
  );
}

function ProofBar() {
  const facts = [
    ['Live today', 'GroundControl cockpit'],
    ['Self-hosted', 'No SaaS in the middle'],
    ['Open source', 'Inspectable product'],
    ['One install', 'VPS-ready bootstrap'],
  ];
  return <section className="v4-proof"><div className="v4-shell v4-proof-grid">{facts.map(([title, body]) => <div key={title}><span>{title}</span><strong>{body}</strong></div>)}</div></section>;
}

function GroundControl() {
  return (
    <section className="v4-section" id="groundcontrol">
      <div className="v4-shell">
        <div className="v4-section-head">
          <div><p className="v4-kicker">01 · Flagship product</p><h2>The cockpit for the servers you actually run.</h2></div>
          <p>GroundControl connects to VPS hosts, reads real Docker, proxy, system and Kubernetes state, and turns it into one place to inspect and act.</p>
        </div>
        <div className="v4-gc-grid">
          <div className="v4-product-shot"><ImageSlot label="GroundControl services" media={PRODUCT_MEDIA.groundControlServices} mediaFit="contain" background="#111417" /></div>
          <div className="v4-capabilities">
            {[
              ['01', 'See live topology', 'Hosts, projects, sites, services, containers and pods mapped from actual system state.'],
              ['02', 'Operate infrastructure', 'Logs, health, service controls, terminal, DNS, alerts and deployments in one authenticated surface.'],
              ['03', 'Keep control local', 'Single-tenant and self-hosted, with no telemetry or operational data required to leave your network.'],
            ].map(([number, title, body]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{body}</p></article>)}
            <div className="v4-inline-actions"><a href={GC_URL} {...ext}>Open live product ↗</a><a href="https://github.com/teckedd-code2save/groundcontrol" {...ext}>View source ↗</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Loop() {
  const [activeStep, setActiveStep] = useState<LoopStep>('map');
  const active = LOOP_STEPS.find((item) => item.id === activeStep) ?? LOOP_STEPS[0];
  return (
    <section className="v4-section v4-rehearsal" id="loop">
      <div className="v4-shell">
        <div className="v4-section-head light">
          <div><p className="v4-kicker">02 · GroundControl Loop</p><h2>Failures do not halt the release. They enter repair.</h2></div>
          <p>A proposed CI-to-production loop for change-aware customer journeys, resilient repair, and controlled rollout on infrastructure the operator owns.</p>
        </div>
        <div className="v4-step-tabs" role="tablist" aria-label="Loop stages">
          {LOOP_STEPS.map((item) => <button key={item.id} type="button" className={item.id === activeStep ? 'active' : ''} onClick={() => setActiveStep(item.id)} role="tab" aria-selected={item.id === activeStep}><span>{item.number}</span>{item.label}</button>)}
        </div>
        <div className="v4-rehearsal-grid">
          <div className="v4-step-copy"><p>{active.number} · {active.label}</p><h3>{active.title}</h3><span>{active.body}</span><div className="v4-tech-row"><b>Gemini intelligence</b><b>Daytona Release Twin</b><b>Human approval</b></div></div>
          <LoopSurface step={activeStep} />
        </div>
      </div>
    </section>
  );
}

function Products() {
  const products = [
    {
      status: 'Standalone product',
      name: 'Convoy',
      tagline: 'Supervised delivery from PR to production.',
      body: 'Today Claude opens the PR. Review feedback steers an improved revision; approval merges it, promotes the release, and advances the guarded canary, observation, and production steps.',
      tags: ['CLI + MCP', 'Approval-gated', 'Model-adaptable'],
      href: CONVOY_URL,
      media: PRODUCT_MEDIA.convoy,
    },
    {
      status: 'Developer preview',
      name: 'Forge',
      tagline: 'Agent ecosystem bootstrapper.',
      body: 'Configure skills and MCP tools that turn product requirements into architecture, backend artifacts, tests, and delivery workflows.',
      tags: ['CLI', 'Skills', 'Agent-agnostic'],
      href: FORGE_URL,
      media: PRODUCT_MEDIA.forge,
    },
  ];
  return (
    <section className="v4-section v4-products" id="products">
      <div className="v4-shell">
        <div className="v4-section-head"><div><p className="v4-kicker">03 · More from Serendepify</p><h2>Independent products.<br />A shared systems instinct.</h2></div><p>Convoy and Forge are not components inside GroundControl. They are separate products shaped by the same focus on evidence, useful automation, and operator control.</p></div>
        <div className="v4-product-grid">{products.map((product) => <article key={product.name} className="v4-product-card"><div className="v4-card-media"><ImageSlot label={product.name} media={product.media} mediaFit="contain" background="#111417" /></div><div className="v4-card-body"><span>{product.status}</span><h3>{product.name}</h3><h4>{product.tagline}</h4><p>{product.body}</p><div className="v4-tags">{product.tags.map((tag) => <b key={tag}>{tag}</b>)}</div><a href={product.href} {...ext}>Explore {product.name} ↗</a></div></article>)}</div>
      </div>
    </section>
  );
}

function Company() {
  return (
    <section className="v4-section v4-company" id="company">
      <div className="v4-shell v4-company-grid">
        <div><p className="v4-kicker">04 · Company</p><h2>Built from the operational edge.</h2></div>
        <div><p>Serendepify is a founder-led software company in Accra building tools for developers and small teams operating real systems without large platform departments.</p><p>The thesis is simple: intelligent software should make systems more legible, preserve human control, and produce evidence for every consequential action.</p><a href={`mailto:${siteConfig.contactEmail}`}>Work with us ↗</a></div>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="v4-footer"><div className="v4-shell"><div><LogoMark size={25} /><Wordmark size={18} /></div><p>GroundControl · Convoy · Forge</p><span>© 2026 Serendepify · Accra, Ghana</span></div></footer>;
}

export default function Home() {
  return <div className="v4-page"><Nav /><main><Hero /><ProofBar /><GroundControl /><Loop /><Products /><Company /></main><Footer /></div>;
}
