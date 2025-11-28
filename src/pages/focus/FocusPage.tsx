import React, { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSessionState } from '../../core/store/useSessionState'; // Adjust path based on your store location

// Components
import { PageShell } from '../../components/layout/PageShell';

// Features
import { CockpitSection } from '../../features/focus/CockpitSection';
import { EditorSection } from '../../features/focus/EditorSection';

export const FocusPage: React.FC = () => {
  const navigate = useNavigate();
  const activeTextSource = useSessionState((s) => s.activeTextSource);

  // Guard: Redirect if no text selected
  useEffect(() => {
    if (!activeTextSource) {
      navigate({ to: '/library' });
    }
  }, [activeTextSource, navigate]);

  if (!activeTextSource) return null;

  return (
    <PageShell>
      {/* 1. Auto-hiding Header */}
      <CockpitSection title={activeTextSource.title} />

      {/* 2. The Main Event */}
      <EditorSection sourceText={activeTextSource.fullText} />
      
      {/* 3. Subtle Footer hint */}
      <div style={{ 
        position: 'fixed', bottom: '2rem', right: '2rem', 
        opacity: 0.2, fontSize: '0.8rem' 
      }}>
        Press [TAB] to Skip Word
      </div>
    </PageShell>
  );
};