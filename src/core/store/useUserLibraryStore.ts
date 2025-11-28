import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {type Manuscript } from '@/core/data/manuscripts';

interface UserLibraryState {
  myManuscripts: Manuscript[];
  addManuscript: (manuscript: Manuscript) => void;
  removeManuscript: (id: string) => void;
}

export const useUserLibraryStore = create<UserLibraryState>()(
  persist(
    (set) => ({
      myManuscripts: [],
      
      addManuscript: (newItem) => set((state) => ({
        // Add new items to the TOP of the list
        myManuscripts: [newItem, ...state.myManuscripts]
      })),

      removeManuscript: (id) => set((state) => ({
        myManuscripts: state.myManuscripts.filter(item => item.id !== id)
      })),
    }),
    {
      name: 'neuro-user-library', // The key in localStorage
    }
  )
);