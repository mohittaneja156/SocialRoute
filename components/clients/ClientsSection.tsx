'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { prefersReducedMotion } from '@/lib/gsap';
import { CLIENTS } from './clientsData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ClientsSection: Client logos carousel – infinite horizontal scroll (2D).
 * Mobile: same strip with touch scroll, reduced size.
 */
export function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: 'top 82%',
            end: 'top 50%',
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const duplicated = [...CLIENTS, ...CLIENTS];

  return (
    <SectionWrapper
      id="clients"
      layer={0}
      className="py-20 md:py-28 px-6 bg-secondary/10 border-t border-border-color overflow-hidden"
      entranceY={40}
      entranceScale={0.99}
    >
      <section ref={sectionRef} className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4"
        >
          Trusted by brands
        </h2>
        <p className="text-muted text-center text-sm md:text-base mb-12 max-w-lg mx-auto">
          We partner with growing businesses across industries.
        </p>

        {/* Logo strip – scrollable on mobile, optional GSAP scroll on desktop */}
        <div className="relative -mx-6 md:-mx-8">
          <div
            ref={stripRef}
            className="flex gap-8 md:gap-12 overflow-x-auto overflow-y-hidden py-6 px-6 md:px-8 scrollbar-hide scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' } as React.CSSProperties}
          >
            {duplicated.map((client) => (
              <a
                key={`${client.id}-${client.name}`}
                href={client.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center justify-center w-[140px] md:w-[160px] h-[72px] md:h-[80px] rounded-lg border border-border-color bg-secondary/60 px-4 snap-center hover:bg-secondary/80 transition-all hover:scale-105 cursor-pointer"
              >
                {client.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-10 md:max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span className="font-display font-semibold text-foreground/80 text-sm md:text-base text-center truncate max-w-full">
                    {client.name}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
