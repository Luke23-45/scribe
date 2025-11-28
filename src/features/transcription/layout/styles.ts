import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';

// --- ASSETS: Pure CSS/SVG Grain ---
// A micro-noise pattern to give texture to the "Paper"
const noiseSVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`;

// --- ANIMATIONS ---
const drift = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(-2%, 2%); }
  100% { transform: translate(0, 0); }
`;

// --- COMPONENTS ---

// 1. THE VIEWPORT LOCK (The "Cinema" Mode)
// Covers the entire screen, hiding the existing Nav Bar naturally via Z-Index
export const FullScreenPort = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000; /* Above EVERYTHING (Nav, Layout, etc) */
  
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden; /* No browser scrollbar in this mode */
  cursor: default; /* We will use custom cursors later */
`;

// 2. THE FILM GRAIN (Texture)
export const GrainLayer = styled.div`
  position: absolute;
  inset: -50%; /* Make larger than screen so it can move */
  width: 200%;
  height: 200%;
  background-image: ${noiseSVG};
  opacity: 0.035; /* Subtle texture, not distracting */
  pointer-events: none;
  
  /* Slowly drift the noise so it feels 'alive' like film */
  animation: ${drift} 30s infinite linear;
`;

// 3. THE OPTICAL VIGNETTE (Focus Guide)
// Darkens the corners to force eye to center
export const VignetteLayer = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 50%, 
    transparent 60%, 
    ${({ theme }) => theme.colors.ink.primary}1A 120%
  );
  pointer-events: none;
  mix-blend-mode: multiply;
`;

// 4. THE CONTENT STAGE
// Centered, constrained, focusing the user
export const StageFrame = styled.main`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  /* "Breathing" padding */
  padding: 4vw;
`;