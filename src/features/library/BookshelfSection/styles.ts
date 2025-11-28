import styled from 'styled-components';

export const EngineWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const ControlsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.ink.tertiary}40;
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: ${({ theme }) => theme.typography.fontSize.heading};
  margin: 0;
`;

export const Meta = styled.span`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.ink.secondary};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  min-height: 400px; /* Prevent layout collapse when filtering */
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  text-align: center;
  
  opacity: 0.5;
  color: ${({ theme }) => theme.colors.ink.secondary};
  
  font-style: italic;
`;