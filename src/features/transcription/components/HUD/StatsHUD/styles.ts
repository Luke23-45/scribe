import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HUDContainer = styled(motion.div)`
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 100;
  
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  /* Glassmorphism */
  background: ${({ theme }) => theme.colors.surface}CC;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  padding: 1rem 1.25rem;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}20;
  box-shadow: 
    0 4px 24px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  
  min-width: 160px;
`;

export const StatRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink.secondary};
  opacity: 0.7;
  
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const StatValue = styled(motion.span) <{ $accent?: boolean; $color?: string }>`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme, $accent, $color }) =>
        $color || ($accent ? theme.colors.accent : theme.colors.ink.primary)};
  
  /* Tabular numbers for consistent width */
  font-variant-numeric: tabular-nums;
`;

export const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.ink.tertiary}20;
  margin: 0.25rem 0;
`;

export const StreakBadge = styled(motion.div) <{ $isHot?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  
  background: ${({ $isHot }) =>
        $isHot
            ? 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)'
            : 'transparent'};
  
  color: ${({ theme, $isHot }) =>
        $isHot ? '#fff' : theme.colors.ink.primary};
  
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1rem;
  font-weight: 700;
  
  /* Fire effect when hot */
  ${({ $isHot }) => $isHot && `
    box-shadow: 0 2px 8px rgba(255, 107, 107, 0.4);
  `}
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

export const MilestoneFlash = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 4rem;
  font-weight: 800;
  text-align: center;
  
  background: linear-gradient(135deg, #FFD700 0%, #FF6B6B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  pointer-events: none;
  text-shadow: 0 4px 24px rgba(255, 215, 0, 0.3);
`;
