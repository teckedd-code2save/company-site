import { useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
  type?: 'button' | 'submit';
}

export default function MagneticButton({
  children,
  className = '',
  style,
  strength = 0.3,
  onClick,
  as = 'button',
  href,
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
  };

  const baseProps = {
    ref: ref as React.RefObject<never>,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    'data-cursor-hover': true,
    style: { ...style, transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)' },
  };

  if (as === 'a' && href) {
    return (
      <motion.a
        {...baseProps}
        href={href}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...baseProps}
      type={type}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.button>
  );
}
