import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- ANIMATIONS ---
const fadeInLine = keyframes`
  from { width: 0; opacity: 0; }
  to { width: 100%; opacity: 1; }
`;

// --- STYLED COMPONENTS ---
export const SectionWrapper = styled(motion.section)`
  width: 100%;
  margin-top: 1rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const Label = styled.div`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.ink.secondary};
  font-weight: 600;
  
  /* Animated divider line */
  display: flex;
  align-items: center;
  gap: 1.25rem;
  
  &::after {
    content: '';
    height: 1px;
    flex: 1;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.ink.tertiary}50,
      ${({ theme }) => theme.colors.ink.tertiary}20,
      transparent
    );
    animation: ${fadeInLine} 0.8s ease-out forwards;
    animation-delay: 0.3s;
  }
`;

export const SectionHint = styled.p`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.ink.tertiary};
  margin: 0.75rem 0 0 0;
  font-style: italic;
`;