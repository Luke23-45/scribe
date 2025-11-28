import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';

// Logic & Data
import { useSessionState } from '@/core/store/useSessionState';
import { useLibrary } from '../hooks/useLibrary';

// Components
import { SearchInput } from '@/components/common/Input/SearchInput'; // Created in prev step
import { BookCard } from '@/components/library/BookCard/BookCard';
import { FilterRibbon } from '../CatalogEngine/components/FilterRibbon';
import { 
  EngineWrapper, 
  ControlsHeader, 
  TitleBlock, 
  Title, 
  Meta, 
  Grid,
  EmptyState 
} from './styles';

export const CatalogEngine: React.FC = () => {
  const navigate = useNavigate();
  const loadExercise = useSessionState((s) => s.loadExercise);

  // Use the Controller Hook we built
  const { 
    manuscripts, 
    stats, 
    searchQuery, 
    setSearchQuery, 
    activeFilter, 
    setActiveFilter 
  } = useLibrary();

  const handleSelect = (book: typeof manuscripts[0]) => {
    loadExercise(book.text, book.title, book.author);
    navigate({ to: '/transcription' });
  };

  return (
    <EngineWrapper>
      {/* 1. THE CONTROLS */}
      <ControlsHeader>
        <TitleBlock>
          <Title>Archive</Title>
          <Meta>
            {stats.visible} manuscripts available ({stats.readingTime} min read time)
          </Meta>
        </TitleBlock>

        {/* Search & Filter Group */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <SearchInput 
            placeholder="Search authors..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FilterRibbon 
            currentFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </ControlsHeader>

      {/* 2. THE GRID */}
      <Grid>
        <AnimatePresence mode="popLayout">
          {manuscripts.length > 0 ? (
            manuscripts.map((book) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <BookCard 
                  title={book.title}
                  author={book.author}
                  phase={book.phase}
                  duration={book.duration}
                  onClick={() => handleSelect(book)}
                />
              </motion.div>
            ))
          ) : (
            <EmptyState>
              No manuscripts found matching "{searchQuery}".
            </EmptyState>
          )}
        </AnimatePresence>
      </Grid>
    </EngineWrapper>
  );
};