import React, { useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// --- LOGIC ---
import { useSessionState } from '@/core/store/useSessionState';
import { useMicroSlicer } from '@/core/hooks/useMicroSlicer'; 
import { useActiveEcho } from '@/core/hooks/useActiveEcho';
import { useSoundFX } from '@/core/hooks/useSoundFX';

// --- VISUALS ---
import { FocusStage } from '@/components/focus/FocusStage/FocusStage';
import { FocusWord } from '@/components/focus/FocusWord/FocusWord';
import { PaperCard } from '@/components/common/Surface/PaperCard';
import { ShockEditor } from '../ShockEditor'; // <--- NEW IMPORT

// --- STYLES ---
const Container = styled(PaperCard)`
  padding: 4rem; 
  min-height: 60vh;
  display: flex;
  align-items: center; 
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0; right: 0;
    width: 15%;
    background: linear-gradient(to right, transparent, ${({ theme }) => theme.colors.surface});
    pointer-events: none;
    z-index: 10;
  }
`;

interface EditorSectionProps {
  sourceText: string;
}

export const EditorSection: React.FC<EditorSectionProps> = ({ sourceText }) => {
  // 1. STATE CONNECTIONS
  const userCondition = useSessionState((s) => s.userCondition);
  const workMode = useSessionState((s) => s.workMode); // Draft vs Audit
  
  const { speak } = useActiveEcho();
  const { playClick, playError, playWhoosh } = useSoundFX();

  // 2. FOCUS ENGINE LOGIC (Only runs actively if we are rendered)
  const windowSize = useMemo(() => userCondition === 'sharp' ? 5 : 3, [userCondition]);
  
  const {
    displayWords,
    handleKeyDown,
    isError
  } = useMicroSlicer(
    sourceText,
    windowSize, 
    {
      onValidChar: () => playClick(),
      onInvalidChar: () => playError(),
      onSkip: () => playWhoosh(),
      onWordComplete: (word) => speak(word),
      onComplete: () => console.log("Session Complete")
    }
  );

  return (
    <section>
       <AnimatePresence mode="wait">
        
        {/* VIEW A: DRAFTING MODE (The Engine) */}
        {workMode === 'draft' ? (
           <motion.div
             key="draft-engine"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.4 }}
           >
              <Container>
                <FocusStage onKeyDown={handleKeyDown} autoFocus>
                  {displayWords.map((word) => (
                    <FocusWord
                      key={`${word.index}-${word.text}`}
                      text={word.text}
                      status={word.status}
                      isError={word.status === 'ACTIVE' && isError}
                    />
                  ))}
                </FocusStage>
              </Container>
           </motion.div>
        
        ) : (
        
        /* VIEW B: AUDIT MODE (The Visual Shock) */
           <motion.div key="review-engine">
              <ShockEditor fullText={sourceText} />
           </motion.div>
        )}
      
      </AnimatePresence>
    </section>
  );
};