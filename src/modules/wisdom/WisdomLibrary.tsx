
import { Link } from 'react-router-dom';
import { ArrowLeft, Scroll, Lock } from 'lucide-react';
import { useWisdom } from './useWisdom';
import { WisdomCard } from './WisdomCard';

export const WisdomLibrary = () => {
    const { unlockedCards, totalCards, isMasterOfTime } = useWisdom();

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <Link to="/" className="flex items-center text-slate-400 hover:text-white transition-colors group mb-4">
                            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Hub
                        </Link>
                        <h1 className="text-4xl font-bold font-serif tracking-tight text-amber-100">
                            The Wisdom Archive
                        </h1>
                        <p className="text-amber-500/60 mt-2">
                            Timeless knowledge purchased with your life's most valuable currency.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <Scroll className="w-5 h-5 text-amber-500" />
                        <div className="text-sm">
                            <span className="text-slate-400">Collected: </span>
                            <span className="font-bold text-white">{unlockedCards.length}</span>
                            <span className="text-slate-600"> / {totalCards}</span>
                        </div>
                    </div>
                </header>

                {/* Grid */}
                {unlockedCards.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
                        <Lock className="w-16 h-16 text-slate-700 mb-6" />
                        <h3 className="text-xl font-semibold text-slate-300 mb-2">The Archive is Empty</h3>
                        <p className="text-slate-500 max-w-md mb-8">
                            You have not yet exchanged your time for wisdom. Visit the TimeStore to unlock your first capsule.
                        </p>
                        <Link
                            to="/bank"
                            className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-amber-900/20"
                        >
                            Go to TimeStore
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {unlockedCards.map(card => (
                            <WisdomCard key={card.id} card={card} />
                        ))}
                    </div>
                )}

                {isMasterOfTime && (
                    <div className="mt-16 p-8 bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-2xl border border-amber-500/20 text-center">
                        <h3 className="text-2xl font-bold text-amber-200 mb-2">You are a Master of Time</h3>
                        <p className="text-slate-400">You have collected all available wisdom. Now, go forth and live it.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
