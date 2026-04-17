import { motion } from 'framer-motion';

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  trigger?: 'inView' | 'animate';
  animate?: boolean;
}

export default function SplitText({
  children,
  className = '',
  delay = 0,
  stagger = 0.04,
  once = true,
  as: Tag = 'span',
  trigger = 'inView',
  animate: forceAnimate,
}: SplitTextProps) {
  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const motionProps =
    trigger === 'animate' || forceAnimate
      ? { initial: 'hidden', animate: 'visible' }
      : { initial: 'hidden', whileInView: 'visible', viewport: { once, margin: '-80px' } };

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        {...motionProps}
        className="inline-flex flex-wrap"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={child}
            className="mr-[0.25em] inline-block will-change-transform"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
