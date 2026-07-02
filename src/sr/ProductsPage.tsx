import { useEffect } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { CONVOY_URL, FORGE_URL, GC_URL, PRODUCT_MEDIA } from './media';
import { useSerendepifyMotion } from './useSerendepifyMotion';
import { ImageSlot, LogoMark } from './ui';
import type { SlotMedia } from './ui';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

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
    document.title = 'Pitch · Serendepify';
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
      <div
        style={{
          position: 'fixed',
          bottom: 26,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
          fontSize: 13,
          fontWeight: 700,
          color: 'rgba(245,244,240,0.55)',
          whiteSpace: 'nowrap',
        }}
      >
        Product-led pitch · live surfaces
      </div>

      <div className="snap" data-sr-snap>
        <Section bg={<div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 120% at 72% 30%, #3a3327, #16150F 70%)' }} />}>
          <p style={kicker}>Product-led pitch</p>
          <h2 className="section-heading sr-display" style={{ ...wideHeading, fontSize: 'clamp(2.8rem, 7.5vw, 7rem)', maxWidth: '15ch' }}>
            Serendepify is the operating layer for autonomous software creation.
          </h2>
          <p style={para}>AI agents can generate code. Serendepify connects the path from brief to shipped, observable software.</p>
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
            One line from idea to live system.
          </h2>
          <p style={para}>Forge shapes the build, Convoy controls the rollout, and Ground Control gives the agent production context it can reason about.</p>
          <PitchChips items={['Build', 'Roll out', 'Operate']} />
        </Section>

        <Section bg={<ProductMedia label="Forge — build / scaffold view" media={PRODUCT_MEDIA.forge} />}>
          <p style={kicker}>01 · Forge · builds it</p>
          <h2 className="section-heading sr-display" style={heading}>
            Brief to buildable system.
          </h2>
          <p style={para}>Forge turns fuzzy product intent into architecture, scaffolding, and a build path your coding agent can execute.</p>
          <Bullets items={['Concrete plans from plain-language briefs', 'Agent-agnostic workflows for Claude, Cursor, and MCP-aware tools', 'Architecture and scaffolding instead of generic boilerplate']} />
          <div style={ctaRow}>
            <a href={FORGE_URL} {...ext} className="sr-btn sr-btn-primary" style={{ fontWeight: 700 }}>
              Install Forge ↗
            </a>
          </div>
        </Section>

        <Section bg={<ProductMedia label="Convoy — canary rollout view" media={PRODUCT_MEDIA.convoy} />}>
          <p style={kicker}>02 · Convoy · rolls it out</p>
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

        <Section bg={<ProductMedia label="Ground Control — dashboard" media={PRODUCT_MEDIA.groundControlDashboard} />}>
          <p style={kicker}>03 · Ground Control · operates it</p>
          <h2 className="section-heading sr-display" style={heading}>
            Production context for agents.
          </h2>
          <p style={para}>Ground Control makes the VPS legible: health, services, terminal, alerts, DNS, logs, and AI assistance in one operational cockpit.</p>
          <Bullets items={['Dashboard signals for health, memory, disk, and containers', 'Service controls with logs, restart actions, and terminal access', 'Agent-readable operations context after deployment']} />
          <div style={ctaRow}>
            <a href={GC_URL} {...ext} className="sr-btn sr-btn-primary" style={{ fontWeight: 700 }}>
              Open Ground Control ↗
            </a>
          </div>
        </Section>

        <Section bg={<ProductMedia label="Ground Control — terminal view" media={PRODUCT_MEDIA.groundControlTerminal} />}>
          <p style={kicker}>Proof and fit</p>
          <h2 className="section-heading sr-display" style={wideHeading}>
            Live product surfaces, not a slide-only concept.
          </h2>
          <p style={para}>Serendepify already exposes the public package, Convoy surface, and Ground Control cockpit that show the build-rollout-operate loop in motion.</p>
          <PitchChips items={['Forge package published', 'Convoy web surface live', 'Ground Control cockpit live']} />
          <div style={ctaRow}>
            <a href={FORGE_URL} {...ext} className="sr-btn sr-btn-primary" style={{ fontWeight: 700 }}>
              Install Forge
            </a>
            <a href={CONVOY_URL} {...ext} className="sr-btn" style={{ fontWeight: 700, background: 'rgba(245,244,240,0.1)', color: '#F5F4F0', border: '1px solid rgba(245,244,240,0.2)' }}>
              Open Convoy
            </a>
            <a href={GC_URL} {...ext} className="sr-btn" style={{ fontWeight: 700, background: 'rgba(245,244,240,0.1)', color: '#F5F4F0', border: '1px solid rgba(245,244,240,0.2)' }}>
              Open Ground Control
            </a>
          </div>
        </Section>
      </div>
    </div>
  );
}
