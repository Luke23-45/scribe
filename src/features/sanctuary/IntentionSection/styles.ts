import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SectionWrapper = styled(motion.section)`
  margin-bottom: 4rem;
  max-width: 800px;
`;

export const Label = styled.div`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  text-transform: uppercase;
  letter-spacing: 0.1em;
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
    background: ${({ theme }) => theme.colors.ink.tertiary};
    opacity: 0.4;
  }
`;

export const LockedStatement = styled(motion.div)`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: ${({ theme }) => theme.typography.fontSize.heading};
  color: ${({ theme }) => theme.colors.ink.primary};
  
  /* Highlight the user's word */
  strong {
    font-weight: 400;
    color: ${({ theme }) => theme.colors.accent};
    border-bottom: 2px solid ${({ theme }) => theme.colors.ink.tertiary}40;
  }
`;