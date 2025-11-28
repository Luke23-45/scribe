export interface Manuscript {
  id: string;
  title: string;
  author: string;
  text: string;
  // Meta
  phase: 1 | 2 | 3;
  duration: string; // e.g. "3 min"
  tags: string[];   // e.g. ["Philosophy", "Stoic", "Drill"]
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const MANUSCRIPT_LIBRARY: Manuscript[] = [
  {
    id: 'intro',
    title: 'The Bottleneck',
    author: 'NeuroScribe Manual',
    phase: 1,
    duration: '2 min',
    tags: ['Onboarding', 'Drill'],
    difficulty: 'Easy',
    text: "The cognitive load bottleneck creates writing blindness. Our understanding remains fragmentary when working memory is overloaded. By restricting the input window, we force the brain to verify rather than predict."
  },
  {
    id: 'aurelius-1',
    title: 'Meditations: Book II',
    author: 'Marcus Aurelius',
    phase: 2,
    duration: '5 min',
    tags: ['Philosophy', 'Stoic'],
    difficulty: 'Medium',
    text: "When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly. They are like this because they can't tell good from evil."
  },
  {
    id: 'seneca-time',
    title: 'On the Shortness of Life',
    author: 'Seneca',
    phase: 2,
    duration: '8 min',
    tags: ['Philosophy', 'Stoic'],
    difficulty: 'Medium',
    text: "It is not that we have a short time to live, but that we waste a lot of it. Life is long enough, and a sufficiently generous amount has been given to us for the highest achievements if it were all well invested."
  },
  {
    id: 'kafka-meta',
    title: 'The Metamorphosis',
    author: 'Franz Kafka',
    phase: 3,
    duration: '15 min',
    tags: ['Literature', 'Absurdist'],
    difficulty: 'Hard',
    text: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly."
  },
  {
    id: 'darwin-origin',
    title: 'On the Origin of Species',
    author: 'Charles Darwin',
    phase: 3,
    duration: '10 min',
    tags: ['Science', 'Academic'],
    difficulty: 'Hard',
    text: "There is grandeur in this view of life, with its several powers, having been originally breathed into a few forms or into one; and that, whilst this planet has gone cycling on according to the fixed law of gravity, from so simple a beginning endless forms most beautiful have been evolved."
  },
  {
    id: 'clear-atomic',
    title: 'Atomic Habits',
    author: 'James Clear',
    phase: 1,
    duration: '4 min',
    tags: ['Psychology', 'Modern'],
    difficulty: 'Easy',
    text: "You do not rise to the level of your goals. You fall to the level of your systems. Your goal is your desired outcome. Your system is the collection of daily habits that will get you there."
  }
];