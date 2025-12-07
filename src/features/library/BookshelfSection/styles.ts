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
  padding: 4rem 2rem;
  text-align: center;
  min-height: 300px;
`;

export const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.8;
`;

export const EmptyTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.ink.primary};
  margin: 0 0 0.5rem 0;
`;

export const EmptySubtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.ink.secondary};
  max-width: 400px;
  line-height: 1.5;
  margin: 0;
`;