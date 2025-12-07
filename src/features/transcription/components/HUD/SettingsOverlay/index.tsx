import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { InkButton } from '@/components/common/Button/InkButton';
import { useSettingsStore, type DisplayMode } from '@/core/store/useSettingsStore';
import {
  OverlayBackdrop,
  ControlPanel,
  Header,
  Title,
  SettingCategory,
  CategoryTitle,
  SettingRow,
  RowHeader,
  RowLabel,
  RowValue,
  PremiumSlider,
  ToggleContainer,
  ToggleSwitch,
  SegmentedControl,
  SegmentButton,
  Divider,
  FooterActions,
  CloseButton
} from './styles';

// Icons
const CloseIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>;
const ExitIcon = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>;

interface SettingsOverlayProps {
  onClose: () => void;
  chunkSize: number;
  setChunkSize: (n: number) => void;
}

const DISPLAY_MODE_LABELS: Record<DisplayMode, string> = {
  word: 'Word',
  phrase: 'Phrase',
  sentence: 'Sentence'
};

export const SettingsOverlay: React.FC<SettingsOverlayProps> = ({
  onClose,
  chunkSize,
  setChunkSize
}) => {
  const navigate = useNavigate();

  // Global settings from store
  const {
    fontScale,
    setFontScale,
    lineSpacing,
    setLineSpacing,
    displayMode,
    setDisplayMode,
    audioEnabled,
    setAudioEnabled,
    ttsEnabled,
    setTtsEnabled,
  } = useSettingsStore();

  // Handle display mode change - also update chunk size
  const handleDisplayModeChange = (mode: DisplayMode) => {
    setDisplayMode(mode);
    // Adjust chunk size based on mode
    switch (mode) {
      case 'word':
        setChunkSize(1);
        break;
      case 'phrase':
        setChunkSize(3);
        break;
      case 'sentence':
        setChunkSize(6); // Max for sentence-like chunks
        break;
    }
  };

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
          <Title>Session Settings</Title>
          <CloseButton onClick={onClose} aria-label="Close settings">
            {CloseIcon}
          </CloseButton>
        </Header>

        {/* === DISPLAY SETTINGS === */}
        <SettingCategory>
          <CategoryTitle>Display</CategoryTitle>

          {/* Display Mode */}
          <SettingRow>
            <RowLabel>Learning Mode</RowLabel>
            <SegmentedControl role="group" aria-label="Display mode">
              {(['word', 'phrase', 'sentence'] as DisplayMode[]).map((mode) => (
                <SegmentButton
                  key={mode}
                  $active={displayMode === mode}
                  onClick={() => handleDisplayModeChange(mode)}
                  aria-pressed={displayMode === mode}
                >
                  {DISPLAY_MODE_LABELS[mode]}
                </SegmentButton>
              ))}
            </SegmentedControl>
          </SettingRow>

          {/* Chunk Size (only show for phrase mode) */}
          {displayMode === 'phrase' && (
            <SettingRow>
              <RowHeader>
                <RowLabel>Words per Chunk</RowLabel>
                <RowValue>{chunkSize} words</RowValue>
              </RowHeader>
              <PremiumSlider
                type="range"
                min="2"
                max="5"
                step="1"
                value={chunkSize}
                onChange={(e) => setChunkSize(Number(e.target.value))}
                aria-label={`Words per chunk: ${chunkSize}`}
              />
            </SettingRow>
          )}
        </SettingCategory>

        {/* === TYPOGRAPHY SETTINGS === */}
        <SettingCategory>
          <CategoryTitle>Typography</CategoryTitle>

          {/* Font Size */}
          <SettingRow>
            <RowHeader>
              <RowLabel>Text Size</RowLabel>
              <RowValue>{Math.round(fontScale * 100)}%</RowValue>
            </RowHeader>
            <PremiumSlider
              type="range"
              min="0.8"
              max="1.6"
              step="0.1"
              value={fontScale}
              onChange={(e) => setFontScale(Number(e.target.value))}
              aria-label={`Text size: ${Math.round(fontScale * 100)}%`}
            />
          </SettingRow>

          {/* Line Spacing */}
          <SettingRow>
            <RowHeader>
              <RowLabel>Line Spacing</RowLabel>
              <RowValue>{lineSpacing.toFixed(1)}×</RowValue>
            </RowHeader>
            <PremiumSlider
              type="range"
              min="1.4"
              max="2.5"
              step="0.1"
              value={lineSpacing}
              onChange={(e) => setLineSpacing(Number(e.target.value))}
              aria-label={`Line spacing: ${lineSpacing.toFixed(1)}x`}
            />
          </SettingRow>
        </SettingCategory>

        {/* === AUDIO SETTINGS === */}
        <SettingCategory>
          <CategoryTitle>Audio</CategoryTitle>

          {/* Sound Effects Toggle */}
          <ToggleContainer>
            <RowLabel>Sound Effects</RowLabel>
            <ToggleSwitch
              $active={audioEnabled}
              onClick={() => setAudioEnabled(!audioEnabled)}
              role="switch"
              aria-checked={audioEnabled}
              aria-label="Toggle sound effects"
            />
          </ToggleContainer>

          {/* TTS Toggle */}
          <ToggleContainer>
            <RowLabel>Pronunciation Help (TTS)</RowLabel>
            <ToggleSwitch
              $active={ttsEnabled}
              onClick={() => setTtsEnabled(!ttsEnabled)}
              role="switch"
              aria-checked={ttsEnabled}
              aria-label="Toggle text-to-speech pronunciation"
            />
          </ToggleContainer>
        </SettingCategory>

        <Divider />

        {/* === ACTIONS === */}
        <FooterActions>
          <InkButton variant="secondary" onClick={() => navigate({ to: '/library' })}>
            <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {ExitIcon} Leave Session
            </span>
          </InkButton>

          <InkButton variant="primary" onClick={onClose}>
            Resume Practice
          </InkButton>
        </FooterActions>

      </ControlPanel>
    </OverlayBackdrop>
  );
};
