export interface WisdomCard {
    id: string;
    author: string;
    quote: string;
    action: string;
    category: 'Philosophy' | 'Strategy' | 'Urgency' | 'Mindset' | 'Focus';
}

export const wisdomData: WisdomCard[] = [
    {
        id: 'seneca-1',
        author: 'Seneca',
        quote: 'It is not that we have a short time to live, but that we waste a lot of it.',
        action: 'Audit your last 24 hours. Identify exactly 1 hour that was pure waste and eliminate it tomorrow.',
        category: 'Urgency'
    },
    {
        id: 'jobs-1',
        author: 'Steve Jobs',
        quote: 'Your time is limited, so don\'t waste it living someone else\'s life.',
        action: 'Identify one commitment you are doing only to please others. Cancel it or delegate it today.',
        category: 'Mindset'
    },
    {
        id: 'aurelius-1',
        author: 'Marcus Aurelius',
        quote: 'You could leave life right now. Let that determine what you do and say and think.',
        action: 'Write down the 3 most important things you would do if you knew this was your last week.',
        category: 'Philosophy'
    },
    {
        id: 'franklin-1',
        author: 'Benjamin Franklin',
        quote: 'Lost time is never found again.',
        action: 'Set a timer for 15 minutes and do that one task you have been procrastinating on. Just start.',
        category: 'Urgency'
    },
    {
        id: 'musk-1',
        author: 'Elon Musk',
        quote: 'If you give yourself 30 days to clean your home, it will take you 30 days. But if you give yourself 3 hours, it will take 3 hours.',
        action: 'Take a task you planned for "later this week" and finish it in the next hour.',
        category: 'Strategy'
    },
    {
        id: 'ravikant-1',
        author: 'Naval Ravikant',
        quote: 'Earn with your mind, not your time.',
        action: 'Brainstorm 3 ways you could decouple your output from your hours worked.',
        category: 'Strategy'
    },
    {
        id: 'epictetus-1',
        author: 'Epictetus',
        quote: 'First say to yourself what you would be; and then do what you have to do.',
        action: 'Define your ideal identity in one sentence. Then do one small action that aligns with it immediately.',
        category: 'Philosophy'
    },
    {
        id: 'bruce-lee-1',
        author: 'Bruce Lee',
        quote: 'If you love life, don\'t waste time, for time is what life is made up of.',
        action: 'Spend 10 minutes doing absolutely nothing but breathing. Appreciate the raw sensation of being alive.',
        category: 'Mindset'
    },
    {
        id: 'newport-1',
        author: 'Cal Newport',
        quote: 'Clarity about what matters provides clarity about what does not.',
        action: 'List your top 3 professional goals. Cross out everything on your to-do list that doesn\'t serve them.',
        category: 'Focus'
    },
    {
        id: 'da-vinci-1',
        author: 'Leonardo da Vinci',
        quote: 'Time stays long enough for anyone who will use it.',
        action: 'Wake up 30 minutes earlier tomorrow and dedicate it to your craft or passion.',
        category: 'Urgency'
    }
];
