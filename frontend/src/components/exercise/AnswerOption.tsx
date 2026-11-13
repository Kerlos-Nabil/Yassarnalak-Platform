import React from 'react';
import { CheckIcon, RotateCcwIcon } from 'lucide-react';
import type { AnswerState, KidAccent } from '../../types/exercise';

interface AnswerOptionProps {
  label: string;
  state: AnswerState;
  accent: KidAccent;
  onSelect: () => void;
  size?: 'lg' | 'md';
  isPlaceholder?: boolean;
}

const stateClasses: Record<AnswerState, string> = {
  idle: 'bg-white text-ink',
  correct: 'bg-success-tint text-success-ink',
  wrong: 'bg-notice text-warning-ink',
  muted: 'bg-white text-ink opacity-50'
};

export function AnswerOption({ label, state, accent, onSelect, size = 'lg', isPlaceholder }: AnswerOptionProps) {
  const isLocked = state !== 'idle';
  const edge = state === 'correct' ? '#3E9B6B' : state === 'wrong' ? '#E0A030' : accent.edge;
  const border = state === 'correct' ? '#3E9B6B' : state === 'wrong' ? '#E0A030' : accent.tint;
  const srSuffix = state === 'correct' ? '، إجابة صحيحة' : state === 'wrong' ? '، حاول مرة أخرى' : '';

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isLocked}
      aria-label={`${label}${srSuffix}`}
      style={{ '--edge': edge, borderColor: border } as React.CSSProperties}
      className={[
      'relative flex w-full items-center justify-center gap-3 rounded-[24px] border-[3px] font-bold',
      'shadow-[0_6px_0_var(--edge)] transition-[transform,box-shadow,background-color] duration-150 ease-out',
      size === 'lg' ?
      'min-h-[96px] px-4 text-[32px] md:min-h-[112px] md:text-[36px]' :
      'min-h-[64px] px-3 text-[24px]',
      isLocked ?
      'cursor-default' :
      'hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_var(--edge)]',
      stateClasses[state]].
      join(' ')}>
      
      {state === 'correct' && <CheckIcon className="h-7 w-7 shrink-0" strokeWidth={3} aria-hidden="true" />}
      {state === 'wrong' && <RotateCcwIcon className="h-6 w-6 shrink-0" aria-hidden="true" />}
      <span className={isPlaceholder ? 'text-lg font-semibold text-ink-soft' : ''}>{label}</span>
    </button>);

}