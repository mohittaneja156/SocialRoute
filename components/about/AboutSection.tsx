'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { prefersReducedMotion } from '@/lib/gsap';

const PHILOSOPHY = [
  'Strategy before execution',
  'Creativity with purpose',
  'Growth that can be measured',
];

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * AboutSection: Scroll-scrubbed entrance (vertical + opacity). Layered with SectionWrapper.
 */
export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: 'top 82%',
            end: 'top 45%',
            scrub: 1.2,
          },
        }
      );
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current!, start: 'top 80%', end: 'top 42%', scrub: 1.2 },
          delay: 0.1,
        }
      );
      gsap.fromTo(
        listRef.current?.children ?? [],
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current!, start: 'top 75%', end: 'top 38%', scrub: 1.2 },
          delay: 0.2,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="about" layer={0} className="py-24 md:py-32 px-6" entranceY={48} entranceScale={0.98}>
      <section ref={sectionRef} className="max-w-3xl mx-auto text-center">
        <h2 ref={titleRef} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-light">
          About Social Route
        </h2>
        <p ref={textRef} className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-4xl mx-auto">
          Social Route is a full-service digital marketing agency that helps businesses build strong digital identities and convert online presence into real growth.
          <br /><br />
          We work with cafés, salons, real estate brands, startups, and local businesses to create strategies that don’t just look good — they perform.
          From social media content to websites and SEO, we manage everything under one roof so brands can focus on what they do best.
        </p>
        <ul ref={listRef} className="mt-10 space-y-3 text-left max-w-md mx-auto">
          {PHILOSOPHY.map((item) => (
            <li key={item} className="flex items-center gap-3 text-light">
              <span className="w-1.5 h-1.5 rounded-full bg-light/60 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </SectionWrapper>
  );
}
