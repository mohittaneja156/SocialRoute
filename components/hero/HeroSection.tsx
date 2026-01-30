'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollProgressRef } from '@/lib/gsap';
import { EASE_EDITORIAL } from '@/lib/gsap';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { LinkWithUnderline } from '@/components/ui/LinkWithUnderline';
import { CyclingText } from './CyclingText';

const HEADLINE = 'Your Route to Digital Growth';
const HEADLINE_WORDS = HEADLINE.split(' ');

/**
 * HeroSection: 3D + typography composition. Word-by-word reveal (stagger, power4).
 * Scroll progress ref drives 3D (rotation.y, position.z, scale). Editorial, spatial, premium.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineWrapRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const cycleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const killScrollProgress = useRef<(() => void) | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const onMatch = () => setIsMobile(mq.matches);
    mq.addEventListener('change', onMatch);
    return () => mq.removeEventListener('change', onMatch);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    killScrollProgress.current = scrollProgressRef(
      sectionRef.current,
      (p) => { scrollProgress.current = p; },
      { start: 'top top', end: 'bottom top' }
    );

    const ctx = gsap.context(() => {
      const words = headlineWrapRef.current?.querySelectorAll('.hero-word');
      if (words?.length) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.08,
            ease: EASE_EDITORIAL,
            delay: 0.2,
          }
        );
      }
      gsap.fromTo(
        subheadRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.6, ease: EASE_EDITORIAL }
      );
      gsap.fromTo(
        cycleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.85 }
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, delay: 1, ease: EASE_EDITORIAL }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      killScrollProgress.current?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-20"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/30 to-secondary/80 pointer-events-none" aria-hidden />
      {isMobile && <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/50 to-secondary/80" aria-hidden />}

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1
          ref={headlineWrapRef}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-light"
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span key={i} className="hero-word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h1>
        <p
          ref={subheadRef}
          className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
        >
          We help brands grow online through powerful storytelling, creative content, and
          result-driven digital marketing strategies.
        </p>
        <div ref={cycleRef} className="mt-6 font-display text-xl sm:text-2xl font-semibold text-light">
          <CyclingText />
        </div>
        <div
          ref={ctaRef}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton strength={0.25}>
            <Link
              href="#contact"
              className="inline-block px-8 py-4 bg-light text-primary font-semibold rounded-sm hover:bg-white transition-colors"
            >
              Get a Free Strategy Call
            </Link>
          </MagneticButton>
          <LinkWithUnderline href="#services" className="text-light font-medium border-light/40">
            View Our Work
          </LinkWithUnderline>
        </div>
      </div>
    </section >
  );
}
