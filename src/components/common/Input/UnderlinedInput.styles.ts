import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledInput = styled(motion.input)`
  width: 100%;
  padding: 12px 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: ${({ theme }) => theme.typography.sizes.h3};
  color: ${({ theme }) => theme.colors.ink};
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.accent.subtle};
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.ink};
  }
`;
