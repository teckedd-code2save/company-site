import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface DrawnUnderlineProps {
  className?: string;
  width?: number | string;
  delay?: number;
  color?: string;
}

export default function DrawnUnderline({
  className = '',
  width = 48,
  delay = 0,
  color = '#C084FC',
}: DrawnUnderlineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className={`relative h-px ${className}`} style={{ width }}>
      {inView && (
        <motion.div
          className="absolute inset-0 h-full origin-left"
          style={{ backgroundColor: color }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </div>
  );
}
