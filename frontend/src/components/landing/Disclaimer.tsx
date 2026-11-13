
import React from 'react';
import { InfoIcon } from 'lucide-react';

export function Disclaimer() {
  return (
    <div 
      role="note" 
      aria-label="تنبيه طبي" 
      className="border-y border-accent/40 bg-notice/80 backdrop-blur-sm relative z-30"
      dir="rtl"
    >
      <div className="mx-auto flex max-w-[1140px] items-center gap-3.5 px-6 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning-ink/10">
          <InfoIcon className="h-5 w-5 text-warning-ink" aria-hidden="true" />
        </div>
        <p className="text-sm sm:text-base font-semibold text-ink leading-relaxed">
          هذه المنصة لا تقدّم تشخيصًا طبيًا. استشر طبيبًا مرخّصًا دائمًا.
        </p>
      </div>
    </div>
  );
}