import styled from 'styled-components';
import { motion } from 'framer-motion';

export const RibbonContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.ink.tertiary}33; /* Faded backing */
  padding: 4px;
  border-radius: 100px;
  width: fit-content;
  
  /* Prevent layout shifts */
  position: relative;
  z-index: 0;
`;

export const FilterItem = styled.button<{ $isActive: boolean }>`
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border-radius: 100px;
  
  /* Typography */
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.ink.primary : theme.colors.ink.secondary};
  
  transition: color 0.3s ease;
  z-index: 1; /* Sit above the sliding background */

  &:hover {
    color: ${({ theme }) => theme.colors.ink.primary};
  }
`;

// The sliding white background
export const ActiveBackdrop = styled(motion.div)`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 0; 
  right: 0;
  
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 100px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  z-index: -1; /* Behind text */
`;