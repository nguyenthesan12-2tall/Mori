import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Users, Zap } from 'lucide-react';

export const MysteryCounter = () => {
    const [count, setCount] = useState<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Using a free counter API to track visits
        // We use a unique namespace for this project
        const NAMESPACE = 'time-project-mori-v1';
        const KEY = 'visits';

        fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`)
            .then(res => res.json())
            .then(data => setCount(data.value))
            .catch(err => {
                console.error("Counter error:", err);
                // Fallback for demo if API fails
                setCount(1);
            });
    }, []);

    return (
        <motion.div
            className="fixed bottom-6 left-6 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative group cursor-pointer">
                {/* Glowing Orb / Container */}
                <div className={`
          flex items-center gap-3 px-4 py-2 rounded-full
          bg-black/60 backdrop-blur-xl border border-cyan-500/30
          shadow-[0_0_20px_rgba(6,182,212,0.2)]
          transition-all duration-500
          ${isHovered ? 'shadow-[0_0_30px_rgba(6,182,212,0.4)] border-cyan-500/60 pr-6' : ''}
        `}>

                    {/* Icon that changes */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-cyan-500 blur-md opacity-50 animate-pulse" />
                        <Eye className={`w-4 h-4 text-cyan-400 relative z-10 transition-transform duration-500 ${isHovered ? 'scale-0 opacity-0' : 'scale-100'}`} />
                        <Users className={`w-4 h-4 text-cyan-400 absolute top-0 left-0 z-10 transition-transform duration-500 ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-500/70 font-bold leading-none mb-0.5">
                            {isHovered ? 'Timeline Sync' : 'Status'}
                        </span>
                        <div className="h-4 overflow-hidden relative">
                            <AnimatePresence mode='wait'>
                                {!isHovered ? (
                                    <motion.span
                                        key="label"
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -10, opacity: 0 }}
                                        className="text-xs font-mono text-cyan-100 block"
                                    >
                                        MONITORING
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="count"
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -10, opacity: 0 }}
                                        className="text-xs font-mono text-cyan-300 block font-bold"
                                    >
                                        {count !== null ? `${count.toLocaleString()} ENTITIES` : 'CONNECTING...'}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Decorative lines */}
                <div className="absolute -inset-1 border border-cyan-500/10 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
            </div>
        </motion.div>
    );
};
