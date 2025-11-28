import { useCallback, useEffect, useRef } from 'react';

export const useActiveEcho = () => {
  const synth = window.speechSynthesis;
  // We store the preferred voice in a ref so we don't trigger re-renders
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // 1. Initialize & Select Premium Voice
  useEffect(() => {
    const selectVoice = () => {
      const voices = synth.getVoices();
      
      // Algorithm: Look for specific high-quality identifiers
      // 1. Google US English (Chrome)
      // 2. Microsoft Zira (Windows)
      // 3. Samantha (Mac)
      // 4. Fallback to first available
      voiceRef.current = voices.find(v => 
        v.name.includes("Google US English") || 
        v.name.includes("Zira") ||
        v.name.includes("Samantha")
      ) || voices[0] || null;
    };

    selectVoice();
    
    // Chrome loads voices asynchronously
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = selectVoice;
    }
  }, [synth]);

  // 2. The Speak Action
  const speak = useCallback((text: string) => {
    if (!synth || !voiceRef.current) return;

    // A. "Cut Through" Logic
    // If user is typing fast, immediately cancel previous audio 
    // to prevent a "queue backlog" which causes lag.
    if (synth.speaking) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.voice = voiceRef.current;
    utterance.volume = 0.4; // Keep it subtle (Subconscious reinforcement)
    utterance.rate = 1.1;   // Slightly brisk to match typing speed
    utterance.pitch = 1.0;

    synth.speak(utterance);
  }, [synth]);

  return { speak };
};