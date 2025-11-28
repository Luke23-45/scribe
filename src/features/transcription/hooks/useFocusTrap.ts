import { useEffect, useState, useCallback } from 'react';

export const useFocusTrap = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Toggle Logic
  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. ESC Key: The Master Switch
      if (e.key === 'Escape') {
        togglePause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePause]);

  return { isPaused, setIsPaused, togglePause };
};