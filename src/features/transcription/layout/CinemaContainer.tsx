import React, { useEffect } from 'react';
import { FullScreenPort, GrainLayer, VignetteLayer, StageFrame } from './styles';

interface CinemaContainerProps {
  children: React.ReactNode;
}

export const CinemaContainer: React.FC<CinemaContainerProps> = ({ children }) => {
  
  // Immersive Utility:
  // Optional: Auto-request Fullscreen on mount (Can trigger browser warning, 
  // maybe better to attach to a "Start" button)
  // For now, we simulate it via CSS coverage.

  return (
    <FullScreenPort
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // "Expo Out" for slow luxury feel
    >
      {/* 1. Texture Stack */}
      <GrainLayer />
      <VignetteLayer />

      {/* 2. Content Zone */}
      <StageFrame>
        {children}
      </StageFrame>

    </FullScreenPort>
  );
};