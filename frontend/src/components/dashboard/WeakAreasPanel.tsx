import React from 'react';
import { Link } from 'react-router-dom';
import { PencilRulerIcon } from 'lucide-react';
import type { ChildCase } from '../../types/dashboard';
import { toArabicDigits } from '../../utils/numbers';

interface WeakAreasPanelProps {
  child: ChildCase;
}

function levelLabel(score: number) {
  if (score < 40) return 'ضعيف جدًا';
  if (score < 60) return 'ضعيف';
  return 'يحتاج تعزيز';
}

export function WeakAreasPanel({ child }: WeakAreasPanelProps) {
  const sorted = [...child.weakAreas].sort((a, b) => a.score - b.score);

  return (
    <section aria-labelledby="weak-title" className="flex flex-col rounded-card border border-line bg-surface p-6 shadow-soft">
      <h2 id="weak-title" className="text-xl font-bold text-ink">
        نقاط الضعف
      </h2>
      <p className="text-sm text-ink-soft">المهارات الأقل أداءً لدى «{child.nickname}»</p>

      <ul className="mt-6 space-y-5">
        {sorted.map((area) =>
        <li key={area.skill}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-base font-semibold text-ink">{area.skill}</span>
              <span className="whitespace-nowrap text-sm font-bold text-ink">٪{toArabicDigits(area.score)}</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-primary-light">
              <div className="h-full rounded-full bg-primary" style={{ width: `${area.score}%` }} />
            </div>
            <span className="mt-1 block text-sm text-ink-soft">{levelLabel(area.score)}</span>
          </li>
        )}
      </ul>

      <div className="mt-auto pt-6">
        <Link
          to="/studio"
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-primary px-5 font-bold text-primary transition-colors duration-200 hover:bg-primary-light">
          
          <PencilRulerIcon className="h-5 w-5" aria-hidden="true" />
          أنشئ تمرينًا لأضعف مهارة
        </Link>
      </div>
    </section>);

}