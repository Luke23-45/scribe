import { useState, useCallback, useMemo } from 'react';

// --- TYPES ---
export interface WordObj {
  text: string;
  status: 'DONE' | 'ACTIVE' | 'LOCKED' | 'HIDDEN';
  index: number;
}

export interface MicroSlicerReturn {
  // Visuals
  displayWords: WordObj[];
  
  // Logic Interceptors
  handleKeyDown: (e: KeyboardEvent | React.KeyboardEvent) => void;
  
  // Feedback States
  isError: boolean;
  progress: number;
}

// --- LOGIC ---
export const useMicroSlicer = (
  fullText: string, 
  windowSize: number = 3, // <--- NEW PARAMETER
  callbacks?: {
    onComplete?: () => void,
    onWordComplete?: (word: string) => void,
    onValidChar?: () => void,   // <--- Hook for sound
    onInvalidChar?: () => void, // <--- Hook for error sound
    onSkip?: () => void         // <--- Hook for TK whoosh
  }
): MicroSlicerReturn => {
  
  const [cursorIndex, setCursorIndex] = useState(0); 
  const [isError, setIsError] = useState(false);

  // 1. DERIVED STATE
  const allWords = useMemo(() => fullText.split(' '), [fullText]);
  
  const currentWordIndex = useMemo(() => {
    const textUpToCursor = fullText.slice(0, cursorIndex);
    return textUpToCursor.split(' ').length - 1;
  }, [fullText, cursorIndex]);

  // 2. THE RENDER WINDOW (Dynamic Size)
  const displayWords: WordObj[] = useMemo(() => {
    // Show slight context behind (1-2 words), show 'windowSize' ahead
    const windowStart = Math.max(0, currentWordIndex - 2); 
    const windowEnd = Math.min(allWords.length, currentWordIndex + windowSize); 

    return allWords.slice(windowStart, windowEnd).map((word, localIndex) => {
      const globalIndex = windowStart + localIndex;
      
      let status: WordObj['status'] = 'HIDDEN';

      if (globalIndex < currentWordIndex) {
        status = 'DONE';
      } else if (globalIndex === currentWordIndex) {
        status = 'ACTIVE';
      } else if (globalIndex > currentWordIndex && globalIndex <= currentWordIndex + 1) {
        // The word immediately following the active one is "LOCKED" (Blurred visibility)
        status = 'LOCKED';
      } else {
        // Anything beyond (based on window size) is purely future/hidden context
        status = 'HIDDEN'; // You might choose to render these as "..." or keep Hidden
      }
      
      // If we are "Sharp" (windowSize 5), we might show more LOCKED words:
      if (globalIndex > currentWordIndex + 1) {
        status = 'LOCKED'; // Keep them blurry-visible for broader context in sharp mode
      }

      return { text: word, status, index: globalIndex };
    });
  }, [allWords, currentWordIndex, windowSize]);

  // 3. KEY HANDLER
  const handleKeyDown = useCallback((e: KeyboardEvent | React.KeyboardEvent) => {
    const key = e.key;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (cursorIndex >= fullText.length) return;

    // --- "TK" (Skip) Logic ---
    if (key === 'Tab') {
      e.preventDefault();
      
      const remainingText = fullText.slice(cursorIndex);
      const nextSpaceIdx = remainingText.indexOf(' ');
      const jumpAmt = nextSpaceIdx === -1 ? remainingText.length : nextSpaceIdx + 1;
      
      setCursorIndex(prev => prev + jumpAmt);
      setIsError(false);
      
      if (callbacks?.onSkip) callbacks.onSkip();
      return;
    }

    // --- Character Logic ---
    if (key.length !== 1) return;

    const expectedChar = fullText[cursorIndex];

    if (key === expectedChar) {
      // SUCCESS
      const nextIndex = cursorIndex + 1;
      setCursorIndex(nextIndex);
      setIsError(false);
      if (callbacks?.onValidChar) callbacks.onValidChar();

      // Check Word Completion
      const justFinishedWord = key === ' ' || nextIndex === fullText.length;
      if (justFinishedWord && callbacks?.onWordComplete) {
        // To be safe, look up word again or trust index
        callbacks.onWordComplete(allWords[currentWordIndex]); 
      }

      if (nextIndex === fullText.length && callbacks?.onComplete) {
        callbacks.onComplete();
      }
    } else {
      // FAILURE
      e.preventDefault();
      setIsError(true);
      if (callbacks?.onInvalidChar) callbacks.onInvalidChar();
      setTimeout(() => setIsError(false), 300);
    }

  }, [cursorIndex, fullText, allWords, currentWordIndex, callbacks]);

  return {
    displayWords,
    handleKeyDown,
    isError,
    progress: (cursorIndex / fullText.length) * 100
  };
};