import React, { useMemo, useState, useEffect } from 'react';
import { StyledHeader, DateDisplay, Title, Subtitle, TypewriterCursor, TimeEmoji } from './styles';

// Format date elegantly
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};

// Get time-of-day greeting with emoji
const getTimeGreeting = (): { greeting: string; emoji: string } => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return { greeting: "Good morning", emoji: "🌅" };
  if (hour >= 12 && hour < 17) return { greeting: "Good afternoon", emoji: "☀️" };
  if (hour >= 17 && hour < 21) return { greeting: "Good evening", emoji: "🌆" };
  return { greeting: "Good night", emoji: "🌙" };
};

export const GreetingSection: React.FC = () => {
  const { greeting, emoji } = useMemo(() => getTimeGreeting(), []);
  const formattedDate = useMemo(() => formatDate(new Date()), []);

  // Typewriter effect state
  const [displayedGreeting, setDisplayedGreeting] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullGreeting = greeting;

  // Typewriter animation
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullGreeting.length) {
        setDisplayedGreeting(fullGreeting.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        // Hide cursor after typing completes
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, 80); // Typing speed

    return () => clearInterval(timer);
  }, [fullGreeting]);

  return (
    <StyledHeader
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Current date */}
      <DateDisplay
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {formattedDate}
      </DateDisplay>

      {/* Main greeting with typewriter effect */}
      <Title>
        <TimeEmoji>{emoji}</TimeEmoji>
        {displayedGreeting}
        {showCursor && <TypewriterCursor />}
      </Title>

      {/* Subtitle that fades in after typing */}
      <Subtitle
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Let's find your focus.
      </Subtitle>
    </StyledHeader>
  );
};