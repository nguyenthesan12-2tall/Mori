import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Coffee, Brain } from 'lucide-react';
import { useTimeBank } from '../../context/TimeContext';

export const Timer = () => {
    const [duration, setDuration] = useState(25); // Minutes
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'focus' | 'break'>('focus');

    const { addTransaction } = useTimeBank();

    useEffect(() => {
        let interval: number | undefined;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            // Award credits if in Focus mode
            if (mode === 'focus') {
                addTransaction(duration, 'earn', `${duration}m Deep Work Session`);
                // Play success sound (mock or real if implemented later)
            }
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode, addTransaction, duration]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(duration * 60);
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDuration = parseInt(e.target.value, 10);
        setDuration(newDuration);
        if (!isActive) {
            setTimeLeft(newDuration * 60);
        }
    };

    const switchMode = (newMode: 'focus' | 'break') => {
        setMode(newMode);
        setIsActive(false);
        const newTime = newMode === 'focus' ? duration : 5;
        setTimeLeft(newTime * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl max-w-md w-full mx-auto relative overflow-hidden">
            {/* Ambient Glow */}
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${mode === 'focus' ? 'from-blue-500 to-cyan-500' : 'from-emerald-500 to-green-500'}`} />

            {/* Mode Switcher */}
            <div className="flex space-x-4 mb-8 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                    onClick={() => switchMode('focus')}
                    className={`flex items-center px-6 py-2 rounded-lg transition-all ${mode === 'focus' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
                >
                    <Brain className="w-4 h-4 mr-2" />
                    Deep Work
                </button>
                <button
                    onClick={() => switchMode('break')}
                    className={`flex items-center px-6 py-2 rounded-lg transition-all ${mode === 'break' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
                >
                    <Coffee className="w-4 h-4 mr-2" />
                    Recharge
                </button>
            </div>

            {/* Timer Display */}
            <div className="relative mb-8 text-center">
                <div className="text-8xl font-bold tracking-tighter tabular-nums bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                    {formatTime(timeLeft)}
                </div>
                {/* Pulse Effect when active */}
                {isActive && (
                    <div className="absolute inset-0 rounded-full blur-3xl bg-blue-500/10 animate-pulse -z-10" />
                )}
            </div>

            {/* Custom Duration Slider (Only visible in Focus Mode and when not active) */}
            {mode === 'focus' && !isActive && (
                <div className="w-full max-w-xs mb-8">
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>1m</span>
                        <span className="text-blue-400 font-bold">{duration} mins</span>
                        <span>120m</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="120"
                        value={duration}
                        onChange={handleDurationChange}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                    />
                    <div className="text-center mt-2 text-xs text-emerald-400">
                        Reward: {duration} $TIME
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="flex items-center space-x-6">
                <button
                    onClick={toggleTimer}
                    className="h-16 w-16 flex items-center justify-center rounded-full bg-white text-slate-950 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10"
                >
                    {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                </button>

                <button
                    onClick={resetTimer}
                    className="h-12 w-12 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
            </div>

            {/* Ambient Sound Controls (Mock) */}
            <div className="mt-12 w-full pt-8 border-t border-slate-800/50">
                <div className="flex items-center justify-between text-slate-400 text-sm">
                    <div className="flex items-center">
                        <Volume2 className="w-4 h-4 mr-2" />
                        <span>Ambient: Rain</span>
                    </div>
                    <div className="h-1 w-24 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-slate-600" />
                    </div>
                </div>
            </div>
        </div>
    );
};
