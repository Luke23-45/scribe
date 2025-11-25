export const draftTheme = {
  colors: {
    background: '#FAF9F6', // Warm Rice Paper
    ink: '#2C2C2C', // Charcoal Ink
    text: {
      primary: '#2C2C2C',
      secondary: '#5A5A5A',
      muted: '#8C8C8C',
    },
    surface: {
      paper: '#FFFFFF',
      shadow: 'rgba(44, 44, 44, 0.08)',
    },
    accent: {
      primary: '#2C2C2C', // Using Ink as primary accent for now
      subtle: '#E0E0E0',
    }
  },
  typography: {
    fontFamily: {
      heading: '"Fraunces", serif',
      body: '"Inter", sans-serif',
    },
    weights: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    sizes: {
      h1: '3rem',
      h2: '2.25rem',
      h3: '1.5rem',
      body: '1rem',
      small: '0.875rem',
    }
  },
  shadows: {
    soft: '0px 4px 20px rgba(44, 44, 44, 0.05)',
    medium: '0px 8px 30px rgba(44, 44, 44, 0.08)',
    deep: '0px 12px 40px rgba(44, 44, 44, 0.12)',
  },
  transitions: {
    default: '0.6s ease-out',
    fast: '0.3s ease-out',
  }
};

export type ThemeType = typeof draftTheme;
