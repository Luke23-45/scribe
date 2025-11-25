import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledPaperCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface.paper};
  border-radius: 12px;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: box-shadow ${({ theme }) => theme.transitions.default};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;
