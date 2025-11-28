import React from 'react';
import styled from 'styled-components';
// We don't even need motion here anymore if we want pure stability, 
// but we keep styled-components syntax consistent.

const Char = styled.span<{ $visible: boolean; $isSpace?: boolean }>`
  display: inline-block;
  min-width: ${({ $isSpace }) => ($isSpace ? '0.3em' : 'auto')};
  
  /* 1. STABLE COLOR TRANSITION */
  /* If visible -> Ink Color. If hidden -> Transparent */
  color: ${({ theme, $visible }) => $visible ? theme.colors.ink.primary : 'transparent'};
  
  /* 2. THE EMPTY LINE */
  border-bottom: ${({ theme, $visible }) => $visible ? 'none' : `2px solid ${theme.colors.ink.tertiary}40`};
  
  /* 3. SPEED */
  /* 0s = Instant appearance (Typewriter feel). 
     0.1s = Very subtle fade (Ink feel). */
  transition: color 0s linear, border-bottom 0s linear; 
`;

interface CipherWordProps {
  text: string;
  charIndexStart: number;
  cursorIndex: number;
}

export const CipherWord: React.FC<CipherWordProps> = ({ text, charIndexStart, cursorIndex }) => {
  const chars = text.split('');

  return (
    <span>
      {chars.map((char, localIdx) => {
        const globalCharAddr = charIndexStart + localIdx;
        const isVisible = globalCharAddr < cursorIndex;

        return (
          <Char 
            key={localIdx} 
            $visible={isVisible}
            $isSpace={char === ' '}
          >
            {char}
          </Char>
        );
      })}
    </span>
  );
};