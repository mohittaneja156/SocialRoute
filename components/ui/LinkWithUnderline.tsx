'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type LinkWithUnderlineProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * LinkWithUnderline: Underline reveal on hover. Premium, restrained.
 */
export function LinkWithUnderline({ href, children, className = '' }: LinkWithUnderlineProps) {
  return (
    <Link href={href} className={`relative inline-block py-2 px-4 rounded-sm ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute bottom-2 left-4 right-4 h-px bg-current origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      />
    </Link>
  );
}
