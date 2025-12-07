import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { JournalInput } from '../../../components/common/Input/JournalInput';
import {
  SectionWrapper,
  Label,
  InputWrapper,
  BreathingCursor,
  LockedStatement,
  LockedLabel,
  EditButton
} from './styles';

// --- ROTATING PLACEHOLDERS ---
const INTENTION_PROMPTS = [
  "What is the one thing that matters right now?",
  "What would make today meaningful?",
  "If I could only accomplish one thing...",
  "What deserves my full attention today?",
  "What will I be grateful I focused on?",
];

// Icons
const LockIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EditIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export const IntentionSection: React.FC = () => {
  const [intention, setIntention] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  // Rotate placeholders every 4 seconds when not focused
  useEffect(() => {
    if (isFocused || intention.length > 0) return;

    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % INTENTION_PROMPTS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isFocused, intention]);

  const currentPlaceholder = useMemo(() =>
    INTENTION_PROMPTS[placeholderIndex],
    [placeholderIndex]
  );

  const handleCommit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && intention.trim().length > 0) {
      setIsLocked(true);
    }
  };

  const handleEdit = () => {
    setIsLocked(false);
  };

  return (
    <SectionWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <Label>Today's Intention</Label>

      <AnimatePresence mode="wait">
        {!isLocked ? (
          <InputWrapper
            key="input-mode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <JournalInput
              autoFocus
              placeholder={currentPlaceholder}
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              onKeyDown={handleCommit}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            {/* Breathing cursor shown when empty and focused */}
            {intention.length === 0 && isFocused && <BreathingCursor />}
          </InputWrapper>
        ) : (
          <motion.div
            key="locked-mode"
            style={{ position: 'relative' }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <LockedStatement>
              <LockedLabel>
                {LockIcon}
                Intention Set
              </LockedLabel>
              Today, I will <strong>{intention}</strong>.
            </LockedStatement>

            <EditButton onClick={handleEdit} title="Edit intention">
              {EditIcon}
            </EditButton>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};