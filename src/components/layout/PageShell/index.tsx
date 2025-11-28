import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MainContainer = styled(motion.main)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem 2rem; /* Top padding clears the Fixed Nav */
  
  display: flex;
  flex-direction: column;
  gap: 3rem; 
`;

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 }
};

export const PageShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </MainContainer>
  );
};