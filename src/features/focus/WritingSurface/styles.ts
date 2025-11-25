import styled from 'styled-components';

export const SurfaceContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 24px;
  min-height: 100vh;
`;

export const EditorArea = styled.textarea`
  width: 100%;
  min-height: 60vh;
  border: none;
  background: transparent;
  resize: none;
  outline: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 1.125rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.ink};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
    opacity: 0.5;
  }
`;
