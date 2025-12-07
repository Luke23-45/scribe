import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- ANIMATIONS ---
const heartPulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// --- CARD CONTAINER ---
export const StyledBookCard = styled(motion.article) <{ $interactive?: boolean }>`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
  padding: 1.5rem;
  
  /* GLASSMORPHISM EFFECT */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface}F8 0%,
    ${({ theme }) => theme.colors.surface}EE 100%
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}20;
  
  /* LAYERED SHADOW */
  box-shadow: 
    0 2px 8px rgba(0,0,0,0.04),
    0 8px 24px rgba(0,0,0,0.06),
    inset 0 1px 0 rgba(255,255,255,0.6);
    
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), 
              box-shadow 0.3s ease,
              border-color 0.3s ease;
  
  cursor: ${({ $interactive }) => $interactive ? 'pointer' : 'default'};
  
  ${({ $interactive }) => $interactive && css`
    &:hover {
      transform: translateY(-4px) scale(1.01);
      box-shadow: 
        0 4px 12px rgba(0,0,0,0.06),
        0 20px 40px rgba(0,0,0,0.12),
        inset 0 1px 0 rgba(255,255,255,0.8);
      border-color: ${({ theme }) => theme.colors.accent}40;
    }
    
    &:active {
      transform: translateY(-2px) scale(0.99);
    }
  `}
`;

// --- COVER ART AREA ---
export const CoverArt = styled.div`
  position: relative;
  height: 140px;
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.ink.tertiary}15 100%
  );
  border-radius: 12px;
  
  /* Inset effect */
  box-shadow: 
    inset 0px 2px 8px rgba(0,0,0,0.04),
    inset 0px -1px 0px rgba(255,255,255,0.5);
  
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Monogram = styled.div`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 4.5rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.ink.primary}20 0%,
    ${({ theme }) => theme.colors.accent}30 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-style: italic;
  font-weight: 700;
  line-height: 1;
  user-select: none;
`;

// --- FAVORITE BUTTON ---
export const FavoriteButton = styled.button<{ $isFavorite: boolean }>`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  background: ${({ theme, $isFavorite }) =>
    $isFavorite
      ? `${theme.colors.accent}20`
      : `${theme.colors.surface}CC`};
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  
  transition: transform 0.2s, background 0.2s;
  
  svg {
    width: 18px;
    height: 18px;
    transition: fill 0.2s, stroke 0.2s;
    fill: ${({ $isFavorite, theme }) =>
    $isFavorite ? theme.colors.accent : 'none'};
    stroke: ${({ $isFavorite, theme }) =>
    $isFavorite ? theme.colors.accent : theme.colors.ink.secondary};
    stroke-width: 2;
  }
  
  &:hover {
    transform: scale(1.1);
    background: ${({ theme, $isFavorite }) =>
    $isFavorite
      ? `${theme.colors.accent}30`
      : `${theme.colors.surface}`};
  }
  
  ${({ $isFavorite }) => $isFavorite && css`
    svg {
      animation: ${heartPulse} 0.4s ease-out;
    }
  `}
`;

// --- ACTION MENU BUTTON ---
export const ActionButton = styled.button`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  z-index: 10;
  opacity: 0;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  background: ${({ theme }) => theme.colors.surface}CC;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  
  transition: opacity 0.2s, transform 0.2s;
  
  svg {
    width: 16px;
    height: 16px;
    stroke: ${({ theme }) => theme.colors.ink.secondary};
    fill: none;
  }
  
  ${StyledBookCard}:hover & {
    opacity: 1;
  }
  
  &:hover {
    transform: scale(1.05);
    background: ${({ theme }) => theme.colors.surface};
  }
`;

// --- ACTION MENU DROPDOWN ---
export const ActionMenu = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: calc(0.75rem + 36px);
  left: 0.75rem;
  z-index: 20;
  
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}20;
  padding: 0.5rem;
  min-width: 140px;
  
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transform: ${({ $visible }) => $visible ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.95)'};
  pointer-events: ${({ $visible }) => $visible ? 'auto' : 'none'};
  transition: opacity 0.2s, transform 0.2s;
`;

export const ActionMenuItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.85rem;
  font-weight: 500;
  
  background: transparent;
  color: ${({ theme, $danger }) =>
    $danger ? '#E53935' : theme.colors.ink.primary};
  
  transition: background 0.15s;
  
  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    fill: none;
  }
  
  &:hover {
    background: ${({ theme, $danger }) =>
    $danger ? '#FFEBEE' : theme.colors.ink.tertiary}20;
  }
`;

// --- METADATA ---
export const BookMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const Title = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.ink.primary};
  margin: 0;
  line-height: 1.3;
  
  /* Elegant text overflow */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Author = styled.span`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.ink.secondary};
  font-style: italic;
`;

// --- BADGES ---
export const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

export const Badge = styled.span<{ $type?: 'accent' | 'neutral' | 'success' }>`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  
  ${({ theme, $type }) => {
    switch ($type) {
      case 'accent':
        return css`
          background: linear-gradient(135deg, ${theme.colors.accent}15 0%, ${theme.colors.accent}25 100%);
          color: ${theme.colors.accent};
        `;
      case 'success':
        return css`
          background: #E8F5E9;
          color: #43A047;
        `;
      default:
        return css`
          background: ${theme.colors.ink.tertiary}25;
          color: ${theme.colors.ink.secondary};
        `;
    }
  }}
`;

// --- FOOTER ---
export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.ink.tertiary}15;
  
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.ink.secondary};
`;

export const OpenLink = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.accent};
  
  transition: gap 0.2s;
  
  ${StyledBookCard}:hover & {
    gap: 0.6rem;
  }
`;

// --- SKELETON LOADER ---
export const SkeletonCard = styled.div`
  height: 320px;
  border-radius: 20px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.ink.tertiary}15 0%,
    ${({ theme }) => theme.colors.ink.tertiary}25 50%,
    ${({ theme }) => theme.colors.ink.tertiary}15 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;