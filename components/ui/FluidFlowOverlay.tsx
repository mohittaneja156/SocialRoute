'use client';

import { useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

/**
 * FluidFlowOverlay - Polished & Interactive
 * 
 * Features:
 * 1. "Traveler Shape" moves down the page syncing with sections.
 * 2. Mouse Parallax: The shape gently floats away from the cursor.
 * 3. Premium Blends: Uses 'plus-lighter' for additive light mixing.
 * 4. Ultra-smooth Physics: Tuned spring damping for heavy, expensive feel.
 */
export function FluidFlowOverlay() {
    const { scrollYProgress } = useScroll();

    // Ultra-smooth scroll spring (Heavier physics)
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 40,
        restDelta: 0.001
    });

    // Mouse Parallax Setup
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse follow
    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse from -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            mouseX.set(x * 100); // Max parallax shift 100px
            mouseY.set(y * 100);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // --- COORDINATES (Vw/Vh) ---
    const top = useTransform(smoothProgress, [0, 0.3, 0.55, 0.85, 1], ['15%', '40%', '60%', '90%', '95%']);
    const left = useTransform(smoothProgress, [0, 0.3, 0.55, 0.85, 1], ['50%', '85%', '10%', '50%', '50%']);

    // --- MORPHING ---
    const borderRadius = useTransform(smoothProgress, [0, 0.3, 0.6, 1], ['50%', '30%', '50%', '10%']);
    const width = useTransform(smoothProgress, [0, 0.3, 0.55, 1], ['35vw', '18vw', '45vw', '8vw']);
    const height = useTransform(smoothProgress, [0, 0.3, 0.55, 1], ['35vw', '18vw', '45vw', '8vw']);
    const rotate = useTransform(smoothProgress, [0, 1], [0, 240]);

    // --- COLOR FLOW (Red -> Blue -> Violet) ---
    const background = useTransform(smoothProgress,
        [0, 0.4, 0.7, 1],
        [
            'radial-gradient(circle at 30% 30%, rgba(255, 60, 60, 0.4), rgba(255, 60, 60, 0) 65%)', // Vivid Red
            'radial-gradient(circle at 70% 70%, rgba(60, 130, 255, 0.4), rgba(60, 130, 255, 0) 65%)', // Bright Blue
            'radial-gradient(circle at 50% 50%, rgba(160, 100, 255, 0.5), rgba(160, 100, 255, 0) 65%)', // Violet
            'radial-gradient(circle at 30% 30%, rgba(255, 60, 60, 0.4), rgba(255, 60, 60, 0) 65%)'  // Red Loop
        ]
    );

    // Blur strategy: Less blur = more "solid" feel, More blur = "glow"
    const filter = useTransform(smoothProgress, [0, 0.5, 1], ['blur(70px)', 'blur(50px)', 'blur(90px)']);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Primary Traveler Shape */}
            <motion.div
                style={{
                    top,
                    left,
                    width,
                    height,
                    borderRadius,
                    background,
                    rotate,
                    filter,
                    // Combine centered position with parallax offset
                    x: useTransform(smoothMouseX, (val) => `calc(-50% + ${val * -1}px)`),
                    y: useTransform(smoothMouseY, (val) => `calc(-50% + ${val * -1}px)`),
                }}
                className="absolute mix-blend-plus-lighter opacity-80"
            />

            {/* Secondary Detail/Highlight Layer for "Professional" Complexity */}
            {/* Moves opposite to mouse for depth */}
            <motion.div
                style={{
                    top: useTransform(smoothProgress, [0, 1], ['20%', '80%']),
                    left: useTransform(smoothProgress, [0, 1], ['45%', '55%']),
                    opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.1, 0.4, 0.1]),
                    scale: useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]),
                    x: useTransform(smoothMouseX, (val) => `calc(-50% + ${val * 0.5}px)`),
                    y: useTransform(smoothMouseY, (val) => `calc(-50% + ${val * 0.5}px)`),
                }}
                className="absolute w-[25vw] h-[25vw] bg-white/5 rounded-full blur-[80px] mix-blend-overlay"
            />
        </div>
    );
}
