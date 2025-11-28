import styled from 'styled-components';
import { PaperCard } from '@/components/common/Surface/PaperCard';

export const ReviewSurface = styled(PaperCard)`
  padding: 4rem;
  min-height: 60vh;
  display: block; /* Standard document flow */
  
  /* When hovering the container, dim ALL sentences by default */
  &:hover span {
    opacity: 0.3;
  }
`;

export const Sentence = styled.span`
  /* Theme handles the font change (Monospace in Audit mode) */
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.ink.primary};
  
  cursor: crosshair; /* Precision feel */
  transition: opacity 0.2s ease, background-color 0.2s ease;
  padding: 0.2rem 0;
  border-radius: 4px;

  /* On specific hover, highlight THIS sentence */
  &:hover {
    opacity: 1 !important; /* Force visibility */
    background-color: ${({ theme }) => theme.colors.accent}20; /* 20% opacity highlight */
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.accent}20; /* Spread highlight */
  }
`;