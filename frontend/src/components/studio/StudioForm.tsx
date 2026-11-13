import React from 'react';
import { CircleAlertIcon } from 'lucide-react';
import { TemplatePicker } from './TemplatePicker';
import { OptionsEditor } from './OptionsEditor';
import { DifficultySelector } from './DifficultySelector';
import { caseload } from '../../data/dashboard';
import type { DifficultyLevel, DraftErrors, ExerciseDraft, TemplateId } from '../../types/studio';

interface StudioFormProps {
  draft: ExerciseDraft;
  errors: DraftErrors;
  onSelectTemplate: (id: TemplateId) => void;
  onUpdate: (patch: Partial<ExerciseDraft>) => void;
  onUpdateOption: (id: string, text: string) => void;
  onAddOption: () => void;
  onRemoveOption: (id: string) => void;
}

const inputClass =
'h-12 w-full rounded-xl border bg-white px-4 text-base text-ink placeholder:text-ink-soft/70 transition-colors duration-200';

function FieldError({ message }: {message?: string;}) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-error">
      <CircleAlertIcon className="h-4 w-4" aria-hidden="true" />
      {message}
    </p>);

}

export function StudioForm({ draft, errors, onSelectTemplate, onUpdate, onUpdateOption, onAddOption, onRemoveOption }: StudioFormProps) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      aria-label="نموذج إنشاء تمرين"
      className="divide-y divide-line rounded-card border border-line bg-surface">
      
      <div className="p-6">
        <h2 id="template-label" className="text-base font-bold text-ink">
          القالب
        </h2>
        <p className="mb-4 text-sm text-ink-soft">اختيار قالب يملأ السؤال والخيارات بمثال يمكنك تعديله.</p>
        <TemplatePicker value={draft.templateId} onChange={onSelectTemplate} />
      </div>

      <div className="grid gap-5 p-6 md:grid-cols-[1fr_200px]">
        <div>
          <label htmlFor="question" className="text-base font-bold text-ink">
            نص السؤال
          </label>
          <input
            id="question"
            type="text"
            value={draft.question}
            onChange={(e) => onUpdate({ question: e.target.value })}
            aria-invalid={Boolean(errors.question)}
            className={`${inputClass} mt-2 ${errors.question ? 'border-error' : 'border-line'}`} />
          
          <FieldError message={errors.question} />
        </div>
        <div>
          <label htmlFor="audio" className="text-base font-bold text-ink">
            الكلمة المسموعة
          </label>
          <input
            id="audio"
            type="text"
            value={draft.audioText}
            onChange={(e) => onUpdate({ audioText: e.target.value })}
            aria-invalid={Boolean(errors.audioText)}
            className={`${inputClass} mt-2 ${errors.audioText ? 'border-error' : 'border-line'}`} />
          
          <FieldError message={errors.audioText} />
        </div>
      </div>

      <div className="p-6">
        <OptionsEditor
          options={draft.options}
          correctId={draft.correctId}
          error={errors.options}
          onChangeText={onUpdateOption}
          onMarkCorrect={(id) => onUpdate({ correctId: id })}
          onAdd={onAddOption}
          onRemove={onRemoveOption} />
        
      </div>

      <div className="grid gap-5 p-6 md:grid-cols-2">
        <div>
          <h2 id="difficulty-label" className="mb-2 text-base font-bold text-ink">
            مستوى الصعوبة
          </h2>
          <DifficultySelector value={draft.difficulty} onChange={(level: DifficultyLevel) => onUpdate({ difficulty: level })} />
        </div>
        <div>
          <label htmlFor="assignee" className="mb-2 block text-base font-bold text-ink">
            تكليف إلى
          </label>
          <select
            id="assignee"
            value={draft.assigneeId}
            onChange={(e) => onUpdate({ assigneeId: e.target.value })}
            aria-invalid={Boolean(errors.assigneeId)}
            className={`${inputClass} ${errors.assigneeId ? 'border-error' : 'border-line'}`}>
            
            <option value="">اختر طفلًا…</option>
            {caseload.map((child) =>
            <option key={child.id} value={child.id}>
                {child.nickname} — {child.ageGroup}
              </option>
            )}
          </select>
          <FieldError message={errors.assigneeId} />
        </div>
      </div>
    </form>);

}