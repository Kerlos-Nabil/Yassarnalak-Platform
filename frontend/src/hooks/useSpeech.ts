import { useCallback, useEffect, useRef, useState } from 'react';

export function useSpeech() {
  const [isPlaying, setIsPlaying] = useState(false);
  const timer = useRef<number>();

  const speak = useCallback((text: string) => {
    window.clearTimeout(timer.current);
    setIsPlaying(true);
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;

    if (synth && typeof SpeechSynthesisUtterance !== 'undefined' && text.trim()) {
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      synth.speak(utterance);
      timer.current = window.setTimeout(() => setIsPlaying(false), 4000);
    } else {
      timer.current = window.setTimeout(() => setIsPlaying(false), 1200);
    }
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
    },
    []
  );

  return { speak, isPlaying };
}