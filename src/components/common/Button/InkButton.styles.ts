import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledButton = styled(motion.button)<{ $variant?: 'primary' | 'secondary' }>`
  /* Typography */
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.02em;

  /* Shape */
  padding: 1rem 2rem;
  border-radius: 50px; /* Pill shape */
  border: none;
  cursor: pointer;
  
  /* Alignment */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  /* Color Logic: Primary */
  ${({ theme, $variant }) => $variant !== 'secondary' && `
    background-color: ${theme.colors.ink.primary};
    color: ${theme.colors.surface};
    border: 2px solid transparent;
  `}

  /* Color Logic: Secondary (Outline) */
  ${({ theme, $variant }) => $variant === 'secondary' && `
    background-color: transparent;
    color: ${theme.colors.ink.primary};
    border: 2px solid ${theme.colors.ink.tertiary};
  `}

  /* Animation */
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    
    ${({ theme, $variant }) => $variant === 'secondary' ? `
       border-color: ${theme.colors.ink.primary};
       background-color: ${theme.colors.highlight};
    ` : `
       background-color: ${theme.colors.accent};
       box-shadow: ${theme.visuals.shadow.hover};
    `}
  }

  &:active {
    transform: scale(0.97);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;