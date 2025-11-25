import { create } from 'zustand';

interface SessionState {
    clarity: 'foggy' | 'hazy' | 'clear' | 'sharp';
    intention: string;
    setClarity: (clarity: SessionState['clarity']) => void;
    setIntention: (intention: string) => void;
}

export const useSessionState = create<SessionState>((set) => ({
    clarity: 'hazy',
    intention: '',
    setClarity: (clarity) => set({ clarity }),
    setIntention: (intention) => set({ intention }),
}));
