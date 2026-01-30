'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { IconCheck, IconTarget, IconUsers, IconRocket, IconChart } from '@/components/ui/Icons';

const STEPS = [
    { id: '01', title: 'DISCOVER', desc: 'We dive deep into your brand goals, audience, and market landscape.', icon: IconTarget },
    { id: '02', title: 'PLAN', desc: 'Crafting a data-driven strategy and content roadmap tailored for growth.', icon: IconChart },
    { id: '03', title: 'CREATE', desc: 'Producing high-impact visuals, videos, and copy that resonate.', icon: IconUsers },
    { id: '04', title: 'LAUNCH', desc: 'Executing campaigns with precision across all digital channels.', icon: IconRocket },
    { id: '05', title: 'GROW', desc: 'Analyzing performance and optimizing for maximum ROI.', icon: IconCheck },
];

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            className="relative group"
        >
            {/* Connector Line */}
            {index !== STEPS.length - 1 && (
                <div className="absolute top-16 left-8 w-0.5 h-32 bg-white/10 hidden md:block" />
            )}

            <div className="flex gap-6 md:gap-10 items-start">
                {/* Icon / Number Circle */}
                <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500 shadow-2xl glass-panel">
                        <step.icon />
                    </div>
                    <span className="absolute -top-2 -right-2 text-xs font-mono font-bold text-muted bg-secondary px-2 py-0.5 rounded-full border border-white/5">
                        {step.id}
                    </span>
                </div>

                {/* Content Card */}
                <div className="flex-1 pt-2">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                        {step.title}
                    </h3>
                    <p className="text-lg text-muted leading-relaxed max-w-lg">
                        {step.desc}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export function Process2DSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax Text Effect
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <SectionWrapper id="process" layer={0} className="py-24 md:py-32 px-6 border-t border-white/5 bg-secondary/20">
            <section ref={containerRef} className="max-w-5xl mx-auto">

                {/* Header */}
                <motion.div
                    style={{ opacity, y }}
                    className="text-center mb-20 md:mb-32"
                >
                    <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-6 tracking-tight">
                        Our Process
                    </h2>
                    <p className="text-xl text-muted max-w-2xl mx-auto">
                        From concept to scale, we handle every step of your digital journey with precision.
                    </p>
                </motion.div>

                {/* Steps Container */}
                <div className="space-y-16 md:space-y-24 relative pl-4 md:pl-10">
                    {/* continuous line background hint */}
                    <div className="absolute top-8 left-[1.95rem] md:left-[4.45rem] bottom-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent hidden md:block" />

                    {STEPS.map((step, i) => (
                        <StepCard key={step.id} step={step} index={i} />
                    ))}
                </div>

            </section>
        </SectionWrapper>
    );
}
