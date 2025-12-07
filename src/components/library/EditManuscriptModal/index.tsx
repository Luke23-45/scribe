import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { type Manuscript } from '@/core/db/db';
import { InkButton } from '@/components/common/Button/InkButton';

// --- ANIMATIONS ---
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// --- STYLED COMPONENTS ---
const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: ${fadeIn} 0.2s ease;
`;

const ModalCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 24px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 24px 64px rgba(0, 0, 0, 0.16);
`;

const Header = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.ink.tertiary}20;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1.35rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.ink.primary};
`;

const Body = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Input = styled.input`
  padding: 0.875rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}40;
  border-radius: 12px;
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.ink.primary};
  background: ${({ theme }) => theme.colors.background};
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent}20;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}40;
  border-radius: 12px;
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.ink.primary};
  background: ${({ theme }) => theme.colors.background};
  resize: vertical;
  min-height: 150px;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent}20;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Select = styled.select`
  padding: 0.875rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.ink.tertiary}40;
  border-radius: 12px;
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.ink.primary};
  background: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Footer = styled.div`
  padding: 1.25rem 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.ink.tertiary}20;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

// --- COMPONENT ---
interface EditManuscriptModalProps {
    manuscript: Manuscript;
    onSave: (updates: Partial<Manuscript>) => void;
    onClose: () => void;
}

export const EditManuscriptModal: React.FC<EditManuscriptModalProps> = ({
    manuscript,
    onSave,
    onClose
}) => {
    const [title, setTitle] = useState(manuscript.title);
    const [author, setAuthor] = useState(manuscript.author);
    const [text, setText] = useState(manuscript.text);
    const [phase, setPhase] = useState(manuscript.phase);
    const [difficulty, setDifficulty] = useState(manuscript.difficulty);

    // Calculate duration based on word count
    const wordCount = text.trim().split(/\s+/).length;
    const estimatedDuration = `${Math.max(1, Math.ceil(wordCount / 40))} min`;

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleSave = () => {
        onSave({
            title,
            author,
            text,
            phase,
            difficulty,
            duration: estimatedDuration
        });
    };

    const canSave = title.trim().length > 0 && text.trim().length > 0;

    return (
        <Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <ModalCard
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
            >
                <Header>
                    <Title>Edit Manuscript</Title>
                </Header>

                <Body>
                    <FieldGroup>
                        <Label>Title</Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Manuscript title"
                        />
                    </FieldGroup>

                    <FieldGroup>
                        <Label>Author</Label>
                        <Input
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Author name"
                        />
                    </FieldGroup>

                    <FieldGroup>
                        <Label>Content ({wordCount} words • {estimatedDuration})</Label>
                        <TextArea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Manuscript text..."
                        />
                    </FieldGroup>

                    <Row>
                        <FieldGroup>
                            <Label>Phase</Label>
                            <Select
                                value={phase}
                                onChange={(e) => setPhase(Number(e.target.value) as 1 | 2 | 3)}
                            >
                                <option value={1}>Phase 1 (Beginner)</option>
                                <option value={2}>Phase 2 (Intermediate)</option>
                                <option value={3}>Phase 3 (Advanced)</option>
                            </Select>
                        </FieldGroup>

                        <FieldGroup>
                            <Label>Difficulty</Label>
                            <Select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value as Manuscript['difficulty'])}
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </Select>
                        </FieldGroup>
                    </Row>
                </Body>

                <Footer>
                    <InkButton variant="secondary" onClick={onClose}>
                        Cancel
                    </InkButton>
                    <InkButton variant="primary" onClick={handleSave} disabled={!canSave}>
                        Save Changes
                    </InkButton>
                </Footer>
            </ModalCard>
        </Backdrop>
    );
};
