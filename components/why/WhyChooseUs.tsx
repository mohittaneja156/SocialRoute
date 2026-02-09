'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { prefersReducedMotion } from '@/lib/gsap';

import { IconUsers, IconStrategy, IconMessage, IconWallet, IconChart } from '@/components/ui/Icons';

const REASONS = [
  { title: 'In-house creative & marketing team', Icon: IconUsers },
  { title: 'Customized strategies — no templates', Icon: IconStrategy },
  { title: 'Clear communication & transparency', Icon: IconMessage },
  { title: 'Affordable packages with premium quality', Icon: IconWallet },
  { title: 'Focus on real growth, not vanity metrics', Icon: IconChart },
];

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * WhyChooseUs: Scroll-scrubbed entrance. Icons and text animate on scroll.
 */
export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -28 : 28 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 52%',
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
    <SectionWrapper id="why-us" layer={1} className="py-24 md:py-32 px-6 bg-secondary/20" entranceY={48} entranceScale={0.98}>
      <section ref={sectionRef} className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-16">
          Why Choose Us
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              ref={(el) => { itemsRef.current[i] = el; }}
              whileHover={{ y: -2 }}
              className="flex items-start gap-4 p-5 rounded-sm border border-border-color bg-secondary/50"
            >
              <span className="shrink-0 mt-0.5" aria-hidden>
                <reason.Icon />
              </span>
              <span className="text-foreground font-medium">{reason.title}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}
