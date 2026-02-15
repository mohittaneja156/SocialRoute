'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { prefersReducedMotion } from '@/lib/gsap';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

const SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/socialroute',
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/socialroute',
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@socialroute',
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  },
];

const SERVICES = [
  'Social Media Marketing',
  'Content Creation',
  'Brand Strategy',
  'Digital Advertising',
  'SEO Services',
  'Other',
];

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Map Component (Dynamic Import)
const MapWithNoSSR = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-secondary/50 animate-pulse" />,
});

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <SectionWrapper id="contact" layer={0} className="py-24 md:py-32 px-6 border-t border-border-color bg-gradient-to-b from-secondary/5 to-transparent" entranceY={48} entranceScale={0.98}>
      <section ref={sectionRef} className="max-w-7xl 2xl:max-w-[90rem] mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-highlight mb-4"
          >
            Let's Connect
          </motion.span>
          <h2 ref={titleRef} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-foreground">Get in </span><span className="text-animate-gradient">Touch</span><span className="text-highlight">.</span>
          </h2>
          <p className="mt-6 text-muted text-lg max-w-2xl mx-auto">
            Ready to elevate your digital presence? Let's discuss how we can help your brand grow.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Contact Form - Takes full width on mobile, 1 column on desktop */}
          <div className="flex flex-col h-full">
            <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="peer w-full px-6 py-4 rounded-2xl border-2 border-border-color bg-background text-foreground placeholder-transparent focus:outline-none focus:border-highlight transition-all"
                    placeholder="Your name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-6 -top-3 bg-background px-2 text-sm font-medium text-muted peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-muted peer-focus:-top-3 peer-focus:text-sm peer-focus:text-highlight transition-all"
                  >
                    Your name*
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="peer w-full px-6 py-4 rounded-2xl border-2 border-border-color bg-background text-foreground placeholder-transparent focus:outline-none focus:border-highlight transition-all"
                    placeholder="Email address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-6 -top-3 bg-background px-2 text-sm font-medium text-muted peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-muted peer-focus:-top-3 peer-focus:text-sm peer-focus:text-highlight transition-all"
                  >
                    Email address*
                  </label>
                </div>
              </div>

              {/* Phone and Service Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="peer w-full px-6 py-4 rounded-2xl border-2 border-border-color bg-background text-foreground placeholder-transparent focus:outline-none focus:border-highlight transition-all"
                    placeholder="Phone number"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-6 -top-3 bg-background px-2 text-sm font-medium text-muted peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-muted peer-focus:-top-3 peer-focus:text-sm peer-focus:text-highlight transition-all"
                  >
                    Phone number
                  </label>
                </div>

                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-border-color bg-background text-foreground focus:outline-none focus:border-highlight transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select a service*</option>
                    {SERVICES.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="relative flex-1">
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="peer w-full h-full min-h-[180px] px-6 py-4 rounded-2xl border-2 border-border-color bg-background text-foreground placeholder-transparent focus:outline-none focus:border-highlight transition-all resize-none"
                  placeholder="Your message"
                />
                <label
                  htmlFor="message"
                  className="absolute left-6 -top-3 bg-background px-2 text-sm font-medium text-muted peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-muted peer-focus:-top-3 peer-focus:text-sm peer-focus:text-highlight transition-all"
                >
                  Tell us about your project*
                </label>
              </div>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 text-center"
                >
                  ✓ Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-center"
                >
                  ✗ {errorMessage}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full px-12 py-5 bg-gradient-premium text-white font-bold text-lg rounded-2xl hover:opacity-95 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message →'}
              </motion.button>
            </form>
          </div>

          {/* Contact Info & Social - Takes 1 column */}
          <div className="flex flex-col gap-6">
            {/* Map */}
            <div className="relative h-[280px] lg:h-[320px] rounded-3xl overflow-hidden border-2 border-border-color bg-secondary/30 group">
              <MapWithNoSSR coords={[28.6441857, 77.1103125]} zoom={12} />
            </div>

            {/* Social Links */}
            <div className="p-8 rounded-3xl border-2 border-border-color bg-secondary/20 backdrop-blur-sm flex-1 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Follow Us
              </h3>
              <div className="flex flex-col gap-4">
                {SOCIAL.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-4 px-6 py-4 rounded-xl border border-border-color bg-background hover:border-highlight/50 transition-all"
                  >
                    <div className="text-muted group-hover:text-highlight transition-colors">
                      {item.icon}
                    </div>
                    <span className="font-medium text-foreground group-hover:text-highlight transition-colors flex-1">
                      {item.label}
                    </span>
                    <svg className="w-4 h-4 text-muted group-hover:text-highlight transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </SectionWrapper>
  );
}
