import React from 'react';

import { IntentionContainer } from './styles';
import { UnderlinedInput } from '../../../components/common/Input/UnderlinedInput';
import { InkButton } from '../../../components/common/Button/InkButton';
import { useSessionState } from '../../../core/store/useSessionState';

export const IntentionSection: React.FC = () => {
    const { intention, setIntention } = useSessionState();
    // const navigate = useNavigate(); // Router not set up yet

    const handleStart = () => {
        if (intention.trim()) {
            console.log('Navigating to Library...');
            // navigate({ to: '/library' });
        }
    };

    return (
        <IntentionContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
        >
            <UnderlinedInput
                placeholder="What is your intention?"
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
            />

            {intention.trim() && (
                <InkButton onClick={handleStart}>
                    Enter Sanctuary
                </InkButton>
            )}
        </IntentionContainer>
    );
};
