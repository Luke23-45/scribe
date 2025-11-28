import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PaperCard } from '../../../components/common/Surface/PaperCard';

export const Wrapper = styled(motion.div)`
  margin-top: 4rem;
  display: flex;
  justify-content: flex-end; /* Align right to feel like a "Side Note" */
`;

// Extends PaperCard for specific layout
export const ResumeCard = styled(PaperCard)`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-left: 4px solid ${({ theme }) => theme.colors.accent}; /* Status indicator */
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ResumeTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: ${({ theme }) => theme.typography.fontSize.heading};
  color: ${({ theme }) => theme.colors.ink.primary};
  margin: 0;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.colors.ink.tertiary}66; /* Transparent */
  margin-top: 0.5rem;
  position: relative;
  
  /* The Filled Part */
  &::after {
    content: '';
    position: absolute;
    left: 0; top: 0;
    height: 100%;
    width: 45%; /* Placeholder percent */
    background: ${({ theme }) => theme.colors.accent};
  }
`;