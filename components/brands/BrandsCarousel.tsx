'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const BRANDS = [
    { id: 1, name: 'Brand One' },
    { id: 2, name: 'Brand Two' },
    { id: 3, name: 'Brand Three' },
    { id: 4, name: 'Brand Four' },
    { id: 5, name: 'Brand Five' },
    { id: 6, name: 'Brand Six' },
    { id: 7, name: 'Brand Seven' },
    { id: 8, name: 'Brand Eight' },
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
                            x: [0, -1 * (BRANDS.length * 172)], // 160px width + 12px gap
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
                            <div
                                key={`${brand.id}-${index}`}
                                className="flex-shrink-0 flex items-center justify-center w-[140px] md:w-[160px] h-[72px] md:h-[80px] rounded-lg border border-border-color bg-secondary/60 px-4"
                            >
                                <span className="font-display font-semibold text-foreground/80 text-sm md:text-base text-center truncate max-w-full">
                                    {brand.name}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}
