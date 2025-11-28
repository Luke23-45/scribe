import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledHeader = styled(motion.header)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 3rem;
  min-height: 120px; /* Reserves space to prevent layout shift */
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: ${({ theme }) => theme.typography.fontSize.hero};
  color: ${({ theme }) => theme.colors.ink.primary};
  line-height: 1.1;
  
  /* The "Fading Ink" Effect */
  span {
    color: ${({ theme }) => theme.colors.ink.secondary};
    opacity: 0.6;
    display: block; /* Force new line for the subtitle part */
    font-size: 0.6em;
    margin-top: 0.5rem;
  }
`;