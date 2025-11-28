import styled, { css } from 'styled-components';
import { PaperCard } from '../common/Surface/PaperCard';

export const StyledWeatherCard = styled(PaperCard)<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  
  /* Layout: min-height ensures uniform looking cards in the grid */
  min-height: 220px;
  
  /* State Logic: Visual Selection */
  ${({ theme, $isActive }) => 
    $isActive 
      ? css`
          /* ACTIVE: Colored border and highlighted background */
          border-color: ${theme.colors.accent};
          border-width: 2px;
          background-color: ${theme.colors.background}; /* Slight recess */
        `
      : css`
          /* INACTIVE: Default Surface */
          border-color: transparent;
        `
  }
`;

export const IconWrapper = styled.div<{ $isActive?: boolean }>`
  font-size: 2rem;
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.accent : theme.colors.ink.tertiary};
  transition: color 0.3s ease;
`;

export const Title = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.ink.primary};
  margin: 0;
`;

export const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.ink.secondary};
  margin: 0;
`;