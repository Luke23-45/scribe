import React from 'react';
import { useSessionState } from '../../../core/store/useSessionState';
import { WeatherCard } from '../../../components/sanctuary/WeatherCard';
import { SectionWrapper, Grid, Label } from './styles';

// --- ENHANCED ICONS ---
const CloudIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const SunIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
);

export const CalibrationSection: React.FC = () => {
  const { userCondition, initializeSession } = useSessionState();

  return (
    <SectionWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <Label>How's Your Mind Today?</Label>
      <Grid>
        <WeatherCard
          title="Foggy"
          description="The <strong>Gentle</strong> Protocol.<br/>Short reading windows. Zero anxiety. Perfect for low-energy days."
          icon={CloudIcon}
          iconType="cloud"
          isActive={userCondition === 'foggy'}
          onClick={() => initializeSession('foggy')}
        />

        <WeatherCard
          title="Sharp"
          description="The <strong>Deep Work</strong> Protocol.<br/>High precision mode. Full statistics. For when you're ready to push."
          icon={SunIcon}
          iconType="sun"
          isActive={userCondition === 'sharp'}
          onClick={() => initializeSession('sharp')}
        />
      </Grid>
    </SectionWrapper>
  );
};