import React from 'react';

// --- LAYOUT ---
// The container that handles the "Smooth Fade In" of the whole page
import { PageShell } from '../../components/layout/PageShell';

// --- FEATURES (Smart Sections) ---
// Each section handles its own logic and state
import { GreetingSection } from '../../features/sanctuary/GreetingSection';
import { IntentionSection } from '../../features/sanctuary/IntentionSection';
import { CalibrationSection } from '../../features/sanctuary/CalibrationSection';
import { ResumeSection } from '../../features/sanctuary/ResumeSection';

// --- PAGE COMPONENT ---
export const SanctuaryPage: React.FC = () => {
  return (
    <PageShell>
      
      {/* 1. Time-aware Greeting */}
      <GreetingSection />
      
      {/* 2. "What matters today?" Input */}
      <IntentionSection />
      
      {/* 3. Foggy vs Sharp Selection */}
      <CalibrationSection />
      
      {/* 4. Conditional Resume Card (Only shows if previous session exists) */}
      <ResumeSection />

    </PageShell>
  );
};