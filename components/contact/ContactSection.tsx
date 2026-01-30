'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { prefersReducedMotion } from '@/lib/gsap';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

const LINKS = [
  { label: 'Phone', href: 'tel:+918810543765', value: '+91-8810543765' },
  { label: 'Email', href: 'mailto:info@socialroute.in', value: 'info@socialroute.in' },
  { label: 'Website', href: 'https://www.socialroute.in', value: 'www.socialroute.in', external: true },
];

const SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com/socialroute', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/socialroute', external: true },
  { label: 'YouTube', href: 'https://youtube.com/@socialroute', external: true },
];

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Map Component (Dynamic Import)
const MapWithNoSSR = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-secondary/50 animate-pulse" />,
});

const DELHI_COORDS: [number, number] = [28.6139, 77.2090];


export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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
    <SectionWrapper id="contact" layer={0} className="py-24 md:py-32 px-6 border-t border-white/5" entranceY={48} entranceScale={0.98}>
      <section ref={sectionRef} className="max-w-6xl mx-auto">
        <h2 ref={titleRef} className="font-display text-3xl md:text-5xl font-bold text-light text-center mb-16">
          Get in Touch
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Contact Info</h3>
              {LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="block group p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="text-muted text-sm block mb-1">{item.label}</span>
                  <span className="text-light font-medium text-lg group-hover:text-white transition-colors">{item.value}</span>
                </a>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Socials</h3>
              <div className="flex flex-wrap gap-4">
                {SOCIAL.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-light text-sm font-medium hover:bg-white hover:text-black transition-all"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Map & Address Column */}
          <div className="space-y-8">
            <div className="relative h-[400px] rounded-sm overflow-hidden border border-light/10 bg-secondary/30">
              {/* Centered on India, Zoomed out */}
              <MapWithNoSSR coords={[22.5937, 78.9629]} zoom={4} />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary/80 via-transparent to-transparent z-[400]" />
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-white mb-2">Social Route HQ</h3>
              <p className="text-muted text-lg leading-relaxed">
                Sector 4, Vaishali<br />
                Ghaziabad, Uttar Pradesh 201010<br />
                India
              </p>
            </div>
          </div>

        </div>
      </section>
    </SectionWrapper>
  );
}
