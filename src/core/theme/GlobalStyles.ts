import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Import Premium Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;400;500;600&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.ink.primary};
    font-family: ${({ theme }) => theme.typography.fontBody};
    line-height: 1.5;
    
    /* Font Smoothing */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* Prevent elastic scrolling for a native app feel */
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden; /* Prevent horizontal scroll only */
    overflow-y: auto;   /* Allow vertical scroll */
  }

  /* Typography Defaults */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontDisplay};
    font-weight: 400;
    color: ${({ theme }) => theme.colors.ink.primary};
  }

  /* Selection Color (Zen) */
  ::selection {
    background: ${({ theme }) => theme.colors.accent}40; /* 40% Opacity */
    color: ${({ theme }) => theme.colors.ink.primary};
  }
`;