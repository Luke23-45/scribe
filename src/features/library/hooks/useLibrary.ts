import { useState, useMemo } from 'react';
import { MANUSCRIPT_LIBRARY } from '@/core/data/manuscripts';
import { useUserLibraryStore } from '@/core/store/useUserLibraryStore'; // <--- Import New Store

export type FilterType = 'All' | 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Personal';

export const useLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  
  // 1. GET USER DATA
  const myManuscripts = useUserLibraryStore((s) => s.myManuscripts);

  // 2. MERGE LIBRARIES
  const allManuscripts = useMemo(() => {
    return [...myManuscripts, ...MANUSCRIPT_LIBRARY];
  }, [myManuscripts]);

  // 3. FILTERING LOGIC
  const filteredManuscripts = useMemo(() => {
    return allManuscripts.filter((item) => {
      
      // A. Search Matching
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());

      // B. Category Matching
      let matchesFilter = true;
      if (activeFilter === 'Phase 1') matchesFilter = item.phase === 1;
      if (activeFilter === 'Phase 2') matchesFilter = item.phase === 2;
      if (activeFilter === 'Phase 3') matchesFilter = item.phase === 3;
      // New: Personal Filter
      if (activeFilter === 'Personal') matchesFilter = item.id.startsWith('custom-');

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, allManuscripts]);

  // 4. STATS
  const stats = useMemo(() => {
    return {
      total: allManuscripts.length,
      visible: filteredManuscripts.length,
      readingTime: filteredManuscripts.reduce((acc, curr) => acc + parseInt(curr.duration || '0'), 0)
    };
  }, [filteredManuscripts, allManuscripts]);

  return {
    manuscripts: filteredManuscripts,
    stats,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter
  };
};