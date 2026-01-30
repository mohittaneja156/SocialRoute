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
        document.body.style.cursor = 'none';
      }
    };
    const onLeave = () => {
      setVisible(false);
      document.body.style.cursor = '';
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
      document.body.style.cursor = '';
      document.body.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseleave', onLeave);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverEnter);
        el.removeEventListener('mouseleave', onHoverLeave);
      });
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-0 h-0 z-[9999] pointer-events-none"
      aria-hidden
    >
      <motion.span
        className="absolute block w-2 h-2 rounded-full bg-light border border-primary"
        style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
        animate={{ scale: hovering ? 1.4 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
