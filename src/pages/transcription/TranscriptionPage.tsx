import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

// --- LOGIC ---
import { useSessionState } from '@/core/store/useSessionState';
import { useTranscriptionEngine } from '@/features/transcription/hooks/useTranscriptionEngine';
import { useFocusTrap } from '@/features/transcription/hooks/useFocusTrap';

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

// Dynamic Hint Text Area (Instructions)
const InstructionLayer = styled(motion.div)`
  position: absolute;
  bottom: 25%; /* Optical placement below the active text line */
  width: 100%;
  text-align: center;
  pointer-events: none;
  z-index: 10;
`;

const HintText = styled.span<{ $active?: boolean }>`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
  
  color: ${({ theme }) => theme.colors.ink.secondary};
`;

// The Telemetry Bar at the bottom
const ProgressTrack = styled.div`
  position: absolute;
  bottom: 3rem;
  width: 120px;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.ink.tertiary}33; /* 20% opacity */
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: 4px;
`;

// Invisible layer to hold the Input Sensor
const InvisibleSensorLayer = styled.div`
  position: absolute;
  inset: 0; /* Cover entire screen */
  z-index: 50; /* Sit on top of Visuals to capture click focus everywhere */
`;

const SettingHint = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.ink.tertiary};
  z-index: 60;
  pointer-events: none;
  mix-blend-mode: multiply; /* Blends into paper texture */
  opacity: 0.5;
`;

// --- COMPONENT ---

export const TranscriptionPage: React.FC = () => {
  // 1. DATA & SETTINGS STATE
  const { activeTextSource } = useSessionState();
  const [chunkSize, setChunkSize] = useState(3); // Default 3 words per chunk

  // 2. HUD STATE (Esc Menu)
  const { isPaused, setIsPaused } = useFocusTrap();

  // Guard Clause: Redirect or Message if no text
  if (!activeTextSource) return (
    <CinemaContainer>
      <div style={{ opacity: 0.5, fontFamily: 'sans-serif', textAlign: 'center', marginTop: '20vh' }}>
        No text loaded.<br/><br/>Please return to the Library.
      </div>
    </CinemaContainer>
  );

  // 3. COGNITIVE ENGINE INITIALIZATION
  const { tokens, handleKeyDown, progress, phase, cursorIndex } = useTranscriptionEngine(
    activeTextSource.fullText, 
    chunkSize
  );

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

      {/* Static Visual Hint */}
      <SettingHint>PRESS [ESC] FOR SETTINGS</SettingHint>

      {/* --- LAYER 2: THE WORKSPACE --- */}
      <Workspace $isPaused={isPaused}>
        
        {/* A. The "Memory Machine" (Text Stream) */}
        {/* We pass 'cursorIndex' so the Writing Phase can draw the ink being typed */}
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <HintText $active>Read & Memorize • Press SPACE when ready</HintText>
              </motion.div>
            ) : (
              <motion.div
                key="write"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <HintText $active style={{ color: '#8DA399' }}>Type from Memory...</HintText>
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

        {/* D. Telemetry Bar */}
        <ProgressTrack>
          <ProgressFill 
            initial={{ width: 0 }} 
            animate={{ width: `${progress}%` }} 
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </ProgressTrack>

      </Workspace>

    </CinemaContainer>
  );
};