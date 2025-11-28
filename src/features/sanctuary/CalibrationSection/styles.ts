import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SectionWrapper = styled(motion.section)`
  width: 100%;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
`;

// We reuse the Label style from Intention, or export a common "SectionHeader"
// For now, repeating specific component for modularity is safer.
export const Label = styled.div`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.ink.secondary};
  font-weight: 600;
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