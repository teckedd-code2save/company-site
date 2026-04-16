import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/*
 * Self-drawing SVG branch diagram using Framer Motion pathLength.
 * Represents the 4-product AI economy stack radiating from a central node.
 * Colors: white/gray — no neon green.
 */

interface Branch {
  id: string;
  d: string;
  delay: number;
  dim?: boolean;
}

const branches: Branch[] = [
  /* trunk down → center */
  { id: 'trunk',    d: 'M 200 280 L 200 200', delay: 0,    dim: false },
  /* center → MPP Studio (top-left) */
  { id: 'b-mpp',   d: 'M 200 200 L 100 120', delay: 0.55, dim: false },
  /* center → Shipd (top-right) */
  { id: 'b-shipd', d: 'M 200 200 L 300 120', delay: 0.55, dim: true  },
  /* center → B2DP (left) */
  { id: 'b-b2dp',  d: 'M 200 200 L 80  200', delay: 0.9,  dim: false },
  /* center → Datafy (right) */
  { id: 'b-datafy',d: 'M 200 200 L 320 200', delay: 0.9,  dim: true  },
];

interface Node {
  id: string;
  cx: number;
  cy: number;
  delay: number;
  label: string;
  labelX: number;
  labelY: number;
  dim?: boolean;
}

const nodes: Node[] = [
  { id: 'n-center', cx: 200, cy: 200, delay: 0.3,  label: '',           labelX: 0,   labelY: 0,   dim: false },
  { id: 'n-mpp',    cx: 100, cy: 120, delay: 1.0,  label: 'MPP Studio', labelX: 100, labelY: 108, dim: false },
  { id: 'n-shipd',  cx: 300, cy: 120, delay: 1.0,  label: 'Shipd',      labelX: 300, labelY: 108, dim: true  },
  { id: 'n-b2dp',   cx: 80,  cy: 200, delay: 1.3,  label: 'B2DP',       labelX: 80,  labelY: 188, dim: false },
  { id: 'n-datafy', cx: 320, cy: 200, delay: 1.3,  label: 'Datafy',     labelX: 320, labelY: 188, dim: true  },
];

function AnimatedPath({ d, delay, dim }: { d: string; delay: number; dim?: boolean }) {
  const stroke = dim ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.55)';
  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
      filter={dim ? undefined : 'drop-shadow(0 0 3px rgba(255,255,255,0.25))'}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration: 0.9, delay, ease: 'easeOut' },
        opacity: { duration: 0.1, delay },
      }}
    />
  );
}

function AnimatedNode({ cx, cy, delay, label, labelX, labelY, dim }: Node) {
  const fill = dim ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.85)';
  const glow = dim ? undefined : 'drop-shadow(0 0 4px rgba(255,255,255,0.4))';
  return (
    <g>
      <motion.circle
        cx={cx}
        cy={cy}
        r={cx === 200 && cy === 200 ? 5 : 4}
        fill={fill}
        filter={glow}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18, delay }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      {label && (
        <motion.text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          fontSize="9"
          fill={dim ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.55)'}
          fontFamily="monospace"
          letterSpacing="0.05em"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.15 }}
        >
          {label}
        </motion.text>
      )}
    </g>
  );
}

export default function BranchDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="w-full h-full" aria-hidden="true">
      {inView && (
        <svg
          viewBox="40 90 320 210"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {branches.map((b) => (
            <AnimatedPath key={b.id} {...b} />
          ))}
          {nodes.map((n) => (
            <AnimatedNode key={n.id} {...n} />
          ))}

          {/* Pulsing ring on center node */}
          <motion.circle
            cx={200}
            cy={200}
            r={5}
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={1}
            animate={{ r: [5, 14, 5], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
          />
        </svg>
      )}
    </div>
  );
}
