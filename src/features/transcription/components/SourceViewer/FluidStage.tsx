import React, { useRef, useEffect } from 'react';
import { StageWindow, FlowWordWrapper, FlowWord, CaretLine } from './FluidStage.styles';
import {type Token } from '@/features/transcription/hooks/useTranscriptionEngine';

interface FluidStageProps {
  tokens: Token[];
  chunkSize?: number; // We can pass this to help with layout logic if needed
}

export const FluidStage: React.FC<FluidStageProps> = ({ tokens }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentChunkRef = useRef<HTMLElement>(null);

  // Logic: Find the FIRST word of the ACTIVE chunk
  const activeChunkStartToken = tokens.find(t => t.status === 'ACTIVE');
  
  // --- AUTO SCROLL LOGIC (Anchor to Chunk Start) ---
  useEffect(() => {
    if (!containerRef.current || !currentChunkRef.current) return;

    const container = containerRef.current;
    const target = currentChunkRef.current;

    // Calculate Scroll Position:
    // Move the container so the "Active Chunk" is roughly in the vertical center.
    // Note: We are scrolling 'scrollTop', but our container is flex-center aligned.
    // We might need to use scrollIntoView logic for simpler handling with Flexbox.
    
    target.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center',
      inline: 'center' // Keeps it horizontally centered too
    });

  }, [activeChunkStartToken]); // Only scroll when the CHUNK changes, not every letter/word

  return (
    <StageWindow ref={containerRef}>
      {tokens.map((token, index) => {
        // Is this the start of a new visual grouping?
        // (We assume chunk sizes are logic-handled, but visually we just separate active/pending boundaries)
        const isChunkStart = token.status === 'ACTIVE' && tokens[index-1]?.status === 'DONE';
        const isFirstInList = index === 0;

        // We attach the REF to the first word of the active group
        const isRefTarget = isChunkStart || (token.status === 'ACTIVE' && !activeChunkStartToken);

        return (
          <FlowWordWrapper 
            key={token.globalIndex} 
            ref={isRefTarget ? currentChunkRef : null}
            $isChunkStart={isChunkStart && !isFirstInList} // Add gap visual
          >
            <FlowWord $status={token.status}>
              {token.text}
            </FlowWord>
            
            {/* The Cursor ONLY appears on the specific word you are typing */}
            {token.isFocused && (
               <CaretLine layoutId="caret" transition={{ duration: 0.15 }} />
            )}
          </FlowWordWrapper>
        );
      })}
    </StageWindow>
  );
};