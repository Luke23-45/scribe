import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- ANIMATIONS ---
const breathe = keyframes`
  0%, 100% { opacity: 0.3; transform: scaleX(1); }
  50% { opacity: 1; transform: scaleX(1.1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const gentlePulse = keyframes`
  0%, 100% { box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
  50% { box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
`;

// --- STYLED COMPONENTS ---
export const SectionWrapper = styled(motion.section)`
  margin-bottom: 4rem;
  max-width: 800px;
`;

export const Label = styled.div`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.ink.secondary};
  margin-bottom: 1.5rem;
  font-weight: 600;
  
  /* The "Divider Line" next to the label */
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &::after {
    content: '';
    height: 1px;
    flex: 1;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.ink.tertiary}60,
      ${({ theme }) => theme.colors.ink.tertiary}20,
      transparent
    );
  }
`;

export const InputWrapper = styled(motion.div)`
  position: relative;
`;

export const BreathingCursor = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  width: 2px;
  height: 1.5rem;
  background: ${({ theme }) => theme.colors.accent};
  border-radius: 1px;
  animation: ${breathe} 4s ease-in-out infinite;
`;

export const PlaceholderHint = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.ink.tertiary};
  opacity: 0.5;
  pointer-events: none;
  white-space: nowrap;
`;

// --- LOCKED STATE: Glassmorphism Card ---
export const LockedStatement = styled(motion.div)`
  /* Glassmorphism effect */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface}F0 0%,
    ${({ theme }) => theme.colors.surface}CC 100%
  );
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  padding: 2rem 2.5rem;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}20;
  
  box-shadow: 
    0 8px 32px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255,255,255,0.6);
  
  animation: ${gentlePulse} 4s ease-in-out infinite;
  
  /* Typography */
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  color: ${({ theme }) => theme.colors.ink.primary};
  line-height: 1.5;
  
  /* Highlight the user's word */
  strong {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.accent};
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.accent}20 0%,
      ${({ theme }) => theme.colors.accent}10 100%
    );
    padding: 0.1em 0.4em;
    border-radius: 6px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.accent}40;
  }
`;

export const LockedLabel = styled.div`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.ink.tertiary};
  margin-bottom: 0.75rem;
  
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 14px;
    height: 14px;
    stroke: ${({ theme }) => theme.colors.accent};
  }
`;

export const EditButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  opacity: 0.4;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
  
  svg {
    width: 16px;
    height: 16px;
    stroke: ${({ theme }) => theme.colors.ink.secondary};
  }
`;