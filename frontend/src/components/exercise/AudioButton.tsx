import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Volume2Icon } from 'lucide-react';

interface AudioButtonProps {
  onPlay: () => void;
  isPlaying: boolean;
  size?: 'lg' | 'md';
}

export function AudioButton({ onPlay, isPlaying, size = 'lg' }: AudioButtonProps) {
  const reduceMotion = useReducedMotion();
  const isLarge = size === 'lg';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {isPlaying && !reduceMotion &&
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-4 border-kid-sky"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.25, opacity: 0 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }} />

        }
        <button
          type="button"
          onClick={onPlay}
          aria-label="استمع إلى الكلمة"
          className={`relative flex items-center justify-center rounded-full bg-kid-sky text-ink shadow-[0_6px_0_#4FA9CF] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_#4FA9CF] ${
          isLarge ? 'h-24 w-24' : 'h-16 w-16'}`
          }>
          
          <Volume2Icon className={isLarge ? 'h-11 w-11' : 'h-7 w-7'} aria-hidden="true" />
        </button>
      </div>
      <span className={`font-bold text-ink ${isLarge ? 'text-xl' : 'text-base'}`} aria-live="polite">
        استمع
      </span>
    </div>);

}