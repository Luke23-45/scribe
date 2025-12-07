import { useState, useMemo, useCallback } from 'react';
import { useSoundFX } from '@/core/hooks/useSoundFX';

export type SessionPhase = 'READING' | 'WRITING';

export interface Token {
  text: string;
  status: 'DONE' | 'ACTIVE' | 'PENDING';
  globalIndex: number;
  isFocused: boolean;
  charIndexStart: number;
  charIndexEnd: number;
}

export const useTranscriptionEngine = (
  fullText: string,
  chunkSize: number = 3
) => {
  // Use our procedural sound engine
  const { playClick, playError, playWhoosh } = useSoundFX();

  // --- 1. STATE MACHINE ---
  // Absolute character index in the full string
  const [cursorIndex, setCursorIndex] = useState(0);

  // Word index indicating where the current "View Window" starts
  const [chunkStartIndex, setChunkStartIndex] = useState(0);

  // Interaction Phase: Reading (Blocked Input) vs Writing (Hidden Text)
  const [phase, setPhase] = useState<SessionPhase>('READING');

  // --- 2. DATA PROCESSING ---
  // We memorize the split so we don't recalculate on every keystroke
  const words = useMemo(() => {
    // Sanitize input slightly to ensure spacing matches our logic logic
    const sanitized = fullText.replace(/\s+/g, ' ').trim();
    return sanitized.split(' ');
  }, [fullText]);

  // Determine which logical word the cursor is currently touching
  const currentWordPtr = useMemo(() => {
    let charCount = 0;
    for (let i = 0; i < words.length; i++) {
      const wLength = words[i].length;
      // (+1 for space, except last word)
      const span = wLength + (i < words.length - 1 ? 1 : 0);

      // Is cursor inside this word's span?
      if (cursorIndex < charCount + span) {
        return i;
      }
      charCount += span;
    }
    return words.length - 1; // Default to last
  }, [words, cursorIndex]);

  // --- 3. INPUT HANDLER ---
  const handleKeyDown = useCallback((e: KeyboardEvent | React.KeyboardEvent) => {
    const key = e.key;

    // A. GUARD: Ignore System Combinations
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    // B. PHASE: READING (Memorization)
    // Auto-transition when user types the first correct character
    // This creates a seamless, natural feeling - just start typing!
    if (phase === 'READING') {
      // Get the expected first character
      const expectedChar = fullText[cursorIndex];

      // If the typed key matches the expected character, auto-transition to WRITING
      if (key === expectedChar) {
        e.preventDefault();
        setPhase('WRITING');
        playWhoosh(); // Audio cue: Entering Deep Work

        // Also process the keystroke (advance cursor) since it's correct
        setCursorIndex(prev => prev + 1);
        playClick(); // Tactile feedback for the keystroke
      }
      // Ignore all other keys during reading phase
      return;
    }

    // C. PHASE: WRITING (Blind Recall)
    // Tab provides ergonomic "peek" functionality to return to reading
    if (key === 'Tab') {
      e.preventDefault();
      setPhase('READING');
      return;
    }

    // --- 1. BACKSPACE LOGIC (New) ---
    if (key === 'Backspace') {
      e.preventDefault();

      // Boundary Calculation:
      // We calculate the absolute character index where the current chunk STARTED.
      // We forbid backspacing past this point to preserve the "Game Save" state of previous lines.
      let chunkStartChar = 0;
      for (let i = 0; i < chunkStartIndex; i++) {
        chunkStartChar += words[i].length + 1; // Length + Space
      }

      if (cursorIndex > chunkStartChar) {
        setCursorIndex(prev => prev - 1);
        // Optional: We could play a distinct 'delete' sound here
      }
      return;
    }

    // --- 2. CHARACTER VALIDATION ---
    if (cursorIndex >= fullText.length) return; // Prevent overflow

    const expectedChar = fullText[cursorIndex];

    if (key === expectedChar) {
      // -- SUCCESS PATH --
      const nextCursor = cursorIndex + 1;
      setCursorIndex(nextCursor);
      playClick(); // Tactile feedback

      // -- LOOKAHEAD: Did we finish the Chunk? --

      // Calculate the character position where the last word of the chunk ENDS
      // (not including the trailing space)
      const currentChunkEndIndex = chunkStartIndex + chunkSize;

      // Calculate the exact character position of the end of the last word in the chunk
      let lastWordEndChar = 0;
      for (let i = 0; i < Math.min(currentChunkEndIndex, words.length); i++) {
        lastWordEndChar += words[i].length;
        if (i < currentChunkEndIndex - 1 && i < words.length - 1) {
          lastWordEndChar += 1; // Add space between words, but not after the last word of chunk
        }
      }

      // Check if we just completed the last character of the chunk
      // (cursor is now at or past the end of the last word)
      if (nextCursor >= lastWordEndChar) {
        // **CHUNK COMPLETE** - seamless transition with visual feedback delay!

        // Small delay so user sees the last character before transition
        setTimeout(() => {
          // Skip the trailing space (if any) so next chunk starts clean
          const nextChunkStartChar = lastWordEndChar + (currentChunkEndIndex < words.length ? 1 : 0);
          setCursorIndex(nextChunkStartChar);

          // Advance the view (Scrolls the Teleprompter)
          setChunkStartIndex(currentChunkEndIndex);

          // Switch back to reading mode for next set
          setPhase('READING');

          // Audio Reward (Release tension)
          playWhoosh();
        }, 180); // 180ms - enough to see the last character, short enough to feel responsive
      }

    } else {
      // -- ERROR PATH --
      e.preventDefault(); // Stop invalid char from entering field (if standard input)
      playError(); // Auditory "Bonk"
    }

  }, [phase, cursorIndex, fullText, words, chunkStartIndex, chunkSize, playClick, playError, playWhoosh]);

  // --- 4. VIEW MODEL GENERATION ---
  // Transforms raw indices into "UI Friendly" Token Objects
  const tokens: Token[] = useMemo(() => {
    let charCounter = 0;

    return words.map((w, i) => {
      const start = charCounter;
      const end = start + w.length;

      // Move counter forward
      const span = w.length + (i < words.length - 1 ? 1 : 0);
      charCounter += span;

      // Determine Status based on Window position
      let status: Token['status'] = 'PENDING';

      if (i < chunkStartIndex) {
        status = 'DONE';
      } else if (i >= chunkStartIndex && i < chunkStartIndex + chunkSize) {
        status = 'ACTIVE';
      }

      return {
        text: w,
        status,
        globalIndex: i,
        isFocused: i === currentWordPtr,
        charIndexStart: start,
        charIndexEnd: end
      };
    });
  }, [words, chunkStartIndex, chunkSize, currentWordPtr]);

  return {
    tokens,
    handleKeyDown,
    phase,
    cursorIndex,
    progress: (cursorIndex / fullText.length) * 100
  };
};