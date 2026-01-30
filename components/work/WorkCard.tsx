'use client';

import { motion } from 'framer-motion';
import { IconArrowRight } from '@/components/ui/Icons';
import type { Project } from './workData';

type WorkCardProps = {
  project: Project;
  index: number;
  cardRef?: (el: HTMLAnchorElement | null) => void;
};

/**
 * WorkCard: Interactive project card with image, hover overlay (title, category, CTA).
 */
export function WorkCard({ project, index, cardRef }: WorkCardProps) {
  return (
    <motion.a
      ref={cardRef}
      href={project.link ?? '#work'}
      className="group relative flex-shrink-0 w-[320px] md:w-[380px] h-[220px] md:h-[260px] rounded-lg overflow-hidden border border-light/10 bg-secondary block"
      initial={false}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt={project.imageAlt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Gradient overlay – visible on hover, subtle at rest */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300"
        aria-hidden
      />
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 text-light">
        <span className="text-xs md:text-sm font-medium text-light/80 uppercase tracking-wider mb-1">
          {project.category}
        </span>
        <h3 className="font-display text-lg md:text-xl font-semibold mb-2 group-hover:underline underline-offset-2">
          {project.title}
        </h3>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-light/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View project
          <IconArrowRight />
        </span>
      </div>
    </motion.a>
  );
}
