import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Transaction {
    id: string;
    amount: number;
    type: 'earn' | 'spend';
    description: string;
    timestamp: number;
}

interface TimeContextType {
    balance: number;
    transactions: Transaction[];
    addTransaction: (amount: number, type: 'earn' | 'spend', description: string) => void;
    resetData: () => void;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export const TimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Load from local storage or default to 0
    const [balance, setBalance] = useState(() => {
        const saved = localStorage.getItem('time_balance');
        return saved ? parseInt(saved, 10) : 0;
    });

    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const saved = localStorage.getItem('time_transactions');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('time_balance', balance.toString());
        localStorage.setItem('time_transactions', JSON.stringify(transactions));
    }, [balance, transactions]);

    const addTransaction = (amount: number, type: 'earn' | 'spend', description: string) => {
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            amount,
            type,
            description,
            timestamp: Date.now(),
        };

        setBalance((prev) => (type === 'earn' ? prev + amount : prev - amount));
        setTransactions((prev) => [newTransaction, ...prev]);
    };

    const resetData = () => {
        setBalance(0);
        setTransactions([]);
        localStorage.removeItem('time_balance');
        localStorage.removeItem('time_transactions');
    };

    return (
        <TimeContext.Provider value={{ balance, transactions, addTransaction, resetData }}>
            {children}
        </TimeContext.Provider>
    );
};

export const useTimeBank = () => {
    const context = useContext(TimeContext);
    if (context === undefined) {
        throw new Error('useTimeBank must be used within a TimeProvider');
    }
    return context;
};
