import { useMemo } from 'react';
import { MANUSCRIPT_LIBRARY } from '@/core/data/manuscripts';
import { useUserLibraryStore } from '@/core/store/useUserLibraryStore';

export const useBookQuery = (bookId: string) => {
  // 1. Get User Data
  const myManuscripts = useUserLibraryStore((s) => s.myManuscripts);

  // 2. Lookup Logic
  const book = useMemo(() => {
    // Check Static Library First
    const staticBook = MANUSCRIPT_LIBRARY.find((m) => m.id === bookId);
    if (staticBook) return staticBook;

    // Check User Library
    const userBook = myManuscripts.find((m) => m.id === bookId);
    return userBook || null;
  }, [bookId, myManuscripts]);

  return book;
};