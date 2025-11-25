import React from 'react';
import { CalibrationContainer } from './styles';
import { WeatherCard } from '../../../components/sanctuary/WeatherCard';
import { useSessionState } from '../../../core/store/useSessionState';

export const CalibrationSection: React.FC = () => {
    const { clarity, setClarity } = useSessionState();

    const options = [
        { id: 'foggy', label: 'Foggy', icon: '🌫️' },
        { id: 'hazy', label: 'Hazy', icon: '🌥️' },
        { id: 'clear', label: 'Clear', icon: '☀️' },
        { id: 'sharp', label: 'Sharp', icon: '💎' },
    ] as const;

    return (
        <CalibrationContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
        >
            {options.map((option) => (
                <WeatherCard
                    key={option.id}
                    icon={option.icon}
                    label={option.label}
                    selected={clarity === option.id}
                    onClick={() => setClarity(option.id)}
                />
            ))}
        </CalibrationContainer>
    );
};
