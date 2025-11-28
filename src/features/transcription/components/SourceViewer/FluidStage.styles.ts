import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const StageWindow = styled.div`
  width: 100%;
  max-width: 1200px; 
  height: 50vh;
  position: relative;
  overflow: hidden; 
  /* Using flex column allows lines to wrap naturally while keeping center focus */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center; /* Keeps content vertical center */
  
  /* Padding determines the optical center */
  padding: 0 2rem; 
`;

// We use a Container for words to control their spacing
export const FlowWordWrapper = styled.span<{ $isChunkStart?: boolean }>`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  
  /* CRITICAL: Add extra space before the start of a new chunk 
     to visually separate the groups */
  margin-left: ${({ $isChunkStart }) => ($isChunkStart ? '2.5rem' : '0.4rem')};
  margin-right: 0.4rem;
`;

export const FlowWord = styled(motion.span)<{ $status: string }>`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  position: relative;
  display: inline-block;
  transition: color 0.3s ease, opacity 0.3s ease;

  /* 1. COMPLETED: Low Contrast / Background */
  ${({ theme, $status }) => $status === 'DONE' && css`
    color: ${theme.colors.ink.secondary};
    font-size: 2rem; 
    font-weight: 400;
    opacity: 0.25;
    filter: blur(0.5px);
  `}

  /* 2. ACTIVE CHUNK: The "Working Memory" Set */
  ${({ theme, $status }) => $status === 'ACTIVE' && css`
    color: ${theme.colors.ink.primary};
    font-size: 2.75rem; /* Uniform Large Size for all 3 words */
    font-weight: 600;
    opacity: 1;
    transform: scale(1);
    border-bottom: 2px solid transparent; /* Reserved space */
  `}

  /* 3. FUTURE: Ghostly */
  ${({ theme, $status }) => $status === 'PENDING' && css`
    color: ${theme.colors.ink.tertiary};
    font-size: 2rem;
    font-weight: 400;
    opacity: 0.2;
  `}
`;

// Current Typing Position Indicator (Subtle Underline)
export const CaretLine = styled(motion.div)`
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: 2px;
`;