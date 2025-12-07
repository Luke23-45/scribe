import Dexie, { type EntityTable } from 'dexie';

// --- MANUSCRIPT ENTITY ---
export interface Manuscript {
    id?: number; // Auto-increment primary key
    title: string;
    author: string;
    text: string;
    phase: 1 | 2 | 3;
    duration: string;
    tags: string[];
    difficulty: 'Easy' | 'Medium' | 'Hard';
    isFavorite: boolean;
    isUserCreated: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// --- DATABASE CLASS ---
class NeuroScribeDB extends Dexie {
    manuscripts!: EntityTable<Manuscript, 'id'>;

    constructor() {
        super('NeuroScribeDB');

        // Schema version 1
        this.version(1).stores({
            // Primary key is ++id (auto-increment)
            // Indexed fields: title, author, phase, isFavorite, isUserCreated, createdAt
            manuscripts: '++id, title, author, phase, isFavorite, isUserCreated, createdAt'
        });
    }
}

// --- SINGLETON INSTANCE ---
export const db = new NeuroScribeDB();

// --- DEFAULT SEED DATA ---
export const DEFAULT_MANUSCRIPTS: Omit<Manuscript, 'id'>[] = [
    {
        title: 'The Bottleneck',
        author: 'NeuroScribe Manual',
        phase: 1,
        duration: '2 min',
        tags: ['Onboarding', 'Drill'],
        difficulty: 'Easy',
        text: "The cognitive load bottleneck creates writing blindness. Our understanding remains fragmentary when working memory is overloaded. By restricting the input window, we force the brain to verify rather than predict.",
        isFavorite: false,
        isUserCreated: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Meditations: Book II',
        author: 'Marcus Aurelius',
        phase: 2,
        duration: '5 min',
        tags: ['Philosophy', 'Stoic'],
        difficulty: 'Medium',
        text: "When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly. They are like this because they can't tell good from evil.",
        isFavorite: true,
        isUserCreated: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'On the Shortness of Life',
        author: 'Seneca',
        phase: 2,
        duration: '8 min',
        tags: ['Philosophy', 'Stoic'],
        difficulty: 'Medium',
        text: "It is not that we have a short time to live, but that we waste a lot of it. Life is long enough, and a sufficiently generous amount has been given to us for the highest achievements if it were all well invested.",
        isFavorite: false,
        isUserCreated: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'The Metamorphosis',
        author: 'Franz Kafka',
        phase: 3,
        duration: '15 min',
        tags: ['Literature', 'Absurdist'],
        difficulty: 'Hard',
        text: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly.",
        isFavorite: false,
        isUserCreated: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'On the Origin of Species',
        author: 'Charles Darwin',
        phase: 3,
        duration: '10 min',
        tags: ['Science', 'Academic'],
        difficulty: 'Hard',
        text: "There is grandeur in this view of life, with its several powers, having been originally breathed into a few forms or into one; and that, whilst this planet has gone cycling on according to the fixed law of gravity, from so simple a beginning endless forms most beautiful have been evolved.",
        isFavorite: false,
        isUserCreated: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Atomic Habits',
        author: 'James Clear',
        phase: 1,
        duration: '4 min',
        tags: ['Psychology', 'Modern'],
        difficulty: 'Easy',
        text: "You do not rise to the level of your goals. You fall to the level of your systems. Your goal is your desired outcome. Your system is the collection of daily habits that will get you there.",
        isFavorite: true,
        isUserCreated: false,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
