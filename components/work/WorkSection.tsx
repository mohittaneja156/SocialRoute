'use client';

import { useRef } from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { WorkCard } from './WorkCard';
import { PROJECTS } from './workData';

/**
 * WorkSection: Sophisticated Bento Grid layout for projects.
 * Compact, high-end, and perfectly responsive.
 */
export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Define custom classes for the bento grid items to create visual interest
  const getBentoClasses = (idx: number) => {
    switch (idx) {
      case 0: return 'md:col-span-8 md:h-[500px] h-[350px]';
      case 1: return 'md:col-span-4 md:h-[500px] h-[350px]';
      case 2: return 'md:col-span-5 md:h-[400px] h-[350px]';
      case 3: return 'md:col-span-7 md:h-[400px] h-[350px]';
      case 4: return 'md:col-span-6 md:h-[450px] h-[350px]';
      case 5: return 'md:col-span-6 md:h-[450px] h-[350px]';
      default: return 'md:col-span-6 md:h-[400px] h-[350px]';
    }
  };

  return (
    <SectionWrapper
      id="work"
      layer={1}
      className="relative bg-transparent py-24 md:py-32 px-4 md:px-8 lg:px-12"
    >
      <section ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Section Header - Focused and Professional */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6">
              Selected Work<span className="text-highlight">.</span>
            </h2>
            <p className="text-muted text-sm md:text-lg uppercase tracking-[0.2em] font-bold">
              Defining digital excellence through craft and strategy.
            </p>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center gap-4 text-muted/30 text-[10px] font-black uppercase tracking-widest border-t border-border-color pt-4">
              <span>Scroll to explore projects</span>
              <div className="w-12 h-px bg-border-color" />
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {PROJECTS.map((project, i) => (
            <WorkCard
              key={project.id}
              project={project}
              index={i}
              className={getBentoClasses(i)}
            />
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}