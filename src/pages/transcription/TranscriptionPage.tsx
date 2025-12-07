import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

// --- LOGIC ---
import { useSessionState } from '@/core/store/useSessionState';
import { useTranscriptionEngine } from '@/features/transcription/hooks/useTranscriptionEngine';
import { useFocusTrap } from '@/features/transcription/hooks/useFocusTrap';
import { useSettingsStore } from '@/core/store/useSettingsStore';

// --- VISUALS ---
import { CinemaContainer } from '@/features/transcription/layout/CinemaContainer';
import { VerticalStage } from '@/features/transcription/components/SourceViewer/VerticalStage';
import { RailInput } from '@/features/transcription/components/InputSurface/RailInput';
import { SettingsOverlay } from '@/features/transcription/components/HUD/SettingsOverlay';

// --- LOCAL STYLES (Atmosphere & Layout) ---

// The Main Workspace that gets blurred when settings are open
const Workspace = styled.div<{ $isPaused: boolean }>`
  position: relative;
  width: 100%;
  height: 100vh; /* Fill cinema screen */
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  /* The "Focus" Effect: Blur reality when accessing settings */
  transition: filter 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
  filter: ${({ $isPaused }) => $isPaused ? 'blur(12px) grayscale(0.2)' : 'none'};
  opacity: ${({ $isPaused }) => $isPaused ? 0.6 : 1};
  
  /* Prevent interaction when paused */
  pointer-events: ${({ $isPaused }) => $isPaused ? 'none' : 'auto'};
`;

// Subtle pulse animation for focus indicator
const subtlePulse = keyframes`
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
`;

// Dynamic Hint Text Area (Instructions) - Enhanced visibility
const InstructionLayer = styled(motion.div)`
  position: absolute;
  bottom: 22%; /* Optical placement below the active text line */
  width: 100%;
  text-align: center;
  pointer-events: none;
  z-index: 10;
`;

const HintText = styled.span<{ $phase: 'reading' | 'writing' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.95rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0.85rem 1.75rem;
  border-radius: 14px;
  
  /* Phase-specific styling - Premium calm palette */
  color: ${({ theme, $phase }) =>
    $phase === 'reading' ? theme.colors.ink.primary : theme.colors.accent};
  
  /* Glassmorphism background */
  background: ${({ theme, $phase }) =>
    $phase === 'reading'
      ? `linear-gradient(135deg, ${theme.colors.ink.tertiary}18 0%, ${theme.colors.ink.tertiary}0C 100%)`
      : `linear-gradient(135deg, ${theme.colors.accent}12 0%, ${theme.colors.accent}08 100%)`};
  
  /* Subtle elegant border */
  border: 1px solid ${({ theme, $phase }) =>
    $phase === 'reading'
      ? `${theme.colors.ink.tertiary}28`
      : `${theme.colors.accent}25`};
  
  /* Premium floating shadow */
  box-shadow: 
    0 4px 16px -4px rgba(0, 0, 0, 0.06),
    0 2px 8px -2px rgba(0, 0, 0, 0.04);
  
  /* Backdrop blur for premium glass effect */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const KeyHint = styled.kbd`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.3rem 0.6rem;
  
  /* Premium surface with subtle gradient */
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.surface}F0 100%
  );
  
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}35;
  border-radius: 6px;
  
  /* Refined shadow for depth */
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 ${({ theme }) => theme.colors.surface};
  
  /* Slight letter spacing for readability */
  letter-spacing: 0.05em;
`;

// Progress Section - Enhanced
const ProgressSection = styled.div`
  position: absolute;
  bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const ProgressTrack = styled.div`
  width: 160px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.ink.tertiary}30;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(
    90deg, 
    ${({ theme }) => theme.colors.accent}, 
    ${({ theme }) => theme.colors.accent}CC
  );
  border-radius: 4px;
`;

const ProgressLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink.secondary};
  letter-spacing: 0.1em;
`;

// Invisible layer to hold the Input Sensor
const InvisibleSensorLayer = styled.div`
  position: absolute;
  inset: 0; /* Cover entire screen */
  z-index: 50; /* Sit on top of Visuals to capture click focus everywhere */
`;

// Keyboard shortcuts hint - Enhanced
const KeyboardHints = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 60;
  animation: ${subtlePulse} 4s ease-in-out infinite;
`;

const ShortcutRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink.tertiary};
  
  kbd {
    font-size: 0.65rem;
    font-weight: 700;
    padding: 0.15rem 0.4rem;
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}40;
    border-radius: 3px;
  }
`;

// Empty state - Enhanced
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1.5rem;
  text-align: center;
  padding: 2rem;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  opacity: 0.3;
`;

const EmptyMessage = styled.p`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.ink.secondary};
  max-width: 300px;
  line-height: 1.6;
`;

// --- COMPONENT ---

export const TranscriptionPage: React.FC = () => {
  // 1. DATA & SETTINGS STATE
  const { activeTextSource } = useSessionState();
  const [chunkSize, setChunkSize] = useState(3); // Default 3 words per chunk
  const displayMode = useSettingsStore((state) => state.displayMode);

  // 2. HUD STATE (Esc Menu)
  const { isPaused, setIsPaused } = useFocusTrap();

  // Guard Clause: Redirect or Message if no text
  if (!activeTextSource) return (
    <CinemaContainer>
      <EmptyState>
        <EmptyIcon>📚</EmptyIcon>
        <EmptyMessage>
          No text loaded for practice.<br />
          Please return to the Library to select a passage.
        </EmptyMessage>
      </EmptyState>
    </CinemaContainer>
  );

  // 3. COGNITIVE ENGINE INITIALIZATION
  const { tokens, handleKeyDown, progress, phase, cursorIndex } = useTranscriptionEngine(
    activeTextSource.fullText,
    chunkSize
  );

  // Calculate words completed
  const totalWords = tokens.length;
  const completedWords = tokens.filter(t => t.status === 'DONE').length;

  return (
    <CinemaContainer>

      {/* --- LAYER 1: HEADS UP DISPLAY (Modal Overlay) --- */}
      <AnimatePresence>
        {isPaused && (
          <SettingsOverlay
            onClose={() => setIsPaused(false)}
            chunkSize={chunkSize}
            setChunkSize={setChunkSize}
          />
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Hint - Contextual */}
      <KeyboardHints>
        <ShortcutRow>
          <kbd>ESC</kbd> Settings
        </ShortcutRow>
        {phase === 'WRITING' && (
          <ShortcutRow>
            <kbd>TAB</kbd> Peek text
          </ShortcutRow>
        )}
      </KeyboardHints>

      {/* --- LAYER 2: THE WORKSPACE --- */}
      <Workspace $isPaused={isPaused}>

        {/* A. The "Memory Machine" (Text Stream) */}
        <VerticalStage
          tokens={tokens}
          windowSize={chunkSize}
          phase={phase}
          cursorIndex={cursorIndex}
        />

        {/* B. The Guidance System (Animated Labels) */}
        <InstructionLayer layout>
          <AnimatePresence mode="wait">
            {phase === 'READING' ? (
              <motion.div
                key="read"
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{
                  duration: 0.38,
                  ease: [0.4, 0, 0.2, 1] // Premium ease-out
                }}
              >
                <HintText $phase="reading">
                  Read & Memorize · then start typing
                </HintText>
              </motion.div>
            ) : (
              <motion.div
                key="write"
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{
                  duration: 0.38,
                  ease: [0.4, 0, 0.2, 1] // Premium ease-out
                }}
              >
                <HintText $phase="writing">
                  Type from Memory...
                </HintText>
              </motion.div>
            )}
          </AnimatePresence>
        </InstructionLayer>

        {/* C. The Sensor Array (Invisible Input) */}
        {!isPaused && (
          <InvisibleSensorLayer>
            <RailInput onKeyDown={handleKeyDown} />
          </InvisibleSensorLayer>
        )}

        {/* D. Progress Section */}
        <ProgressSection>
          <ProgressTrack>
            <ProgressFill
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            />
          </ProgressTrack>
          <ProgressLabel>
            {completedWords} / {totalWords} words • {Math.round(progress)}%
          </ProgressLabel>
        </ProgressSection>

      </Workspace>

    </CinemaContainer>
  );
};
