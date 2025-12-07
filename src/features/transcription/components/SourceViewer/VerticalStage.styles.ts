import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// --- LAYOUT CONSTANTS ---
// Reduced height ensures context words feel "close" to the active chunk
export const ROW_HEIGHT = 90;
export const REEL_VIEWPORT_HEIGHT = 500;

export const StageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px; /* Constrain width for better reading eye-scan */
  height: ${REEL_VIEWPORT_HEIGHT}px;
  overflow: hidden;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  
  /* Cinematic Fade Mask for Top/Bottom */
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 20%,
    black 80%,
    transparent 100%
  );
`;

export const Reel = styled.div`
  width: 100%;
  will-change: transform;
  /* Premium Spring Physics for the Slide */
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
`;

export const Row = styled.div<{ $isActive: boolean }>`
  height: ${ROW_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Horizontal Rhythm between words */
  gap: 0.8rem; 
  transition: all 0.4s ease;
  position: relative; /* Context for absolute positioning of Curtain */

  /* VISUAL HIERARCHY */
  ${({ $isActive }) => $isActive ? css`
    opacity: 1;
    transform: scale(1);
    z-index: 10; /* Float above neighbors */
    /* Subtle glow for active row */
    filter: drop-shadow(0 0 20px rgba(141, 163, 153, 0.15));
  ` : css`
    /* Inactive rows fade back heavily so focus remains center */
    opacity: 0.3; 
    transform: scale(0.95);
    filter: blur(0px); 
  `}
`;

export const Word = styled.span<{ $status: string }>`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  white-space: nowrap;
  
  /* DYNAMIC TYPOGRAPHY SCALING */
  /* Active Chunk is Hero Size, Context is Subtitle Size */
  /* Uses CSS custom property from parent for user-controlled scaling */
  font-size: ${({ $status }) =>
    $status === 'ACTIVE'
      ? 'calc(2.5rem * var(--font-scale, 1))'
      : 'calc(1.75rem * var(--font-scale, 1))'};
  line-height: var(--line-spacing, 1.8);
  transition: font-size 0.4s ease, color 0.4s ease, opacity 0.4s ease, transform 0.3s ease;

  ${({ theme, $status }) => $status === 'ACTIVE' && css`
    color: ${theme.colors.ink.primary};
    font-weight: 600;
  `}
  
  ${({ theme, $status }) => $status === 'DONE' && css`
    color: ${theme.colors.ink.secondary};
  `}
  
  ${({ theme, $status }) => $status === 'PENDING' && css`
    color: ${theme.colors.ink.tertiary};
  `}
`;

// --- NEW MEMORY COMPONENTS ---

export const BlindCurtain = styled(motion.div)`
  position: absolute;
  /* Ensure it covers the words completely with breathing room */
  top: 4px; 
  bottom: 4px; 
  left: -2.5rem; 
  right: -2.5rem;
  
  /* THE PAPER CARD VISUAL - Premium calm surface */
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.surface}F8 100%
  );
  
  /* Premium floating effect with subtle accent glow */
  box-shadow: 
    0 8px 32px -8px rgba(0, 0, 0, 0.08),
    0 4px 16px -4px rgba(0, 0, 0, 0.04),
    0 0 0 1px ${({ theme }) => theme.colors.ink.tertiary}08,
    inset 0 1px 0 ${({ theme }) => theme.colors.surface};
  
  border-radius: 16px;
  z-index: 20;
  
  /* Subtle interior highlight for premium feel */
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}12;
  
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2.5rem;
  
  /* GPU acceleration for smooth animations */
  will-change: transform, opacity;
  backface-visibility: hidden;
`;

export const CipherTextWrapper = styled.div`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  /* Dynamic font size from CSS custom property */
  font-size: calc(2.5rem * var(--font-scale, 1));
  line-height: var(--line-spacing, 1.8);
  font-weight: 600;
  
  display: flex;
  gap: 0.8rem; /* Match Row gap */
  align-items: center;
`;

export const ActiveCursor = styled.div`
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.accent};
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.accent}40;
`;