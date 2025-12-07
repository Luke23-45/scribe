import { useState, useCallback, useRef, useMemo } from 'react';

export interface SessionStats {
    // Core metrics
    wordsPerMinute: number;
    accuracy: number;
    currentStreak: number;
    bestStreak: number;

    // Counts
    correctChars: number;
    totalKeystrokes: number;
    errorCount: number;
    wordsCompleted: number;

    // Time
    sessionStartTime: number | null;
    elapsedSeconds: number;

    // Milestones
    lastMilestone: number;
}

interface UseSessionStatsReturn {
    stats: SessionStats;
    recordCorrectChar: () => void;
    recordError: () => void;
    recordWordComplete: () => void;
    startSession: () => void;
    resetSession: () => void;
    updateElapsedTime: () => void;
    checkMilestone: (progress: number) => number | null;
}

const MILESTONE_THRESHOLDS = [10, 25, 50, 75, 90, 100];

export const useSessionStats = (): UseSessionStatsReturn => {
    const [stats, setStats] = useState<SessionStats>({
        wordsPerMinute: 0,
        accuracy: 100,
        currentStreak: 0,
        bestStreak: 0,
        correctChars: 0,
        totalKeystrokes: 0,
        errorCount: 0,
        wordsCompleted: 0,
        sessionStartTime: null,
        elapsedSeconds: 0,
        lastMilestone: 0,
    });

    const intervalRef = useRef<number | null>(null);

    // Start the session timer
    const startSession = useCallback(() => {
        if (stats.sessionStartTime === null) {
            const now = Date.now();
            setStats(prev => ({ ...prev, sessionStartTime: now }));

            // Start elapsed time updater
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = window.setInterval(() => {
                setStats(prev => {
                    if (!prev.sessionStartTime) return prev;
                    const elapsed = Math.floor((Date.now() - prev.sessionStartTime) / 1000);
                    return { ...prev, elapsedSeconds: elapsed };
                });
            }, 1000);
        }
    }, [stats.sessionStartTime]);

    // Record a correct character typed
    const recordCorrectChar = useCallback(() => {
        setStats(prev => {
            const newCorrect = prev.correctChars + 1;
            const newTotal = prev.totalKeystrokes + 1;
            const newAccuracy = newTotal > 0 ? Math.round((newCorrect / newTotal) * 100) : 100;

            // Calculate WPM: (characters / 5) / minutes
            const minutes = prev.elapsedSeconds / 60 || 1 / 60; // Avoid division by zero
            const wpm = Math.round((newCorrect / 5) / minutes);

            return {
                ...prev,
                correctChars: newCorrect,
                totalKeystrokes: newTotal,
                accuracy: newAccuracy,
                wordsPerMinute: Math.min(wpm, 999), // Cap at 999
            };
        });
    }, []);

    // Record an error
    const recordError = useCallback(() => {
        setStats(prev => {
            const newTotal = prev.totalKeystrokes + 1;
            const newErrors = prev.errorCount + 1;
            const newAccuracy = newTotal > 0 ? Math.round((prev.correctChars / newTotal) * 100) : 100;

            return {
                ...prev,
                totalKeystrokes: newTotal,
                errorCount: newErrors,
                accuracy: newAccuracy,
                currentStreak: 0, // Reset streak on error
            };
        });
    }, []);

    // Record a word completed
    const recordWordComplete = useCallback(() => {
        setStats(prev => {
            const newStreak = prev.currentStreak + 1;
            const newBest = Math.max(prev.bestStreak, newStreak);

            return {
                ...prev,
                wordsCompleted: prev.wordsCompleted + 1,
                currentStreak: newStreak,
                bestStreak: newBest,
            };
        });
    }, []);

    // Update elapsed time manually
    const updateElapsedTime = useCallback(() => {
        setStats(prev => {
            if (!prev.sessionStartTime) return prev;
            const elapsed = Math.floor((Date.now() - prev.sessionStartTime) / 1000);
            return { ...prev, elapsedSeconds: elapsed };
        });
    }, []);

    // Check for milestone achievements
    const checkMilestone = useCallback((progress: number): number | null => {
        const currentMilestone = MILESTONE_THRESHOLDS.find(
            threshold => progress >= threshold && threshold > stats.lastMilestone
        );

        if (currentMilestone) {
            setStats(prev => ({ ...prev, lastMilestone: currentMilestone }));
            return currentMilestone;
        }
        return null;
    }, [stats.lastMilestone]);

    // Reset session
    const resetSession = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        setStats({
            wordsPerMinute: 0,
            accuracy: 100,
            currentStreak: 0,
            bestStreak: 0,
            correctChars: 0,
            totalKeystrokes: 0,
            errorCount: 0,
            wordsCompleted: 0,
            sessionStartTime: null,
            elapsedSeconds: 0,
            lastMilestone: 0,
        });
    }, []);

    return {
        stats,
        recordCorrectChar,
        recordError,
        recordWordComplete,
        startSession,
        resetSession,
        updateElapsedTime,
        checkMilestone,
    };
};

// Utility: Format seconds to MM:SS
export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Utility: Get grade based on accuracy
export const getGrade = (accuracy: number): { grade: string; color: string } => {
    if (accuracy >= 98) return { grade: 'S', color: '#FFD700' }; // Gold
    if (accuracy >= 95) return { grade: 'A', color: '#50FA7B' }; // Green
    if (accuracy >= 90) return { grade: 'B', color: '#8BE9FD' }; // Cyan
    if (accuracy >= 80) return { grade: 'C', color: '#FFB86C' }; // Orange
    return { grade: 'D', color: '#FF5555' }; // Red
};
