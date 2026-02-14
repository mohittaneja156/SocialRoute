'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { prefersReducedMotion } from '@/lib/gsap';

const TESTIMONIALS = [
  {
    quote:
      'Social Route transformed our online presence. The content, videos, and strategy helped us connect with the right audience.',
    author: 'Client Name',
    role: 'Business Owner',
  },
  {
    quote:
      'Transparent, creative, and results-driven. They delivered exactly what we needed for our digital campaigns.',
    author: 'Rahul M.',
    role: 'Marketing Head',
  },
  {
    quote:
      'The team is responsive and professional. Our social engagement and website traffic improved within months.',
    author: 'Anita K.',
    role: 'CEO, Tech Startup',
  },
];

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * TestimonialsSection: Carousel with smooth Framer transitions. Scroll-scrubbed section entrance.
 */
export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const length = TESTIMONIALS.length;

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const interval = setInterval(() => setIndex((i) => (i + 1) % length), 5000);
    return () => clearInterval(interval);
  }, [length]);

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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="testimonials" layer={0} className="py-16 md:py-32 px-6 overflow-hidden" entranceY={48} entranceScale={0.98}>
      <section ref={sectionRef} className="max-w-3xl mx-auto text-center">
        <h2 ref={titleRef} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 md:mb-12">
          What Clients Say
        </h2>
        <div className="relative min-h-[220px] flex items-center justify-center" style={{ perspective: '1200px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: 150,
                rotateY: 90,
                rotateX: 15,
                scale: 0.8,
                z: -100
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotateY: 0,
                rotateX: 0,
                scale: 1,
                z: 0
              }}
              exit={{
                opacity: 0,
                x: -150,
                rotateY: -90,
                rotateX: -15,
                scale: 0.8,
                z: -100
              }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
                opacity: { duration: 0.5 }
              }}
              className="absolute inset-0 flex flex-col justify-center"
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
            >
              <blockquote className="text-lg md:text-xl text-muted leading-relaxed italic">
                &ldquo;{TESTIMONIALS[index].quote}&rdquo;
              </blockquote>
              <footer className="mt-6">
                <cite className="not-italic font-semibold text-foreground">
                  {TESTIMONIALS[index].author}
                </cite>
                <span className="text-muted text-sm block mt-1">{TESTIMONIALS[index].role}</span>
              </footer>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === index ? 'bg-highlight' : 'bg-muted/30 hover:bg-muted/50'
                }`}
            />
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}
