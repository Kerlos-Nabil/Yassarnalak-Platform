import React from 'react';
import { PlayIcon, SquareIcon } from 'lucide-react';
import { speedOptions } from './settings';
import { useA11y } from './AccessibilityProvider';

export function ReadAloud() {
  const { settings, update, speaking, toggleSpeech, speechMessage } = useA11y();
  return (
    <div className="border-t border-white/20 bg-primary-dark px-6 py-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSpeech}
          className="inline-flex min-h-[56px] flex-1 items-center justify-center gap-3 rounded-full bg-accent px-6 text-lg font-bold text-ink transition-colors duration-200 hover:bg-accent-hover">
          
          {speaking ? <SquareIcon className="h-5 w-5" aria-hidden="true" /> : <PlayIcon className="h-5 w-5" aria-hidden="true" />}
          {speaking ? 'إيقاف القراءة' : 'اقرأ لي الصفحة'}
          <span aria-hidden="true" className="flex h-6 items-center gap-[3px]">
            {[0.4, 0.9, 0.6, 1, 0.5].map((h, i) =>
            <span
              key={i}
              className={`w-[3px] rounded-full bg-ink ${speaking ? 'a11y-wave' : ''}`}
              style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }} />
            )}
          </span>
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="text-sm font-bold text-white/80">السرعة</span>
        <div className="grid flex-1 grid-cols-3 gap-1 rounded-full border border-white/25 bg-white/5 p-1" role="radiogroup" aria-label="سرعة القراءة">
          {speedOptions.map((o) => {
            const on = settings.speed === o.id;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => update('speed', o.id)}
                className={`min-h-[40px] rounded-full text-sm font-bold transition-colors duration-200 ${on ? 'bg-white text-primary-dark' : 'text-white hover:bg-white/10'}`}>
                
                {o.label}
              </button>);

          })}
        </div>
      </div>
      {speechMessage && <p role="status" className="mt-2 text-sm text-white/80">{speechMessage}</p>}
    </div>);

}
