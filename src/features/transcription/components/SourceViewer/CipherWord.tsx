import React from 'react';
import styled from 'styled-components';
// We don't even need motion here anymore if we want pure stability, 
// but we keep styled-components syntax consistent.

const Char = styled.span<{ $visible: boolean; $isSpace?: boolean }>`
  display: inline-block;
  min-width: ${({ $isSpace }) => ($isSpace ? '0.4em' : 'auto')};
  
  /* 1. INK REVEAL TRANSITION */
  /* Visible = Full ink color, Hidden = Transparent with visible placeholder */
  color: ${({ theme, $visible }) => $visible ? theme.colors.ink.primary : 'transparent'};
  
  /* 2. VISIBLE PLACEHOLDER LINE */
  /* Thicker, more visible underline for untyped characters */
  border-bottom: ${({ theme, $visible }) =>
    $visible ? 'none' : `3px solid ${theme.colors.ink.tertiary}60`};
  border-radius: 1px;
  
  /* 3. GENTLE INK FEEL ANIMATION */
  /* 0.08s gives a subtle "ink appearing" feel */
  transition: color 0.08s ease-out, border-bottom 0.1s ease-out;
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