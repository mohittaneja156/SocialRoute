'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type LenisProviderProps = {
    children: ReactNode;
};

/**
 * LenisProvider: Initializes smooth scrolling and syncs it with GSAP ScrollTrigger.
 */
export function LenisProvider({ children }: LenisProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Force scroll to top on reload/mount
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth curve
            smoothWheel: true,
            wheelMultiplier: 1,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Ensure starting at 0 with a slight delay to beat browser scroll restoration
        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
            lenis.scrollTo(0, { immediate: true });
        }, 100);

        // Sync Lenis with ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        const raf = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(raf);
            clearTimeout(timer);
        };
    }, []);

    return <>{children}</>;
}
