import React, { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';

// Logic & Types
import { chunkTokens } from '@/features/transcription/utils/chunkText';
import {type Token,type SessionPhase } from '@/features/transcription/hooks/useTranscriptionEngine';

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
  
  // 1. DATA TRANSFORM: Linear words -> 2D Grid (Rows)
  const rows = useMemo(() => chunkTokens(tokens, windowSize), [tokens, windowSize]);

  // 2. POSITION LOGIC: Find active row to center it
  const activeRowIndex = rows.findIndex(row => row.some(t => t.status === 'ACTIVE'));
  const safeIndex = activeRowIndex === -1 ? 0 : activeRowIndex;

  // Calculate standard "Center Offset" for the viewport
  const centerOffset = (REEL_VIEWPORT_HEIGHT / 2) - (ROW_HEIGHT / 2);
  const translateY = centerOffset - (safeIndex * ROW_HEIGHT);

  return (
    <StageContainer>
      <Reel style={{ transform: `translateY(${translateY}px)` }}>
        {rows.map((row, rIndex) => {
          
          const isActiveRow = rIndex === safeIndex;
          const isWriting = isActiveRow && phase === 'WRITING';

          return (
            <Row key={rIndex} $isActive={isActiveRow}>
              
              {/* --- A. READING VIEW --- */}
              {/* We hide the standard text immediately when Writing starts */}
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '0.8rem', 
                  opacity: isWriting ? 0 : 1, // Instant visibility toggle
                  transition: 'opacity 0.2s',
                  pointerEvents: isWriting ? 'none' : 'auto'
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
              {/* Floats ON TOP of the row when activated */}
              <AnimatePresence>
                {isWriting && (
                  <BlindCurtain
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
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