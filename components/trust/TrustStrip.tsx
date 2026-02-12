'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import Image from 'next/image';

const ITEMS = [
  {
    label: 'Trusted by growing brands',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    description: 'Partnering with ambitious teams to deliver excellence.'
  },
  {
    label: 'Results-focused marketing',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    description: 'Strategies driven by data and focused on ROI.'
  },
  {
    label: 'In-house creative team',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    description: 'Expert designers and storytellers under one roof.'
  },
  {
    label: 'Transparent & collaborative',
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800',
    description: 'Seamless communication and clear project visibility.'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
    }
  },
};

/**
 * TrustStrip: Premium section with animated abstract visuals and Ken Burns effects.
 */
export function TrustStrip() {
  return (
    <SectionWrapper
      layer={0}
      className="py-24 md:py-32 px-6 border-y border-border-color bg-secondary/5"
      entranceY={0}
      entranceScale={1}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Animated Photograph (Ken Burns Effect) */}
              <motion.div
                className="absolute inset-0 z-0"
                whileHover={{ scale: 1.15, transition: { duration: 8, ease: "linear" } }}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-10">
                <div className="relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-background/20 backdrop-blur-xl -m-10 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-highlight/20 text-highlight text-[10px] font-bold uppercase tracking-widest mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      Phase 0{i + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-highlight transition-colors duration-300 leading-tight">
                      {item.label}
                    </h3>
                    <p className="mt-4 text-sm md:text-base text-white/70 leading-relaxed max-h-0 group-hover:max-h-24 opacity-0 group-hover:opacity-100 transition-all duration-700 overflow-hidden">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Decorative glowing line */}
                <div className="mt-6 h-1 w-12 bg-highlight/50 group-hover:w-full group-hover:bg-highlight transition-all duration-500 rounded-full" />
              </div>

              {/* Parallax depth effect (subtle) */}
              <div className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
