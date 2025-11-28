import styled from 'styled-components';
import { PaperCard } from '@/components/common/Surface/PaperCard';

export const SidebarContainer = styled.aside`
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-right: 1px dashed ${({ theme }) => theme.colors.ink.tertiary}40;
  padding-right: 2rem;
  
  /* On mobile, this would move to bottom or drawer */
`;

export const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.ink.secondary};
  font-weight: 700;
`;

// Custom Range Slider Styling (CSS Tricks)
export const RangeSlider = styled.input`
  width: 100%;
  cursor: pointer;
  /* (Add refined Webkit slider styling here if desired for premium look) */
`;