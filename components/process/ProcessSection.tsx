'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { IconArrowRight } from '@/components/ui/Icons';
import { prefersReducedMotion } from '@/lib/gsap';

const STEPS = [
  { label: 'Discover', desc: 'Understand your brand and goals' },
  { label: 'Plan', desc: 'Strategy and roadmap' },
  { label: 'Create', desc: 'Content and campaigns' },
  { label: 'Launch', desc: 'Go live and optimize' },
  { label: 'Grow', desc: 'Scale and measure results' },
];

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ProcessSection: Scroll-scrubbed timeline entrance. Staggered steps.
 */
export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: sectionRef.current!, start: 'top 75%', end: 'top 40%', scrub: 1.2 },
        }
      );
      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: { trigger: sectionRef.current!, start: 'top 75%', end: 'top 38%', scrub: 1.2 },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="process" layer={0} className="py-24 md:py-32 px-6" entranceY={48} entranceScale={0.98}>
      <section ref={sectionRef} className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-light text-center mb-16">
          Our Growth Process
        </h2>
        <div className="relative">
          <div
            ref={lineRef}
            className="hidden md:block absolute top-8 left-0 right-0 h-px bg-light/20 origin-left"
          />
          <div className="grid md:grid-cols-5 gap-8 md:gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                ref={(el) => { stepsRef.current[i] = el; }}
                whileHover={{ scale: 1.02 }}
                className="relative flex flex-col items-center text-center"
              >
                <span className="w-16 h-16 rounded-full bg-light/10 border border-light/30 flex items-center justify-center text-light font-display font-bold text-lg z-10">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display font-semibold text-light text-lg">{step.label}</h3>
                <p className="mt-1 text-sm text-muted max-w-[140px]">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <span className="hidden md:inline absolute top-8 left-[calc(50%+2rem)] text-light/30">
                    <IconArrowRight />
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
