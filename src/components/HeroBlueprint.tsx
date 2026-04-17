import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Cinematic blueprint — technical drawing that sketches itself ───── */

const drawTransition = { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const };
const popTransition = { type: 'spring', stiffness: 300, damping: 20 } as const;

function AnimatedPath({
  d,
  delay = 0,
  className = '',
  style,
}: {
  d: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.path
      d={d}
      className={className}
      style={{ fill: 'none', ...style }}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ ...drawTransition, delay }}
    />
  );
}

function AnimatedLine({
  x1,
  y1,
  x2,
  y2,
  delay = 0,
  style,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      style={{ ...style }}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ ...drawTransition, delay }}
    />
  );
}

function Tick({
  cx,
  cy,
  angle,
  delay = 0,
}: {
  cx: number;
  cy: number;
  angle: number;
  delay?: number;
}) {
  const len = 10;
  const x1 = cx + Math.cos(angle) * 6;
  const y1 = cy + Math.sin(angle) * 6;
  const x2 = cx + Math.cos(angle) * (6 + len);
  const y2 = cy + Math.sin(angle) * (6 + len);
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgba(192,132,252,0.35)"
      strokeWidth={1}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    />
  );
}

export default function HeroBlueprint() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  // vanishing point is right-biased, upper-mid
  const vp = { x: 680, y: 220 };

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
      aria-hidden="true"
    >
      {inView && (
        <svg
          viewBox="0 0 1200 800"
          className="absolute right-0 top-0 h-full w-full"
          preserveAspectRatio="xMaxYMid slice"
        >
          {/* Perspective grid lines radiating from vanishing point */}
          <AnimatedLine
            x1={vp.x}
            y1={vp.y}
            x2={200}
            y2={750}
            delay={0.2}
            style={{ stroke: 'rgba(192,132,252,0.18)', strokeWidth: 1 }}
          />
          <AnimatedLine
            x1={vp.x}
            y1={vp.y}
            x2={800}
            y2={780}
            delay={0.35}
            style={{ stroke: 'rgba(192,132,252,0.18)', strokeWidth: 1 }}
          />
          <AnimatedLine
            x1={vp.x}
            y1={vp.y}
            x2={1150}
            y2={650}
            delay={0.5}
            style={{ stroke: 'rgba(192,132,252,0.18)', strokeWidth: 1 }}
          />

          {/* Horizontal cross-lines on the perspective rays */}
          <AnimatedPath
            d="M 320 420 L 900 450"
            delay={0.7}
            style={{ stroke: 'rgba(192,132,252,0.10)', strokeWidth: 1 }}
          />
          <AnimatedPath
            d="M 260 580 L 980 600"
            delay={0.85}
            style={{ stroke: 'rgba(192,132,252,0.10)', strokeWidth: 1 }}
          />

          {/* Measurement ticks along perspective lines */}
          <Tick cx={380} cy={580} angle={0.95} delay={0.9} />
          <Tick cx={520} cy={430} angle={0.15} delay={1.0} />
          <Tick cx={720} cy={380} angle={-0.25} delay={1.1} />
          <Tick cx={880} cy={520} angle={-0.85} delay={1.2} />

          {/* Central glowing node */}
          <motion.circle
            cx={vp.x}
            cy={vp.y}
            r={6}
            fill="#C084FC"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...popTransition, delay: 1.3 }}
            style={{ filter: 'drop-shadow(0 0 8px rgba(192,132,252,0.6))' }}
          />

          {/* Pulsing ring around node */}
          <motion.circle
            cx={vp.x}
            cy={vp.y}
            r={6}
            fill="none"
            stroke="rgba(192,132,252,0.4)"
            strokeWidth={1}
            initial={{ opacity: 0 }}
            animate={{ r: [6, 28, 6], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 1.6 }}
          />

          {/* Orbiting partial arc */}
          <motion.path
            d="M 580 220 A 100 100 0 0 1 780 220"
            fill="none"
            stroke="rgba(192,132,252,0.25)"
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Second, larger arc */}
          <motion.path
            d="M 530 220 A 150 150 0 0 1 830 220"
            fill="none"
            stroke="rgba(192,132,252,0.12)"
            strokeWidth={1}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Corner bracket in upper-right */}
          <AnimatedPath
            d="M 1050 80 L 1120 80 L 1120 150"
            delay={1.0}
            style={{ stroke: 'rgba(192,132,252,0.20)', strokeWidth: 1.5 }}
          />
          <AnimatedPath
            d="M 1150 180 L 1150 250 L 1080 250"
            delay={1.15}
            style={{ stroke: 'rgba(192,132,252,0.20)', strokeWidth: 1.5 }}
          />
        </svg>
      )}
    </div>
  );
}
