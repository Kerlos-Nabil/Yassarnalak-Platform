import React from 'react';
import { difficultyLevels } from '../../data/studio';
import type { DifficultyLevel } from '../../types/studio';

interface DifficultySelectorProps {
  value: DifficultyLevel;
  onChange: (level: DifficultyLevel) => void;
}

export function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
  return (
    <div role="radiogroup" aria-labelledby="difficulty-label" className="grid grid-cols-3 gap-2 rounded-2xl bg-cream p-1.5">
      {difficultyLevels.map((level) => {
        const isSelected = level.id === value;
        return (
          <button
            key={level.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(level.id)}
            className={`flex min-h-[48px] items-center justify-center gap-3 rounded-xl font-bold transition-colors duration-200 ${
            isSelected ? 'bg-primary text-white' : 'text-ink hover:bg-primary-light'}`
            }>
            
            <span className="flex items-end gap-0.5" aria-hidden="true">
              {[1, 2, 3].map((bar) =>
              <span
                key={bar}
                className={`w-1.5 rounded-full ${bar <= level.bars ? isSelected ? 'bg-white' : 'bg-primary' : isSelected ? 'bg-white/30' : 'bg-line'}`}
                style={{ height: 6 + bar * 4 }} />

              )}
            </span>
            {level.label}
          </button>);

      })}
    </div>);

}