import React, { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PrompterContainer, WordNode, ActiveBackdrop, CursorCaret } from './styles';
import {type Token } from '../../hooks/useTranscriptionEngine';

interface TeleprompterProps {
  tokens: Token[];
}

export const Teleprompter: React.FC<TeleprompterProps> = ({ tokens }) => {
  const activeRef = useRef<HTMLSpanElement>(null);

  // Auto-scroll logic: Keep active word in view
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [tokens]); // Re-run when status changes

  return (
    <PrompterContainer>
      {tokens.map((token) => (
        <span 
          key={token.globalIndex} 
          style={{ position: 'relative', display: 'inline-block' }}
          ref={token.isFocused ? activeRef : null}
        >
          <WordNode $status={token.status}>
            {token.text}
          </WordNode>
          
          {/* THE FLUID HIGHLIGHT: Slides behind words in the Active Chunk */}
          {token.status === 'ACTIVE' && (
             <ActiveBackdrop 
                layoutId="chunk-highlight"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
             />
          )}

          {/* THE CURSOR: Shows exactly where we are typing */}
          {token.isFocused && token.status === 'ACTIVE' && (
             <CursorCaret 
               layoutId="typing-cursor"
               transition={{ duration: 0.1 }}
             />
          )}
        </span>
      ))}
    </PrompterContainer>
  );
};