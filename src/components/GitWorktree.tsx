import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ACCENT = '#FFFFFF';
const DIM = 'rgba(255,255,255,0.2)';
const TRUNK = 'rgba(255,255,255,0.35)';

interface Branch {
  id: string;
  d: string;
  delay: number;
  color?: string;
  width?: number;
}

interface Node {
  id: string;
  cx: number;
  cy: number;
  delay: number;
  r?: number;
  label?: string;
  labelX?: number;
  labelY?: number;
  glow?: boolean;
}

/* Git worktree-style branching diagram
   Visualizes the product stack as a branching commit tree */

const branches: Branch[] = [
  // Main trunk
  { id: 'trunk-1', d: 'M 300 520 L 300 420', delay: 0, color: TRUNK, width: 2.5 },
  { id: 'trunk-2', d: 'M 300 420 L 300 280', delay: 0.3, color: TRUNK, width: 2.5 },
  { id: 'trunk-3', d: 'M 300 280 L 300 140', delay: 0.6, color: TRUNK, width: 2.5 },

  // Feature branch: MPP Studio (splits left-up)
  { id: 'mpp-branch', d: 'M 300 420 Q 240 380 180 340', delay: 0.5, color: ACCENT, width: 2 },
  { id: 'mpp-tip',    d: 'M 180 340 L 140 300', delay: 0.8, color: ACCENT, width: 2 },

  // Feature branch: Shipd (splits right-up, then merges back conceptually)
  { id: 'shipd-branch', d: 'M 300 380 Q 380 340 440 300', delay: 0.7, color: DIM, width: 1.5 },
  { id: 'shipd-tip',    d: 'M 440 300 L 480 260', delay: 1.0, color: DIM, width: 1.5 },

  // Feature branch: Forge (splits left-mid)
  { id: 'forge-branch', d: 'M 300 280 Q 220 240 160 200', delay: 0.9, color: ACCENT, width: 2 },
  { id: 'forge-tip',    d: 'M 160 200 L 120 160', delay: 1.2, color: ACCENT, width: 2 },

  // Feature branch: Datafy (splits right-mid)
  { id: 'datafy-branch', d: 'M 300 240 Q 380 200 460 160', delay: 1.1, color: DIM, width: 1.5 },
  { id: 'datafy-tip',    d: 'M 460 160 L 500 120', delay: 1.4, color: DIM, width: 1.5 },

  // Merge branch: integration line connecting back
  { id: 'merge-1', d: 'M 140 300 Q 200 260 300 220', delay: 1.6, color: 'rgba(255,255,255,0.15)', width: 1 },
  { id: 'merge-2', d: 'M 480 260 Q 420 220 300 180', delay: 1.7, color: 'rgba(255,255,255,0.15)', width: 1 },
];

const nodes: Node[] = [
  { id: 'n-root',   cx: 300, cy: 520, delay: 0.1,  r: 6, glow: true },
  { id: 'n-mpp',    cx: 300, cy: 420, delay: 0.4,  r: 5, label: 'MPP',     labelX: 300, labelY: 445 },
  { id: 'n-shipd',  cx: 300, cy: 380, delay: 0.6,  r: 4, label: 'Shipd',   labelX: 300, labelY: 405 },
  { id: 'n-forge',  cx: 300, cy: 280, delay: 0.8,  r: 5, label: 'Forge',   labelX: 300, labelY: 305 },
  { id: 'n-datafy', cx: 300, cy: 240, delay: 1.0,  r: 4, label: 'Datafy',  labelX: 300, labelY: 265 },
  { id: 'n-top',    cx: 300, cy: 140, delay: 1.2,  r: 6, glow: true },

  // Leaf nodes
  { id: 'n-mpp-leaf',    cx: 140, cy: 300, delay: 1.1,  r: 5, label: 'Payments', labelX: 140, labelY: 275, glow: true },
  { id: 'n-shipd-leaf',  cx: 480, cy: 260, delay: 1.3,  r: 4, label: 'Deploy',   labelX: 480, labelY: 235 },
  { id: 'n-forge-leaf',  cx: 120, cy: 160, delay: 1.5,  r: 5, label: 'Design',   labelX: 120, labelY: 135, glow: true },
  { id: 'n-datafy-leaf', cx: 500, cy: 120, delay: 1.7,  r: 4, label: 'Ground',   labelX: 500, labelY: 95 },
];

function AnimatedBranch({ d, delay, color = TRUNK, width = 2 }: Branch) {
  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth={width}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

function AnimatedNode({ cx, cy, delay, r = 4, label, labelX, labelY, glow }: Node) {
  return (
    <g>
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill={glow ? ACCENT : '#050505'}
        stroke={glow ? ACCENT : 'rgba(255,255,255,0.5)'}
        strokeWidth={glow ? 0 : 1.5}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18, delay }}
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          filter: glow ? 'drop-shadow(0 0 6px rgba(255,255,255,0.5))' : undefined,
        }}
      />
      {glow && (
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={ACCENT}
          strokeWidth={1}
          initial={{ opacity: 0 }}
          animate={{ r: [r, r + 10, r], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: delay + 0.3 }}
        />
      )}
      {label && labelX !== undefined && labelY !== undefined && (
        <motion.text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          fontSize="10"
          fill={glow ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)'}
          fontFamily="monospace"
          letterSpacing="0.08em"
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

export default function GitWorktree() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="w-full h-full min-h-[320px]" aria-hidden="true">
      {inView && (
        <svg
          viewBox="0 40 640 560"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Glow filter for accent lines */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Branches */}
          {branches.map((b) => (
            <AnimatedBranch key={b.id} {...b} />
          ))}

          {/* Nodes */}
          {nodes.map((n) => (
            <AnimatedNode key={n.id} {...n} />
          ))}

          {/* Commit hash labels on trunk */}
          <motion.text
            x={315}
            y={425}
            fontSize="8"
            fill="rgba(255,255,255,0.2)"
            fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            a1b2c3d
          </motion.text>
          <motion.text
            x={315}
            y={285}
            fontSize="8"
            fill="rgba(255,255,255,0.2)"
            fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            e4f5g6h
          </motion.text>
        </svg>
      )}
    </div>
  );
}
