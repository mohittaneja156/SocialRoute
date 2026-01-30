'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ImmersiveBackground - Leo9 Inspired
 * A fluid, shape-shifting background that flows through the page.
 * Colors: Red -> Violet -> Blue flow.
 * It moves behind content ("merges") and changes shape/color based on scroll position.
 */
export function ImmersiveBackground() {
    const { scrollYProgress } = useScroll();

    // Smooth out the scroll progress for fluid movement
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // 1. Vertical Movement (Flow): Moves the blob down as we scroll, but slightly faster/slower for parallax
    // We want it to "visit" sections.
    // 0% (Hero): Top
    // 50% (Process): Middle
    // 100% (Contact): Bottom
    const y = useTransform(smoothProgress, [0, 1], ['0vh', '90vh']);

    // 2. Horizontal Movement (Weaving): Weaves left and right
    const x = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], ['50vw', '80vw', '20vw', '70vw', '50vw']);

    // 3. Size Morphing: Expands at key sections (like Process) to "merge" into the background
    const scale = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [1, 1.5, 2.5, 1.5, 1]);

    // 4. Color Transitions: Red -> Violet -> Blue -> Red
    const background = useTransform(
        smoothProgress,
        [0, 0.33, 0.66, 1],
        [
            'radial-gradient(circle closest-side, rgba(239, 68, 68, 0.15), transparent 80%)', // Red
            'radial-gradient(circle closest-side, rgba(139, 92, 246, 0.15), transparent 80%)', // Violet
            'radial-gradient(circle closest-side, rgba(59, 130, 246, 0.15), transparent 80%)', // Blue
            'radial-gradient(circle closest-side, rgba(239, 68, 68, 0.15), transparent 80%)'  // Back to Red
        ]
    );

    // Secondary blob for more complexity
    const y2 = useTransform(smoothProgress, [0, 1], ['0vh', '80vh']);
    const x2 = useTransform(smoothProgress, [0, 0.5, 1], ['20vw', '80vw', '20vw']);
    const bg2 = useTransform(smoothProgress, [0, 0.5, 1], [
        'radial-gradient(circle closest-side, rgba(59, 130, 246, 0.1), transparent 80%)', // Blue
        'radial-gradient(circle closest-side, rgba(239, 68, 68, 0.1), transparent 80%)', // Red
        'radial-gradient(circle closest-side, rgba(139, 92, 246, 0.1), transparent 80%)' // Violet
    ]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-primary">
            {/* Main Flowing Shape */}
            <motion.div
                style={{
                    top: y,
                    left: x,
                    scale: scale,
                    background: background,
                    x: '-50%', // Center on the coordinate
                    y: '-50%'
                }}
                className="absolute w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full mix-blend-screen blur-[80px] md:blur-[120px]"
            />

            {/* Secondary Shape (Counter-flow) */}
            <motion.div
                style={{
                    top: y2,
                    left: x2,
                    background: bg2,
                    x: '-50%',
                    y: '-50%'
                }}
                className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full mix-blend-screen blur-[60px] md:blur-[100px] opacity-70"
            />

            {/* Noise Texture (CSS-only, no image file needed) */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
