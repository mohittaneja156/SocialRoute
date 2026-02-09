'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { prefersReducedMotion } from '@/lib/gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const METRICS = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Brands Partnered' },
  { value: 5, suffix: '+', label: 'Years of Growth' },
  { value: 100, suffix: '%', label: 'Dedicated Focus' },
];

/**
 * Rolldown counter: animates from 0 to value when section enters view.
 * "Rolldown on refresh" = numbers count up with a slight vertical roll feel (overflow hidden + y).
 */
function RolldownCounter({
  value,
  suffix,
  label,
  index,
  counterRef,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
  counterRef: (el: HTMLDivElement | null) => void;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplayValue(value);
      return;
    }
    const el = document.getElementById('metrics-section');
    if (!el) return;
    sectionRef.current = el;

    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      end: 'top 30%',
      once: true,
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        gsap.to(obj, {
          val: value,
          duration: 1.4,
          ease: 'power3.out',
          onUpdate: () => setDisplayValue(Math.floor(obj.val)),
        });
      },
    });

    return () => st.kill();
  }, [value]);

  return (
    <div
      ref={counterRef}
      className="flex flex-col items-center text-center"
    >
      <div className="overflow-hidden h-14 md:h-16 flex items-center justify-center" aria-hidden>
        <span className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tabular-nums transition-transform duration-300 ease-out">
          {displayValue}
          {suffix}
        </span>
      </div>
      <span className="mt-2 text-sm md:text-base text-muted font-medium">{label}</span>
    </div>
  );
}

/**
 * MetricsSection: Key stats with rolldown-on-refresh (count-up when section enters view).
 * Inspired by [AdMark](https://admarkdigitalmedia.com/) and [iplix](https://www.iplix.in/) metrics.
 */
export function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

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
            end: 'top 45%',
            scrub: 1.2,
          },
        }
      );
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: 'top 78%',
              end: 'top 38%',
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
    <SectionWrapper
      id="metrics-section"
      layer={0}
      className="py-20 md:py-28 px-6 border-y border-border-color bg-secondary/20"
      entranceY={40}
      entranceScale={0.99}
    >
      <section ref={sectionRef} className="max-w-5xl mx-auto">
        <h2
          ref={titleRef}
          className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-14"
        >
          By the numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {METRICS.map((metric, i) => (
            <RolldownCounter
              key={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              index={i}
              counterRef={(el) => { itemsRef.current[i] = el; }}
            />
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}
