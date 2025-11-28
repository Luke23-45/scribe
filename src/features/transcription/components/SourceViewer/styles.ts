import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { PaperCard } from '@/components/common/Surface/PaperCard';

export const PrompterContainer = styled(PaperCard)`
  position: relative;
  min-height: 400px;
  line-height: 2;
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1.5rem;
  padding: 3rem;
  
  /* Smooth scroll behavior if text is long */
  overflow-y: auto;
  scroll-behavior: smooth;
  
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 0.5rem; /* Space between words */
`;

export const WordNode = styled.span<{ $status: 'DONE' | 'ACTIVE' | 'PENDING' }>`
  position: relative;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  z-index: 2; /* Above the highlight */

  /* 1. COMPLETED TEXT (Fade it out slightly to reduce noise) */
  ${({ theme, $status }) => $status === 'DONE' && css`
    color: ${theme.colors.ink.tertiary};
    opacity: 0.6;
    /* Optional: Strikethrough? No, just fade is calmer */
  `}

  /* 2. ACTIVE CHUNK (Bright and Clear) */
  ${({ theme, $status }) => $status === 'ACTIVE' && css`
    color: ${theme.colors.ink.primary};
    font-weight: 500;
  `}

  /* 3. PENDING (Future context) */
  ${({ theme, $status }) => $status === 'PENDING' && css`
    color: ${theme.colors.ink.tertiary};
    opacity: 0.3;
    filter: blur(0.5px);
  `}
`;

// The Magical Floating Highlighter
export const ActiveBackdrop = styled(motion.div)`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: ${({ theme }) => theme.colors.highlight};
  border-radius: 6px;
  z-index: -1; /* Behind text */
`;

// The Blinking Cursor (Visual only)
export const CursorCaret = styled(motion.span)`
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: ${({ theme }) => theme.colors.accent};
  margin-left: -2px;
  vertical-align: text-bottom;
`;