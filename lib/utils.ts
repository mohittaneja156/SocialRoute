import { type ClassValue, clsx } from 'clsx';

/**
 * Merge class names with tailwind-merge pattern (using clsx for simplicity).
 * Use for conditional classes on components.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Check if user prefers reduced motion (for disabling heavy animations) */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
