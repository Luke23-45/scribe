import React from 'react';
import { HeaderContainer, Title } from './styles';
import { InkButton } from '../../../components/common/Button/InkButton';

interface CockpitHeaderProps {
    isActive: boolean;
}

export const CockpitHeader: React.FC<CockpitHeaderProps> = ({ isActive }) => {
    return (
        <HeaderContainer
            animate={{ opacity: isActive ? 0 : 1, y: isActive ? -20 : 0 }}
            transition={{ duration: 0.6 }}
        >
            <Title>Untitled Draft</Title>
            <InkButton variant="secondary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                Exit Focus
            </InkButton>
        </HeaderContainer>
    );
};
