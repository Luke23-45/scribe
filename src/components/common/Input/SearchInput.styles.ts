import styled from 'styled-components';

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 1.25rem;
  color: ${({ theme }) => theme.colors.ink.tertiary};
  pointer-events: none;
  display: flex;
`;

export const StyledSearchInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem; /* Left padding space for icon */
  
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.ink.primary};
  
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}40;
  border-radius: 100px; /* Full pill */
  
  /* Paper Shadow */
  box-shadow: ${({ theme }) => theme.visuals.shadow.resting};
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);

  &::placeholder {
    color: ${({ theme }) => theme.colors.ink.tertiary};
    opacity: 0.8;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.visuals.shadow.hover};
    transform: translateY(-1px);
  }
`;