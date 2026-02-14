'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FloatingContact: A 3D-ish, glassmorphic FAB that pops out a contact form.
 * Features ultra-smooth Framer Motion physics and premium aesthetics.
 */
export function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        const formData = {
            name: nameRef.current?.value || '',
            email: emailRef.current?.value || '',
            phone: '',
            service: '',
            message: messageRef.current?.value || '',
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                // Reset form
                if (nameRef.current) nameRef.current.value = '';
                if (emailRef.current) emailRef.current.value = '';
                if (messageRef.current) messageRef.current.value = '';

                setTimeout(() => {
                    setIsOpen(false);
                    setStatus('idle');
                }, 2000);
            } else {
                setStatus('error');
                setErrorMessage(result.message || 'Failed to send message');
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Network error. Please try again.');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-3 pointer-events-none">
            {/* Pop-over Form */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
                        className="w-[calc(100vw-2rem)] sm:w-[380px] p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border-2 border-blue-400/60 dark:border-blue-400/50 bg-gradient-to-br from-white/95 via-blue-50/90 to-purple-50/90 dark:from-slate-700 dark:via-gray-700 dark:to-slate-600 backdrop-blur-3xl shadow-[0_0_40px_rgba(59,130,246,0.3)] dark:shadow-[0_0_60px_rgba(96,165,250,0.4)] pointer-events-auto overflow-hidden relative group"
                        style={{
                            backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)'
                        }}
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
                                            ref={nameRef}
                                            required
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full px-4 py-3 rounded-xl border border-border-color bg-white dark:bg-gray-800 focus:outline-none focus:border-highlight/50 transition-colors text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Email</label>
                                        <input
                                            ref={emailRef}
                                            required
                                            type="email"
                                            placeholder="hello@world.com"
                                            className="w-full px-4 py-3 rounded-xl border border-border-color bg-white dark:bg-gray-800 focus:outline-none focus:border-highlight/50 transition-colors text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">How can we help?</label>
                                        <textarea
                                            ref={messageRef}
                                            required
                                            rows={3}
                                            placeholder="Tell us about your project"
                                            className="w-full px-4 py-3 rounded-xl border border-border-color bg-white dark:bg-gray-800 focus:outline-none focus:border-highlight/50 transition-colors text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm resize-none"
                                        />
                                    </div>
                                    {status === 'error' && (
                                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm text-center">
                                            {errorMessage}
                                        </div>
                                    )}
                                    <button
                                        disabled={status === 'submitting'}
                                        type="submit"
                                        className="w-full py-4 bg-gradient-premium text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 mt-4 shadow-lg shadow-blue-500/30"
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
                    y: [0, -8, 0],
                }}
                transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={{ scale: 1.1, y: -12 }}
                whileTap={{ scale: 0.95 }}
                className="group pointer-events-auto relative w-14 h-14 md:w-20 md:h-20"
                style={{ perspective: '1000px' }}
            >
                {/* Main 3D Button */}
                <div
                    className="w-full h-full rounded-full bg-gradient-premium relative overflow-hidden transition-all duration-300"
                    style={{
                        transformStyle: 'preserve-3d',
                        boxShadow: '0 10px 40px -10px rgba(59, 130, 246, 0.6), 0 0 0 1px rgba(255,255,255,0.1) inset'
                    }}
                >
                    {/* Top highlight for 3D effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-full"
                        style={{ transform: 'translateZ(1px)' }} />

                    {/* Bottom shadow for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-full" />

                    {/* Icon Container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.span
                                    key="close"
                                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                    transition={{ duration: 0.3, ease: "backOut" }}
                                    className="text-3xl md:text-4xl text-white font-light"
                                >
                                    ×
                                </motion.span>
                            ) : (
                                <motion.div
                                    key="message"
                                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                                    transition={{ duration: 0.3, ease: "backOut" }}
                                >
                                    <svg className="w-7 h-7 md:w-9 md:h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Pulse ring on hover */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white/50"
                        initial={{ scale: 1, opacity: 0 }}
                        whileHover={{ scale: 1.3, opacity: 0 }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                    />
                </div>

                {/* Active indicator dot */}
                {!isOpen && (
                    <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-blue-600"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}
            </motion.button>
        </div >
    );
}
