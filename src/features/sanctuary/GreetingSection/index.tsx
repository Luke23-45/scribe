import React from 'react';
import { GreetingContainer, GreetingTitle, GreetingSubtitle } from './styles';

export const GreetingSection: React.FC = () => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <GreetingContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <GreetingTitle>{getGreeting()}, Traveler.</GreetingTitle>
            <GreetingSubtitle>The sanctuary is open.</GreetingSubtitle>
        </GreetingContainer>
    );
};
