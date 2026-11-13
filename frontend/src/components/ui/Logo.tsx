import React from 'react';
import { SproutIcon } from 'lucide-react';

export function Logo() {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white">
        <SproutIcon className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className="text-2xl font-bold text-ink">يَسَّرْنَالَك</span>
    </span>);

}
