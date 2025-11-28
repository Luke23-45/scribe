import React, { useRef } from 'react';
import { StageWrapper, GhostInput } from './FocusStage.styles';

interface FocusStageProps {
  children: React.ReactNode;
  onKeyDown: (e: React.KeyboardEvent) => void;
  autoFocus?: boolean;
}

export const FocusStage: React.FC<FocusStageProps> = ({ children, onKeyDown, autoFocus }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <StageWrapper onClick={handleClick}>
      <GhostInput 
        ref={inputRef}
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
        autoComplete="off"
      />
      {children}
    </StageWrapper>
  );
};