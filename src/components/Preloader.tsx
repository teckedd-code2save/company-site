import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: '> boot sequence initiated', delay: 100 },
  { text: '> mounting kernel...        [ok]', delay: 280 },
  { text: '> loading modules...        [ok]', delay: 460 },
  { text: '> resolving dependencies... [ok]', delay: 640 },
  { text: '> compiling assets...       [ok]', delay: 820 },
  { text: '> establishing grid...      [ok]', delay: 1000 },
  { text: '> ready.', delay: 1200 },
];

const TOTAL_DURATION = 1800;

export default function Preloader() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const shown = BOOT_LINES.filter((l) => elapsed >= l.delay).length;
      setVisibleLines(shown);

      if (elapsed >= TOTAL_DURATION) {
        setDone(true);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: '#000000' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-start gap-1 px-6" style={{ minWidth: 320 }}>
            {BOOT_LINES.map((line, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -8 }}
                animate={{
                  opacity: i < visibleLines ? 1 : 0,
                  x: i < visibleLines ? 0 : -8,
                }}
                transition={{ duration: 0.15 }}
              >
                <span
                  className="text-xs tracking-wide"
                  style={{
                    fontFamily: 'GeistMono, ui-monospace, monospace',
                    color: line.text.includes('[ok]')
                      ? 'rgba(255,255,255,0.5)'
                      : line.text.includes('ready')
                        ? '#D4A5B0'
                        : 'rgba(255,255,255,0.35)',
                  }}
                >
                  {line.text}
                </span>
              </motion.div>
            ))}

            {/* Blinking cursor on the last visible line */}
            {visibleLines > 0 && visibleLines < BOOT_LINES.length && (
              <motion.span
                className="mt-0.5 h-3 w-2"
                style={{ backgroundColor: '#D4A5B0' }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
              />
            )}

            {/* Final cursor after ready */}
            {visibleLines >= BOOT_LINES.length && !done && (
              <motion.span
                className="mt-0.5 h-3 w-2"
                style={{ backgroundColor: '#D4A5B0' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'linear', delay: 0.1 }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
