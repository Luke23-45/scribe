import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const GuideBackdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: ${({ theme }) => theme.colors.background}E6;
  backdrop-filter: blur(8px);
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GuideCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}20;
  border-radius: 20px;
  padding: 2rem 2.5rem;
  box-shadow: ${({ theme }) => theme.visuals.shadow.floating};
  
  max-width: 400px;
  width: 90%;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.ink.primary};
  margin: 0 0 1.5rem 0;
  text-align: center;
`;

const ShortcutList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ShortcutRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`;

const KeyCombo = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const Key = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  padding: 0.4rem 0.75rem;
  min-width: 2rem;
  
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}40;
  border-radius: 8px;
  box-shadow: 
    0 2px 0 ${({ theme }) => theme.colors.ink.tertiary}20,
    inset 0 -1px 0 ${({ theme }) => theme.colors.ink.tertiary}10;
  
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink.secondary};
`;

const KeyDescription = styled.span`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.ink.secondary};
`;

const CloseHint = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.ink.tertiary};
  font-family: ${({ theme }) => theme.typography.fontBody};
`;

interface KeyboardGuideProps {
    isOpen: boolean;
    onClose: () => void;
}

const shortcuts = [
    { keys: ['SPACE', 'ENTER'], description: 'Start typing' },
    { keys: ['TAB', '↑'], description: 'Peek at source text' },
    { keys: ['ESC'], description: 'Open settings' },
    { keys: ['BACKSPACE'], description: 'Undo last character' },
    { keys: ['?'], description: 'Toggle this guide' },
];

export const KeyboardGuide: React.FC<KeyboardGuideProps> = ({ isOpen, onClose }) => {
    // Close on background click or Escape
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <GuideBackdrop
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleBackdropClick}
                >
                    <GuideCard
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', bounce: 0.3 }}
                    >
                        <Title>⌨️ Keyboard Shortcuts</Title>

                        <ShortcutList>
                            {shortcuts.map((shortcut, index) => (
                                <ShortcutRow key={index}>
                                    <KeyCombo>
                                        {shortcut.keys.map((key, keyIndex) => (
                                            <React.Fragment key={keyIndex}>
                                                <Key>{key}</Key>
                                                {keyIndex < shortcut.keys.length - 1 && (
                                                    <span style={{ opacity: 0.3, alignSelf: 'center' }}>/</span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </KeyCombo>
                                    <KeyDescription>{shortcut.description}</KeyDescription>
                                </ShortcutRow>
                            ))}
                        </ShortcutList>

                        <CloseHint>
                            Press <Key style={{ display: 'inline-flex', padding: '0.25rem 0.5rem' }}>?</Key> or click outside to close
                        </CloseHint>
                    </GuideCard>
                </GuideBackdrop>
            )}
        </AnimatePresence>
    );
};
