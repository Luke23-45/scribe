import { create } from 'zustand';

// --- DOMAIN TYPES ---

// "How is the brain feeling?" -> Affects engine difficulty logic later
export type BrainCondition = 'foggy' | 'sharp';

// "What does the interface look like?" -> Draft (Paper) vs Audit (Yellow/Black)
export type WorkMode = 'draft' | 'audit';

// The Text Metadata
export interface TextSource {
  id: string;
  title: string;
  author: string; 
  fullText: string;
}

// --- STATE INTERFACE ---

interface SessionState {
  // 1. Context & Preferences
  userCondition: BrainCondition;
  workMode: WorkMode;
  dailyIntention: string; // From the Sanctuary Page input

  // 2. The Current Rehabilitation Task
  activeTextSource: TextSource | null;

  // 3. Telemetry (Hidden Metrics)
  sessionStats: {
    startTime: number | null;
    totalKeystrokes: number;
    errorsCount: number;
    skipsCount: number; // Usage of TK button
  };
}

// --- ACTION INTERFACE ---

interface SessionActions {
  // Initialization
  initializeSession: (condition: BrainCondition) => void;
  setDailyIntention: (intention: string) => void;

  // Workflow Control
  toggleWorkMode: () => void;
  setWorkMode: (mode: WorkMode) => void;

  // Content
  loadExercise: (text: string, title: string, author?: string) => void;
  clearActiveSession: () => void;

  // Telemetry Logs
  logError: () => void;
  logSkip: () => void;
  resetStats: () => void;
}

// --- STORE IMPLEMENTATION ---

export const useSessionState = create<SessionState & SessionActions>((set) => ({
  
  // -- Initial State --
  userCondition: 'foggy', // Default to safest/easiest mode
  workMode: 'draft',
  dailyIntention: '',
  activeTextSource: null,
  
  sessionStats: {
    startTime: null,
    totalKeystrokes: 0,
    errorsCount: 0,
    skipsCount: 0,
  },

  // -- Actions --

  initializeSession: (condition) => set({ 
    userCondition: condition 
  }),

  setDailyIntention: (intention) => set({ 
    dailyIntention: intention 
  }),

  toggleWorkMode: () => set((state) => ({
    workMode: state.workMode === 'draft' ? 'audit' : 'draft'
  })),

  setWorkMode: (mode) => set({ 
    workMode: mode 
  }),

  loadExercise: (text, title, author = "Anonymous") => set({
    activeTextSource: {
      id: Math.random().toString(36).substr(2, 9),
      fullText: text,
      title,
      author
    },
    // Reset stats when new book opens
    sessionStats: {
      startTime: Date.now(),
      totalKeystrokes: 0,
      errorsCount: 0,
      skipsCount: 0,
    }
  }),

  clearActiveSession: () => set({ 
    activeTextSource: null 
  }),

  logError: () => set((state) => ({
    sessionStats: {
      ...state.sessionStats,
      errorsCount: state.sessionStats.errorsCount + 1
    }
  })),

  logSkip: () => set((state) => ({
    sessionStats: {
      ...state.sessionStats,
      skipsCount: state.sessionStats.skipsCount + 1
    }
  })),

  resetStats: () => set({
    sessionStats: {
      startTime: null,
      totalKeystrokes: 0,
      errorsCount: 0,
      skipsCount: 0,
    }
  })

}));