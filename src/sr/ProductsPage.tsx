import { useEffect } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useSerendepifyMotion } from './useSerendepifyMotion';
import { ImageSlot, LogoMark } from './ui';

const GC_URL = 'https://groundcontrol.serendepify.com';

const kicker: CSSProperties = { fontSize: 14, fontWeight: 700, color: 'var(--sr-coral-bright)', margin: '0 0 16px' };
const heading: CSSProperties = {
  margin: 0,
  fontSize: 'clamp(2.8rem, 8vw, 7rem)',
  fontWeight: 800,
  letterSpacing: '-0.04em',
  lineHeight: 0.94,
  color: '#F5F4F0',
};
const para: CSSProperties = { margin: '22px 0 0', fontSize: 'var(--text-lg)', fontWeight: 500, color: 'rgba(245,244,240,0.7)', maxWidth: '48ch' };
const scrim: CSSProperties = {
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(90deg, rgba(22,21,15,0.9) 0%, rgba(22,21,15,0.5) 45%, transparent 75%)',
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

export default function ProductsPage() {
  useSerendepifyMotion();

  // Set a page-specific title (and restore on unmount / navigation away).
  useEffect(() => {
    const prev = document.title;
    document.title = 'Products · Serendepify';
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
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
          serendepify<span style={{ color: 'var(--sr-coral)' }}>.</span>
        </span>
      </a>
      {/* Explicit way back to the main site (the snap experience hijacks scroll,
          so a normal nav isn't shown). */}
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
          fontWeight: 600,
          color: 'rgba(245,244,240,0.55)',
          whiteSpace: 'nowrap',
        }}
      >
        Scroll to move through the line ↓
      </div>

      <div className="snap" data-sr-snap>
        {/* Intro */}
        <Section bg={<div className="bg" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 120% at 70% 30%, #2a2820, #16150F 70%)' }} />}>
          <p style={kicker}>Three products. One line.</p>
          <h2
            className="section-heading sr-display"
            style={{ ...heading, fontSize: 'clamp(3rem, 9vw, 8rem)', letterSpacing: '-0.045em', lineHeight: 0.92, maxWidth: '16ch' }}
          >
            From idea to production, owned end to end.
          </h2>
        </Section>

        {/* Forge */}
        <Section
          bg={
            <>
              <ImageSlot absolute label="Forge — build / scaffold view" />
              <div style={scrim} />
            </>
          }
        >
          <p style={kicker}>01 · Forge · builds it</p>
          <h2 className="section-heading sr-display" style={heading}>
            Vague idea in.
            <br />
            Built product out.
          </h2>
          <p style={para}>A skill set that turns a fuzzy brief into a well-built product — driven by the coding agent of your choice.</p>
        </Section>

        {/* Convoy */}
        <Section
          bg={
            <>
              <ImageSlot absolute label="Convoy — deploy view" />
              <div style={scrim} />
            </>
          }
        >
          <p style={kicker}>02 · Convoy · ships it</p>
          <h2 className="section-heading sr-display" style={heading}>
            Point it at your code.
            <br />
            It ships.
          </h2>
          <p style={para}>Convoy reads your stack, picks the right deployment path, and carries the rollout all the way to production.</p>
        </Section>

        {/* Ground Control */}
        <Section
          bg={
            <>
              <ImageSlot absolute label="Ground Control — dashboard" />
              <div style={scrim} />
            </>
          }
        >
          <p style={kicker}>03 · Ground Control · runs it</p>
          <h2 className="section-heading sr-display" style={heading}>
            Eyes on production,
            <br />
            always.
          </h2>
          <p style={para}>The operations cockpit — real logs, metrics and topology your agent can reason about and operate.</p>
          <a href={GC_URL} target="_blank" rel="noopener noreferrer" className="sr-btn sr-btn-primary" style={{ marginTop: 30, fontWeight: 700 }}>
            Open Ground Control ↗
          </a>
        </Section>
      </div>
    </div>
  );
}
