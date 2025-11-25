import React from 'react';
import styled from 'styled-components';
import { GreetingSection } from '../../features/sanctuary/GreetingSection';
import { CalibrationSection } from '../../features/sanctuary/CalibrationSection';
import { IntentionSection } from '../../features/sanctuary/IntentionSection';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SanctuaryPage: React.FC = () => {
  return (
    <PageContainer>
      <GreetingSection />
      <CalibrationSection />
      <IntentionSection />
    </PageContainer>
  );
};