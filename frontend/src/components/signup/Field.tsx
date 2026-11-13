import React from 'react';

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const inputClass =
'min-h-[52px] w-full rounded-2xl border border-line bg-surface px-4 text-base text-ink placeholder:text-ink-soft/60 transition-colors duration-200 focus:border-primary disabled:bg-cream disabled:text-ink-soft';

export function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-base font-bold text-ink">
        {label}
      </label>
      {children}
      {error && <p role="alert" className="mt-1.5 text-sm font-semibold text-error">{error}</p>}
    </div>);

}
