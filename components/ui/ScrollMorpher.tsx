'use client';

import { useScroll, useTransform, motion } from 'framer-motion';

/**
 * ScrollMorpher
 * "Three dots turn to different shapes" animation based on scroll.
 * Fixed at the bottom right/left as a scroll progress indicator.
 */
export function ScrollMorpher() {
    const { scrollYProgress } = useScroll();

    // Map scroll progress to shape properties
    // 0-0.3: Circle -> Square
    // 0.3-0.6: Square -> Triangle (via borderRadius and clipPath?)
    // Let's stick to safe CSS borderRadius morphs for simplicity and performance.

    // Border Radius Morph
    const borderRadius = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        ["50%", "10%", "50%", "0%", "50%"] // Circle -> Rounded Square -> Circle -> Square -> Circle
    );

    // Rotation
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    // Color Morph
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["#ffffff", "#6366f1", "#ffffff"] // White -> Indigo -> White
    );

    // Dots
    // We can have 3 dots that merge into one shape?
    // Let's implement the single morphing shape acting as a "cursor/guide".

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2 mix-blend-difference pointer-events-none">
            <span className="text-[10px] font-mono text-white/50 mb-2">SCROLL</span>
            <motion.div
                style={{ borderRadius, rotate, backgroundColor }}
                className="w-8 h-8 opacity-80 backdrop-blur-md"
            />
            {/* Trail dots */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                className="absolute top-12 w-1.5 h-1.5 bg-white rounded-full anim-pulse"
            />
        </div>
    );
}
