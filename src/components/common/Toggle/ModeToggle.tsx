import React from 'react';
import { useSessionState } from '@/core/store/useSessionState';
import { Wrapper, Label, ToggleTrack, ToggleKnob } from './ModeToggle.styles';

export const ModeToggle: React.FC = () => {
  const { workMode, toggleWorkMode } = useSessionState();
  const isAudit = workMode === 'audit';

  return (
    <Wrapper onClick={toggleWorkMode} title="Toggle Visual Mode">
      <Label $isActive={!isAudit}>Write</Label>
      
      <ToggleTrack $mode={workMode}>
        <ToggleKnob 
          layout 
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          initial={false}
          animate={{ x: isAudit ? 24 : 0 }}
        />
      </ToggleTrack>
      
      <Label $isActive={isAudit}>Review</Label>
    </Wrapper>
  );
};