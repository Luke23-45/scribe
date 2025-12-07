import React, { useState, useRef } from 'react';
import {
  StyledWeatherCard,
  IconWrapper,
  Title,
  Description,
  SelectionIndicator,
  RippleEffect
} from './WeatherCard.styles';

interface WeatherCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconType: 'cloud' | 'sun';
  isActive: boolean;
  onClick: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  title,
  description,
  icon,
  iconType,
  isActive,
  onClick
}) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Create ripple effect
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { x, y, id }]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    }

    onClick();
  };

  return (
    <StyledWeatherCard
      ref={cardRef}
      $isActive={isActive}
      onClick={handleClick}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <RippleEffect
          key={ripple.id}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            marginLeft: -10,
            marginTop: -10
          }}
        />
      ))}

      <IconWrapper $isActive={isActive} $type={iconType}>
        {icon}
      </IconWrapper>

      <Title>{title}</Title>

      <Description dangerouslySetInnerHTML={{ __html: description }} />

      <SelectionIndicator $isActive={isActive} />
    </StyledWeatherCard>
  );
};