import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledCard = styled(motion.div)<{ $interactive?: boolean }>`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.visuals.radius};
  
  /* The "Paper Physics" - Solid, warm shadow */
  box-shadow: ${({ theme }) => theme.visuals.shadow.resting};
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}40; /* 40% opacity border */
  
  padding: 2rem;
  
  /* Interactive Logic */
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  will-change: transform, box-shadow;

  ${({ $interactive, theme }) => 
    $interactive && `
      &:hover {
        transform: translateY(-4px); /* Lift off desk */
        box-shadow: ${theme.visuals.shadow.hover};
        border-color: ${theme.colors.accent}60;
      }
      &:active {
        transform: translateY(0px); /* Press down */
        box-shadow: ${theme.visuals.shadow.resting};
      }
    `
  }
`;