import React, { useState } from 'react';
import { StatusBadge } from './StatusBadge';
import { difficultyLabels } from '../../data/dashboard';
import type { CaseStatus, ChildCase } from '../../types/dashboard';
import { toArabicDigits } from '../../utils/numbers';

type Filter = 'all' | CaseStatus;

const filters: {id: Filter;label: string;}[] = [
{ id: 'all', label: 'الكل' },
{ id: 'needs-attention', label: 'يحتاج متابعة' },
{ id: 'progressing', label: 'يتقدّم' },
{ id: 'inactive', label: 'غير نشط' }];


interface CaseloadTableProps {
  cases: ChildCase[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function CaseloadTable({ cases, selectedId, onSelect }: CaseloadTableProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = filter === 'all' ? cases : cases.filter((c) => c.status === filter);

  return (
    <section id="caseload" aria-labelledby="caseload-title" className="rounded-card border border-line bg-surface shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div>
          <h2 id="caseload-title" className="text-xl font-bold text-ink">
            الأطفال المرتبطون
          </h2>
          <p className="text-sm text-ink-soft">اختر طفلًا لعرض تقدّمه ونقاط ضعفه.</p>
        </div>
        <div role="tablist" aria-label="تصفية حسب الحالة" className="flex gap-1 rounded-full bg-cream p-1">
          {filters.map((f) =>
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`min-h-[40px] rounded-full px-4 text-sm font-semibold transition-colors duration-200 ${
            filter === f.id ? 'bg-primary text-white' : 'text-ink-soft hover:text-primary'}`
            }>
            
              {f.label}
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-cream text-sm text-ink-soft">
            <tr>
              <th scope="col" className="px-6 py-3 font-semibold">الطفل</th>
              <th scope="col" className="px-4 py-3 font-semibold">الفئة العمرية</th>
              <th scope="col" className="px-4 py-3 font-semibold">الصعوبة</th>
              <th scope="col" className="px-4 py-3 font-semibold">آخر نشاط</th>
              <th scope="col" className="px-4 py-3 font-semibold">الإتقان</th>
              <th scope="col" className="px-6 py-3 font-semibold">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((child) => {
              const isSelected = child.id === selectedId;
              return (
                <tr
                  key={child.id}
                  className={`border-t border-line transition-colors duration-200 ${
                  isSelected ? 'bg-primary-light/70' : 'hover:bg-cream'}`
                  }>
                  
                  <td className="px-6 py-3">
                    <button
                      type="button"
                      onClick={() => onSelect(child.id)}
                      aria-pressed={isSelected}
                      className="flex items-center gap-3 rounded-xl text-right">
                      
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light font-bold text-primary">
                        {child.nickname.charAt(0)}
                      </span>
                      <span className="text-base font-bold text-ink">{child.nickname}</span>
                      <span className="sr-only">— عرض التقدّم</span>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-ink">{child.ageGroup}</td>
                  <td className="px-4 py-3">
                    <span className="whitespace-nowrap rounded-full border border-primary/20 bg-primary-light px-3 py-1 text-sm font-semibold text-primary">
                      {difficultyLabels[child.difficulty]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-ink-soft">{child.lastActivity}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-2 w-28 overflow-hidden rounded-full bg-primary-light"
                        role="progressbar"
                        aria-label={`إتقان ${child.nickname}`}
                        aria-valuenow={child.mastery}
                        aria-valuemin={0}
                        aria-valuemax={100}>
                        
                        <div className="h-full rounded-full bg-primary" style={{ width: `${child.mastery}%` }} />
                      </div>
                      <span className="w-10 text-sm font-bold text-ink">٪{toArabicDigits(child.mastery)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <StatusBadge status={child.status} />
                  </td>
                </tr>);

            })}
            {visible.length === 0 &&
            <tr className="border-t border-line">
                <td colSpan={6} className="px-6 py-10 text-center text-ink-soft">
                  لا يوجد أطفال بهذه الحالة حاليًا.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>);

}