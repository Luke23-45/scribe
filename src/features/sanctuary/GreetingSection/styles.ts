import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- ANIMATIONS ---
const gradientShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const cursorBlink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// --- STYLED COMPONENTS ---
export const StyledHeader = styled(motion.header)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 4rem;
  min-height: 180px; /* Reserves space to prevent layout shift */
  padding-top: 2rem;
`;

export const DateDisplay = styled(motion.div)`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.ink.tertiary};
  font-weight: 500;
  
  /* Decorative line */
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &::after {
    content: '';
    height: 1px;
    width: 60px;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.ink.tertiary}40,
      transparent
    );
  }
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: clamp(2.5rem, 6vw, 4rem);
  line-height: 1.1;
  margin: 0;
  
  /* Gradient text effect */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.ink.primary} 0%,
    ${({ theme }) => theme.colors.ink.secondary} 50%,
    ${({ theme }) => theme.colors.accent} 100%
  );
  background-size: 200% 200%;
  animation: ${gradientShift} 8s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Subtitle = styled(motion.span)`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: ${({ theme }) => theme.colors.ink.secondary};
  opacity: 0.7;
  margin-top: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.02em;
`;

export const TypewriterCursor = styled.span`
  display: inline-block;
  width: 3px;
  height: 1em;
  background: ${({ theme }) => theme.colors.accent};
  margin-left: 4px;
  animation: ${cursorBlink} 1s ease-in-out infinite;
  vertical-align: text-bottom;
  border-radius: 1px;
`;

export const TimeEmoji = styled.span`
  font-size: 0.8em;
  margin-right: 0.5rem;
  filter: grayscale(30%);
`;