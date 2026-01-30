'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollProgressRef } from '@/lib/gsap';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
// ... (imports remain)
import { prefersReducedMotion } from '@/lib/gsap';
import { PROCESS_STEPS } from './Process3DScene';

// Dynamic import with a nicer loading skeleton
const Process3DScene = dynamic(() => import('./Process3DScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-2xl bg-secondary/30 backdrop-blur-sm border border-white/5 flex items-center justify-center animate-pulse">
      <span className="text-muted text-sm tracking-widest">LOADING 3D EXPERIENCE...</span>
    </div>
  ),
});

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Process3DSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollProgress = useRef(0);
  const killScroll = useRef<(() => void) | null>(null);

  // Sync scroll with 3D scene
  useEffect(() => {
    if (typeof window === 'undefined') return;
    killScroll.current = scrollProgressRef(
      sectionRef.current,
      (p) => {
        scrollProgress.current = p;
      },
      { start: 'top 80%', end: 'bottom 20%' }
    );
    return () => killScroll.current?.();
  }, []);

  // Title Animation
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      id="process"
      layer={0}
      className="py-24 md:py-32 px-4 md:px-6 relative z-10"
      entranceY={48}
      entranceScale={0.98}
    >
      <section ref={sectionRef} className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-display text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6"
          >
            Our Growth Process
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            A seamless journey from concept to conversion. Scroll to explore.
          </p>
        </div>

        {/* 3D Timeline for all devices (responsive canvas handles it) */}
        <div className="relative w-full">
          <Process3DScene scrollProgressRef={scrollProgress} />
        </div>
      </section>
    </SectionWrapper>
  );
}
