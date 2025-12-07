import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { type SessionStats, formatTime } from '@/features/transcription/hooks/useSessionStats';
import {
    HUDContainer,
    StatRow,
    StatLabel,
    StatValue,
    Divider,
    StreakBadge,
    IconWrapper,
    MilestoneFlash,
} from './styles';

// Icons
const SpeedIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
);

const AccuracyIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);

const ClockIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const FireIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 23c-3.28 0-6-2.53-6-5.99 0-2.37.97-4.08 2.12-5.96.73-1.2 1.55-2.54 2.19-4.13.24-.6 1.14-.6 1.38 0 .64 1.59 1.46 2.93 2.19 4.13C15.03 13.01 16 14.72 16 17.01c0 3.46-2.72 5.99-6 5.99zm0-3c1.66 0 3-1.24 3-3s-1.34-3-3-3-3 1.24-3 3 1.34 3 3 3z" />
    </svg>
);

interface StatsHUDProps {
    stats: SessionStats;
    isVisible?: boolean;
}

export const StatsHUD: React.FC<StatsHUDProps> = ({ stats, isVisible = true }) => {
    const isStreakHot = stats.currentStreak >= 5;

    if (!isVisible) return null;

    return (
        <HUDContainer
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            {/* WPM */}
            <StatRow>
                <StatLabel>
                    <IconWrapper>{SpeedIcon}</IconWrapper>
                    WPM
                </StatLabel>
                <StatValue
                    $accent
                    key={stats.wordsPerMinute}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                >
                    {stats.wordsPerMinute}
                </StatValue>
            </StatRow>

            {/* Accuracy */}
            <StatRow>
                <StatLabel>
                    <IconWrapper>{AccuracyIcon}</IconWrapper>
                    Accuracy
                </StatLabel>
                <StatValue $color={stats.accuracy >= 95 ? '#50FA7B' : stats.accuracy >= 80 ? '#FFB86C' : '#FF5555'}>
                    {stats.accuracy}%
                </StatValue>
            </StatRow>

            <Divider />

            {/* Streak */}
            <StatRow>
                <StatLabel>Streak</StatLabel>
                <StreakBadge
                    $isHot={isStreakHot}
                    animate={isStreakHot ? {
                        scale: [1, 1.05, 1],
                    } : {}}
                    transition={{
                        duration: 0.5,
                        repeat: isStreakHot ? Infinity : 0,
                        repeatType: 'reverse'
                    }}
                >
                    {isStreakHot && <span>🔥</span>}
                    {stats.currentStreak}
                </StreakBadge>
            </StatRow>

            {/* Time */}
            <StatRow>
                <StatLabel>
                    <IconWrapper>{ClockIcon}</IconWrapper>
                    Time
                </StatLabel>
                <StatValue>
                    {formatTime(stats.elapsedSeconds)}
                </StatValue>
            </StatRow>
        </HUDContainer>
    );
};

// Milestone celebration component
interface MilestoneCelebrationProps {
    milestone: number | null;
    onComplete?: () => void;
}

export const MilestoneCelebration: React.FC<MilestoneCelebrationProps> = ({ milestone, onComplete }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (milestone && milestone > 0) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                onComplete?.();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [milestone, onComplete]);

    return (
        <AnimatePresence>
            {show && milestone && (
                <MilestoneFlash
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.5 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                    {milestone}%
                </MilestoneFlash>
            )}
        </AnimatePresence>
    );
};
