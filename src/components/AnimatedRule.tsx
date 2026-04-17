import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedRuleProps {
  className?: string;
  delay?: number;
}

export default function AnimatedRule({ className = '', delay = 0 }: AnimatedRuleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className={`relative h-px overflow-hidden ${className}`}>
      {inView && (
        <motion.div
          className="absolute inset-y-0 left-1/2 h-full w-full -translate-x-1/2 bg-white/10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </div>
  );
}
