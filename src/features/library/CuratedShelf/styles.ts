import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ShelfContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 32px;
  width: 100%;
  margin-bottom: 64px;
`;

export const BookCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface.paper};
  height: 280px;
  border-radius: 4px 12px 12px 4px;
  box-shadow: 
    inset 4px 0 12px rgba(0,0,0,0.05),
    ${({ theme }) => theme.shadows.medium};
  cursor: pointer;
  position: relative;
  transition: transform ${({ theme }) => theme.transitions.default};
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-left: 8px solid ${({ theme }) => theme.colors.ink};

  &:hover {
    transform: translateY(-8px) rotateY(-5deg);
    box-shadow: ${({ theme }) => theme.shadows.deep};
  }
`;

export const BookTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: ${({ theme }) => theme.typography.sizes.h3};
  margin-bottom: 8px;
`;

export const BookMeta = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.small};
  color: ${({ theme }) => theme.colors.text.muted};
`;
