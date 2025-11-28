import React, { useMemo } from 'react';
import { StyledHeader, Title } from './styles';

export const GreetingSection: React.FC = () => {
  
  // Logic: Calculate "Time of Day" only once on mount
  const timeGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <StyledHeader
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Title>
        {timeGreeting}.
        {/* The subtitle guides the user's intent */}
        <span>Let's find your focus.</span>
      </Title>
    </StyledHeader>
  );
};