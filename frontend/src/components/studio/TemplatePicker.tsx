import React from 'react';
import { CircleCheckIcon } from 'lucide-react';
import { exerciseTemplates } from '../../data/studio';
import type { TemplateId } from '../../types/studio';

interface TemplatePickerProps {
  value: TemplateId;
  onChange: (id: TemplateId) => void;
}

export function TemplatePicker({ value, onChange }: TemplatePickerProps) {
  return (
    <div role="radiogroup" aria-labelledby="template-label" className="grid grid-cols-2 gap-3">
      {exerciseTemplates.map((t) => {
        const Icon = t.icon;
        const isSelected = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(t.id)}
            className={`relative flex items-start gap-3 rounded-2xl border-2 p-4 text-right transition-colors duration-200 ${
            isSelected ? 'border-primary bg-primary-light' : 'border-line bg-white hover:border-primary/40'}`
            }>
            
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              isSelected ? 'bg-primary text-white' : 'bg-primary-light text-primary'}`
              }>
              
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold text-ink">{t.name}</span>
              <span className="block text-sm text-ink-soft">{t.description}</span>
            </span>
            {isSelected && <CircleCheckIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />}
          </button>);

      })}
    </div>);

}