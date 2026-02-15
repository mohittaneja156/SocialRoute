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
  "Authenticity above all",
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
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1.2,
          },
        }
      );
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current!, start: 'top 82%', end: 'top 45%', scrub: 1.2 },
        }
      );
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, scale: 0.9, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: listRef.current, start: 'top 90%', end: 'top 60%', scrub: 0.5 },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="about" layer={0} className="py-24 md:py-32 px-6" entranceY={48} entranceScale={0.98}>
      <section ref={sectionRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        {/* Left Side: Title & Emphasis */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <span className="inline-block text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-highlight mb-6">
            Social Route Agency
          </span>
          <h2 ref={titleRef} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[0.9] tracking-tighter">
            About<br />Social<br />Route<span className="text-highlight">.</span>
          </h2>

          <div className="mt-12 hidden lg:block overflow-hidden rounded-full border border-border-color p-4 w-fit group cursor-help">
            <div className="w-16 h-16 rounded-full bg-highlight/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <span className="font-display text-xs font-bold text-highlight rotate-[-15deg]">Growth.</span>
            </div>
          </div>
        </div>

        {/* Right Side: Content & Philosophy */}
        <div className="lg:col-span-7">
          <p ref={textRef} className="text-xl md:text-2xl lg:text-3xl text-foreground font-medium leading-tight">
            Social Route is a full-service digital marketing agency dedicated to <span className="text-highlight font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-highlight">building meaningful connections</span> between brands and their audiences through innovative storytelling and strategic digital solutions.
          </p>

          <p className="mt-8 text-muted text-lg leading-relaxed">
            We believe in the power of authentic narratives. In today's digital landscape, brands need more than just visibility—they need to create genuine relationships with their audience. Our approach combines creative excellence with data-driven insights to craft campaigns that don't just reach people, but truly resonate with them.
          </p>

          <p className="mt-6 text-muted text-lg leading-relaxed">
            From compelling content creation and strategic social media management to comprehensive digital marketing campaigns, we produce high-quality, engaging content tailored to your target audience. We use storytelling and analytics to create content that educates, inspires, and influences customer decisions while maintaining consistency with your brand's unique identity and voice.
          </p>

          <p className="mt-6 text-muted text-lg leading-relaxed">
            Our team brings together creative minds, strategic thinkers, and technical experts who are passionate about helping brands grow. We don't just execute campaigns—we partner with you to understand your goals, challenges, and vision, then craft customized solutions that drive measurable results and sustainable growth.
          </p>

          <div className="mt-16">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-8 italic opacity-60">— Our Philosophy</h3>
            <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PHILOSOPHY.map((item, idx) => (
                <div
                  key={item}
                  className="p-6 rounded-2xl border border-border-color bg-secondary/30 backdrop-blur-sm group hover:border-highlight/30 transition-all duration-500"
                >
                  <span className="block text-[10px] font-black text-muted mb-4 group-hover:text-highlight transition-colors tracking-widest uppercase">0{idx + 1}</span>
                  <p className="font-display text-lg font-bold text-foreground group-hover:translate-x-1 transition-transform">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
