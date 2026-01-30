/**
 * Centralized GSAP + ScrollTrigger config and section animation helpers.
 * All scroll-driven animations use scrub where appropriate; no instant transitions.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** Default scrub value for scroll-tied motion */
const DEFAULT_SCRUB = 1.2;

/** Easing: power4 for confident, editorial motion */
export const EASE_EDITORIAL = 'power4.out';
export const EASE_EDITORIAL_IN = 'power4.in';
export const EASE_EXPO = 'expo.out';

/**
 * Check if user prefers reduced motion (disable scrub/animations).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export type SectionEntranceOptions = {
  trigger: HTMLElement | null;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  /** Vertical translation (px) at start */
  y?: number;
  /** Scale at start */
  scale?: number;
  /** Clip-path inset at start (0 = revealed, 1 = fully clipped) */
  clipInset?: number;
  /** Opacity at start */
  opacity?: number;
  /** Stagger delay for children (selector) */
  staggerSelector?: string;
  staggerDelay?: number;
  /** Callback when section enters */
  onEnter?: () => void;
};

/**
 * Section entrance: vertical translation + scale + opacity (and optional clip-path).
 * Motion is tied to scroll (scrub) so it feels "pulled" by scroll.
 */
export function sectionEntrance(options: SectionEntranceOptions): ScrollTrigger | null {
  const {
    trigger,
    start = 'top 88%',
    end = 'top 30%',
    scrub = DEFAULT_SCRUB,
    y = 60,
    scale = 0.98,
    clipInset,
    opacity = 0,
    staggerSelector,
    staggerDelay = 0.06,
    onEnter,
  } = options;

  if (!trigger || prefersReducedMotion()) return null;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: typeof scrub === 'number' ? scrub : 1,
      onEnter,
    },
  });

  tl.fromTo(
    trigger,
    {
      opacity: opacity,
      y,
      scale,
      ...(clipInset != null && {
        clipPath: `inset(${clipInset * 100}% 0% 0% 0%)`,
      }),
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: EASE_EDITORIAL,
      ...(clipInset != null && { clipPath: 'inset(0% 0% 0% 0%)' }),
    }
  );

  if (staggerSelector) {
    const children = trigger.querySelectorAll(staggerSelector);
    gsap.fromTo(
      children,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: staggerDelay,
        ease: EASE_EDITORIAL,
        scrollTrigger: { trigger, start, end, scrub },
      }
    );
  }

  return tl.scrollTrigger ?? null;
}

/**
 * Parallax: move element at different rate than scroll (e.g. background).
 */
export function parallax(
  element: HTMLElement | null,
  options: { speed?: number; trigger?: HTMLElement; start?: string; end?: string } = {}
): gsap.core.Tween | null {
  if (!element || prefersReducedMotion()) return null;
  const { speed = 0.4, trigger = element, start = 'top bottom', end = 'bottom top' } = options;

  return gsap.to(element, {
    y: () => -(element.offsetHeight * speed),
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: 1,
    },
  });
}

/**
 * Create a ScrollTrigger that updates a ref with progress (0–1) over a range.
 * Used e.g. for hero 3D to react to scroll.
 */
export function scrollProgressRef(
  trigger: HTMLElement | null,
  onUpdate: (progress: number) => void,
  options: { start?: string; end?: string } = {}
): (() => void) | null {
  if (!trigger || prefersReducedMotion()) return null;
  const { start = 'top top', end = 'bottom top' } = options;

  const st = ScrollTrigger.create({
    trigger,
    start,
    end,
    scrub: 1,
    onUpdate: (self) => onUpdate(self.progress),
  });

  return () => st.kill();
}
