import styled, { css, keyframes } from 'styled-components';

const breathe = keyframes`
  0% { transform: scaleX(0.8); opacity: 0.5; }
  50% { transform: scaleX(1); opacity: 1; }
  100% { transform: scaleX(0.8); opacity: 0.5; }
`;

export const StyledWord = styled.span<{ $status: 'DONE' | 'ACTIVE' | 'LOCKED' | 'HIDDEN'; $isError?: boolean }>`
  display: inline-block;
  position: relative;
  
  /* Font selection based on Audit Mode check would happen in Theme or here */
  /* For Premium Draft mode, we use Display Font for "Novel" feel */
  font-family: ${({ theme }) => theme.mode === 'audit' ? theme.typography.fontDisplay : theme.typography.fontDisplay}; 
  font-size: ${({ theme }) => theme.mode === 'audit' ? theme.typography.fontSize.subheading : theme.typography.fontSize.heading};
  
  margin-right: 0.5em; /* Typographic spacing */
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform, opacity, filter;

  /* 1. PAST (Dried Ink) */
  ${({ $status, theme }) => 
    $status === 'DONE' && css`
      color: ${theme.colors.ink.tertiary};
      filter: blur(0px); 
      opacity: 0.6;
    `}

  /* 2. PRESENT (Wet Ink - Focused) */
  ${({ $status, theme, $isError }) => 
    $status === 'ACTIVE' && css`
      color: ${$isError ? theme.colors.panic : theme.colors.ink.primary};
      opacity: 1;
      transform: scale(1.05); 
      
      /* The Breathing Underline Cursor */
      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${$isError ? theme.colors.panic : theme.colors.accent};
        border-radius: 2px;
        animation: ${breathe} 3s infinite ease-in-out;
      }
    `}

  /* 3. FUTURE (Hidden/Ghost) */
  ${({ $status }) => 
    ($status === 'LOCKED' || $status === 'HIDDEN') && css`
      opacity: 0;
      pointer-events: none;
      transform: translateY(10px);
    `}
`;