'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=J6%2F98+Rajouri+Garden+New+Delhi+110027+India';
const ADDRESS = 'J6/98, Rajouri Garden, New Delhi 110027, India';

const FooterMap3D = dynamic(() => import('./FooterMap3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[200px] sm:h-[240px] md:h-[320px] rounded-lg bg-secondary/80 border border-light/10 flex items-center justify-center">
      <span className="text-muted text-sm">Loading map…</span>
    </div>
  ),
});

/**
 * Footer: 3D map (desktop/tablet) or address card (mobile) + link to Google Maps, copyright, legal links.
 */
export function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 639px)');
    setIsMobile(mq.matches);
    const fn = () => setIsMobile(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  return (
    <footer className="pt-16 pb-8 px-6 border-t border-border-color bg-secondary/20">
      <div className="max-w-6xl 2xl:max-w-[85rem] mx-auto">
        {/* Map / Address Removed */}

        {/* Copyright + Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-border-color">
          <p className="text-muted text-sm text-center md:text-left">
            © 2026 Social Route. All Rights Reserved.
          </p>
          <nav className="flex gap-6" aria-label="Footer links">
            <motion.span whileHover={{ opacity: 0.8 }}>
              <Link href="/privacy" className="text-muted text-sm hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </motion.span>
            <motion.span whileHover={{ opacity: 0.8 }}>
              <Link href="/terms" className="text-muted text-sm hover:text-foreground transition-colors">
                Terms & Conditions
              </Link>
            </motion.span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
