import React from 'react';
import { StyledPaperCard } from './PaperCard.styles';
import {type HTMLMotionProps } from 'framer-motion';

interface PaperCardProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode;
}

export const PaperCard: React.FC<PaperCardProps> = ({ children, ...props }) => {
    return (
        <StyledPaperCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            {...props}
        >
            {children}
        </StyledPaperCard>
    );
};
