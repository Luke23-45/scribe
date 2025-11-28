import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeaderWrapper = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 1rem 1rem;
  margin-bottom: 1rem;
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink.primary};
  margin: 0;
`;