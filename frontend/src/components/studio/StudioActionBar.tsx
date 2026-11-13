import React from 'react';
import { CircleAlertIcon, CircleCheckIcon, LoaderCircleIcon, SaveIcon, SendIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import type { SaveState } from '../../types/studio';

interface StudioActionBarProps {
  saveState: SaveState;
  hasErrors: boolean;
  assigneeName?: string;
  onSaveDraft: () => void;
  onPublish: () => void;
}

function StatusMessage({ saveState, hasErrors, assigneeName }: Omit<StudioActionBarProps, 'onSaveDraft' | 'onPublish'>) {
  if (hasErrors && saveState !== 'saving') {
    return (
      <span className="flex items-center gap-2 font-semibold text-error">
        <CircleAlertIcon className="h-5 w-5" aria-hidden="true" />
        أكمل الحقول المطلوبة قبل النشر.
      </span>);

  }
  if (saveState === 'saved') {
    return (
      <span className="flex items-center gap-2 font-semibold text-success-ink">
        <CircleCheckIcon className="h-5 w-5 text-success" aria-hidden="true" />
        حُفظت المسودة.
      </span>);

  }
  if (saveState === 'published') {
    return (
      <span className="flex items-center gap-2 font-semibold text-success-ink">
        <CircleCheckIcon className="h-5 w-5 text-success" aria-hidden="true" />
        تم النشر والتكليف إلى «{assigneeName}».
      </span>);

  }
  return <span className="text-ink-soft">تغييراتك تظهر في المعاينة فورًا.</span>;
}

export function StudioActionBar({ saveState, hasErrors, assigneeName, onSaveDraft, onPublish }: StudioActionBarProps) {
  const isBusy = saveState === 'saving' || saveState === 'publishing';

  return (
    <div className="sticky bottom-0 z-20 border-t border-line bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-10 py-4">
        <p className="text-base" aria-live="polite">
          <StatusMessage saveState={saveState} hasErrors={hasErrors} assigneeName={assigneeName} />
        </p>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={onSaveDraft} disabled={isBusy}>
            {saveState === 'saving' ? <LoaderCircleIcon className="animate-spin" aria-hidden="true" /> : <SaveIcon aria-hidden="true" />}
            حفظ كمسودة
          </Button>
          <Button variant="accent" onClick={onPublish} disabled={isBusy}>
            {saveState === 'publishing' ? <LoaderCircleIcon className="animate-spin" aria-hidden="true" /> : <SendIcon aria-hidden="true" />}
            نشر وتكليف
          </Button>
        </div>
      </div>
    </div>);

}