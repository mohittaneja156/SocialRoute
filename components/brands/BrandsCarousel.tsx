'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const BRANDS = [
    { id: 1, name: 'Brand 1', logo: '/1.png', link: '#' },
    { id: 2, name: 'Brand 2', logo: '/2.png', link: '#' },
    { id: 3, name: 'Brand 3', logo: '/3.png', link: '#' },
    { id: 4, name: 'Brand 4', logo: '/4.jpeg', link: '#' },
    { id: 5, name: 'Brand 5', logo: '/5.jpeg', link: '#' },
    { id: 6, name: 'Brand 6', logo: '/6.png', link: '#' },
];

/**
 * BrandsCarousel: Auto-scrolling carousel of brand logos/names
 */
export function BrandsCarousel() {
    // Duplicate for seamless loop
    const duplicated = [...BRANDS, ...BRANDS, ...BRANDS];

    return (
        <SectionWrapper
            layer={0}
            className="py-20 md:py-28 px-6 bg-secondary/10 border-y border-border-color overflow-hidden"
            entranceY={40}
            entranceScale={0.99}
        >
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4"
                >
                    Trusted by brands
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-muted text-center text-sm md:text-base mb-12 max-w-lg mx-auto"
                >
                    We partner with growing businesses across industries.
                </motion.p>

                {/* Auto-scrolling carousel */}
                <div className="relative -mx-6 md:-mx-8">
                    <motion.div
                        className="flex gap-8 md:gap-12 py-6"
                        animate={{
                            x: ["0%", "-33.333%"],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 30,
                                ease: "linear",
                            },
                        }}
                    >
                        {duplicated.map((brand, index) => (
                            <a
                                key={`${brand.id}-${index}`}
                                href={brand.link || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 flex items-center justify-center w-[140px] md:w-[160px] h-[72px] md:h-[80px] rounded-lg border border-border-color bg-secondary/60 overflow-hidden hover:bg-secondary/80 transition-all hover:scale-105 cursor-pointer"
                            >
                                {brand.logo && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className="w-full h-full object-contain p-2"
                                    />
                                )}
                            </a>
                        ))}
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}
