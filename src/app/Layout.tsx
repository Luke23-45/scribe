import React from 'react';
import styled from 'styled-components';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';

// --- STYLES ---

const MainShell = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1400px; 
  margin: 0 auto;
  padding: 2rem;
  
  /* Ensure header doesn't overlap content visually */
  margin-top: 6rem; 
`;

// RENAMED: NavGlass -> PaperNav
const PaperNav = styled.nav`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  
  display: flex;
  gap: 2rem;
  padding: 1rem 3rem;
  
  /* NEW THEME LOGIC: Solid Paper, No Blur */
  background-color: ${({ theme }) => theme.colors.surface.paper};
  border-radius: 100px;
  
  /* The "Lifted Paper" Physics */
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border: 1px solid rgba(0,0,0,0.05); /* Very subtle seam */

  a {
    text-decoration: none;
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-weight: 500;
    font-size: 0.9rem;
    
    /* Ink Colors */
    color: ${({ theme }) => theme.colors.text.secondary};
    position: relative;
    transition: color 0.2s ease;

    &:hover, &.active {
      color: ${({ theme }) => theme.colors.text.primary};
    }
    
    /* Active Dot Indicator */
    &.active::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background-color: ${({ theme }) => theme.colors.accent.primary};
      border-radius: 50%;
    }
  }
`;

// --- COMPONENT ---

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PaperNav>
        {/* 'activeProps' adds the class 'active' when on that route */}
        <Link to="/" activeProps={{ className: 'active' }}>Sanctuary</Link>
        <Link to="/library" activeProps={{ className: 'active' }}>Library</Link>
        <Link to="/focus" activeProps={{ className: 'active' }}>Focus</Link>
      </PaperNav>

      <MainShell>
        {/* Page Transition Wrapper */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ width: '100%' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </MainShell>
    </>
  );
};