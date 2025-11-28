import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { InkButton } from '@/components/common/Button/InkButton';
import { OverlayBackdrop, ControlPanel, Header, Title, SettingRow, RowLabel, PremiumSlider } from './styles';

// Icons
const CloseIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>;
const ExitIcon = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;

interface SettingsOverlayProps {
  onClose: () => void;
  chunkSize: number;
  setChunkSize: (n: number) => void;
}

export const SettingsOverlay: React.FC<SettingsOverlayProps> = ({ 
  onClose, 
  chunkSize, 
  setChunkSize 
}) => {
  const navigate = useNavigate();

  return (
    <OverlayBackdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ControlPanel
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.3 }}
      >
        <Header>
          <Title>Studio Settings</Title>
          {/* Quick Close Button */}
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}>
            {CloseIcon}
          </button>
        </Header>

        {/* SETTING 1: Chunk Size */}
        <SettingRow>
          <RowLabel>Chunk Visibility ({chunkSize} Words)</RowLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Focused</span>
            <PremiumSlider 
              type="range" 
              min="2" max="6" step="1"
              value={chunkSize}
              onChange={(e) => setChunkSize(Number(e.target.value))}
            />
            <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Contextual</span>
          </div>
        </SettingRow>

        {/* SETTING 2: Font Size (Placeholder) */}
        <SettingRow>
            <RowLabel>Font Size</RowLabel>
             <PremiumSlider type="range" disabled style={{ opacity: 0.3 }} />
        </SettingRow>

        <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', margin: '1rem 0' }} />

        {/* ACTION: Exit Session */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <InkButton variant="secondary" onClick={() => navigate({ to: '/library' })}>
            <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {ExitIcon} Leave Session
            </span>
          </InkButton>
          
          <InkButton variant="primary" onClick={onClose}>
            Resume
          </InkButton>
        </div>

      </ControlPanel>
    </OverlayBackdrop>
  );
};