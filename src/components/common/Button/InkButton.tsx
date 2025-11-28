import React from 'react';
import { StyledButton } from './InkButton.styles';
import {type HTMLMotionProps } from 'framer-motion';

interface InkButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const InkButton: React.FC<InkButtonProps> = ({ 
  variant = 'primary', 
  children, 
  ...props 
}) => {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};