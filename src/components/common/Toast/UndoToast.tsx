import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- ANIMATIONS ---
const slideUp = keyframes`
  from { 
    opacity: 0;
    transform: translateY(100%);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const progressShrink = keyframes`
  from { width: 100%; }
  to { width: 0%; }
`;

// --- STYLED COMPONENTS ---
const ToastContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1100;
  
  display: flex;
  align-items: center;
  gap: 1rem;
  
  background: ${({ theme }) => theme.colors.ink.primary};
  color: ${({ theme }) => theme.colors.surface};
  padding: 1rem 1.25rem;
  border-radius: 14px;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.15),
    0 12px 32px rgba(0, 0, 0, 0.2);
  
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.95rem;
  font-weight: 500;
  
  animation: ${slideUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
`;

const Message = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`;

const UndoButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${({ theme }) => theme.colors.accent};
  animation: ${progressShrink} 5s linear forwards;
`;

// --- COMPONENT ---
interface UndoToastProps {
    message: string;
    onUndo: () => void;
    onDismiss: () => void;
    duration?: number;
}

export const UndoToast: React.FC<UndoToastProps> = ({
    message,
    onUndo,
    onDismiss,
    duration = 5000
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onDismiss();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onDismiss]);

    const handleUndo = () => {
        setIsVisible(false);
        onUndo();
    };

    if (!isVisible) return null;

    return (
        <ToastContainer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
        >
            <Message>{message}</Message>
            <UndoButton onClick={handleUndo}>Undo</UndoButton>
            <ProgressBar style={{ animationDuration: `${duration}ms` }} />
        </ToastContainer>
    );
};
