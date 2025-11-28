import React from 'react';
import { StyledWeatherCard, IconWrapper, Title, Description } from './WeatherCard.styles';

interface WeatherCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  title,
  description,
  icon,
  isActive,
  onClick
}) => {
  return (
    <StyledWeatherCard 
      interactive 
      $isActive={isActive} 
      onClick={onClick}
      // Framer Motion Prop for nice entrance
      whileHover={{ y: -5 }} 
      whileTap={{ scale: 0.98 }}
    >
      <IconWrapper $isActive={isActive}>
        {icon}
      </IconWrapper>
      <Title>{title}</Title>
      <Description dangerouslySetInnerHTML={{ __html: description }} />
    </StyledWeatherCard>
  );
};