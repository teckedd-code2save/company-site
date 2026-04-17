import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

interface ScrambleTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function ScrambleText({
  children,
  className = '',
  delay = 0,
  duration = 1200,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(children.split('').map(() => ' ').join(''));
  const [started, setStarted] = useState(false);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const text = children;
    const length = text.length;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const revealed = Math.floor(progress * length);

      let out = '';
      for (let i = 0; i < length; i++) {
        if (text[i] === ' ') {
          out += ' ';
        } else if (i < revealed) {
          out += text[i];
        } else {
          out += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplay(out);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [started, children, duration]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: started ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {display}
    </motion.span>
  );
}
