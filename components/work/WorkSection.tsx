'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { prefersReducedMotion } from '@/lib/gsap';
import { WorkCard } from './WorkCard';
import { PROJECTS } from './workData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CARD_WIDTH = 380;
const CARD_GAP = 24;
const CARD_WIDTH_MOBILE = 320;
const CARD_GAP_MOBILE = 16;

/**
 * WorkSection: Our Work – scroll-driven horizontal carousel with interactive project cards.
 * Desktop: scroll progress drives horizontal offset; mobile: native horizontal scroll with snap.
 */
export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
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

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
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

      if (!isMobile && stripRef.current) {
        const totalWidth = PROJECTS.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP;
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const maxOffset = Math.max(0, totalWidth - viewportWidth + 80);
        gsap.fromTo(
          stripRef.current,
          { x: 0 },
          {
            x: -maxOffset,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: 'top 85%',
              end: 'bottom 15%',
              scrub: 1.2,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <SectionWrapper
      id="work"
      layer={1}
      className="py-24 md:py-32 px-6 bg-primary overflow-hidden"
      entranceY={48}
      entranceScale={0.98}
    >
      <section ref={sectionRef} className="relative max-w-full mx-auto">
        <h2
          ref={titleRef}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-light text-center mb-14 md:mb-16"
        >
          Our Work
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-12 md:mb-16 text-sm md:text-base">
          Selected projects across branding, web development, social media, and content.
        </p>

        {/* Desktop: scroll-driven horizontal strip */}
        {!isMobile && (
          <div className="overflow-hidden">
            <div
              ref={stripRef}
              className="flex gap-6 pl-6 md:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] pr-6"
              style={{ width: 'max-content' }}
            >
              {PROJECTS.map((project, i) => (
                <WorkCard
                  key={project.id}
                  project={project}
                  index={i}
                  cardRef={(el) => { cardsRef.current[i] = el; }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Mobile: native horizontal scroll with snap */}
        {isMobile && (
          <div className="overflow-x-auto overflow-y-hidden flex gap-4 px-6 pb-2 snap-x snap-mandatory scrollbar-hide">
            {PROJECTS.map((project, i) => (
              <div key={project.id} className="snap-center flex-shrink-0">
                <WorkCard project={project} index={i} />
              </div>
            ))}
          </div>
        )}
      </section>
    </SectionWrapper>
  );
}
