import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback, useEffect, useState } from 'react';
import { db, DEFAULT_MANUSCRIPTS, type Manuscript } from '@/core/db/db';

// --- FILTER TYPES ---
export type FilterType = 'All' | 'Favorites' | 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Personal';

// --- MANUSCRIPT DATABASE HOOK ---
export const useManuscriptDB = () => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');

    // --- SEED DATABASE ON FIRST LOAD ---
    useEffect(() => {
        const initDB = async () => {
            const count = await db.manuscripts.count();
            if (count === 0) {
                // First time: seed with default manuscripts
                await db.manuscripts.bulkAdd(DEFAULT_MANUSCRIPTS);
            }
            setIsInitialized(true);
        };
        initDB();
    }, []);

    // --- LIVE QUERY: Reactive manuscript list ---
    const allManuscripts = useLiveQuery(
        async () => {
            // Get all manuscripts, favorites first, then by createdAt desc
            const items = await db.manuscripts
                .orderBy('createdAt')
                .reverse()
                .toArray();

            // Sort: favorites first
            return items.sort((a, b) => {
                if (a.isFavorite && !b.isFavorite) return -1;
                if (!a.isFavorite && b.isFavorite) return 1;
                return 0;
            });
        },
        [] // Dependencies
    );

    // --- FILTERED & SEARCHED MANUSCRIPTS ---
    const filteredManuscripts = useLiveQuery(
        async () => {
            if (!allManuscripts) return [];

            return allManuscripts.filter((item) => {
                // A. Search Matching
                const matchesSearch =
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

                // B. Category Matching
                let matchesFilter = true;
                if (activeFilter === 'Favorites') matchesFilter = item.isFavorite;
                if (activeFilter === 'Phase 1') matchesFilter = item.phase === 1;
                if (activeFilter === 'Phase 2') matchesFilter = item.phase === 2;
                if (activeFilter === 'Phase 3') matchesFilter = item.phase === 3;
                if (activeFilter === 'Personal') matchesFilter = item.isUserCreated;

                return matchesSearch && matchesFilter;
            });
        },
        [allManuscripts, searchQuery, activeFilter]
    );

    // --- CRUD OPERATIONS ---

    const addManuscript = useCallback(async (data: Omit<Manuscript, 'id' | 'createdAt' | 'updatedAt' | 'isFavorite' | 'isUserCreated'>) => {
        const manuscript: Omit<Manuscript, 'id'> = {
            ...data,
            isFavorite: false,
            isUserCreated: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        return await db.manuscripts.add(manuscript);
    }, []);

    const updateManuscript = useCallback(async (id: number, changes: Partial<Manuscript>) => {
        return await db.manuscripts.update(id, {
            ...changes,
            updatedAt: new Date()
        });
    }, []);

    const deleteManuscript = useCallback(async (id: number) => {
        return await db.manuscripts.delete(id);
    }, []);

    const toggleFavorite = useCallback(async (id: number) => {
        const manuscript = await db.manuscripts.get(id);
        if (manuscript) {
            return await db.manuscripts.update(id, {
                isFavorite: !manuscript.isFavorite,
                updatedAt: new Date()
            });
        }
    }, []);

    const getManuscriptById = useCallback(async (id: number) => {
        return await db.manuscripts.get(id);
    }, []);

    // --- STATS ---
    const stats = {
        total: allManuscripts?.length ?? 0,
        visible: filteredManuscripts?.length ?? 0,
        favorites: allManuscripts?.filter(m => m.isFavorite).length ?? 0,
        readingTime: filteredManuscripts?.reduce((acc, curr) =>
            acc + parseInt(curr.duration || '0'), 0
        ) ?? 0
    };

    return {
        // Data
        manuscripts: filteredManuscripts ?? [],
        allManuscripts: allManuscripts ?? [],
        isInitialized,
        stats,

        // Search & Filter
        searchQuery,
        setSearchQuery,
        activeFilter,
        setActiveFilter,

        // CRUD Operations
        addManuscript,
        updateManuscript,
        deleteManuscript,
        toggleFavorite,
        getManuscriptById
    };
};
