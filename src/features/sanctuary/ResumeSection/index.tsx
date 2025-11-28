import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSessionState } from '../../../core/store/useSessionState';
import { InkButton } from '../../../components/common/Button/InkButton';
import { Wrapper, ResumeCard, Meta, ResumeTitle, ProgressBar } from './styles';

export const ResumeSection: React.FC = () => {
  const navigate = useNavigate();
  const { activeTextSource } = useSessionState();

  if (!activeTextSource) return null; // Don't render if nothing to resume

  return (
    <Wrapper
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <ResumeCard interactive>
        <Meta>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6 }}>
            Previous Session
          </div>
          <ResumeTitle>{activeTextSource.title}</ResumeTitle>
          <ProgressBar />
        </Meta>
        
        <InkButton 
          variant="primary" 
          onClick={() => navigate({ to: '/library' })}
          style={{ width: '100%' }}
        >
          Pick up Pen
        </InkButton>
      </ResumeCard>
    </Wrapper>
  );
};