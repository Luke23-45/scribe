import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';

// --- ANIMATIONS ---
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const gentleGlow = keyframes`
  0%, 100% { box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 0 0 0 transparent; }
  50% { box-shadow: 0 12px 40px rgba(0,0,0,0.12), 0 0 32px rgba(var(--accent-rgb), 0.1); }
`;

const progressPulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

// --- STYLED COMPONENTS ---
export const Wrapper = styled(motion.div)`
  margin-top: 4rem;
  display: flex;
  justify-content: flex-end;
  padding: 0 1rem;
`;

export const ResumeCard = styled(motion.div)`
  width: 100%;
  max-width: 440px;
  
  /* Glassmorphism surface */
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.colors.surface}F8 0%,
    ${({ theme }) => theme.colors.surface}E8 100%
  );
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  
  padding: 2rem;
  border-radius: 24px;
  
  /* Gradient left border */
  border-left: 4px solid transparent;
  border-image: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.accent} 0%,
    ${({ theme }) => theme.colors.accent}60 100%
  ) 1;
  
  box-shadow: 
    0 8px 32px rgba(0,0,0,0.08),
    0 24px 60px rgba(0,0,0,0.04),
    inset 0 1px 0 rgba(255,255,255,0.6);
  
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
  
  animation: ${float} 6s ease-in-out infinite, ${gentleGlow} 4s ease-in-out infinite;
  
  /* Subtle hover lift */
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-4px);
  }
`;

// --- PROGRESS RING ---
export const ProgressRingWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProgressRing = styled.svg`
  width: 72px;
  height: 72px;
  transform: rotate(-90deg);
`;

export const ProgressRingBg = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.ink.tertiary}20;
  stroke-width: 6;
`;

export const ProgressRingFill = styled.circle<{ $progress: number }>`
  fill: none;
  stroke: ${({ theme }) => theme.colors.accent};
  stroke-width: 6;
  stroke-linecap: round;
  
  /* Calculate stroke-dasharray based on progress */
  stroke-dasharray: ${({ $progress }) => {
    const circumference = 2 * Math.PI * 28; // radius = 28
    return `${($progress / 100) * circumference} ${circumference}`;
  }};
  
  transition: stroke-dasharray 0.5s ease;
  animation: ${progressPulse} 3s ease-in-out infinite;
`;

export const ProgressLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
  
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink.primary};
`;

// --- META INFO ---
export const Meta = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MetaLabel = styled.div`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.ink.tertiary};
  
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 12px;
    height: 12px;
    stroke: ${({ theme }) => theme.colors.accent};
  }
`;

export const ResumeTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.ink.primary};
  margin: 0.5rem 0;
  font-weight: 500;
  
  /* Elegant text overflow */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ResumeDetail = styled.div`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.ink.secondary};
`;

// --- BUTTON ---
export const ResumeButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  width: 100%;
  padding: 0.875rem 1.5rem;
  margin-top: 1rem;
  
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent} 0%,
    ${({ theme }) => theme.colors.accent}E0 100%
  );
  color: white;
  
  border: none;
  border-radius: 12px;
  cursor: pointer;
  
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.9rem;
  font-weight: 600;
  
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.accent}30;
  
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px ${({ theme }) => theme.colors.accent}40;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    width: 18px;
    height: 18px;
    stroke: currentColor;
    fill: none;
  }
`;