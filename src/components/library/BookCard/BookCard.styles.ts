import styled from 'styled-components';
import { PaperCard } from '../../common/Surface/PaperCard';

export const StyledBookCard = styled(PaperCard)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  
  /* Override padding for a tighter, book-like feel */
  padding: 1.5rem;
`;

export const CoverArt = styled.div`
  height: 160px;
  background-color: ${({ theme }) => theme.colors.background}; /* Recessed */
  border-radius: 4px;
  
  /* The "Inset" Shadow (Pressed in) */
  box-shadow: inset 0px 2px 6px rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.03);
  
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const Monogram = styled.div`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.ink.primary};
  opacity: 0.1; /* Very subtle watermark */
  font-style: italic;
  line-height: 1;
`;

export const BookMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Title = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: ${({ theme }) => theme.typography.fontSize.heading};
  color: ${({ theme }) => theme.colors.ink.primary};
  margin: 0;
  line-height: 1.2;
`;

export const Author = styled.span`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.ink.secondary};
  font-style: italic;
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const Badge = styled.span<{ $type?: 'accent' | 'neutral' }>`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  
  /* Dynamic Coloring */
  background-color: ${({ theme, $type }) => 
    $type === 'accent' ? `${theme.colors.accent}15` : theme.colors.ink.tertiary + '33'};
  color: ${({ theme, $type }) => 
    $type === 'accent' ? theme.colors.accent : theme.colors.ink.secondary};
`;