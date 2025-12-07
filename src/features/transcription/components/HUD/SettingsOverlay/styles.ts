import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const OverlayBackdrop = styled(motion.div)`
  position: absolute; /* Relative to CinemaContainer */
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 100;
  
  /* THE VISUAL BLUR */
  backdrop-filter: blur(12px) grayscale(0.5);
  background-color: ${({ theme }) => theme.colors.background}80; /* 50% opacity */
  
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 2rem;
`;

export const ControlPanel = styled(motion.div)`
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 24px;
  padding: 2.5rem;
  
  /* Physics: A heavy, floating object */
  box-shadow: ${({ theme }) => theme.visuals.shadow.floating};
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}40;
  
  display: flex;
  flex-direction: column;
  gap: 2rem;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.ink.tertiary}40;
    border-radius: 3px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.ink.tertiary}33;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1.5rem;
  margin: 0;
`;

// --- CATEGORY SECTIONS ---
export const SettingCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CategoryTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.accent}30;
`;

export const SettingRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const RowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RowLabel = styled.label`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.ink.primary};
  font-weight: 600;
`;

export const RowValue = styled.span`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.ink.secondary};
  font-weight: 500;
  background: ${({ theme }) => theme.colors.ink.tertiary}20;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

// --- PREMIUM SLIDER ---
export const PremiumSlider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.ink.tertiary}40;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.ink.tertiary}60;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  
  &:hover::-webkit-slider-thumb {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  }

  &:active::-webkit-slider-thumb {
    transform: scale(1.15);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

// --- TOGGLE SWITCH ---
export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ToggleSwitch = styled.button<{ $active: boolean }>`
  width: 52px;
  height: 28px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: background-color 0.25s ease;
  
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.accent : theme.colors.ink.tertiary + '50'};

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${({ $active }) => $active ? '27px' : '3px'};
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::after {
    box-shadow: 0 3px 8px rgba(0,0,0,0.25);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

// --- SEGMENTED CONTROL (Display Mode) ---
export const SegmentedControl = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.ink.tertiary}20;
  border-radius: 10px;
  padding: 4px;
  gap: 4px;
`;

export const SegmentButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.6rem 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.2s ease;
  
  ${({ theme, $active }) => $active ? css`
    background: ${theme.colors.surface};
    color: ${theme.colors.accent};
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  ` : css`
    background: transparent;
    color: ${theme.colors.ink.secondary};
    
    &:hover {
      background: ${theme.colors.ink.tertiary}20;
    }
  `}

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: -2px;
  }
`;

// --- DIVIDER ---
export const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.ink.tertiary}25;
  margin: 0.5rem 0;
`;

// --- FOOTER ACTIONS ---
export const FooterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.ink.tertiary}25;
`;

// --- CLOSE BUTTON ---
export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.5;
  padding: 0.5rem;
  border-radius: 8px;
  transition: opacity 0.2s, background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
    background: ${({ theme }) => theme.colors.ink.tertiary}20;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;
