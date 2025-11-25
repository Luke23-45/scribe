import React from 'react';
import type { ComponentProps } from 'react';
import { StyledInkButton } from './InkButton.styles';

interface InkButtonProps extends Omit<ComponentProps<typeof StyledInkButton>, '$variant'> {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

export const InkButton: React.FC<InkButtonProps> = ({
    variant = 'primary',
    children,
    ...props
}) => {
    return (
        <StyledInkButton
            $variant={variant}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </StyledInkButton>
    );
};
