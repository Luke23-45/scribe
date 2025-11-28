import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InvisibleSensor = styled.input`
  width: 100%;
  height: 100%;
  
  /* CRITICAL: Visual Invisibility, Interaction Visibility */
  opacity: 0; 
  cursor: default;
  
  /* Prevent zooming on mobile */
  font-size: 16px; 
  
  &:focus {
    outline: none;
  }
`;

interface RailInputProps {
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const RailInput: React.FC<RailInputProps> = ({ onKeyDown }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus persistence
  useEffect(() => {
    inputRef.current?.focus();
    const handleBlur = () => setTimeout(() => inputRef.current?.focus(), 10);
    const el = inputRef.current;
    el?.addEventListener('blur', handleBlur);
    return () => el?.removeEventListener('blur', handleBlur);
  }, []);

  return (
    <InputContainer>
      <InvisibleSensor 
        ref={inputRef}
        autoFocus
        // Value must be empty so we don't handle React controlled state logic overhead here
        // We only care about the KeyDown event trigger
        value="" 
        onChange={() => {}} // No-op to suppress React warning
        onKeyDown={onKeyDown}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false} // Kill the red squiggly line
      />
    </InputContainer>
  );
};