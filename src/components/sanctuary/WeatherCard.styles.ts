import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- ANIMATIONS ---
const cloudDrift = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
`;

const sunPulse = keyframes`
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(255,180,100,0.3)); }
  50% { transform: scale(1.05); filter: drop-shadow(0 0 16px rgba(255,180,100,0.5)); }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const ripple = keyframes`
  0% { transform: scale(0); opacity: 0.3; }
  100% { transform: scale(4); opacity: 0; }
`;

// --- STYLED COMPONENTS ---
export const StyledWeatherCard = styled(motion.button) <{ $isActive?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 2rem;
  min-height: 240px;
  
  /* Reset button styles */
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
  
  /* GLASSMORPHISM SURFACE */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface}F5 0%,
    ${({ theme }) => theme.colors.surface}E0 100%
  );
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  
  border-radius: 24px;
  
  /* Border: gradient on active, subtle on inactive */
  ${({ $isActive, theme }) => $isActive ? css`
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 24px;
      padding: 2px;
      background: linear-gradient(
        135deg,
        ${theme.colors.accent} 0%,
        ${theme.colors.accent}80 50%,
        ${theme.colors.accent}40 100%
      );
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
  ` : css`
    border: 1px solid ${theme.colors.ink.tertiary}20;
  `}
  
  /* Shadow */
  box-shadow: 
    0 4px 16px rgba(0,0,0,0.04),
    0 12px 40px rgba(0,0,0,0.06),
    inset 0 1px 0 rgba(255,255,255,0.7);
  
  /* Hover glow */
  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 25px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.accent}00 0%,
      ${({ theme }) => theme.colors.accent}20 50%,
      ${({ theme }) => theme.colors.accent}00 100%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
    filter: blur(20px);
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), 
              box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 
      0 8px 24px rgba(0,0,0,0.08),
      0 24px 60px rgba(0,0,0,0.12),
      inset 0 1px 0 rgba(255,255,255,0.9);
  }
  
  &:active {
    transform: translateY(-2px) scale(0.98);
  }
  
  /* Active state background */
  ${({ $isActive, theme }) => $isActive && css`
    background: linear-gradient(
      135deg,
      ${theme.colors.background} 0%,
      ${theme.colors.surface} 100%
    );
  `}
`;

export const RippleEffect = styled.span`
  position: absolute;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent}30;
  animation: ${ripple} 0.6s ease-out forwards;
  pointer-events: none;
`;

export const IconWrapper = styled.div<{ $isActive?: boolean; $type: 'cloud' | 'sun' }>`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  border-radius: 16px;
  background: ${({ theme, $isActive }) =>
    $isActive
      ? `linear-gradient(135deg, ${theme.colors.accent}20 0%, ${theme.colors.accent}10 100%)`
      : `${theme.colors.ink.tertiary}10`};
  
  transition: background 0.3s, transform 0.3s;
  
  svg {
    width: 28px;
    height: 28px;
    stroke: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.accent : theme.colors.ink.secondary};
    transition: stroke 0.3s;
    
    ${({ $type }) => $type === 'cloud' && css`
      animation: ${cloudDrift} 4s ease-in-out infinite;
    `}
    
    ${({ $type, $isActive }) => $type === 'sun' && $isActive && css`
      animation: ${sunPulse} 3s ease-in-out infinite;
    `}
  }
  
  ${StyledWeatherCard}:hover & {
    transform: scale(1.05);
  }
`;

export const Title = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.ink.primary};
  margin: 0;
  font-weight: 500;
`;

export const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.ink.secondary};
  margin: 0;
  flex: 1;
  
  br {
    display: block;
    margin-top: 0.5rem;
    content: '';
  }
`;

export const SelectionIndicator = styled.div<{ $isActive: boolean }>`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  
  width: 24px;
  height: 24px;
  border-radius: 50%;
  
  ${({ $isActive, theme }) => $isActive ? css`
    background: ${theme.colors.accent};
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
    }
  ` : css`
    border: 2px solid ${theme.colors.ink.tertiary}40;
  `}
  
  transition: all 0.3s ease;
`;