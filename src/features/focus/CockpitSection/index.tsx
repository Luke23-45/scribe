import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { InkButton } from '../../../components/common/Button/InkButton';
import { ModeToggle } from '@/components/common/Toggle/ModeToggle';
import { HeaderWrapper, TitleBlock, Title } from './styles';

// Icons
const BackIcon = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;

interface CockpitProps {
  title: string;
}

export const CockpitSection: React.FC<CockpitProps> = ({ title }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  // Mouse Idle Logic: Hide cockpit after 3 seconds of no mouse movement
  useEffect(() => {
    let timeout: number;
    const resetTimer = () => {
      setIsVisible(true);
      clearTimeout(timeout);
      timeout = window.setTimeout(() => setIsVisible(false), 3000);
    };

    window.addEventListener('mousemove', resetTimer);
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <HeaderWrapper 
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <InkButton variant="secondary" onClick={() => navigate({ to: '/library' })}>
          {BackIcon} Library
        </InkButton>
      </div>

      <TitleBlock>
        <Title>{title}</Title>
      </TitleBlock>

      <div>
        <ModeToggle />
      </div>
    </HeaderWrapper>
  );
};