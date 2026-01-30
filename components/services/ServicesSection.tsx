'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { prefersReducedMotion } from '@/lib/gsap';

const SERVICES = [
  {
    title: 'Social Media Marketing',
    items: ['Content planning & posting', 'Reels & video marketing', 'Festive & promotional creatives', 'Engagement & community building']
  },
  {
    title: 'Content Creation',
    items: ['Professional shoots', 'Videographers & editors', 'Creative direction', 'Captions & storytelling']
  },
  {
    title: 'Website Design & Development',
    items: ['Business & e-commerce websites', 'Mobile-responsive designs', 'SEO-ready structure', 'User-friendly UI/UX']
  },
  {
    title: 'Search Engine Optimization (SEO)',
    items: ['Keyword research', 'On-page & off-page SEO', 'Google ranking improvement', 'Organic traffic growth']
  },
  {
    title: 'Branding & Strategy',
    items: ['Brand identity & positioning', 'Digital growth roadmap', 'Campaign planning']
  },
];

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ServiceCard: Motion container – staggered entrance (scrub), hover scale + depth,
 * scroll parallax title/desc, slight rotation on scroll.
 */
function ServiceCard({
  service,
  index,
  cardRef,
}: {
  service: (typeof SERVICES)[0];
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLUListElement>(null);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, 1], [0, 2]);
  const titleY = useTransform(y, [0, 1], [0, -8]);
  const descY = useTransform(y, [0, 1], [0, 4]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = titleRef.current?.closest('[data-service-card]');
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      end: 'bottom 10%',
      scrub: 1,
      onUpdate: (self) => y.set(self.progress),
    });
    return () => st.kill();
  }, [y]);

  return (
    <motion.div
      ref={cardRef}
      data-service-card
      className="relative p-6 md:p-8 rounded-sm border border-light/10 bg-primary/90 overflow-hidden"
      style={{ perspective: '1000px' }}
      initial={false}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <motion.div style={{ rotateX }} className="relative">
        <motion.h3
          ref={titleRef}
          style={{ y: titleY }}
          className="font-display text-xl font-semibold text-light"
        >
          {service.title}
        </motion.h3>
        <motion.ul
          ref={descRef}
          style={{ y: descY }}
          className="mt-4 space-y-2"
        >
          {service.items.map((item) => (
            <li key={item} className="text-muted text-sm md:text-base flex items-center gap-2">
              <span className="text-light/60">·</span> {item}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}

/**
 * ServicesSection: Motion containers with scroll-scrubbed entrance, hover depth, parallax.
 */
export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

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
            end: 'top 45%',
            scrub: 1.2,
          },
        }
      );
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 50%',
              scrub: 1.2,
            },
            delay: i * 0.08,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="services" layer={1} className="py-24 md:py-32 px-6 bg-secondary/20" entranceY={56} entranceScale={0.98}>
      <section ref={sectionRef} className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-light text-center mb-16"
        >
          Our Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              cardRef={(el) => { cardsRef.current[i] = el; }}
            />
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}
