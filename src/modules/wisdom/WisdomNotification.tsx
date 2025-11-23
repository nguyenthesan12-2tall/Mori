import React from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type WisdomCard } from './wisdomData';

interface WisdomNotificationProps {
    card: WisdomCard | null;
    onClose: () => void;
}

export const WisdomNotification: React.FC<WisdomNotificationProps> = ({ card, onClose }) => {
    if (!card) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl max-w-lg w-full p-1 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />

                <div className="p-8 relative z-10">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-amber-500/30">
                            <Sparkles className="w-8 h-8 text-amber-400" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">New Perspective Gained</h3>
                        <p className="text-amber-500/80 font-medium mb-8 uppercase tracking-widest text-xs">
                            Wisdom Unlocked
                        </p>

                        <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800 mb-8 w-full">
                            <p className="text-lg text-slate-200 italic font-serif mb-4">"{card.quote}"</p>
                            <p className="text-sm text-amber-500 font-medium">— {card.author}</p>
                        </div>

                        <div className="flex gap-3 w-full">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Keep Shopping
                            </button>
                            <Link
                                to="/wisdom"
                                className="flex-1 px-4 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20"
                            >
                                View in Archive
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
