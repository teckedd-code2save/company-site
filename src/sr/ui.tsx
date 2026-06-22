import type { CSSProperties } from 'react';

/** The finalized brand mark: two rotated arcs (ink + coral). */
export function LogoMark({
  size = 28,
  inkColor = '#16150F',
  className,
}: {
  size?: number;
  inkColor?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <g transform="rotate(118 32 32)">
        <circle
          cx="32"
          cy="32"
          r="21"
          stroke={inkColor}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeDasharray="74 58"
        />
        <circle
          cx="32"
          cy="32"
          r="21"
          stroke="#E8542A"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeDasharray="24 200"
          strokeDashoffset="-80"
        />
      </g>
    </svg>
  );
}

/** `serendepify` wordmark with the coral period. */
export function Wordmark({ size = 19, color = 'var(--sr-text-90)' }: { size?: number; color?: string }) {
  return (
    <span style={{ fontSize: size, fontWeight: 700, letterSpacing: '-0.02em', color }}>
      serendepify<span style={{ color: 'var(--sr-coral)' }}>.</span>
    </span>
  );
}

/**
 * Production stand-in for the design-tool `<image-slot>`. Renders a tasteful
 * placeholder where a real product screenshot will go. Swap for a real
 * `<img>`/`<picture>` once screenshots are supplied (see README → Assets).
 */
export function ImageSlot({
  label,
  style,
  absolute = false,
}: {
  label: string;
  style?: CSSProperties;
  absolute?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      style={{
        position: absolute ? 'absolute' : 'relative',
        inset: absolute ? 0 : undefined,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(120% 120% at 72% 28%, #2a2820 0%, #16150F 68%)',
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          backgroundImage:
            'radial-gradient(rgba(255,106,64,0.08) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      <span
        style={{
          position: 'relative',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.04em',
          color: 'rgba(245,244,240,0.42)',
          textAlign: 'center',
          padding: '0 18px',
        }}
      >
        {label}
      </span>
    </div>
  );
}
