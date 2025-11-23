import React, { useState, useEffect } from 'react';
import { BirthdayModal } from './BirthdayModal';

export const LifeGridView = () => {
    const [birthday, setBirthday] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoveredWeek, setHoveredWeek] = useState<{ weekIndex: number; year: number; age: number } | null>(null);

    useEffect(() => {
        const savedBirthday = localStorage.getItem('user_birthday');
        if (savedBirthday) {
            setBirthday(savedBirthday);
        } else {
            setIsModalOpen(true);
        }
    }, []);

    const handleSaveBirthday = (date: string) => {
        localStorage.setItem('user_birthday', date);
        setBirthday(date);
    };

    const clearBirthday = () => {
        localStorage.removeItem('user_birthday');
        setBirthday(null);
        setIsModalOpen(true);
    };

    if (!birthday) {
        return (
            <>
                <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                    <p className="text-slate-400">Please set your birthday to view your Life Perspective.</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                    >
                        Set Birthday
                    </button>
                </div>
                <BirthdayModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveBirthday}
                />
            </>
        );
    }

    const birthDate = new Date(birthday);
    const today = new Date();
    const totalWeeks = 80 * 52; // 80 years

    // Calculate weeks lived
    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    const weeksLived = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));

    const renderGrid = () => {
        const grid = [];
        for (let i = 0; i < totalWeeks; i++) {
            let status = 'future';
            if (i < weeksLived) status = 'past';
            if (i === weeksLived) status = 'present';

            grid.push(
                <div
                    key={i}
                    onMouseEnter={() => {
                        const yearsPassed = Math.floor(i / 52);
                        const currentYear = birthDate.getFullYear() + yearsPassed;
                        setHoveredWeek({ weekIndex: i, year: currentYear, age: yearsPassed });
                    }}
                    onMouseLeave={() => setHoveredWeek(null)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm transition-all duration-300 ${status === 'past'
                            ? 'bg-blue-900/40'
                            : status === 'present'
                                ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-125 z-10'
                                : 'border border-slate-800/50'
                        }`}
                />
            );
        }
        return grid;
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Your Life in Weeks</h3>
                    <p className="text-slate-400 text-sm">
                        80 Years. {weeksLived} weeks used. {totalWeeks - weeksLived} remaining.
                    </p>
                </div>
                <div className="text-right">
                    {hoveredWeek ? (
                        <div className="text-sm text-blue-400 font-mono">
                            Age {hoveredWeek.age} • Year {hoveredWeek.year}
                        </div>
                    ) : (
                        <div className="text-sm text-slate-600 font-mono">
                            Hover to inspect
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 shadow-inner overflow-hidden">
                <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                    {renderGrid()}
                </div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-900/40 rounded-sm"></div>
                        <span>Past</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-sm shadow-[0_0_5px_rgba(255,255,255,0.5)]"></div>
                        <span>Now</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 border border-slate-800/50 rounded-sm"></div>
                        <span>Future</span>
                    </div>
                </div>
                <button onClick={clearBirthday} className="hover:text-slate-300 transition-colors">
                    Reset Birthday
                </button>
            </div>
        </div>
    );
};
