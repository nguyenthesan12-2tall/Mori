import React, { useState } from 'react';
import { type WisdomCard as IWisdomCard } from './wisdomData';
import { Sparkles, Quote, ArrowRight } from 'lucide-react';

interface WisdomCardProps {
    card: IWisdomCard;
}

export const WisdomCard: React.FC<WisdomCardProps> = ({ card }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative h-80 w-full perspective-1000 group cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`relative w-full h-full transition-all duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden rounded-2xl p-6 bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full -mr-8 -mt-8" />

                    <div className="flex justify-between items-start">
                        <Quote className="w-8 h-8 text-amber-500/40" />
                        <span className="text-xs font-mono text-amber-500/60 border border-amber-500/20 px-2 py-1 rounded-full">
                            {card.category}
                        </span>
                    </div>

                    <div className="relative z-10">
                        <p className="text-xl md:text-2xl font-serif text-slate-200 leading-relaxed italic">
                            "{card.quote}"
                        </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                        <span className="font-medium text-amber-500">{card.author}</span>
                        <Sparkles className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
                    </div>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl p-6 bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)] flex flex-col justify-center items-center text-center">
                    <h4 className="text-amber-500 font-bold tracking-widest text-sm uppercase mb-4">Actionable Wisdom</h4>

                    <p className="text-lg text-white font-medium leading-relaxed mb-6">
                        {card.action}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>Apply this today</span>
                        <ArrowRight className="w-3 h-3" />
                    </div>
                </div>
            </div>
        </div>
    );
};
