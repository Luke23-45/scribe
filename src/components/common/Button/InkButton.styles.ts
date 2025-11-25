import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledInkButton = styled(motion.button) <{ $variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  background-color: ${({ theme, $variant }) =>
        $variant === 'secondary' ? 'transparent' : theme.colors.ink};
  
  color: ${({ theme, $variant }) =>
        $variant === 'secondary' ? theme.colors.ink : theme.colors.background};
  
  border: 1px solid ${({ theme, $variant }) =>
        $variant === 'secondary' ? theme.colors.ink : 'transparent'};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
    transform: translateY(-1px);
  }
`;
