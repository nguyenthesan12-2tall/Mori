import { useState } from 'react';
import { ArrowLeft, Wallet, History, ShoppingBag, Clock, Youtube, Coffee, Gamepad2, Scroll } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTimeBank } from '../../context/TimeContext';
import { useWisdom } from '../wisdom/useWisdom';
import { WisdomNotification } from '../wisdom/WisdomNotification';
import { type WisdomCard } from '../wisdom/wisdomData';

export const BankDashboard = () => {
    const { balance, transactions, addTransaction, resetData } = useTimeBank();
    const { unlockRandomCard, isMasterOfTime } = useWisdom();
    const [newlyUnlockedCard, setNewlyUnlockedCard] = useState<WisdomCard | null>(null);

    const spendCredits = (amount: number, item: string) => {
        if (balance >= amount) {
            addTransaction(amount, 'spend', item);
            return true;
        } else {
            alert("Insufficient Time Credits! Go do some Deep Work.");
            return false;
        }
    };

    const buyWisdomCapsule = () => {
        if (isMasterOfTime) {
            alert("You have already collected all available wisdom!");
            return;
        }

        if (spendCredits(200, 'Wisdom Capsule')) {
            const card = unlockRandomCard();
            if (card) {
                setNewlyUnlockedCard(card);
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <WisdomNotification
                card={newlyUnlockedCard}
                onClose={() => setNewlyUnlockedCard(null)}
            />

            {/* Header */}
            <header className="flex items-center justify-between max-w-6xl mx-auto mb-12">
                <Link to="/" className="flex items-center text-slate-400 hover:text-white transition-colors group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Hub
                </Link>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    TimeBank
                </h1>
                <button
                    onClick={() => {
                        if (window.confirm('Are you sure you want to wipe all your Time Coins and History? This cannot be undone.')) {
                            resetData();
                        }
                    }}
                    className="text-xs text-rose-500 hover:text-rose-400 border border-rose-500/30 hover:border-rose-500/60 px-3 py-1 rounded-full transition-all"
                >
                    Reset Data
                </button>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Wallet & History */}
                <div className="lg:col-span-7 space-y-8">
                    {/* Digital Wallet Card */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 border border-slate-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-colors" />

                        <div className="flex items-center space-x-4 mb-8">
                            <div className="p-3 bg-emerald-500/20 rounded-xl">
                                <Wallet className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <h2 className="text-slate-400 text-sm font-medium">Total Balance</h2>
                                <div className="text-5xl font-bold text-white tracking-tight flex items-baseline">
                                    {balance} <span className="text-lg text-emerald-400 ml-2">$TIME</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
                                <div className="text-slate-400 text-xs mb-1">Lifetime Earned</div>
                                <div className="text-xl font-semibold text-emerald-400">
                                    {transactions.filter(t => t.type === 'earn').reduce((acc, t) => acc + t.amount, 0)}
                                </div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
                                <div className="text-slate-400 text-xs mb-1">Total Spent</div>
                                <div className="text-xl font-semibold text-rose-400">
                                    {transactions.filter(t => t.type === 'spend').reduce((acc, t) => acc + t.amount, 0)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
                        <div className="flex items-center mb-6 text-slate-300">
                            <History className="w-5 h-5 mr-2" />
                            <h2 className="font-semibold">Transaction History</h2>
                        </div>
                        <div className="space-y-4">
                            {transactions.length === 0 ? (
                                <div className="text-center text-slate-500 py-8">No transactions yet. Start a Deep Work session!</div>
                            ) : (
                                transactions.map((t) => (
                                    <div key={t.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-2 rounded-lg ${t.type === 'earn' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                                {t.type === 'earn' ? <Clock className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-200">{t.description}</div>
                                                <div className="text-xs text-slate-500">{new Date(t.timestamp).toLocaleTimeString()}</div>
                                            </div>
                                        </div>
                                        <div className={`font-bold ${t.type === 'earn' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {t.type === 'earn' ? '+' : '-'}{t.amount} $TIME
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Time Store */}
                <div className="lg:col-span-5">
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 h-full">
                        <div className="flex items-center mb-6 text-slate-300">
                            <ShoppingBag className="w-5 h-5 mr-2" />
                            <h2 className="font-semibold">Time Store</h2>
                        </div>

                        <div className="space-y-4">
                            {/* Wisdom Capsule - Featured Item */}
                            <div
                                className="p-6 rounded-xl bg-gradient-to-br from-amber-900/20 to-slate-950 border border-amber-500/30 hover:border-amber-500/60 transition-all group cursor-pointer relative overflow-hidden shadow-lg shadow-amber-900/10"
                                onClick={buyWisdomCapsule}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-amber-500/20 transition-colors" />

                                <div className="flex items-center justify-between mb-3 relative z-10">
                                    <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400 group-hover:scale-110 transition-transform duration-300">
                                        <Scroll className="w-6 h-6" />
                                    </div>
                                    <div className="text-amber-400 font-bold text-lg">200 $TIME</div>
                                </div>
                                <h3 className="font-bold text-amber-100 text-lg mb-1 relative z-10">Wisdom Capsule</h3>
                                <p className="text-xs text-amber-200/60 relative z-10">
                                    Unlock timeless knowledge from history's greatest minds.
                                </p>
                            </div>

                            <div className="h-px bg-slate-800 my-4" />

                            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-emerald-500/30 transition-all group cursor-pointer" onClick={() => spendCredits(10, 'YouTube Break (5m)')}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-2 bg-red-500/10 rounded-lg text-red-400 group-hover:bg-red-500/20 transition-colors">
                                        <Youtube className="w-5 h-5" />
                                    </div>
                                    <div className="text-emerald-400 font-bold">10 $TIME</div>
                                </div>
                                <h3 className="font-medium text-slate-200">YouTube Break</h3>
                                <p className="text-xs text-slate-500 mt-1">5 minutes of guilt-free watching.</p>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-emerald-500/30 transition-all group cursor-pointer" onClick={() => spendCredits(15, 'Social Media Scroll (5m)')}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                        <Gamepad2 className="w-5 h-5" />
                                    </div>
                                    <div className="text-emerald-400 font-bold">15 $TIME</div>
                                </div>
                                <h3 className="font-medium text-slate-200">Social Media Scroll</h3>
                                <p className="text-xs text-slate-500 mt-1">5 minutes of scrolling.</p>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-emerald-500/30 transition-all group cursor-pointer" onClick={() => spendCredits(30, 'Coffee Break (15m)')}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                                        <Coffee className="w-5 h-5" />
                                    </div>
                                    <div className="text-emerald-400 font-bold">30 $TIME</div>
                                </div>
                                <h3 className="font-medium text-slate-200">Coffee Break</h3>
                                <p className="text-xs text-slate-500 mt-1">15 minutes to recharge.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
