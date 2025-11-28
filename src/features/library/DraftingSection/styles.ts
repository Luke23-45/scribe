import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PaperCard } from '../../../components/common/Surface/PaperCard';

export const SectionWrapper = styled(motion.section)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 3rem;
  margin-bottom: 4rem;
  /* Visual separation from the Bookshelf */
  border-top: 1px dashed ${({ theme }) => theme.colors.ink.tertiary}66; 
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: ${({ theme }) => theme.typography.fontSize.heading};
  color: ${({ theme }) => theme.colors.ink.primary};
  margin: 0;
`;

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.ink.secondary};
  max-width: 600px;
`;

// Extends PaperCard but removes default padding to allow edge-to-edge feel
export const StudioSurface = styled(PaperCard)`
  padding: 0; 
  overflow: hidden; /* Contains the text area */
  position: relative;
`;

export const LinedTextArea = styled.textarea`
  width: 100%;
  min-height: 240px;
  border: none;
  resize: vertical;
  
  /* PADDING: Must align with the line height to keep text on lines */
  padding: 1.25rem 2rem; 
  
  /* THE LINED PAPER EFFECT */
  background-color: transparent;
  background-image: linear-gradient(${({ theme }) => theme.colors.ink.tertiary}40 1px, transparent 1px);
  background-size: 100% 2.5rem; /* The height of one 'line' */
  background-attachment: local; /* Scrolls with text */
  
  /* TYPOGRAPHY MATCHING */
  line-height: 2.5rem; /* Must match background-size */
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.ink.primary};

  &:focus {
    outline: none;
    /* We can darken the lines slightly on focus if desired, 
       but keeping it static is more "paper-like" */
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.ink.tertiary};
    opacity: 0.7;
    font-style: italic;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.background}; /* Slightly darker bottom bar */
  border-top: 1px solid ${({ theme }) => theme.colors.ink.tertiary}40;
`;

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  padding: 1rem 2rem 0 2rem;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.ink.tertiary}40;
`;

export const MetadataInput = styled.input`
  width: 100%;
  padding: 1rem 0;
  border: none;
  background: transparent;
  
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.ink.primary};
  
  &:focus {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.accent};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.ink.tertiary};
  }
`;

