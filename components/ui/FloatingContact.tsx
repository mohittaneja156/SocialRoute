'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FloatingContact: A 3D-ish, glassmorphic FAB that pops out a contact form.
 * Features ultra-smooth Framer Motion physics and premium aesthetics.
 */
export function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate submission
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                setIsOpen(false);
                setStatus('idle');
            }, 2000);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-4 pointer-events-none">
            {/* Pop-over Form */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
                        className="w-[calc(100vw-3rem)] sm:w-[380px] p-6 rounded-[2rem] border border-border-color bg-secondary/80 backdrop-blur-2xl shadow-2xl pointer-events-auto overflow-hidden relative group"
                    >
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-display text-xl font-bold text-foreground">Quick Message</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
                                >
                                    <span className="text-muted text-lg">×</span>
                                </button>
                            </div>

                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-12 text-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-highlight/10 flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="font-display font-bold text-foreground">Message Sent!</p>
                                    <p className="text-muted text-sm mt-1">We'll get back to you soon.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full px-4 py-3 rounded-xl border border-border-color bg-secondary/50 focus:outline-none focus:border-highlight/50 transition-colors text-foreground text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Email</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="hello@world.com"
                                            className="w-full px-4 py-3 rounded-xl border border-border-color bg-secondary/50 focus:outline-none focus:border-highlight/50 transition-colors text-foreground text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">How can we help?</label>
                                        <textarea
                                            required
                                            rows={3}
                                            placeholder="Tell us about your project"
                                            className="w-full px-4 py-3 rounded-xl border border-border-color bg-secondary/50 focus:outline-none focus:border-highlight/50 transition-colors text-foreground text-sm resize-none"
                                        />
                                    </div>
                                    <button
                                        disabled={status === 'submitting'}
                                        type="submit"
                                        className="w-full py-4 bg-highlight text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 mt-4 shadow-lg shadow-highlight/20"
                                    >
                                        {status === 'submitting' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Subtle Background Glow */}
                        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-highlight/10 blur-[60px] rounded-full pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                animate={{
                    y: [0, -10, 0],
                    rotate: isOpen ? 45 : 0
                }}
                transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 0.3 }
                }}
                whileHover={{ scale: 1.1, y: -15 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-full border border-border-color dark:border-highlight/30 bg-secondary/60 dark:bg-secondary/40 backdrop-blur-xl shadow-2xl pointer-events-auto group relative overflow-hidden transition-colors"
            >
                <div className="relative z-10">
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.span
                                key="close"
                                initial={{ opacity: 0, rotate: -45 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 45 }}
                                className="text-3xl text-foreground font-light"
                            >
                                +
                            </motion.span>
                        ) : (
                            <motion.div
                                key="chat"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="relative"
                            >
                                <svg className="w-7 h-7 md:w-8 md:h-8 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 012 2v2a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                {/* Active indicator */}
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-highlight rounded-full border-2 border-secondary animate-pulse" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Glassy reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* 3D-ish highlight */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            </motion.button>
        </div>
    );
}
