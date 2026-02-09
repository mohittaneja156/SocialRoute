'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { prefersReducedMotion } from '@/lib/gsap';

import { IconCheck, IconTarget, IconUsers, IconMessage } from '@/components/ui/Icons';

const ITEMS = [
  { label: 'Trusted by growing brands', Icon: IconCheck },
  { label: 'Results-focused marketing', Icon: IconTarget },
  { label: 'In-house creative team', Icon: IconUsers },
  { label: 'Transparent & collaborative', Icon: IconMessage },
];

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * TrustStrip: Scroll-scrubbed icon + text entrance. Layered.
 */
export function TrustStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 1.2,
            },
            delay: i * 0.06,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper layer={0} className="py-16 px-6 border-y border-border-color bg-secondary/50" entranceY={32} entranceScale={0.99}>
      <section ref={sectionRef} className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {ITEMS.map((item, i) => (
          <div
            key={item.label}
            ref={(el) => { itemsRef.current[i] = el; }}
            className="flex flex-col items-center text-center gap-3"
          >
            <item.Icon />
            <span className="text-sm md:text-base text-muted font-medium">{item.label}</span>
          </div>
        ))}
      </section>
    </SectionWrapper>
  );
}
