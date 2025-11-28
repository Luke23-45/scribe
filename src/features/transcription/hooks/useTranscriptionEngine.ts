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
    // In this phase, we BLOCK typing. The user must explicitly choose to "Begin".
    if (phase === 'READING') {
      if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        setPhase('WRITING');
        playWhoosh(); // Audio cue: Entering Deep Work
      }
      return; // Ignore other keys
    }

    // C. PHASE: WRITING (Blind Recall)
    if (key === 'ArrowUp' || key === 'Tab') {
      e.preventDefault();
      setPhase('READING'); 
      // Optional: Play a sound like sliding a paper back?
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
      
      // Logic: Calculate where the 'Next Cursor' lands in terms of words
      let tempCharCount = 0;
      let nextWordPtr = 0;
      
      for (let i = 0; i < words.length; i++) {
        const span = words[i].length + (i < words.length - 1 ? 1 : 0);
        
        // If next cursor is within this word boundary
        if (nextCursor < tempCharCount + span) {
          nextWordPtr = i;
          break;
        }
        
        tempCharCount += span;
        nextWordPtr = i + 1; // It has crossed into the next word
      }

      // Check if that new pointer exceeds our visible window
      const currentChunkEndIndex = chunkStartIndex + chunkSize;
      
      if (nextWordPtr >= currentChunkEndIndex) {
        // **CHUNK COMPLETE**
        // 1. Advance the view (Scrolls the Teleprompter)
        setChunkStartIndex(currentChunkEndIndex);
        
        // 2. Open the shutter (Switch back to reading mode for next set)
        setPhase('READING');
        
        // 3. Audio Reward (Release tension)
        playWhoosh();
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