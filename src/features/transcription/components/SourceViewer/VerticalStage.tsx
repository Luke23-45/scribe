import React, { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';

// Logic & Types
import { chunkTokens } from '@/features/transcription/utils/chunkText';
import { type Token, type SessionPhase } from '@/features/transcription/hooks/useTranscriptionEngine';
import { useSettingsStore } from '@/core/store/useSettingsStore';

// Components

import { CipherWord } from './CipherWord';
import {
  StageContainer,
  Reel,
  Row,
  Word,
  ActiveCursor,
  BlindCurtain,
  CipherTextWrapper,
  ROW_HEIGHT,
  REEL_VIEWPORT_HEIGHT
} from './VerticalStage.styles';

interface VerticalStageProps {
  tokens: Token[];
  windowSize: number;
  phase: SessionPhase;
  cursorIndex: number;
}

export const VerticalStage: React.FC<VerticalStageProps> = ({
  tokens, windowSize, phase, cursorIndex
}) => {
  // Get font settings from global store
  const fontScale = useSettingsStore((state) => state.fontScale);
  const lineSpacing = useSettingsStore((state) => state.lineSpacing);

  // 1. DATA TRANSFORM: Linear words -> 2D Grid (Rows)
  const rows = useMemo(() => chunkTokens(tokens, windowSize), [tokens, windowSize]);

  // 2. POSITION LOGIC: Find active row to center it
  const activeRowIndex = rows.findIndex(row => row.some(t => t.status === 'ACTIVE'));
  const safeIndex = activeRowIndex === -1 ? 0 : activeRowIndex;

  // Calculate standard "Center Offset" for the viewport
  const centerOffset = (REEL_VIEWPORT_HEIGHT / 2) - (ROW_HEIGHT / 2);
  const translateY = centerOffset - (safeIndex * ROW_HEIGHT);

  return (
    <StageContainer
      style={{
        '--font-scale': fontScale,
        '--line-spacing': lineSpacing
      } as React.CSSProperties}
    >
      <Reel style={{ transform: `translateY(${translateY}px)` }}>
        {rows.map((row, rIndex) => {

          const isActiveRow = rIndex === safeIndex;
          const isWriting = isActiveRow && phase === 'WRITING';

          return (
            <Row key={rIndex} $isActive={isActiveRow}>

              {/* --- A. READING VIEW --- */}
              {/* Smooth fade-out when Writing starts with premium timing */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.8rem',
                  opacity: isWriting ? 0 : 1,
                  transition: 'opacity 0.32s cubic-bezier(0.4, 0, 0.2, 1)', // Premium easing
                  pointerEvents: isWriting ? 'none' : 'auto',
                  transform: isWriting ? 'scale(0.98)' : 'scale(1)',
                }}
              >
                {row.map((token) => (
                  <span key={token.globalIndex} style={{ position: 'relative' }}>
                    <Word $status={token.status}>
                      {token.text}
                    </Word>

                    {/* Caret only shows during Read Phase to indicate current position context */}
                    {token.isFocused && phase === 'READING' && <ActiveCursor />}
                  </span>
                ))}
              </div>

              {/* --- B. WRITING VIEW (The Magic Card) --- */}
              {/* Floats ON TOP of the row when activated - Premium calm animation */}
              <AnimatePresence>
                {isWriting && (
                  <BlindCurtain
                    initial={{ opacity: 0, scale: 0.97, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -6 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,  // Softer, less bouncy
                      damping: 24,     // More controlled settling
                      mass: 0.8,       // Lighter feel
                      opacity: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
                      scale: { duration: 0.35 }
                    }}
                  >
                    <CipherTextWrapper>
                      {row.map((token) => (
                        <CipherWord
                          key={token.globalIndex}
                          text={token.text}
                          charIndexStart={token.charIndexStart}
                          cursorIndex={cursorIndex}
                        />
                      ))}
                    </CipherTextWrapper>
                  </BlindCurtain>
                )}
              </AnimatePresence>

            </Row>
          );
        })}
      </Reel>
    </StageContainer>
  );
};