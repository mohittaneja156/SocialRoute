'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * CustomCursor: Minimal cursor dot. Scale on hover over interactive elements.
 * Disabled on touch devices and when prefers-reduced-motion.
 */
export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const isTouch = 'ontouchstart' in window;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) {
        setVisible(true);
      }
    };
    const onLeave = () => {
      setVisible(false);
    };

    document.body.addEventListener('mousemove', onMove);
    document.body.addEventListener('mouseleave', onLeave);

    const hoverables = document.querySelectorAll('a, button, [role="button"]');
    const onHoverEnter = () => setHovering(true);
    const onHoverLeave = () => setHovering(false);
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onHoverEnter);
      el.addEventListener('mouseleave', onHoverLeave);
    });

    return () => {
      document.body.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseleave', onLeave);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverEnter);
        el.removeEventListener('mouseleave', onHoverLeave);
      });
    };
  }, [visible]);

  if (!visible) return null;

  // Laggy, fluid spring for the "Aura"
  const springConfig = { damping: 40, stiffness: 150 };

  return (
    <motion.div
      className="fixed top-0 left-0 w-32 h-32 z-[9999] pointer-events-none rounded-full bg-highlight/10 blur-3xl mix-blend-difference"
      style={{ x: pos.x - 64, y: pos.y - 64 }}
      animate={{
        scale: hovering ? 1.5 : 1,
        opacity: hovering ? 0.8 : 0.4
      }}
      transition={{ type: 'spring', ...springConfig }}
    />
  );
}
