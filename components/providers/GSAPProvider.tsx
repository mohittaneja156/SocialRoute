'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPProviderProps {
  children: ReactNode;
}

/**
 * GSAPProvider: Registers GSAP ScrollTrigger and provides default config.
 * Respects prefers-reduced-motion by disabling ScrollTrigger when user prefers reduced motion.
 */
export function GSAPProvider({ children }: GSAPProviderProps) {
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mq.matches;
    const handler = () => {
      reducedMotion.current = mq.matches;
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return <>{children}</>;
}
