import { useCallback, useRef, useEffect } from 'react';

export const useSoundFX = () => {
  const audioContext = useRef<AudioContext | null>(null);

  // Initialize Audio Context (User interaction required to unlock audio on some browsers)
  useEffect(() => {
    const initAudio = () => {
      if (!audioContext.current) {
        const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
        if (Ctx) audioContext.current = new Ctx();
      }
    };
    
    // Lazy init on first click/key to bypass autoplay policies
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });

    return () => {
      // Cleanup is usually not strictly necessary for global context, but good practice
      if (audioContext.current && audioContext.current.state !== 'closed') {
         // keeping it alive for app session is usually better performance
      }
    };
  }, []);

  // 1. The Mechanical Click (Satisfying High-Pitch 'Thwack')
  const playClick = useCallback(() => {
    if (!audioContext.current) return;
    const ctx = audioContext.current;

    // Create Oscillator for the "Switch" sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Synthesis: A short, high-frequency burst dropping pitch
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

    // Envelope: Fast attack, fast decay (Percussive)
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }, []);

  // 2. The Error Thud (Soft, low frequency 'No')
  const playError = useCallback(() => {
    if (!audioContext.current) return;
    const ctx = audioContext.current;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Synthesis: Low sine wave
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.1);

    // Envelope: Soft "Bonk"
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  }, []);

  // 3. The Release (White Noise 'Whoosh' for TK Button)
  const playWhoosh = useCallback(() => {
    if (!audioContext.current) return;
    const ctx = audioContext.current;
    
    // Create Noise Buffer
    const bufferSize = ctx.sampleRate * 0.2; // 0.2 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    
    const gain = ctx.createGain();
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    // Soft Fade
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    
    noise.start(ctx.currentTime);
  }, []);

  return { playClick, playError, playWhoosh };
};