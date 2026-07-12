import { useEffect } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { CONVOY_URL, FORGE_URL, GC_DEMO_URL, GC_URL, PRODUCT_MEDIA } from './media';
import { useSerendepifyMotion } from './useSerendepifyMotion';
import { ImageSlot, LogoMark } from './ui';
import type { SlotMedia } from './ui';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
const PITCH_STEPS = ['Thesis', 'Gap', 'Platform', 'Ground Control', 'Convoy', 'Forge', 'Proof'];

const kicker: CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: 'var(--sr-coral-bright)',
  margin: '0 0 16px',
};
const heading: CSSProperties = {
  margin: 0,
  fontSize: 'clamp(2.3rem, 6vw, 5.5rem)',
  fontWeight: 800,
  letterSpacing: 0,
  lineHeight: 0.98,
  color: '#F5F4F0',
  maxWidth: '12ch',
};
const wideHeading: CSSProperties = {
  ...heading,
  maxWidth: '15ch',
};
const para: CSSProperties = {
  margin: '22px 0 0',
  fontSize: 'var(--text-lg)',
  lineHeight: 1.55,
  fontWeight: 500,
  color: 'rgba(245,244,240,0.72)',
  maxWidth: '46ch',
};
const scrim: CSSProperties = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  background: 'linear-gradient(90deg, rgba(22,21,15,0.92) 0%, rgba(22,21,15,0.62) 44%, rgba(22,21,15,0.08) 78%)',
};
const chipWrap: CSSProperties = {
  marginTop: 28,
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
  maxWidth: 660,
};
const chip: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 34,
  padding: '8px 13px',
  borderRadius: 'var(--radius-pill)',
  border: '1px solid rgba(245,244,240,0.18)',
  background: 'rgba(245,244,240,0.08)',
  color: 'rgba(245,244,240,0.82)',
  fontSize: 13,
  fontWeight: 700,
};
const ctaRow: CSSProperties = {
  marginTop: 30,
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  flexWrap: 'wrap',
};

function Section({ bg, children }: { bg: ReactNode; children: ReactNode }) {
  return (
    <section>
      <div className="outer">
        <div className="inner">
          <div className="bg">{bg}</div>
          <div className="content">{children}</div>
        </div>
      </div>
    </section>
  );
}

function PitchChips({ items }: { items: string[] }) {
  return (
    <div style={chipWrap}>
      {items.map((item) => (
        <span key={item} style={chip}>
          {item}
        </span>
      ))}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul style={{ ...chipWrap, flexDirection: 'column', gap: 12 }}>
      {items.map((item) => (
        <li key={item} style={{ ...chip, borderRadius: 'var(--radius-md)', maxWidth: 540 }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProductMedia({
  label,
  media,
  position = 'right center',
}: {
  label: string;
  media: SlotMedia;
  position?: CSSProperties['objectPosition'];
}) {
  return (
    <>
      <ImageSlot absolute label={label} media={media} mediaFit="contain" mediaPosition={position} background="#111417" />
      <div style={scrim} />
    </>
  );
}

export default function ProductsPage() {
  useSerendepifyMotion();

  useEffect(() => {
    const prev = document.title;
    document.title = 'Ground Control · Serendepify';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="sr-snap-page">
      <a
        href="/"
        style={{
          position: 'fixed',
          top: 24,
          left: 'clamp(28px, 8vw, 140px)',
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          color: '#F5F4F0',
        }}
      >
        <LogoMark size={26} inkColor="#F5F4F0" />
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: 0 }}>
          serendepify<span style={{ color: 'var(--sr-coral)' }}>.</span>
        </span>
      </a>
      <a href="/" className="sr-back-btn" style={{ position: 'fixed', top: 22, right: 'clamp(28px, 8vw, 140px)', zIndex: 40 }}>
        ← Back to site
      </a>
      <nav className="sr-pitch-nav" aria-label="Product pitch sections">
        {PITCH_STEPS.map((step, index) => (
          <button key={step} type="button" data-sr-snap-go={index} aria-label={`Open ${step} section`}>
            <span>0{index + 1}</span><b>{step}</b>
          </button>
        ))}
      </nav>

      <div className="snap" data-sr-snap>
        <Section bg={<div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 120% at 72% 30%, #3a3327, #16150F 70%)' }} />}>
          <p style={kicker}>Product-led pitch</p>
          <h2 className="section-heading sr-display" style={{ ...wideHeading, fontSize: 'clamp(2.8rem, 7.5vw, 7rem)', maxWidth: '15ch' }}>
            Serendepify is the AI operations layer for teams running production.
          </h2>
          <p style={para}>Ground Control makes a live system legible. Convoy carries controlled changes, and Forge improves the context created upstream. Built in Accra for lean software teams.</p>
          <div style={ctaRow}>
            <a href={GC_DEMO_URL} {...ext} className="sr-btn sr-btn-primary" style={{ fontWeight: 700 }}>Watch operations demo ▶</a>
          </div>
        </Section>

        <Section bg={<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, #111417 0%, #16150F 52%, #2a1d16 100%)' }} />}>
          <p style={kicker}>The gap</p>
          <h2 className="section-heading sr-display" style={wideHeading}>
            Code is no longer the bottleneck. Production is.
          </h2>
          <p style={para}>Agent-built software still fragments across planning, environments, deployment risk, DNS, logs, and rollback. That is where promising prototypes stall.</p>
          <PitchChips items={['Plans drift from code', 'Deployments stay manual', 'Ops context is scattered']} />
        </Section>

        <Section bg={<ProductMedia label="Ground Control — services view" media={PRODUCT_MEDIA.groundControlServices} />}>
          <p style={kicker}>The platform</p>
          <h2 className="section-heading sr-display" style={wideHeading}>
            Start with production. Connect the line around it.
          </h2>
          <p style={para}>Ground Control is the operational surface. Convoy provides controlled execution; Forge gives the system better context before deployment.</p>
          <PitchChips items={['Observe', 'Decide', 'Act']} />
        </Section>

        <Section bg={<ProductMedia label="Ground Control — dashboard" media={PRODUCT_MEDIA.groundControlDashboard} />}>
          <p style={kicker}>01 · Ground Control · the product</p>
          <h2 className="section-heading sr-display" style={heading}>
            Production context in one cockpit.
          </h2>
          <p style={para}>Ground Control makes practical infrastructure legible: health, services, terminal, alerts, DNS, logs, and assisted actions in one operational surface.</p>
          <Bullets items={['Live signals for health, memory, disk, and containers', 'Service controls with logs, restart actions, and terminal access', 'Shared operational context for people and AI tools']} />
          <div style={ctaRow}>
            <a href={GC_URL} {...ext} className="sr-btn sr-btn-primary" style={{ fontWeight: 700 }}>
              Open Ground Control ↗
            </a>
          </div>
        </Section>

        <Section bg={<ProductMedia label="Convoy — canary rollout view" media={PRODUCT_MEDIA.convoy} />}>
          <p style={kicker}>02 · Convoy · controlled execution</p>
          <h2 className="section-heading sr-display" style={heading}>
            Rehearse. Gate. Canary.
          </h2>
          <p style={para}>Convoy turns a repo into a controlled rollout run: scan, plan, rehearse, approve risky steps, promote canaries, and observe the live service.</p>
          <Bullets items={['Repo-aware rollout planning from source, config, and environment', 'Human-approved gates for secrets, PRs, and risky deploy steps', 'Canary, promote, and observe loops with run memory']} />
          <div style={ctaRow}>
            <a href={CONVOY_URL} {...ext} className="sr-btn sr-btn-primary" style={{ fontWeight: 700 }}>
              Open Convoy ↗
            </a>
          </div>
        </Section>

        <Section bg={<ProductMedia label="Forge — build / scaffold view" media={PRODUCT_MEDIA.forge} />}>
          <p style={kicker}>03 · Forge · upstream context</p>
          <h2 className="section-heading sr-display" style={heading}>
            Brief to buildable system.
          </h2>
          <p style={para}>Forge turns fuzzy product intent into architecture, scaffolding, and a build path a coding agent can execute.</p>
          <Bullets items={['Concrete plans from plain-language briefs', 'Agent-agnostic workflows for modern coding tools', 'Architecture and scaffolding instead of generic boilerplate']} />
          <div style={ctaRow}>
            <a href={FORGE_URL} {...ext} className="sr-btn sr-btn-primary" style={{ fontWeight: 700 }}>
              Install Forge ↗
            </a>
          </div>
        </Section>

        <Section bg={<ProductMedia label="Ground Control — terminal view" media={PRODUCT_MEDIA.groundControlTerminal} />}>
          <p style={kicker}>Proof and fit</p>
          <h2 className="section-heading sr-display" style={wideHeading}>
            Live product surfaces, not a slide-only concept.
          </h2>
          <p style={para}>Ground Control, Convoy, and Forge are working product surfaces—not a slide-only concept. The next step is proving the operational loop with design partners and measurable outcomes.</p>
          <PitchChips items={['Ground Control cockpit live', 'Convoy surface live', 'Forge package published']} />
          <div style={ctaRow}>
            <a href={GC_URL} {...ext} className="sr-btn sr-btn-primary" style={{ fontWeight: 700 }}>
              Open Ground Control
            </a>
            <a href={GC_DEMO_URL} {...ext} className="sr-btn" style={{ fontWeight: 700, background: 'rgba(245,244,240,0.1)', color: '#F5F4F0', border: '1px solid rgba(245,244,240,0.2)' }}>
              Watch demo
            </a>
            <a href={CONVOY_URL} {...ext} className="sr-btn" style={{ fontWeight: 700, background: 'rgba(245,244,240,0.1)', color: '#F5F4F0', border: '1px solid rgba(245,244,240,0.2)' }}>
              Open Convoy
            </a>
            <a href={FORGE_URL} {...ext} className="sr-btn" style={{ fontWeight: 700, background: 'rgba(245,244,240,0.1)', color: '#F5F4F0', border: '1px solid rgba(245,244,240,0.2)' }}>
              Install Forge
            </a>
          </div>
        </Section>
      </div>
    </div>
  );
}
