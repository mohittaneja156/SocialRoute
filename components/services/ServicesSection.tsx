'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SERVICES, ServiceDetail } from '@/data/servicesData';
import { IconArrowRight, IconCheck } from '@/components/ui/Icons';

/**
 * ServiceModal: Immersive detail view for a specific service.
 */
function ServiceModal({ service, onClose }: { service: ServiceDetail; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl cursor-default"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        className="relative w-full max-w-4xl bg-secondary border border-border-color rounded-[2rem] overflow-hidden p-8 md:p-16 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-light/40 hover:text-highlight transition-colors p-2"
        >
          <span className="text-2xl font-display uppercase tracking-widest text-xs font-bold">Close</span>
        </button>

        <div className="max-w-3xl">
          <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-highlight mb-6">
            Service Details
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-tighter">
            {service.title}
          </h2>

          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-4">Description</h3>
              <p className="text-foreground/80 text-lg md:text-xl leading-relaxed font-medium">
                {service.description}
              </p>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-4">Goals & Objectives</h3>
              <ul className="space-y-4">
                {service.goals.map((goal, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-foreground/70 group">
                    <IconCheck className="w-5 h-5 text-highlight flex-shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * ServiceCard: Interactive bento-style card.
 */
function ServiceCard({ service, index, onClick }: { service: ServiceDetail; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className={`group relative p-8 rounded-[1.5rem] border border-white/5 bg-secondary/30 overflow-hidden cursor-none spotlight-glow transition-all hover:bg-secondary/40 hover:border-highlight/30 flex flex-col justify-between h-full min-h-[320px]`}
    >
      <div>
        <div className="w-12 h-12 rounded-full bg-gradient-premium flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-blue-500/20">
          <span className="font-display text-xl font-bold text-white">0{index + 1}</span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-highlight transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-muted text-sm md:text-base line-clamp-3 leading-relaxed">
          {service.description}
        </p>
      </div>

      <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted group-hover:text-foreground transition-colors duration-300">
        <span>Learn More</span>
        <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>

      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-highlight/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-highlight/10 transition-all duration-500" />
    </motion.div>
  );
}

/**
 * ServicesSection: Main container for the 6 core services.
 */
export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <SectionWrapper id="services" layer={1} className="py-24 md:py-32 px-6 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-highlight mb-4">
            Our Expertise
          </span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tighter">
            Elevating Brands<span className="text-highlight">.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>

      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-highlight/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />
    </SectionWrapper>
  );
}
