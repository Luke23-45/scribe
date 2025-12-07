import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- AMBIENT BACKGROUND ---
import { AmbientBackground } from '../../components/sanctuary/AmbientBackground';

// --- LAYOUT ---
import { PageShell } from '../../components/layout/PageShell';

// --- FEATURES (Smart Sections) ---
import { GreetingSection } from '../../features/sanctuary/GreetingSection';
import { IntentionSection } from '../../features/sanctuary/IntentionSection';
import { CalibrationSection } from '../../features/sanctuary/CalibrationSection';
import { ResumeSection } from '../../features/sanctuary/ResumeSection';

// --- STYLED COMPONENTS ---
const SanctuaryWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const ContentLayer = styled.div`
  position: relative;
  z-index: 1;
`;

const FooterQuote = styled(motion.footer)`
  margin-top: 6rem;
  padding: 2rem 0;
  text-align: center;
  
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 0.9rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.ink.tertiary};
  opacity: 0.7;
  
  /* Decorative elements */
  &::before {
    content: '❧';
    display: block;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    opacity: 0.4;
  }
`;

// --- INSPIRATIONAL QUOTES ---
const DAILY_QUOTES = [
  { text: "The quieter you become, the more you can hear.", author: "Ram Dass" },
  { text: "In the midst of movement and chaos, keep stillness inside of you.", author: "Deepak Chopra" },
  { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
  { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh" },
  { text: "Your calm mind is the ultimate weapon against your challenges.", author: "Bryant McGill" },
  { text: "Within you there is a stillness and a sanctuary to which you can retreat.", author: "Hermann Hesse" },
  { text: "Nothing can bring you peace but yourself.", author: "Ralph Waldo Emerson" },
];

// Get quote based on day of year for consistency
const getDailyQuote = () => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length];
};

// --- PAGE COMPONENT ---
export const SanctuaryPage: React.FC = () => {
  const quote = getDailyQuote();

  return (
    <SanctuaryWrapper>
      {/* Ambient floating gradient background */}
      <AmbientBackground />

      <ContentLayer>
        <PageShell>
          {/* 1. Time-aware Greeting with typewriter effect */}
          <GreetingSection />

          {/* 2. "What matters today?" Intention Input */}
          <IntentionSection />

          {/* 3. Cognitive Load Calibration Cards */}
          <CalibrationSection />

          {/* 4. Resume Previous Session (Conditional) */}
          <ResumeSection />

          {/* 5. Daily Inspirational Footer */}
          <FooterQuote
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            "{quote.text}"
            <br />
            <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>— {quote.author}</span>
          </FooterQuote>
        </PageShell>
      </ContentLayer>
    </SanctuaryWrapper>
  );
};