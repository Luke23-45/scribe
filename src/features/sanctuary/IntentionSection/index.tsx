import React, { useState } from 'react';
import { AnimatePresence,motion } from 'framer-motion';
import { JournalInput } from '../../../components/common/Input/JournalInput';
import { SectionWrapper, Label, LockedStatement } from './styles';

export const IntentionSection: React.FC = () => {
  const [intention, setIntention] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleCommit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && intention.trim().length > 0) {
      setIsLocked(true);
      // Future: save to store via useSessionState()
    }
  };

  return (
    <SectionWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <Label>Daily Intention</Label>
      
      <AnimatePresence mode="wait">
        {!isLocked ? (
          <motion.div 
            key="input-mode"
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <JournalInput
              autoFocus
              placeholder="What is the one thing that matters right now?"
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              onKeyDown={handleCommit}
            />
          </motion.div>
        ) : (
          <LockedStatement
            key="locked-mode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Today, I will <strong>{intention}</strong>.
          </LockedStatement>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};