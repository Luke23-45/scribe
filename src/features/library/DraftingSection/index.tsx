import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSessionState } from '@/core/store/useSessionState';
import { useUserLibraryStore } from '@/core/store/useUserLibraryStore'; // Store import
import { InkButton } from '@/components/common/Button/InkButton';
import { 
  SectionWrapper, Header, Title, Subtitle, 
  StudioSurface, LinedTextArea, Toolbar, 
  InputRow, MetadataInput // <-- Import new styles
} from './styles';

const SaveIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>;
const FeatherIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>;

export const DraftingSection: React.FC = () => {
  const navigate = useNavigate();
  const { loadExercise } = useSessionState();
  const { addManuscript } = useUserLibraryStore(); // Save Logic

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const sanitized = text.replace(/\s+/g, ' ').trim();
  const wordCount = sanitized.split(' ').length;
  const canSave = text.trim().length > 0 && title.trim().length > 0;

  const handleSaveToLibrary = () => {
    if (!canSave) return;

    addManuscript({
      id: `custom-${Date.now()}`,
      title,
      author: author || "Unknown",
      text: sanitized,
      phase: 3, // Custom text is usually unstructured
      duration: `${Math.ceil(wordCount / 40)} min`, // Approx 40 WPM reading
      tags: ['Personal'],
      difficulty: 'Medium'
    });

    // Reset Form
    setText("");
    setTitle("");
    setAuthor("");
    
    // Feedback? Scroll to top? (Optional)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTranscribeNow = () => {
    if (!text.trim()) return;
    loadExercise(sanitized, title || "Draft", author || "Self");
    navigate({ to: '/transcription' });
  };

  return (
    <SectionWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Header>
        <Title>The Drafting Table</Title>
        <Subtitle>
          Add text to your personal library or start transcribing immediately.
        </Subtitle>
      </Header>

      <StudioSurface>
        {/* New Metadata Inputs */}
        <InputRow>
          <MetadataInput 
            placeholder="Manuscript Title (Required)" 
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <MetadataInput 
            placeholder="Author (Optional)" 
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </InputRow>

        <LinedTextArea 
          placeholder="Paste content here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />
        
        <Toolbar>
           {/* Option A: Save to Shelf */}
           <InkButton 
             variant="secondary" 
             onClick={handleSaveToLibrary} 
             disabled={!canSave}
             style={{ marginRight: '1rem' }}
           >
             <span style={{ display: 'flex', gap: '0.5rem' }}>{SaveIcon} Save to Library</span>
           </InkButton>

           {/* Option B: Run Now */}
           <InkButton 
             variant="primary" 
             onClick={handleTranscribeNow} 
             disabled={!text.trim()}
           >
            <span style={{ display: 'flex', gap: '0.5rem' }}>{FeatherIcon} Transcribe Now</span>
          </InkButton>
        </Toolbar>
      </StudioSurface>
    </SectionWrapper>
  );
};