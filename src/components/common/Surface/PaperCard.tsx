import React from 'react';
import { StyledCard } from './PaperCard.styles';
import {type HTMLMotionProps } from 'framer-motion';

interface PaperCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  interactive?: boolean; // Renamed prop for clarity
}

export const PaperCard: React.FC<PaperCardProps> = ({ 
  children, 
  interactive = false, 
  ...props 
}) => {
  return (
    <StyledCard 
      $interactive={interactive} 
      {...props}
    >
      {children}
    </StyledCard>
  );
};