import React from 'react';
import { StyledUnderlineInput, StyledInputWrapper, ErrorMessage } from './JournalInput.styles';
import {type HTMLMotionProps } from 'framer-motion';

interface JournalInputProps extends HTMLMotionProps<"input"> {
  error?: string;
  isLocked?: boolean; // New prop: visual state when user hits enter
}

export const JournalInput = React.forwardRef<HTMLInputElement, JournalInputProps>(
  ({ error, isLocked, ...props }, ref) => {
    
    // Logic: If locked, we might render it differently, 
    // but for now, we just disable the input style slightly
    const lockedStyle = isLocked ? { 
      cursor: 'default', 
      borderBottom: 'none', 
      textAlign: 'center' as const 
    } : {};

    return (
      <StyledInputWrapper>
        <StyledUnderlineInput
          ref={ref}
          readOnly={isLocked}
          style={lockedStyle} // Inline override for locked state behavior
          initial={{ width: '100%' }}
          {...props}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </StyledInputWrapper>
    );
  }
);

// Display Name is required for debugging with forwardRef
JournalInput.displayName = 'JournalInput';