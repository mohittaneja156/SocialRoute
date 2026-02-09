'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

type MagneticButtonProps = {
  children: ReactNode;
  /** Cursor-follow offset strength (0 = none, 0.3 = subtle, 0.5 = strong) */
  strength?: number;
  className?: string;
};

/**
 * MagneticButton: Cursor-follow offset on hover. Premium, restrained.
 */
export function MagneticButton({ children, strength = 0.2, className = '' }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || strength <= 0) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;
    setPosition({ x: x * strength * 12, y: y * strength * 12 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x * 1.5, y: position.y * 1.5 }}
      transition={{ type: 'spring', stiffness: 150, damping: 40 }}
    >
      {children}
    </motion.div>
  );
}
