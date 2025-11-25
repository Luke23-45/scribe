import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { CockpitHeader } from '../../features/focus/CockpitHeader';
import { WritingSurface } from '../../features/focus/WritingSurface';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
`;

export const FocusPage: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const handleActivity = useCallback(() => {
        setIsActive(false);
        if (timer) clearTimeout(timer);

        const newTimer = setTimeout(() => {
            setIsActive(true);
        }, 3000);

        setTimer(newTimer);
    }, [timer]);

    useEffect(() => {
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            if (timer) clearTimeout(timer);
        };
    }, [handleActivity, timer]);

    return (
        <PageContainer>
            <CockpitHeader isActive={isActive} />
            <WritingSurface onActivity={handleActivity} />
        </PageContainer>
    );
};
