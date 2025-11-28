import {type Theme } from './theme.types';

export const draftTheme: Theme = {
  mode: 'draft',

  colors: {
    background: '#FAF9F6',  // Warm "Rice Paper"
    surface: '#FFFFFF',     // Pure White Paper
    
    ink: {
      primary: '#2C2C2C',    // Soft Charcoal
      secondary: '#6E6B65',  // Warm Gray
      tertiary: '#E5E0D8',   // Light Stone
    },

    accent: '#8DA399',      // Eucalyptus Sage
    highlight: '#F0EFE9',    // Very subtle beige hover
    panic: '#D4A373',        // Muted Gold
    success: '#8DA399',      
  },

  typography: {
    fontDisplay: '"Fraunces", "Georgia", serif', 
    fontBody: '"Inter", system-ui, -apple-system, sans-serif',
    
    fontSize: {
      hero: '3.5rem',
      heading: '2rem',
      subheading: '1.25rem',
      body: '1rem',
      small: '0.875rem',
    },
  },

  visuals: {
    shadow: {
      // Shadows are brown-tinted (#3C3C32), not black, for warmth
      resting: '0px 2px 4px rgba(60, 60, 50, 0.04)',
      hover: '0px 8px 24px rgba(60, 60, 50, 0.08)',
      floating: '0px 20px 40px rgba(60, 60, 50, 0.12)',
    },
    radius: '12px',          
    transition: '0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', 
  },
};