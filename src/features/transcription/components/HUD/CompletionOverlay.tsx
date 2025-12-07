import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';
import { InkButton } from '@/components/common/Button/InkButton';
import { type SessionStats, formatTime, getGrade } from '@/features/transcription/hooks/useSessionStats';

// --- CONFETTI ANIMATION ---
const confettiFall = keyframes`
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
`;

const ConfettiPiece = styled.div<{ $delay: number; $left: number; $color: string }>`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${({ $color }) => $color};
  left: ${({ $left }) => $left}%;
  top: 0;
  border-radius: 2px;
  animation: ${confettiFall} 3s ease-in-out forwards;
  animation-delay: ${({ $delay }) => $delay}s;
  pointer-events: none;
`;

const ConfettiContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

// --- STYLED COMPONENTS ---
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background-color: ${({ theme }) => theme.colors.background}F2;
  backdrop-filter: blur(16px);
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Card = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.accent}40;
  padding: 2.5rem 3rem;
  border-radius: 28px;
  box-shadow: ${({ theme }) => theme.visuals.shadow.floating};
  text-align: center;
  max-width: 520px;
  width: 90%;
`;

const GradeBadge = styled(motion.div) <{ $color: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  box-shadow: 0 8px 32px ${({ $color }) => $color}50;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  
  margin: 0 auto 1.5rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.ink.primary};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontBody};
  color: ${({ theme }) => theme.colors.ink.secondary};
  margin-bottom: 2rem;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const StatBox = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}15;
  border-radius: 12px;
  padding: 0.75rem 0.5rem;
`;

const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink.tertiary};
  margin-bottom: 0.25rem;
`;

const StatValue = styled.div<{ $accent?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme, $accent }) => $accent ? theme.colors.accent : theme.colors.ink.primary};
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

// --- CONFETTI GENERATOR ---
const CONFETTI_COLORS = ['#FF6B6B', '#50FA7B', '#FFD700', '#8BE9FD', '#FF79C6', '#BD93F9'];

const generateConfetti = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    left: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  }));
};

// --- COMPONENT ---
interface CompletionProps {
  onRestart: () => void;
  title: string;
  stats?: SessionStats;
}

export const CompletionOverlay: React.FC<CompletionProps> = ({ onRestart, title, stats }) => {
  const navigate = useNavigate();
  const [confetti, setConfetti] = useState<Array<{ id: number; delay: number; left: number; color: string }>>([]);

  // Generate confetti on mount
  useEffect(() => {
    setConfetti(generateConfetti(50));
  }, []);

  const gradeInfo = stats ? getGrade(stats.accuracy) : { grade: 'A', color: '#50FA7B' };

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Confetti Animation */}
      <ConfettiContainer>
        {confetti.map((piece) => (
          <ConfettiPiece
            key={piece.id}
            $delay={piece.delay}
            $left={piece.left}
            $color={piece.color}
          />
        ))}
      </ConfettiContainer>

      <Card
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.4 }}
      >
        <GradeBadge
          $color={gradeInfo.color}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
        >
          {gradeInfo.grade}
        </GradeBadge>

        <Title>Complete!</Title>
        <Subtitle>
          You have successfully transcribed <strong>{title}</strong>.
          <br />Your memory path has been reinforced.
        </Subtitle>

        {/* Stats Grid */}
        {stats && (
          <StatsGrid>
            <StatBox>
              <StatLabel>WPM</StatLabel>
              <StatValue $accent>{stats.wordsPerMinute}</StatValue>
            </StatBox>
            <StatBox>
              <StatLabel>Accuracy</StatLabel>
              <StatValue>{stats.accuracy}%</StatValue>
            </StatBox>
            <StatBox>
              <StatLabel>Best Streak</StatLabel>
              <StatValue>{stats.bestStreak}</StatValue>
            </StatBox>
            <StatBox>
              <StatLabel>Time</StatLabel>
              <StatValue>{formatTime(stats.elapsedSeconds)}</StatValue>
            </StatBox>
          </StatsGrid>
        )}

        <ButtonRow>
          <InkButton variant="secondary" onClick={() => navigate({ to: '/library' })}>
            Library
          </InkButton>
          <InkButton variant="primary" onClick={onRestart}>
            Repeat Exercise
          </InkButton>
        </ButtonRow>
      </Card>
    </Overlay>
  );
};