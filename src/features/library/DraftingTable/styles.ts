import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TableContainer = styled(motion.div)`
  width: 100%;
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.surface.paper};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TableHeader = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: ${({ theme }) => theme.typography.sizes.h2};
`;
