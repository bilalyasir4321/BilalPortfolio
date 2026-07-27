import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'outline';
  className?: string;
  type?: 'button' | 'submit';
}) {
  const base =
    'magnetic-btn text-sm font-medium transition-all duration-300 will-change-transform';
  const variants = {
    primary:
      'bg-gradient-to-r from-electric-500 to-accent-500 text-white shadow-glow hover:shadow-glow-accent',
    ghost: 'text-white/80 hover:text-white hover:bg-white/5',
    outline:
      'border border-white/15 text-white/90 hover:border-electric-400/60 hover:bg-electric-400/5',
  };

  return (
    <Magnetic strength={0.25}>
      <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </button>
    </Magnetic>
  );
}

export function MagneticWrap({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Magnetic strength={0.2} className={className}>
      {children}
    </Magnetic>
  );
}

// Unused import suppression
void useTransform;
