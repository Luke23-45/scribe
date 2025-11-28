import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledUnderlineInput = styled(motion.input)`
  width: 100%;
  background: transparent;
  border: none;
  
  /* The Line: A subtle tertiary color underline */
  border-bottom: 2px solid ${({ theme }) => theme.colors.ink.tertiary}40;
  
  /* Typography: Big, serif, confident (Like a Title) */
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: ${({ theme }) => theme.typography.fontSize.heading};
  color: ${({ theme }) => theme.colors.ink.primary};
  
  padding: 1rem 0;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  border-radius: 0; /* Reset browser default */

  &:focus {
    outline: none;
    /* Focus State: The line fills with the accent color */
    border-bottom-color: ${({ theme }) => theme.colors.accent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.ink.tertiary};
    font-style: italic;
    opacity: 0.7;
  }
`;

// Optional: Error message style if needed later
export const ErrorMessage = styled.span`
  display: block;
  margin-top: 0.5rem;
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.panic};
`;