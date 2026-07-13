import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/lib/site-config';
import { CONVOY_URL, FORGE_URL, GC_URL } from './media';
import { LogoMark, Wordmark } from './ui';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

const INTELLIGENCE_STAGES = [
  {
    id: 'observe',
    number: '01',
    label: 'Observe',
    eyebrow: 'Host change detected',
    title: 'A release changed the API topology.',
    body: 'GroundControl sees the new image, Compose revision, container state, proxy route and public endpoint as one connected operational event.',
    signal: 'deploy/api@2f81c6',
    result: '4 affected relationships',
    logs: ['image api@sha256:2f81 deployed', 'container api replaced', 'internal port 8080 → 3000', 'checkout.serendepify.com affected'],
  },
  {
    id: 'trace',
    number: '02',
    label: 'Understand',
    eyebrow: 'Service graph updated',
    title: 'The public route no longer reaches the app.',
    body: 'The live service graph traces the domain through Caddy and the Docker network, then compares the current topology with the last verified healthy state.',
    signal: 'caddy → api:8080',
    result: 'upstream mismatch',
    logs: ['DNS resolves correctly', 'TLS certificate is valid', 'Caddy route targets api:8080', 'application now listens on api:3000'],
  },
  {
    id: 'test',
    number: '03',
    label: 'Test',
    eyebrow: 'Customer journey failed',
    title: 'Checkout is broken outside the host.',
    body: 'A targeted synthetic customer journey runs because the API and proxy changed. It verifies the experience from the public internet—not just container health.',
    signal: 'checkout / submit',
    result: '502 in 184ms',
    logs: ['homepage reachable', 'cart created', 'checkout submission failed: 502', 'failure isolated to payments API route'],
  },
  {
    id: 'recover',
    number: '04',
    label: 'Recover',
    eyebrow: 'Reversible repair prepared',
    title: 'The smallest safe correction is ready.',
    body: 'GroundControl validates a proxy diff, explains the evidence and prepares an exact rollback. Policy decides whether to guide, request approval or act automatically.',
    signal: 'reverse_proxy api:3000',
    result: 'risk: low · reversible',
    logs: ['candidate Caddy config generated', 'caddy validate passed', 'upstream reachable from proxy network', 'previous revision retained for rollback'],
  },
  {
    id: 'verify',
    number: '05',
    label: 'Verify',
    eyebrow: 'Recovery proven',
    title: 'The customer journey works again.',
    body: 'The repair is only complete after the public journey passes. GroundControl records the evidence, confirmed cause and successful action as operational memory.',
    signal: 'checkout / complete',
    result: '200 · 612ms · healthy',
    logs: ['Caddy reloaded without restart', 'public API probe passed', 'checkout journey completed', 'incident linked to change and repair'],
  },
] as const;

type IntelligenceStage = (typeof INTELLIGENCE_STAGES)[number]['id'];

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ['GroundControl', '#groundcontrol'],
    ['Autopilot', '#autopilot'],
    ['How it works', '#intelligence'],
    ['Company', '#company'],
  ];

  return (
    <header className="v5-nav">
      <div className="v5-shell v5-nav-inner">
        <a href="#top" className="v5-brand" aria-label="Serendepify home"><LogoMark size={29} /><Wordmark /></a>
        <nav className={`v5-links${open ? ' open' : ''}`} aria-label="Primary navigation">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="v5-nav-cta" href={GC_URL} {...ext}>Open GroundControl <span>↗</span></a>
        </nav>
        <button className="v5-menu" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}><span /><span /></button>
      </div>
    </header>
  );
}

function IntelligenceSurface({ stage = 'trace' }: { stage?: IntelligenceStage }) {
  const active = INTELLIGENCE_STAGES.find((item) => item.id === stage) ?? INTELLIGENCE_STAGES[0];
  return (
    <div className="v5-surface" aria-label="GroundControl intelligence product direction">
      <div className="v5-surface-top">
        <div><i /><i /><i /></div>
        <span>groundcontrol / investigation / gc-1842</span>
        <b><i /> product direction</b>
      </div>
      <div className="v5-surface-body">
        <aside className="v5-rail">
          <strong>GroundControl</strong>
          <p>Operations</p>
          <nav>
            <span className="active"><i /> Intelligence <b>1</b></span>
            <span><i /> Applications</span>
            <span><i /> Changes</span>
            <span><i /> Journeys</span>
            <span><i /> Hosts</span>
          </nav>
          <div className="v5-host-health"><i /><div><b>accra-prod-01</b><small>connected · healthy</small></div></div>
        </aside>
        <main className="v5-console">
          <div className="v5-console-head">
            <div><span>INCIDENT GC-1842</span><h3>{active.eyebrow}</h3></div>
            <b className="v5-live"><i /> investigating</b>
          </div>
          <div className="v5-impact-row">
            <div><small>Signal</small><strong>{active.signal}</strong></div>
            <div><small>Finding</small><strong>{active.result}</strong></div>
          </div>
          <div className="v5-graph" aria-label="Service relationship graph">
            <div className="v5-node domain"><span>PUBLIC</span><b>checkout.serendepify.com</b></div>
            <i className="v5-edge first"><span>HTTPS</span></i>
            <div className="v5-node proxy"><span>PROXY</span><b>Caddy</b><small>:443</small></div>
            <i className="v5-edge broken"><span>502</span></i>
            <div className="v5-node service"><span>SERVICE</span><b>payments-api</b><small>:3000</small></div>
          </div>
          <div className="v5-evidence">
            <div className="v5-evidence-head"><span>Evidence stream</span><b>live topology + change ledger</b></div>
            {active.logs.map((line, index) => <div className="v5-log" key={line}><span>{String(index + 1).padStart(2, '0')}</span><i className={index === active.logs.length - 1 ? 'hot' : ''}>◆</i><code>{line}</code></div>)}
          </div>
        </main>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="v5-hero" id="top">
      <div className="v5-hero-glow" />
      <div className="v5-shell">
        <div className="v5-hero-copy">
          <p className="v5-kicker"><i /> Infrastructure intelligence from Accra</p>
          <h1>Software that keeps<br /><em>your software</em> running.</h1>
          <p className="v5-lede">Serendepify builds operational intelligence for lean teams running applications on their own infrastructure. GroundControl understands every service, tests meaningful changes and guides safe recovery when something breaks.</p>
          <div className="v5-actions">
            <a className="v5-button primary" href="#autopilot">See the intelligence <span>↓</span></a>
            <a className="v5-button secondary" href={GC_URL} {...ext}>Open GroundControl <span>↗</span></a>
          </div>
          <div className="v5-hero-note"><span>01</span><p><b>Built for infrastructure you own.</b> Docker Compose first. Existing pipelines welcome. Operator control preserved.</p></div>
        </div>
        <div className="v5-hero-surface"><IntelligenceSurface /></div>
      </div>
    </section>
  );
}

function SignalStrip() {
  return <section className="v5-signal-strip"><div className="v5-shell">{[
    ['Understands', 'Live service relationships'],
    ['Exercises', 'Customer-facing journeys'],
    ['Explains', 'Evidence before action'],
    ['Recovers', 'Reversible by policy'],
  ].map(([verb, detail]) => <div key={verb}><span>{verb}</span><strong>{detail}</strong></div>)}</div></section>;
}

function GroundControlIntro() {
  return (
    <section className="v5-section v5-intro" id="groundcontrol">
      <div className="v5-shell">
        <div className="v5-section-label"><span>01</span><p>GroundControl</p></div>
        <div className="v5-statement"><h2>Your VPS is not a collection of charts. It is a living system.</h2><p>GroundControl connects code, deployments, containers, proxies, domains and customer journeys into one operational picture—then follows every consequential change through verification or recovery.</p></div>
        <div className="v5-principles">
          {[
            ['See the whole path', 'Trace a customer request from the public domain through DNS, TLS, reverse proxy, network and application process.'],
            ['Know what changed', 'Join GitHub, deployment and host events into a causal timeline anchored to the last verified healthy state.'],
            ['Act with proof', 'Every diagnosis links evidence. Every mutation carries a risk level, verification plan and exact rollback.'],
          ].map(([title, body], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function Autopilot() {
  const [activeStage, setActiveStage] = useState<IntelligenceStage>('observe');
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const active = INTELLIGENCE_STAGES.find((item) => item.id === activeStage) ?? INTELLIGENCE_STAGES[0];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setTimeout(() => {
      setActiveStage((current) => {
        const currentIndex = INTELLIGENCE_STAGES.findIndex((item) => item.id === current);
        return INTELLIGENCE_STAGES[(currentIndex + 1) % INTELLIGENCE_STAGES.length].id;
      });
    }, 4200);

    return () => window.clearTimeout(timer);
  }, [activeStage, isInView, isPaused]);

  return (
    <section
      ref={sectionRef}
      className="v5-section v5-autopilot"
      id="autopilot"
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
    >
      <div className="v5-shell">
        <div className="v5-section-label light"><span>02</span><p>Proactive autopilot</p><b>Product direction</b></div>
        <div className="v5-autopilot-head"><h2>When the host changes,<br />GroundControl proves what still works.</h2><p>It selects tests from the affected service graph, investigates regressions and chooses the least disruptive path back to health.</p></div>
        <div className="v5-stage-tabs" role="tablist" aria-label="GroundControl intelligence stages">
          {INTELLIGENCE_STAGES.map((item) => <button type="button" role="tab" aria-selected={item.id === activeStage} className={item.id === activeStage ? 'active' : ''} onClick={() => setActiveStage(item.id)} key={item.id}><span>{item.number}</span>{item.label}</button>)}
        </div>
        <div className="v5-stage-layout">
          <div className="v5-stage-copy" key={active.id}><p>{active.eyebrow}</p><h3>{active.title}</h3><span>{active.body}</span><div><b>Targeted testing</b><b>Evidence chain</b><b>Verified recovery</b></div></div>
          <IntelligenceSurface stage={activeStage} />
        </div>
      </div>
    </section>
  );
}

function Intelligence() {
  const cards = [
    { number: '01', eyebrow: 'Living topology', title: 'Understand the system behind the URL.', body: 'GroundControl continuously maps the relationship between domains, Caddy or Nginx, Docker networks, services, processes and dependencies.', visual: <div className="v5-mini-map"><span>domain</span><i /><span>proxy</span><i className="warn" /><span>service</span></div> },
    { number: '02', eyebrow: 'Synthetic journeys', title: 'Test customer outcomes, not green containers.', body: 'A proxy, image, environment or route change triggers only the journeys inside its likely blast radius—sign-in, checkout, APIs or any outcome the operator confirms.', visual: <div className="v5-mini-run"><span><i /> Login</span><b>passed</b><span><i /> Checkout</span><b className="fail">failed · 502</b><span><i /> Account API</span><b>passed</b></div> },
    { number: '03', eyebrow: 'Recovery ladder', title: 'Repair, redeploy or guide with context.', body: 'GroundControl restores the last healthy state, validates a configuration correction or proposes a resilient deployment blueprint. High-risk work becomes a guided plan.', visual: <div className="v5-mini-ladder"><span>restore known-good config <b>low risk</b></span><span>redeploy previous artifact <b>reversible</b></span><span>guided topology change <b>approval</b></span></div> },
    { number: '04', eyebrow: 'Operational memory', title: 'Every confirmed recovery improves the next one.', body: 'Symptoms, evidence, causes and successful actions become service-specific memory without turning historical correlation into unquestioned fact.', visual: <div className="v5-mini-memory"><strong>Similar incident found</strong><p>Port drift after API image update</p><span>92% evidence overlap</span></div> },
  ];
  return (
    <section className="v5-section v5-intelligence" id="intelligence"><div className="v5-shell">
      <div className="v5-section-label"><span>03</span><p>The intelligence layer</p></div>
      <div className="v5-statement compact"><h2>Observe. Understand. Test. Recover. Verify.</h2><p>This is not a general-purpose shell agent. GroundControl works through narrow tools, explicit policy and reversible actions.</p></div>
      <div className="v5-intel-grid">{cards.map((card) => <article key={card.number}><header><span>{card.number}</span><p>{card.eyebrow}</p></header><h3>{card.title}</h3><p>{card.body}</p><div className="v5-card-visual">{card.visual}</div></article>)}</div>
    </div></section>
  );
}

function Control() {
  return (
    <section className="v5-section v5-control"><div className="v5-shell v5-control-grid">
      <div><p className="v5-kicker dark"><i /> Autonomy without surrender</p><h2>Your infrastructure.<br />Your policies.<br />Your final say.</h2></div>
      <div className="v5-policy">
        {[
          ['Monitor', 'Detect changes and exercise affected journeys.'],
          ['Guide', 'Investigate and prepare exact recovery steps.'],
          ['Approve', 'Execute a reversible repair after one decision.'],
          ['Autopilot', 'Act automatically inside a narrow, pre-approved policy.'],
        ].map(([name, body], index) => <div key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{body}</p>{index === 3 && <b>opt-in</b>}</div>)}
      </div>
    </div></section>
  );
}

function Ecosystem() {
  return (
    <section className="v5-section v5-ecosystem"><div className="v5-shell">
      <div className="v5-section-label"><span>04</span><p>Built around the flagship</p></div>
      <div className="v5-ecosystem-head"><h2>One company thesis.<br />GroundControl at the centre.</h2><p>Serendepify builds systems that make consequential software work legible, controlled and recoverable.</p></div>
      <div className="v5-products">
        <a className="primary" href={GC_URL} {...ext}><span>Flagship · live early access</span><h3>GroundControl</h3><p>Operational intelligence and safe recovery for applications running on infrastructure you own.</p><b>Open product ↗</b></a>
        <a href={CONVOY_URL} {...ext}><span>Independent product</span><h3>Convoy</h3><p>Supervised delivery and promotion workflows with reviewable evidence.</p><b>Explore ↗</b></a>
        <a href={FORGE_URL} {...ext}><span>Developer tool</span><h3>Forge</h3><p>Agent-ready engineering practices distributed through a focused CLI.</p><b>Explore ↗</b></a>
      </div>
    </div></section>
  );
}

function Company() {
  return (
    <section className="v5-section v5-company" id="company"><div className="v5-shell v5-company-grid">
      <div><p className="v5-kicker dark"><i /> Serendepify · Accra, Ghana</p><h2>Built for the teams who own the outcome.</h2></div>
      <div><p>Lean teams should not need a platform department to understand and recover the systems they run. We are building GroundControl from the operational edge: practical servers, real customer journeys and human accountability.</p><div className="v5-actions"><a className="v5-button primary" href={`mailto:${siteConfig.contactEmail}`}>Talk to Serendepify <span>↗</span></a><a className="v5-button secondary" href="https://github.com/teckedd-code2save/groundcontrol" {...ext}>View the build <span>↗</span></a></div></div>
    </div></section>
  );
}

function Footer() {
  return <footer className="v5-footer"><div className="v5-shell"><div className="v5-footer-brand"><LogoMark size={28} inkColor="#F0F2E9" /><Wordmark size={19} color="#F0F2E9" /></div><p>Operational intelligence for infrastructure you own.</p><div className="v5-footer-links"><a href={GC_URL} {...ext}>GroundControl</a><a href={CONVOY_URL} {...ext}>Convoy</a><a href={FORGE_URL} {...ext}>Forge</a></div><span>© 2026 Serendepify · Accra, Ghana</span></div></footer>;
}

export default function Home() {
  return <div className="v5-page"><Nav /><main><Hero /><SignalStrip /><GroundControlIntro /><Autopilot /><Intelligence /><Control /><Ecosystem /><Company /></main><Footer /></div>;
}
