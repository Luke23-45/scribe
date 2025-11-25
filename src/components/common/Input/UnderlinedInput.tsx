import React from 'react';
import type { ComponentProps } from 'react';
import { StyledInput, StyledInputWrapper } from './UnderlinedInput.styles';

interface UnderlinedInputProps extends ComponentProps<typeof StyledInput> {
    placeholder?: string;
}

export const UnderlinedInput: React.FC<UnderlinedInputProps> = ({ placeholder, ...props }) => {
    return (
        <StyledInputWrapper>
            <StyledInput
                placeholder={placeholder}
                {...props}
            />
        </StyledInputWrapper>
    );
};
