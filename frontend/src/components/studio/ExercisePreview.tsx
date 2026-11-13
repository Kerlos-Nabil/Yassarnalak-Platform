import React, { useEffect, useState } from 'react';
import { CircleCheckIcon, EarIcon, EyeIcon, RotateCcwIcon } from 'lucide-react';
import { AudioButton } from '../exercise/AudioButton';
import { AnswerOption } from '../exercise/AnswerOption';
import { useSpeech } from '../../hooks/useSpeech';
import { kidAccents, mascotUrl } from '../../data/exercise';
import type { AnswerState } from '../../types/exercise';
import type { ExerciseDraft } from '../../types/studio';

interface ExercisePreviewProps {
  draft: ExerciseDraft;
  templateName: string;
}

export function ExercisePreview({ draft, templateName }: ExercisePreviewProps) {
  const { speak, isPlaying } = useSpeech();
  const [pickedId, setPickedId] = useState<string | null>(null);
  const signature = draft.options.map((o) => `${o.id}:${o.text}`).join('|') + draft.correctId;

  useEffect(() => setPickedId(null), [signature]);

  const isCorrectPick = pickedId === draft.correctId;

  const stateFor = (id: string): AnswerState => {
    if (!pickedId) return 'idle';
    if (isCorrectPick) return id === draft.correctId ? 'correct' : 'muted';
    return id === pickedId ? 'wrong' : 'idle';
  };

  return (
    <section aria-labelledby="preview-title">
      <div className="mb-3 flex items-center justify-between">
        <h2 id="preview-title" className="flex items-center gap-2 text-base font-bold text-ink">
          <EyeIcon className="h-5 w-5 text-primary" aria-hidden="true" />
          معاينة مباشرة
        </h2>
        {pickedId &&
        <button
          type="button"
          onClick={() => setPickedId(null)}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-primary hover:bg-primary-light">
          
            <RotateCcwIcon className="h-4 w-4" aria-hidden="true" />
            إعادة المعاينة
          </button>
        }
      </div>

      <div className="rounded-[36px] border border-line bg-white p-3 shadow-soft">
        <div className="rounded-[28px] bg-cream px-5 pb-6 pt-4">
          <div className="flex items-center gap-3">
            <img src={mascotUrl} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-white" />
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
              <div className="h-full w-1/5 rounded-full bg-kid-sky" />
            </div>
          </div>

          <div className="mt-6 text-center">
            <span className="text-sm font-semibold text-ink-soft">{templateName}</span>
            <p className={`mt-1 text-2xl font-bold ${draft.question.trim() ? 'text-ink' : 'text-ink-soft/60'}`}>
              {draft.question.trim() || 'نص السؤال يظهر هنا'}
            </p>
          </div>

          <div className="mt-5 flex justify-center">
            <AudioButton size="md" isPlaying={isPlaying} onPlay={() => speak(draft.audioText)} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {draft.options.map((option, i) =>
            <AnswerOption
              key={option.id}
              size="md"
              label={option.text.trim() || 'خيار فارغ'}
              isPlaceholder={!option.text.trim()}
              accent={kidAccents[i % kidAccents.length]}
              state={stateFor(option.id)}
              onSelect={() => setPickedId(option.id)} />

            )}
          </div>

          <div className="mt-5 min-h-[52px]" aria-live="polite">
            {pickedId && isCorrectPick &&
            <p className="flex items-center justify-center gap-2 rounded-2xl bg-success-tint py-3 text-lg font-bold text-success-ink">
                <CircleCheckIcon className="h-5 w-5 text-success" aria-hidden="true" />
                أحسنت!
              </p>
            }
            {pickedId && !isCorrectPick &&
            <p className="flex items-center justify-center gap-2 rounded-2xl bg-notice py-3 text-lg font-bold text-warning-ink">
                <EarIcon className="h-5 w-5" aria-hidden="true" />
                قرّب! جرّب تاني
              </p>
            }
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-ink-soft">جرّب الضغط على الخيارات لمعاينة رسائل الطفل.</p>
    </section>);

}