import React from 'react';
import { CircleAlertIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { MAX_OPTIONS, MIN_OPTIONS } from '../../data/studio';
import type { AnswerDraft } from '../../types/studio';
import { toArabicDigits } from '../../utils/numbers';

interface OptionsEditorProps {
  options: AnswerDraft[];
  correctId: string;
  error?: string;
  onChangeText: (id: string, text: string) => void;
  onMarkCorrect: (id: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export function OptionsEditor({ options, correctId, error, onChangeText, onMarkCorrect, onAdd, onRemove }: OptionsEditorProps) {
  const canRemove = options.length > MIN_OPTIONS;
  const canAdd = options.length < MAX_OPTIONS;

  return (
    <fieldset>
      <legend className="text-base font-bold text-ink">خيارات الإجابة</legend>
      <p className="text-sm text-ink-soft">من ٢ إلى ٤ خيارات. حدّد الإجابة الصحيحة الوحيدة بالدائرة.</p>

      <ul className="mt-4 space-y-3">
        {options.map((option, index) => {
          const isCorrect = option.id === correctId;
          const inputId = `option-${option.id}`;
          return (
            <li
              key={option.id}
              className={`flex items-center gap-3 rounded-2xl border-2 p-2 ps-4 transition-colors duration-200 ${
              isCorrect ? 'border-success bg-success-tint' : 'border-line bg-white'}`
              }>
              
              <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
                <input
                  type="radio"
                  name="correct-option"
                  checked={isCorrect}
                  onChange={() => onMarkCorrect(option.id)}
                  className="h-5 w-5 accent-success"
                  aria-label={`اجعل الخيار ${toArabicDigits(index + 1)} هو الإجابة الصحيحة`} />
                
                <span className={isCorrect ? 'text-success-ink' : 'text-ink-soft'}>{isCorrect ? 'صحيحة' : 'خطأ'}</span>
              </label>
              <label htmlFor={inputId} className="sr-only">
                نص الخيار {toArabicDigits(index + 1)}
              </label>
              <input
                id={inputId}
                type="text"
                value={option.text}
                onChange={(e) => onChangeText(option.id, e.target.value)}
                placeholder={`الخيار ${toArabicDigits(index + 1)}`}
                aria-invalid={Boolean(error) && !option.text.trim()}
                className="h-12 min-w-0 flex-1 rounded-xl border border-line bg-white px-4 text-lg font-semibold text-ink placeholder:text-ink-soft/70" />
              
              <button
                type="button"
                onClick={() => onRemove(option.id)}
                disabled={!canRemove}
                className="flex h-12 shrink-0 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:bg-error-tint hover:text-error disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink-soft">
                
                <Trash2Icon className="h-4 w-4" aria-hidden="true" />
                حذف
              </button>
            </li>);

        })}
      </ul>

      {error &&
      <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-error">
          <CircleAlertIcon className="h-4 w-4" aria-hidden="true" />
          {error}
        </p>
      }

      <button
        type="button"
        onClick={onAdd}
        disabled={!canAdd}
        className="mt-3 inline-flex min-h-[48px] items-center gap-2 rounded-full px-4 font-bold text-primary transition-colors duration-200 hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent">
        
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
        {canAdd ? 'إضافة خيار' : 'الحد الأقصى ٤ خيارات'}
      </button>
    </fieldset>);

}