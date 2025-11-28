import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from '@tanstack/react-router';
// Removed 'motion' and 'AnimatePresence' from here to prevent routing conflicts
// Pages manage their own entrance via PageShell

// --- STYLES ---

const MainShell = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1400px; 
  margin: 0 auto;
  
  /* PADDING STRATEGY */
  /* Top padding ensures content starts below the Floating Nav */
  padding: 8rem 2rem 4rem 2rem; 
`;

const PaperNav = styled.nav`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000; /* Ensure it sits above everything */
  
  display: flex;
  align-items: center;
  gap: 2.5rem; /* Spacious breathing room */
  padding: 1rem 3rem;
  
  /* THEME INTEGRATION */
  background-color: ${({ theme }) => theme.colors.surface}E6; /* 90% Opacity */
  backdrop-filter: blur(12px); /* Premium Matte Blur */
  
  border-radius: 100px; /* Full pill shape */
  
  /* THEME PHYSICS */
  box-shadow: ${({ theme }) => theme.visuals.shadow.hover};
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}40;
  
  transition: all 0.3s ease;

  /* Links Styling */
  a {
    text-decoration: none;
    font-family: ${({ theme }) => theme.typography.fontBody};
    font-weight: 500;
    font-size: 0.95rem;
    letter-spacing: 0.02em;
    
    color: ${({ theme }) => theme.colors.ink.secondary};
    position: relative;
    transition: color 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);

    &:hover {
      color: ${({ theme }) => theme.colors.ink.primary};
      transform: translateY(-1px);
    }

    &.active {
      color: ${({ theme }) => theme.colors.ink.primary};
      font-weight: 600;
    }
    
    /* The "Zen Dot" Indicator */
    &.active::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background-color: ${({ theme }) => theme.colors.accent};
      border-radius: 50%;
      box-shadow: 0 2px 4px ${({ theme }) => theme.colors.accent}66;
      animation: fadeIn 0.3s ease-out forwards;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translate(-50%, 4px); }
    to { opacity: 1; transform: translate(-50%, 0); }
  }
`;

// --- COMPONENT ---

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PaperNav>
        <Link to="/" activeProps={{ className: 'active' }}>
          Sanctuary
        </Link>
        <Link to="/library" activeProps={{ className: 'active' }}>
          Library
        </Link>
        <Link to="/session" activeProps={{ className: 'active' }}>
          Focus
        </Link>
      </PaperNav>

      <MainShell>
        {/* 
           PURE ROUTER OUTLET 
           We removed AnimatePresence/motion.div wrapper.
           This ensures when the Router swaps pages, the new page MOUNTS immediately
           and reliably.
        */}
        {children}
      </MainShell>
    </>
  );
};