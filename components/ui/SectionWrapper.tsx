'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sectionEntrance, prefersReducedMotion } from '@/lib/gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type SectionWrapperProps = {
  children: ReactNode;
  /** Section id for anchor links */
  id?: string;
  /** Layer index for overlap / depth (higher = in front) */
  layer?: number;
  /** Slight background shift for depth (e.g. "bg-secondary/40") */
  className?: string;
  /** Entrance: vertical translation (px) */
  entranceY?: number;
  /** Entrance: scale */
  entranceScale?: number;
  /** Entrance: clip-path inset 0–1 */
  entranceClip?: number;
  /** Scrub duration */
  scrub?: number;
};

/**
 * SectionWrapper: Sections overlap slightly with z-index + translateZ illusion.
 * Scroll-driven entrance: vertical translation, scale, optional clip-path. No hard cuts.
 */
export function SectionWrapper({
  children,
  id,
  layer = 0,
  className = '',
  entranceY = 48,
  entranceScale = 0.98,
  entranceClip,
  scrub = 1.2,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = contentRef.current ?? sectionRef.current;
    if (!el) return;

    const st = sectionEntrance({
      trigger: el,
      start: 'top 88%',
      end: 'top 35%',
      scrub,
      y: entranceY,
      scale: entranceScale,
      clipInset: entranceClip,
      opacity: 0.92,
    });

    return () => {
      st?.kill();
    };
  }, [entranceY, entranceScale, entranceClip, scrub]);

  const zIndex = 10 + layer;
  const translateZ = layer * 20;
  const overlap = -48; /* px – sections overlap slightly */

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative ${className}`}
      style={{
        zIndex,
        marginBottom: overlap,
        transform: translateZ ? `translateZ(${translateZ}px)` : undefined,
        willChange: prefersReducedMotion() ? 'auto' : 'transform',
      }}
    >
      <div ref={contentRef}>{children}</div>
    </section>
  );
}
