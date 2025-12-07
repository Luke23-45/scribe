import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSessionState } from '../../../core/store/useSessionState';
import {
  Wrapper,
  ResumeCard,
  ProgressRingWrapper,
  ProgressRing,
  ProgressRingBg,
  ProgressRingFill,
  ProgressLabel,
  Meta,
  MetaLabel,
  ResumeTitle,
  ResumeDetail,
  ResumeButton
} from './styles';

// Icons
const BookmarkIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const PenIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

export const ResumeSection: React.FC = () => {
  const navigate = useNavigate();
  const { activeTextSource, progress } = useSessionState();

  if (!activeTextSource) return null;

  // Calculate progress percentage (placeholder: use actual progress from store)
  const progressPercent = progress?.percent ?? 45;
  const wordsCompleted = progress?.wordsCompleted ?? 0;
  const totalWords = progress?.totalWords ?? 0;

  return (
    <Wrapper
      initial={{ opacity: 0, x: 30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <ResumeCard>
        {/* Progress Ring */}
        <ProgressRingWrapper style={{ position: 'relative' }}>
          <ProgressRing viewBox="0 0 64 64">
            <ProgressRingBg cx="32" cy="32" r="28" />
            <ProgressRingFill cx="32" cy="32" r="28" $progress={progressPercent} />
          </ProgressRing>
          <ProgressLabel>{progressPercent}%</ProgressLabel>
        </ProgressRingWrapper>

        {/* Meta Information */}
        <Meta>
          <div>
            <MetaLabel>
              {BookmarkIcon}
              Continue Reading
            </MetaLabel>
            <ResumeTitle>{activeTextSource.title}</ResumeTitle>
            <ResumeDetail>
              {activeTextSource.author && `by ${activeTextSource.author}`}
              {totalWords > 0 && ` • ${wordsCompleted}/${totalWords} words`}
            </ResumeDetail>
          </div>

          <ResumeButton
            onClick={() => navigate({ to: '/transcription' })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {PenIcon}
            Pick Up Where You Left Off
          </ResumeButton>
        </Meta>
      </ResumeCard>
    </Wrapper>
  );
};