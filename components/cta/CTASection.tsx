'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { LinkWithUnderline } from '@/components/ui/LinkWithUnderline';
import { prefersReducedMotion } from '@/lib/gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * CTASection: Scroll-scrubbed entrance. Slight parallax/scale. B&W CTAs.
 */
export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.98, y: 32 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: 'top 82%',
            end: 'top 42%',
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper layer={1} className="py-24 md:py-32 px-6 bg-secondary/20" entranceY={48} entranceScale={0.98}>
      <section ref={sectionRef} className="max-w-3xl mx-auto text-center">
        <div ref={contentRef}>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-foreground">Ready for a </span><span className="text-animate-gradient">Digital Growth</span><span className="text-foreground"> Roadmap?</span>
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton strength={0.22}>
              <Link
                href="#contact"
                className="inline-block px-8 py-4 bg-gradient-premium text-white font-semibold rounded-sm hover:opacity-95 transition-all shadow-lg shadow-blue-500/30"
              >
                Start Your Roadmap
              </Link>
            </MagneticButton>
            <LinkWithUnderline href="mailto:info@socialroute.in?subject=Custom%20Quote" className="text-foreground font-medium">
              Get a Custom Quote
            </LinkWithUnderline>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
