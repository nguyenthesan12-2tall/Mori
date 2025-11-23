import { useState, useEffect } from 'react';
import { wisdomData, type WisdomCard } from './wisdomData';

export const useWisdom = () => {
    const [unlockedIds, setUnlockedIds] = useState<string[]>(() => {
        const saved = localStorage.getItem('unlockedWisdom');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('unlockedWisdom', JSON.stringify(unlockedIds));
    }, [unlockedIds]);

    const unlockedCards = wisdomData.filter(card => unlockedIds.includes(card.id));
    const lockedCards = wisdomData.filter(card => !unlockedIds.includes(card.id));

    const unlockRandomCard = (): WisdomCard | null => {
        if (lockedCards.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * lockedCards.length);
        const newCard = lockedCards[randomIndex];

        setUnlockedIds(prev => [...prev, newCard.id]);
        return newCard;
    };

    const isMasterOfTime = lockedCards.length === 0;

    return {
        unlockedCards,
        totalCards: wisdomData.length,
        unlockRandomCard,
        isMasterOfTime
    };
};
