import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Reset & Base */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.primary};
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.heading};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    color: ${({ theme }) => theme.colors.ink};
  }

  button {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }

  input, textarea {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
  }

  /* Selection */
  ::selection {
    background-color: ${({ theme }) => theme.colors.ink};
    color: ${({ theme }) => theme.colors.background};
  }
`;
