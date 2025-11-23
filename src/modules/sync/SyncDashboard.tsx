import React, { useState } from 'react';
import { TacticsView } from './TacticsView';
import { LifeGridView } from './LifeGridView';
import { LayoutGrid, Target } from 'lucide-react';

export const SyncDashboard = () => {
    const [view, setView] = useState<'tactics' | 'perspective'>('tactics');

    return (
        <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header & Toggle */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            LifeSync
                        </h1>
                        <p className="text-slate-400 mt-1">
                            Align your daily actions with your life's timeline.
                        </p>
                    </div>

                    <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex">
                        <button
                            onClick={() => setView('tactics')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'tactics'
                                    ? 'bg-slate-800 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            <Target className="w-4 h-4" />
                            Today's Tactics
                        </button>
                        <button
                            onClick={() => setView('perspective')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'perspective'
                                    ? 'bg-slate-800 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                            Life Perspective
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[600px]">
                    {view === 'tactics' ? <TacticsView /> : <LifeGridView />}
                </div>
            </div>
        </div>
    );
};
