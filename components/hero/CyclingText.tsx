'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = ['Create', 'Engage', 'Convert'];

/**
 * CyclingText: Animated text that cycles through Create • Engage • Convert.
 * Uses Framer Motion for smooth micro-interactions. Respects reduced motion via shorter duration.
 */
export function CyclingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, prefersReduced ? 0 : 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block min-w-[140px] text-left text-foreground">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
          className="inline-block"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
