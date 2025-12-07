import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppThemeMode = 'light' | 'dark' | 'auto'; // Auto = System/Logic controlled
export type DisplayMode = 'word' | 'phrase' | 'sentence'; // Learning chunk modes
export type TransitionSpeed = 'fast' | 'normal' | 'gentle'; // Animation feel preference

interface SettingsState {
  // Audio
  sfxVolume: number; // 0.0 to 1.0
  voiceURI: string | null; // ID of selected TTS voice
  audioEnabled: boolean; // Master audio toggle
  ttsEnabled: boolean; // Text-to-speech pronunciation help

  // Visuals
  fontScale: number; // Multiplier: 1.0 = Normal, 1.5 = Large, 2.0 = XL
  lineSpacing: number; // Line height multiplier: 1.5 to 2.5
  themePreference: AppThemeMode;

  // Learning Mode
  displayMode: DisplayMode; // How many words to show at once

  // Transitions
  transitionSpeed: TransitionSpeed; // How smooth/slow transitions feel

  // Actions
  setSfxVolume: (vol: number) => void;
  setVoiceURI: (uri: string) => void;
  setFontScale: (scale: number) => void;
  setLineSpacing: (spacing: number) => void;
  setThemePreference: (mode: AppThemeMode) => void;
  setDisplayMode: (mode: DisplayMode) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setTtsEnabled: (enabled: boolean) => void;
  setTransitionSpeed: (speed: TransitionSpeed) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Defaults optimized for accessibility & calm experience
      sfxVolume: 0.5,
      voiceURI: null,
      audioEnabled: true,
      ttsEnabled: false, // Off by default, user can enable
      fontScale: 1.0,
      lineSpacing: 1.8, // Generous default for readability
      themePreference: 'light', // Default to our "Paper" mode
      displayMode: 'phrase', // 2-3 words default
      transitionSpeed: 'gentle', // Default to calm, soothing transitions

      setSfxVolume: (sfxVolume) => set({ sfxVolume }),
      setVoiceURI: (voiceURI) => set({ voiceURI }),
      setFontScale: (fontScale) => set({ fontScale }),
      setLineSpacing: (lineSpacing) => set({ lineSpacing }),
      setThemePreference: (themePreference) => set({ themePreference }),
      setDisplayMode: (displayMode) => set({ displayMode }),
      setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
      setTtsEnabled: (ttsEnabled) => set({ ttsEnabled }),
      setTransitionSpeed: (transitionSpeed) => set({ transitionSpeed }),
    }),
    { name: 'neuro-settings' }
  )
);
