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
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
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
        ctaRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.8, ease: EASE_EDITORIAL }
      );
      gsap.fromTo(
        badgeRef.current,
        { scale: 0, rotate: -45 },
        { scale: 1, rotate: 0, duration: 1, delay: 1.1, ease: 'back.out(1.7)' }
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32 pb-24 md:pt-24 md:pb-20"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/10 to-secondary/40 pointer-events-none dark:from-primary/30 dark:to-secondary/80" aria-hidden />
      {isMobile && <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/20 to-secondary/40 dark:from-primary/50 dark:to-secondary/80" aria-hidden />}

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Floating Engage Badge */}
        <div
          ref={badgeRef}
          className="absolute -top-12 -right-4 md:-right-12 w-20 h-20 md:w-32 md:h-32 block"
        >
          <div className="relative w-full h-full animate-[spin_15s_linear_infinite]">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
              <text className="font-display text-[8px] font-bold uppercase tracking-[0.2em] fill-foreground transition-colors duration-500" opacity="0.4">
                <textPath xlinkHref="#circlePath">
                  Social Route • Digital Growth • Engage • storytelling •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[10px] md:text-xs font-black text-highlight tracking-widest uppercase mb-1">Engage</span>
            </div>
          </div>
        </div>

        <h1
          ref={headlineWrapRef}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[0.9]"
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span
              key={i}
              className={`hero-word inline-block mr-[0.25em] ${(word === 'Digital' || word === 'Growth' || word === 'Route') ? 'text-animate-gradient' : ''
                }`}
            >
              {word}
            </span>
          ))}
        </h1>
        <p
          ref={subheadRef}
          className="mt-8 text-lg sm:text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed font-medium"
        >
          We build meaningful connections through storytelling, creative content, and
          result-driven digital growth roadmaps.
        </p>

        <div
          ref={ctaRef}
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <MagneticButton strength={0.25}>
            <Link
              href="#contact"
              className="inline-block px-10 py-5 bg-foreground text-background font-bold rounded-sm hover:scale-[1.02] transition-transform shadow-xl"
            >
              Start Your Growth Roadmap
            </Link>
          </MagneticButton>
          <LinkWithUnderline href="#work" className="text-foreground font-bold text-lg border-foreground/40">
            View Our Work
          </LinkWithUnderline>
        </div>
      </div>
    </section >
  );
}
