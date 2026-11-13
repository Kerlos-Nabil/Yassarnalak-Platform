import React, { useState } from 'react';
import { CheckCircle2Icon, CircleIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { passwordRules, passwordScore } from '../../auth/validators';
import { Field, inputClass } from './Field';

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  showRules?: boolean;
  autoComplete?: string;
}

export function PasswordField({ id, label, value, onChange, error, showRules, autoComplete }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const score = passwordScore(value);
  const total = passwordRules.length;
  const strength = score <= 2 ? { text: 'ضعيفة', bar: 'bg-error' } : score < total ? { text: 'متوسطة', bar: 'bg-warning' } : { text: 'قوية', bar: 'bg-success' };

  return (
    <Field id={id} label={label} error={error}>
      <div className="relative">
        <input
          id={id}
          dir="ltr"
          type={visible ? 'text' : 'password'}
          className={`${inputClass} pe-14 text-end`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-describedby={showRules ? `${id}-rules` : undefined} />
        
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
          aria-pressed={visible}
          className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-ink-soft hover:bg-primary-light hover:text-primary">
          
          {visible ? <EyeOffIcon className="h-5 w-5" aria-hidden="true" /> : <EyeIcon className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {showRules &&
      <div id={`${id}-rules`} className="mt-3 rounded-2xl border border-line bg-cream/60 p-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-1 gap-1" aria-hidden="true">
              {Array.from({ length: total }).map((_, i) =>
            <span key={i} className={`h-1.5 flex-1 rounded-full ${value && i < score ? strength.bar : 'bg-line'}`} />
            )}
            </div>
            <span className="text-sm font-bold text-ink-soft">{value ? `قوة كلمة المرور: ${strength.text}` : 'شروط كلمة المرور'}</span>
          </div>
          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {passwordRules.map((r) => {
            const ok = r.test(value);
            return (
              <li key={r.id} className={`flex items-center gap-2 text-sm ${ok ? 'font-semibold text-success-ink' : 'text-ink-soft'}`}>
                  {ok ? <CheckCircle2Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : <CircleIcon className="h-4 w-4 shrink-0" aria-hidden="true" />}
                  {r.label}
                  <span className="sr-only">{ok ? ' (تم)' : ' (لم يتحقق)'}</span>
                </li>);

          })}
          </ul>
        </div>
      }
    </Field>);

}
