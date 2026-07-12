import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, X } from 'lucide-react';

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

export type SlotMedia = {
  poster: string;
  webm?: string;
  mp4?: string;
  gif?: string;
};

export function ImageSlot({
  label,
  style,
  absolute = false,
  background = 'radial-gradient(120% 120% at 72% 28%, #2a2820 0%, #16150F 68%)',
  labelColor = 'rgba(245,244,240,0.42)',
  media,
  mediaFit = 'cover',
  mediaPosition = 'center center',
  expandable,
}: {
  label: string;
  style?: CSSProperties;
  absolute?: boolean;
  /** Override the placeholder backdrop (e.g. a brand dusk gradient). */
  background?: string;
  labelColor?: string;
  media?: SlotMedia;
  mediaFit?: CSSProperties['objectFit'];
  mediaPosition?: CSSProperties['objectPosition'];
  expandable?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const slotRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState(false);
  const canExpand = Boolean(media && expandable !== false);
  const mediaStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: mediaFit,
    objectPosition: mediaPosition,
    display: 'block',
  };

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !media) return;
    element.muted = true;
    const staticMedia = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 680px)').matches;
    if (staticMedia) {
      element.pause();
      return;
    }
    const play = () => {
      element.play().catch(() => {});
    };
    play();
    element.addEventListener('canplay', play);
    return () => element.removeEventListener('canplay', play);
  }, [media]);

  useEffect(() => {
    if (!expanded) return;

    const previousOverflow = document.body.style.overflow;
    const close = () => {
      setExpanded(false);
      requestAnimationFrame(() => slotRef.current?.focus());
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [expanded]);

  const closeExpanded = () => {
    setExpanded(false);
    requestAnimationFrame(() => slotRef.current?.focus());
  };

  const slotStyle: CSSProperties = {
    position: absolute ? 'absolute' : 'relative',
    inset: absolute ? 0 : undefined,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background,
    overflow: 'hidden',
    ...style,
  };

  const content = (
    <>
      {media ? (
        media.webm || media.mp4 ? (
          <video
            ref={videoRef}
            aria-hidden="true"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={media.poster}
            style={mediaStyle}
          >
            {media.webm && <source src={media.webm} type="video/webm" />}
            {media.mp4 && <source src={media.mp4} type="video/mp4" />}
          </video>
        ) : (
          <img aria-hidden="true" src={media.gif ?? media.poster} alt="" style={mediaStyle} />
        )
      ) : (
        <>
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
              color: labelColor,
              textAlign: 'center',
              padding: '0 18px',
            }}
          >
            {label}
          </span>
        </>
      )}
      {canExpand && (
        <span className="sr-media-expand-badge" aria-hidden="true">
          <Maximize2 size={15} strokeWidth={2.2} />
        </span>
      )}
    </>
  );

  if (canExpand && media) {
    return (
      <>
        <button
          ref={slotRef}
          type="button"
          aria-label={`Expand ${label}`}
          className="sr-media-slot sr-media-slot-expandable"
          style={slotStyle}
          onClick={() => setExpanded(true)}
        >
          {content}
        </button>
        {expanded && createPortal(<ExpandedMedia media={media} label={label} onClose={closeExpanded} />, document.body)}
      </>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className="sr-media-slot"
      style={slotStyle}
    >
      {content}
    </div>
  );
}

function ExpandedMedia({ media, label, onClose }: { media: SlotMedia; label: string; onClose: () => void }) {
  return (
    <div
      className="sr-media-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button type="button" className="sr-media-lightbox-close" aria-label="Close expanded media" onClick={onClose} autoFocus>
        <X size={20} strokeWidth={2.2} />
      </button>
      <div className="sr-media-lightbox-frame">
        {media.webm || media.mp4 ? (
          <video controls autoPlay muted playsInline poster={media.poster} className="sr-media-lightbox-media">
            {media.webm && <source src={media.webm} type="video/webm" />}
            {media.mp4 && <source src={media.mp4} type="video/mp4" />}
          </video>
        ) : (
          <img src={media.gif ?? media.poster} alt={label} className="sr-media-lightbox-media" />
        )}
      </div>
    </div>
  );
}
