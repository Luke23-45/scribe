import styled from 'styled-components';
import { motion } from 'framer-motion';

export const GreetingContainer = styled(motion.section)`
  text-align: center;
  margin-bottom: 64px;
`;

export const GreetingTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes.h1};
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.ink};
`;

export const GreetingSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.h3};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-style: italic;
`;
