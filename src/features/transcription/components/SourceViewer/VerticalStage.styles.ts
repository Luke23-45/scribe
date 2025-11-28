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
  
  /* TYPOGRAPHY SCALING */
  /* Active Chunk is Hero Size, Context is Subtitle Size */
  font-size: ${({ $status }) => $status === 'ACTIVE' ? '2.5rem' : '1.75rem'};
  transition: font-size 0.4s ease, color 0.4s ease, opacity 0.4s ease;

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
  /* Ensure it covers the words completely with a little margin */
  top: 5px; 
  bottom: 5px; 
  left: -2rem; 
  right: -2rem;
  
  /* THE PAPER CARD VISUAL */
  background-color: ${({ theme }) => theme.colors.surface}; 
  
  /* "Float" Effect */
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
  border-radius: 12px;
  z-index: 20;
  
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
`;

export const CipherTextWrapper = styled.div`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 2.5rem; /* Match Active Word Size */
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