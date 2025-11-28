import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from 'styled-components';

// --- LOGIC: Routing & State ---
import { router } from '@/app/routes';
import { useSessionState } from '@/core/store/useSessionState';

// --- VISUALS: Themes & Global CSS ---
import { GlobalStyles } from '@/core/theme/GlobalStyles';
import { draftTheme } from '@/core/theme/draftTheme'; // Zen/Paper Mode
import { auditTheme } from '@/core/theme/auditTheme'; // Shock/Yellow Mode

export const App: React.FC = () => {
  // 1. Listen to the Neural Store for the current Visual Mode
  const workMode = useSessionState((state) => state.workMode);

  // 2. Select the active Design System based on state
  // "Draft" = Calm Paper & Ink
  // "Audit" = High Contrast, Monospace, Brutalist
  const activeTheme = workMode === 'audit' ? auditTheme : draftTheme;

  return (
    <ThemeProvider theme={activeTheme}>
      {/* 
        GlobalStyles must be inside ThemeProvider 
        so it can access theme variables (colors, fonts).
      */}
      <GlobalStyles />
      
      {/* 
        The Router handles the Pages (Sanctuary, Library, Focus).
        It is wrapped in the Theme, so every page inherits the aesthetics.
      */}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};