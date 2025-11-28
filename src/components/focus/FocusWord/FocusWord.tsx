import React from 'react';
import { StyledWord } from './FocusWord.styles';

interface FocusWordProps {
  text: string;
  status: 'DONE' | 'ACTIVE' | 'LOCKED' | 'HIDDEN';
  isError: boolean;
}

export const FocusWord: React.FC<FocusWordProps> = React.memo(({ text, status, isError }) => {
  return (
    <StyledWord $status={status} $isError={isError}>
      {text}
    </StyledWord>
  );
});