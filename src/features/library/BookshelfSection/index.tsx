import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';

// Logic & Data
import { useSessionState } from '@/core/store/useSessionState';
import { useManuscriptDB } from '@/core/hooks/useManuscriptDB';
import { type Manuscript } from '@/core/db/db';

// Components
import { SearchInput } from '@/components/common/Input/SearchInput';
import { BookCard } from '@/components/library/BookCard/BookCard';
import { SkeletonCard } from '@/components/library/BookCard/BookCard.styles';
import { FilterRibbon } from '../CatalogEngine/components/FilterRibbon';
import {
  EngineWrapper,
  ControlsHeader,
  TitleBlock,
  Title,
  Meta,
  Grid,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptySubtitle
} from './styles';

// Edit Modal
import { EditManuscriptModal } from '@/components/library/EditManuscriptModal';

// Toast for undo
import { UndoToast } from '@/components/common/Toast/UndoToast';

export const CatalogEngine: React.FC = () => {
  const navigate = useNavigate();
  const loadExercise = useSessionState((s) => s.loadExercise);

  // IndexedDB Hook
  const {
    manuscripts,
    stats,
    isInitialized,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    toggleFavorite,
    deleteManuscript,
    updateManuscript,
    getManuscriptById
  } = useManuscriptDB();

  // Edit Modal State
  const [editingManuscript, setEditingManuscript] = useState<Manuscript | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Undo Delete State
  const [deletedManuscript, setDeletedManuscript] = useState<Manuscript | null>(null);
  const [showUndoToast, setShowUndoToast] = useState(false);

  const handleSelect = (book: Manuscript) => {
    loadExercise(book.text, book.title, book.author);
    navigate({ to: '/transcription' });
  };

  const handleEdit = async (id: number) => {
    const manuscript = await getManuscriptById(id);
    if (manuscript) {
      setEditingManuscript(manuscript);
      setIsEditModalOpen(true);
    }
  };

  const handleEditSave = async (updates: Partial<Manuscript>) => {
    if (editingManuscript?.id) {
      await updateManuscript(editingManuscript.id, updates);
      setIsEditModalOpen(false);
      setEditingManuscript(null);
    }
  };

  const handleDelete = async (id: number) => {
    const manuscript = await getManuscriptById(id);
    if (manuscript) {
      setDeletedManuscript(manuscript);
      await deleteManuscript(id);
      setShowUndoToast(true);
    }
  };

  const handleUndoDelete = async () => {
    if (deletedManuscript) {
      // Re-add the manuscript
      const { id, ...rest } = deletedManuscript;
      await updateManuscript(id!, rest);
      setShowUndoToast(false);
      setDeletedManuscript(null);
    }
  };

  // Loading skeleton
  if (!isInitialized) {
    return (
      <EngineWrapper>
        <ControlsHeader>
          <TitleBlock>
            <Title>Archive</Title>
            <Meta>Loading manuscripts...</Meta>
          </TitleBlock>
        </ControlsHeader>
        <Grid>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </Grid>
      </EngineWrapper>
    );
  }

  return (
    <EngineWrapper>
      {/* 1. THE CONTROLS */}
      <ControlsHeader>
        <TitleBlock>
          <Title>Archive</Title>
          <Meta>
            {stats.visible} of {stats.total} manuscripts
            {stats.favorites > 0 && ` • ${stats.favorites} favorites`}
            {stats.readingTime > 0 && ` • ${stats.readingTime} min total`}
          </Meta>
        </TitleBlock>

        {/* Search & Filter Group */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <SearchInput
            placeholder="Search titles, authors, tags..."
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
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <BookCard
                  id={book.id!}
                  title={book.title}
                  author={book.author}
                  phase={book.phase}
                  duration={book.duration}
                  isFavorite={book.isFavorite}
                  isUserCreated={book.isUserCreated}
                  onClick={() => handleSelect(book)}
                  onFavoriteToggle={toggleFavorite}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </motion.div>
            ))
          ) : (
            <EmptyState>
              <EmptyIcon>
                {activeFilter === 'Favorites' ? '💝' :
                  activeFilter === 'Personal' ? '✍️' : '📚'}
              </EmptyIcon>
              <EmptyTitle>
                {activeFilter === 'Favorites'
                  ? 'No favorites yet'
                  : activeFilter === 'Personal'
                    ? 'No personal texts'
                    : 'No manuscripts found'}
              </EmptyTitle>
              <EmptySubtitle>
                {activeFilter === 'Favorites'
                  ? 'Click the heart icon on any manuscript to add it here.'
                  : activeFilter === 'Personal'
                    ? 'Use the drafting table below to add your own text.'
                    : searchQuery
                      ? `No results for "${searchQuery}". Try a different search.`
                      : 'Try adjusting your filters.'}
              </EmptySubtitle>
            </EmptyState>
          )}
        </AnimatePresence>
      </Grid>

      {/* 3. EDIT MODAL */}
      {isEditModalOpen && editingManuscript && (
        <EditManuscriptModal
          manuscript={editingManuscript}
          onSave={handleEditSave}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingManuscript(null);
          }}
        />
      )}

      {/* 4. UNDO TOAST */}
      <AnimatePresence>
        {showUndoToast && deletedManuscript && (
          <UndoToast
            message={`"${deletedManuscript.title}" deleted`}
            onUndo={handleUndoDelete}
            onDismiss={() => {
              setShowUndoToast(false);
              setDeletedManuscript(null);
            }}
          />
        )}
      </AnimatePresence>
    </EngineWrapper>
  );
};