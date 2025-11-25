import React from 'react';
import { StyledWeatherCard, WeatherIcon, WeatherLabel } from './WeatherCard.styles';

interface WeatherCardProps {
    icon: React.ReactNode;
    label: string;
    selected?: boolean;
    onClick?: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
    icon,
    label,
    selected,
    onClick
}) => {
    return (
        <StyledWeatherCard
            $selected={selected}
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
        >
            <WeatherIcon>{icon}</WeatherIcon>
            <WeatherLabel>{label}</WeatherLabel>
        </StyledWeatherCard>
    );
};
