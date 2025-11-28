import styled from 'styled-components';
import { motion } from 'framer-motion';

export const OverlayBackdrop = styled(motion.div)`
  position: absolute; /* Relative to CinemaContainer */
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 100;
  
  /* THE VISUAL BLUR */
  /* We heavily blur the "Paper" behind to shift focus to settings */
  backdrop-filter: blur(12px) grayscale(0.5);
  background-color: ${({ theme }) => theme.colors.background}80; /* 50% opacity */
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ControlPanel = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 24px;
  padding: 3rem;
  
  /* Physics: A heavy, floating object */
  box-shadow: ${({ theme }) => theme.visuals.shadow.floating};
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}40;
  
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.ink.tertiary}33;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1.5rem;
  margin: 0;
`;

export const SettingRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RowLabel = styled.label`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.ink.secondary};
  font-weight: 700;
`;

// A stylized range slider
export const PremiumSlider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.ink.tertiary}40;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: transform 0.1s;
  }
  
  &:active::-webkit-slider-thumb {
    transform: scale(1.2);
  }
`;