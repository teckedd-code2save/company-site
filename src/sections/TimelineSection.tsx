import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import SplitText from '@/components/SplitText';
import DrawnUnderline from '@/components/DrawnUnderline';
import LightningFlash from '@/components/LightningFlash';

const PINK = '#D4A5B0';
const CORAL = '#E898A8';

const VB_W = 1100;
const VB_H = 380;
const SPINE_Y = 200;
const START_X = 80;
const END_X = 1020;
const PHASES = 5;
const GAP = (END_X - START_X) / (PHASES - 1);

function spineX(i: number) {
  return START_X + i * GAP;
}

const phases = [
  { label: 'Business Context', pill: 'Discover', dir: -1 as const },
  { label: 'Data Model',       pill: 'Architect', dir: 1  as const },
  { label: 'MPP Studio',       pill: 'Build',     dir: -1 as const },
  { label: 'Shipd',            pill: 'Deploy',    dir: 1  as const },
  { label: 'Datafy MCP',       pill: 'Scale',     dir: -1 as const },
];

/* ── Hard geometric icon (filled, no stroke, rounded corners) ───────────
   Rounded "F" / block shape — 32×32 viewBox, filled white, no stroke
──────────────────────────────────────────────────────────────────────── */
function HardIcon({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  const s = 16; // half-size
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22, delay }}
    >
      {/* Main filled block — rounded rect shape */}
      <rect x={cx - s} y={cy - s} width={s * 2} height={s * 2} rx={6} fill="white" opacity={0.9} />
      {/* Horizontal bar cuts — giving an F-like negative space */}
      <rect x={cx - s + 5} y={cy - s + 5} width={s * 1.2} height={3.5} rx={1.5} fill="black" />
      <rect x={cx - s + 5} y={cy - 1.75} width={s * 0.9} height={3.5} rx={1.5} fill="black" />
    </motion.g>
  );
}

/* ── Branch path: 90° perpendicular protrusion from spine ──────────────
   Spine point → vertical line (perpendicular) → rounded corner → 
   horizontal line → rounded corner → vertical to pill center
──────────────────────────────────────────────────────────────────────── */
function branchPath(sx: number, dir: number, len: number, extend: number) {
  const r = 10; // corner radius
  const vy = dir * len;
  const ey = dir * (len + extend);
  // Go perpendicular from spine → turn with rounded corner → go parallel → turn → go to pill
  return `M ${sx} ${SPINE_Y} L ${sx} ${SPINE_Y + vy - dir * r} Q ${sx} ${SPINE_Y + vy} ${sx + r} ${SPINE_Y + vy} L ${sx + extend - r} ${SPINE_Y + vy} Q ${sx + extend} ${SPINE_Y + vy} ${sx + extend} ${SPINE_Y + vy + dir * r} L ${sx + extend} ${SPINE_Y + ey}`;
}

/* ── Avatar sub-branch from last branch end to icon ──────────────────── */
function avatarPath(sx: number, dir: number, len: number, extend: number) {
  const branchEndY = SPINE_Y + dir * (len + extend);
  const r = 8;
  // From branch end, go further in same vertical direction then turn right to icon
  return `M ${sx + extend} ${branchEndY} L ${sx + extend} ${branchEndY + dir * 35 - dir * r} Q ${sx + extend} ${branchEndY + dir * 35} ${sx + extend + r} ${branchEndY + dir * 35} L ${sx + extend + 45} ${branchEndY + dir * 35}`;
}

/* ═══════════════════════════════════════════════════════════════════════
   Components
═══════════════════════════════════════════════════════════════════════ */

function Pill({ x, y, text, delay, outline = false }: { x: number; y: number; text: string; delay: number; outline?: boolean }) {
  const w = text.length * 8 + 32;
  const h = 32;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22, delay }}
    >
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={16} fill={outline ? 'none' : '#fff'} stroke={outline ? 'rgba(255,255,255,0.3)' : 'none'} strokeWidth={1.2} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight={600} fill={outline ? 'rgba(255,255,255,0.8)' : '#000'} fontFamily="Inter, system-ui, sans-serif" letterSpacing="0.02em">
        {text}
      </text>
    </motion.g>
  );
}

function SpineLine({ delay }: { delay: number }) {
  return (
    <motion.line
      x1={START_X} y1={SPINE_Y} x2={END_X} y2={SPINE_Y}
      stroke={PINK} strokeWidth={2} strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut', delay }}
    />
  );
}

function SpineDot({ index, delay }: { index: number; delay: number }) {
  const cx = spineX(index);
  return (
    <motion.circle
      cx={cx} cy={SPINE_Y} r={5} fill="#000"
      stroke={index === 2 ? CORAL : PINK} strokeWidth={1.5}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20, delay }}
    />
  );
}

function SpineLabel({ index, label, delay }: { index: number; label: string; delay: number }) {
  const x = spineX(index);
  return (
    <motion.text
      x={x} y={SPINE_Y + 28} textAnchor="middle" fontSize="11" fontWeight={600}
      fill="rgba(255,255,255,0.45)" fontFamily="Inter, system-ui, sans-serif" letterSpacing="0.12em"
      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {label}
    </motion.text>
  );
}

function BranchPath({ d, delay }: { d: string; delay: number }) {
  return (
    <motion.path
      d={d} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={1.2}
      strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    />
  );
}

function BranchLabel({ x, y, text, dir, delay }: { x: number; y: number; text: string; dir: number; delay: number }) {
  return (
    <motion.text
      x={x} y={y + (dir === -1 ? -14 : 20)} textAnchor="middle" fontSize="11" fontWeight={500}
      fill="rgba(255,255,255,0.6)" fontFamily="Inter, system-ui, sans-serif" letterSpacing="0.04em"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: delay + 0.2 }}
    >
      {text}
    </motion.text>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Main section — starts with a pill node, then spine animates out
═══════════════════════════════════════════════════════════════════════ */

export default function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (inView) setKey((k) => k + 1);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#000000' }}
    >
      <LightningFlash intensity={0.03} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.22em]" style={{ color: '#D4A5B0' }}>
            How we work
          </p>
          <DrawnUnderline className="mb-3 mx-auto" width={40} delay={0.2} color="#D4A5B0" />
          <h2
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            <SplitText stagger={0.035}>From idea to deployed product.</SplitText>
          </h2>
        </motion.div>

        {/* Timeline SVG */}
        <div className="mx-auto w-full" style={{ maxWidth: 1100 }}>
          <svg
            key={key}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="w-full"
            preserveAspectRatio="xMidYMid meet"
            style={{ height: 'auto', maxHeight: 400 }}
          >
            {/* ── START: Pill node at the beginning of the spine ── */}
            <Pill x={START_X} y={SPINE_Y} text="Start" delay={0} outline />

            {/* ── SPINE: draws from start pill outward ── */}
            <SpineLine delay={0.3} />

            {/* ── Spine dots + labels ── */}
            {phases.map((p, i) => (
              <g key={`spine-${i}`}>
                <SpineDot index={i} delay={i * 0.35 + 0.5} />
                <SpineLabel index={i} label={p.pill} delay={i * 0.35 + 0.65} />
              </g>
            ))}

            {/* ── Branches: 90° perpendicular protrusion from spine ── */}
            {phases.map((p, i) => {
              const sx = spineX(i);
              const len = 55;
              const extend = 60 + (i % 2) * 30;
              const d = branchPath(sx, p.dir, len, extend);
              const pillX = sx + extend;
              const pillY = SPINE_Y + p.dir * (len + extend);
              return (
                <g key={`branch-${i}`}>
                  <BranchPath d={d} delay={i * 0.35 + 0.8} />
                  <Pill x={pillX} y={pillY} text={p.label} delay={i * 0.35 + 1.2} />
                  <BranchLabel x={pillX} y={pillY} text={p.label} dir={p.dir} delay={i * 0.35 + 1.2} />
                </g>
              );
            })}

            {/* ── Avatar sub-branch on last phase ── */}
            {(() => {
              const last = phases[phases.length - 1];
              const sx = spineX(phases.length - 1);
              const len = 55;
              const extend = 60 + ((PHASES - 1) % 2) * 30;
              const d = avatarPath(sx, last.dir, len, extend);
              const iconX = sx + extend + 45;
              const iconY = SPINE_Y + last.dir * (len + extend + 35);
              return (
                <g key="avatar-branch">
                  <BranchPath d={d} delay={4 * 0.35 + 1.4} />
                  <HardIcon cx={iconX} cy={iconY} delay={4 * 0.35 + 1.8} />
                  <motion.text
                    x={iconX} y={iconY + 28} textAnchor="middle" fontSize="11" fontWeight={500}
                    fill="rgba(255,255,255,0.5)" fontFamily="Inter, system-ui, sans-serif"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 4 * 0.35 + 2.0 }}
                  >
                    Founder
                  </motion.text>
                </g>
              );
            })()}

            {/* ── Pulse on center spine dot ── */}
            <motion.circle
              cx={spineX(2)} cy={SPINE_Y} r={5} fill="none" stroke={CORAL} strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={{ r: [5, 16, 5], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
