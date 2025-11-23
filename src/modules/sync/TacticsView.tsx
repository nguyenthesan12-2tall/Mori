import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimeBank } from '../../context/TimeContext';
import { Battery, BatteryCharging, ShoppingBag, ArrowRight, Zap } from 'lucide-react';

export const TacticsView = () => {
    const { balance, transactions } = useTimeBank();
    const navigate = useNavigate();

    // Calculate daily focus minutes from 'earn' transactions today
    const today = new Date().setHours(0, 0, 0, 0);
    const dailyFocusMinutes = transactions
        .filter(t => t.type === 'earn' && t.timestamp >= today)
        .reduce((acc, curr) => acc + curr.amount, 0);

    // Daily goal (e.g., 4 hours = 240 minutes)
    const dailyGoal = 240;
    const progressPercentage = Math.min((dailyFocusMinutes / dailyGoal) * 100, 100);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Status Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Energy Status */}
                <div className={`p-6 rounded-2xl border ${balance < 30
                        ? 'bg-red-500/10 border-red-500/30'
                        : balance > 60
                            ? 'bg-emerald-500/10 border-emerald-500/30'
                            : 'bg-slate-800/50 border-slate-700'
                    } transition-colors`}>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                {balance < 30 ? <Battery className="text-red-400" /> : <BatteryCharging className="text-emerald-400" />}
                                Current Energy
                            </h3>
                            <p className="text-slate-400 text-sm mt-1">Time Credits Balance</p>
                        </div>
                        <span className={`text-3xl font-bold ${balance < 30 ? 'text-red-400' : balance > 60 ? 'text-emerald-400' : 'text-white'
                            }`}>
                            {balance}
                        </span>
                    </div>

                    {balance < 30 ? (
                        <div className="space-y-3">
                            <p className="text-red-200/80 text-sm">
                                ⚠️ Low Energy. You need to recharge your focus credits.
                            </p>
                            <button
                                onClick={() => navigate('/focus')}
                                className="w-full py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg border border-red-500/30 transition-all flex items-center justify-center gap-2 group"
                            >
                                <Zap className="w-4 h-4" />
                                Go to FocusFlow
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ) : balance > 60 ? (
                        <div className="space-y-3">
                            <p className="text-emerald-200/80 text-sm">
                                ✅ Surplus! You have earned enough to treat yourself.
                            </p>
                            <button
                                onClick={() => navigate('/bank')}
                                className="w-full py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 rounded-lg border border-emerald-500/30 transition-all flex items-center justify-center gap-2 group"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                Go to TimeStore
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-slate-400 text-sm">
                                You are in a balanced state. Keep flowing.
                            </p>
                            <button
                                onClick={() => navigate('/focus')}
                                className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                            >
                                Continue Focus
                            </button>
                        </div>
                    )}
                </div>

                {/* Daily Progress */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                    <h3 className="text-lg font-semibold text-white mb-1">Daily Focus</h3>
                    <p className="text-slate-400 text-sm mb-6">
                        {dailyFocusMinutes} minutes focused today
                    </p>

                    <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono">
                        <span>0m</span>
                        <span>Goal: {dailyGoal}m</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
