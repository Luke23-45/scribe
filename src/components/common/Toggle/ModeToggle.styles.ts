import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  /* Reset browser button styles */
  padding: 0;
  margin: 0;
`;

export const Label = styled.span<{ $isActive: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink.primary};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.4)};
  transition: opacity 0.3s ease;
`;

export const ToggleTrack = styled.div<{ $mode: 'draft' | 'audit' }>`
  width: 50px;
  height: 26px;
  background-color: ${({ theme, $mode }) => 
    $mode === 'audit' ? theme.colors.accent : theme.colors.ink.tertiary};
  border-radius: 50px;
  position: relative;
  transition: background-color 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); /* Inner shadow for depth */
`;

export const ToggleKnob = styled(motion.div)`
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;