import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { AnimatePresence } from 'framer-motion';
import { useSessionState } from '@/core/store/useSessionState';
import { useManuscriptDB } from '@/core/hooks/useManuscriptDB';
import { InkButton } from '@/components/common/Button/InkButton';
import {
  SectionWrapper, Header, Title, Subtitle,
  StudioSurface, LinedTextArea, Toolbar,
  InputRow, MetadataInput, SelectWrapper, PhaseSelect,
  SuccessMessage
} from './styles';

// Icons
const SaveIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const FeatherIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
    <line x1="16" y1="8" x2="2" y2="22" />
    <line x1="17.5" y1="15" x2="9" y2="15" />
  </svg>
);

const CheckIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const DraftingSection: React.FC = () => {
  const navigate = useNavigate();
  const { loadExercise } = useSessionState();
  const { addManuscript } = useManuscriptDB();

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');

  // Success state
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedTitle, setSavedTitle] = useState("");

  const sanitized = text.replace(/\s+/g, ' ').trim();
  const wordCount = sanitized ? sanitized.split(' ').length : 0;
  const estimatedDuration = `${Math.max(1, Math.ceil(wordCount / 40))} min`;
  const canSave = text.trim().length > 0 && title.trim().length > 0;

  const handleSaveToLibrary = async () => {
    if (!canSave) return;

    await addManuscript({
      title,
      author: author || "Unknown",
      text: sanitized,
      phase,
      duration: estimatedDuration,
      tags: ['Personal'],
      difficulty
    });

    // Show success feedback
    setSavedTitle(title);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset Form
    setText("");
    setTitle("");
    setAuthor("");
    setPhase(1);
    setDifficulty('Easy');

    // Scroll to top to see the new card
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTranscribeNow = () => {
    if (!text.trim()) return;
    loadExercise(sanitized, title || "Draft", author || "Self");
    navigate({ to: '/transcription' });
  };

  return (
    <SectionWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Header>
        <Title>The Drafting Table</Title>
        <Subtitle>
          Add your own text to the library or start practicing immediately.
        </Subtitle>
      </Header>

      <StudioSurface>
        {/* Metadata Inputs */}
        <InputRow>
          <MetadataInput
            placeholder="Manuscript Title (Required)"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
          <MetadataInput
            placeholder="Author (Optional)"
            value={author}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
          />
        </InputRow>

        {/* Phase & Difficulty Selectors */}
        <InputRow>
          <SelectWrapper>
            <label>Phase</label>
            <PhaseSelect
              value={phase}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPhase(Number(e.target.value) as 1 | 2 | 3)}
            >
              <option value={1}>Phase 1 (Beginner)</option>
              <option value={2}>Phase 2 (Intermediate)</option>
              <option value={3}>Phase 3 (Advanced)</option>
            </PhaseSelect>
          </SelectWrapper>
          <SelectWrapper>
            <label>Difficulty</label>
            <PhaseSelect
              value={difficulty}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </PhaseSelect>
          </SelectWrapper>
        </InputRow>

        {/* Text Area with Word Count */}
        <div style={{ position: 'relative' }}>
          <LinedTextArea
            placeholder="Paste or type your content here..."
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
            spellCheck={false}
          />
          {wordCount > 0 && (
            <div style={{
              position: 'absolute',
              bottom: '0.75rem',
              right: '1rem',
              fontSize: '0.8rem',
              color: '#8B8B8B',
              fontFamily: 'inherit'
            }}>
              {wordCount} words • ~{estimatedDuration}
            </div>
          )}
        </div>

        <Toolbar>
          {/* Option A: Save to Shelf */}
          <InkButton
            variant="secondary"
            onClick={handleSaveToLibrary}
            disabled={!canSave}
            style={{ marginRight: '1rem' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {SaveIcon} Save to Library
            </span>
          </InkButton>

          {/* Option B: Run Now */}
          <InkButton
            variant="primary"
            onClick={handleTranscribeNow}
            disabled={!text.trim()}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {FeatherIcon} Transcribe Now
            </span>
          </InkButton>
        </Toolbar>
      </StudioSurface>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <SuccessMessage
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {CheckIcon}
            "{savedTitle}" saved to your library!
          </SuccessMessage>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};