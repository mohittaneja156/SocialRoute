'use client';

import { motion } from 'framer-motion';
import { IconArrowRight } from '@/components/ui/Icons';
import type { Project } from './workData';

type WorkCardProps = {
  project: Project;
  index: number;
  className?: string;
};

/**
 * WorkCard: Sophisticated Bento-style card.
 * Compact, high-contrast, and interactive.
 */
export function WorkCard({ project, index, className = '' }: WorkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.21, 1.11, 0.81, 0.99], delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`group relative overflow-hidden rounded-3xl border border-border-color bg-secondary shadow-xl cursor-default md:cursor-none pointer-events-auto active:scale-95 transition-transform duration-200 ${className}`}
    >
      {/* Imagery with subtle zoom */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={project.image}
          alt={project.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 md:opacity-60 md:group-hover:opacity-40 transition-opacity duration-500" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <div className="relative z-10">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-foreground/50 mb-2 px-2.5 py-1 border border-border-color rounded-full backdrop-blur-md bg-secondary/20">
            {project.category}
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight group-hover:text-highlight transition-colors duration-300">
            {project.title}
          </h3>

          {/* Subtle CTA reveal */}
          <div className="mt-4 flex items-center gap-3 overflow-hidden">
            <motion.div
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/80"
              initial={{ x: 0, opacity: 1 }}
              whileHover={{ x: 5 }}
            >
              <span>Explore</span>
              <IconArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Index */}
      <div className="absolute top-4 right-6 opacity-10 select-none">
        <span className="font-display text-4xl font-bold italic text-foreground pointer-events-none">
          {index + 1}
        </span>
      </div>
    </motion.div>
  );
}