import {type Theme } from './theme.types';

export const auditTheme: Theme = {
  mode: 'audit',

  colors: {
    background: '#FFF9C4', // Legal Pad Yellow
    surface: '#FFF59D',    
    
    ink: {
      primary: '#000000',     // Pure Black
      secondary: '#424242',   
      tertiary: '#9E9E9E',    
    },

    accent: '#2962FF',        // Editor Blue
    highlight: '#FFEE58',
    panic: '#FF3D00',         // Correction Red
    success: '#00C853',
  },

  typography: {
    fontDisplay: '"Courier Prime", monospace',
    fontBody: '"Courier Prime", monospace',
    
    fontSize: {
      hero: '3rem',
      heading: '2rem',
      subheading: '1.5rem',
      body: '1.25rem',
      small: '1rem',
    },
  },

  visuals: {
    shadow: {
      resting: '4px 4px 0px rgba(0,0,0,1)', // Hard Shadows
      hover: '6px 6px 0px rgba(0,0,0,1)',
      floating: '8px 8px 0px rgba(0,0,0,1)',
    },
    radius: '0px',             
    transition: '0s', // Instant Snap
  },
};