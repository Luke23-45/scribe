import React, { useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';

// --- ANIMATIONS ---
const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
`;

const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-40px, 30px) scale(1.05); }
  66% { transform: translate(50px, -30px) scale(0.95); }
`;

const float3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, 40px) scale(1.15); }
`;

const breathe = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
`;

// --- STYLED COMPONENTS ---
const AmbientWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  
  /* Base gradient - time-aware coloring applied via props */
  background: ${({ theme }) => theme.colors.background};
`;

const NoiseOverlay = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  mix-blend-mode: overlay;
`;

const GradientOrb = styled.div<{
    $size: number;
    $x: number;
    $y: number;
    $color: string;
    $delay: number;
    $duration: number;
    $animation: 1 | 2 | 3;
}>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  
  border-radius: 50%;
  background: ${({ $color }) => $color};
  filter: blur(80px);
  opacity: 0.4;
  
  animation: 
    ${({ $animation }) => $animation === 1 ? float1 : $animation === 2 ? float2 : float3} 
    ${({ $duration }) => $duration}s ease-in-out infinite,
    ${breathe} 8s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const VignetteOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 50%,
    ${({ theme }) => theme.colors.background}30 100%
  );
`;

// --- TIME-BASED COLOR HELPERS ---
const getTimeBasedColors = (): { orb1: string; orb2: string; orb3: string } => {
    const hour = new Date().getHours();

    // Morning (5-11): Warm golden tones
    if (hour >= 5 && hour < 12) {
        return {
            orb1: 'rgba(255, 200, 120, 0.4)',  // Warm gold
            orb2: 'rgba(255, 180, 100, 0.3)',  // Soft orange
            orb3: 'rgba(255, 220, 180, 0.25)', // Cream
        };
    }

    // Afternoon (12-17): Neutral balanced tones
    if (hour >= 12 && hour < 18) {
        return {
            orb1: 'rgba(200, 180, 160, 0.35)', // Warm gray
            orb2: 'rgba(180, 170, 200, 0.3)',  // Soft lavender
            orb3: 'rgba(220, 210, 200, 0.25)', // Cream beige
        };
    }

    // Evening (18-21): Cool calming tones
    if (hour >= 18 && hour < 22) {
        return {
            orb1: 'rgba(150, 170, 200, 0.35)', // Steel blue
            orb2: 'rgba(180, 160, 190, 0.3)',  // Dusty purple
            orb3: 'rgba(170, 180, 200, 0.25)', // Soft blue
        };
    }

    // Night (22-4): Deep tranquil tones
    return {
        orb1: 'rgba(100, 120, 160, 0.3)',  // Deep blue
        orb2: 'rgba(120, 110, 140, 0.25)', // Muted purple
        orb3: 'rgba(90, 100, 120, 0.2)',   // Charcoal blue
    };
};

// --- COMPONENT ---
export const AmbientBackground: React.FC = () => {
    const colors = useMemo(() => getTimeBasedColors(), []);

    return (
        <AmbientWrapper>
            {/* Floating gradient orbs */}
            <GradientOrb
                $size={500}
                $x={10}
                $y={15}
                $color={colors.orb1}
                $delay={0}
                $duration={25}
                $animation={1}
            />
            <GradientOrb
                $size={400}
                $x={70}
                $y={60}
                $color={colors.orb2}
                $delay={2}
                $duration={30}
                $animation={2}
            />
            <GradientOrb
                $size={350}
                $x={50}
                $y={20}
                $color={colors.orb3}
                $delay={4}
                $duration={35}
                $animation={3}
            />
            <GradientOrb
                $size={300}
                $x={20}
                $y={70}
                $color={colors.orb2}
                $delay={1}
                $duration={28}
                $animation={1}
            />

            {/* Subtle noise texture for depth */}
            <NoiseOverlay />

            {/* Soft vignette for focus */}
            <VignetteOverlay />
        </AmbientWrapper>
    );
};
