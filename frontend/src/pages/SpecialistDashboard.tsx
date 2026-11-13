import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { SpecialistLayout } from '../components/dashboard/SpecialistLayout';
import { StatCards } from '../components/dashboard/StatCards';
import { CaseloadTable } from '../components/dashboard/CaseloadTable';
import { ProgressChart } from '../components/dashboard/ProgressChart';
import { WeakAreasPanel } from '../components/dashboard/WeakAreasPanel';
import { Button } from '../components/ui/Button';
import { caseload } from '../data/dashboard';
import { useAuth } from '../auth/AuthContext';
import { usePlatform } from '../store/platform';
import { conditionLabel, severityLabels } from '../data/conditions';
import { ageText, longDate } from '../utils/dates';

export function SpecialistDashboard() {
  const { user } = useAuth();
  const { cases } = usePlatform();
  const referred = cases.filter((c) => c.confirmed && c.specialistId === user?.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const greeting = `${user?.role === 'doctor' ? 'د. ' : ''}${user?.name.split(' ')[0] ?? ''}`;
  const [selectedId, setSelectedId] = useState(caseload[0].id);
  const selectedChild = caseload.find((c) => c.id === selectedId) ?? caseload[0];

  return (
    <SpecialistLayout>
      <main className="mx-auto max-w-[1280px] space-y-8 px-10 py-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-ink">مرحبًا، {greeting}</h1>
            <p className="text-base text-ink-soft">لديك ٧ تمارين بانتظار التكليف، وطفلان يحتاجان متابعة هذا الأسبوع.</p>
          </div>
          <Button variant="accent" to="/studio">
            <PlusIcon aria-hidden="true" />
            تمرين جديد
          </Button>
        </header>

        <section aria-labelledby="ref-title" className="rounded-card border border-line bg-surface p-6 shadow-soft">
          <h2 id="ref-title" className="text-2xl font-bold text-ink">حالات محوّلة إليك</h2>
          {referred.length === 0 ?
          <p className="mt-3 text-ink-soft">لسه مفيش حالات محوّلة. لما دكتور يؤكد تشخيص طفل ويختارك للمتابعة، هيظهر هنا.</p> :
          <ul className="mt-4 divide-y divide-line">
              {referred.map((c) =>
            <li key={c.id} className="py-4">
                  <p className="text-lg font-bold text-ink">{c.childName} <span className="text-base font-normal text-ink-soft">({ageText(c.childBirth)})</span></p>
                  <p className="text-ink-soft">{conditionLabel(c.condition)} — {c.severity ? severityLabels[c.severity] : ''} — من {c.doctorName} ({longDate(c.createdAt.slice(0, 10))})</p>
                  <p className="mt-1 text-ink-soft"><strong className="text-ink">توصيات الدكتور:</strong> {c.recommendations}</p>
                  {c.prescription && <p className="mt-1 text-sm font-semibold text-primary">الروشتة: {c.prescription.dataUrl ? <a className="underline" href={c.prescription.dataUrl} download={c.prescription.name}>{c.prescription.name}</a> : c.prescription.name}</p>}
                </li>
            )}
            </ul>
          }
        </section>

        <p role="note" className="rounded-2xl bg-notice px-4 py-3 text-base font-semibold text-warning-ink">
          البيانات المعروضة (الأطفال والأرقام) تجريبية للعرض فقط، وهتتبدل ببيانات حالاتك الفعلية بعد ربط الـ backend.
        </p>

        <StatCards />

        <CaseloadTable cases={caseload} selectedId={selectedId} onSelect={setSelectedId} />

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ProgressChart child={selectedChild} />
          </div>
          <WeakAreasPanel child={selectedChild} />
        </div>
      </main>
    </SpecialistLayout>);

}