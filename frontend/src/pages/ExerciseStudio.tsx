import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from 'lucide-react';
import { SpecialistLayout } from '../components/dashboard/SpecialistLayout';
import { StudioForm } from '../components/studio/StudioForm';
import { ExercisePreview } from '../components/studio/ExercisePreview';
import { StudioActionBar } from '../components/studio/StudioActionBar';
import { useStudioForm } from '../hooks/useStudioForm';
import { caseload } from '../data/dashboard';

export function ExerciseStudio() {
  const studio = useStudioForm();
  const assignee = caseload.find((c) => c.id === studio.draft.assigneeId);

  return (
    <SpecialistLayout>
      <div className="flex min-h-screen flex-col">
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-10 py-8">
          <nav aria-label="مسار التنقل" className="text-sm text-ink-soft">
            <ol className="flex items-center gap-1">
              <li>
                <Link to="/studio" className="hover:text-primary">
                  استوديو التمارين
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronLeftIcon className="h-4 w-4" />
              </li>
              <li aria-current="page" className="font-semibold text-ink">
                تمرين جديد
              </li>
            </ol>
          </nav>
          <h1 className="mt-2 text-3xl font-bold text-ink">إنشاء تمرين جديد</h1>
          <p className="text-base text-ink-soft">اختر قالبًا، عدّل المحتوى، وشاهد كيف سيراه الطفل قبل النشر.</p>

          <div className="mt-8 grid items-start gap-8 xl:grid-cols-[400px_minmax(0,1fr)]">
            <div className="xl:order-2">
              <StudioForm
                draft={studio.draft}
                errors={studio.errors}
                onSelectTemplate={studio.selectTemplate}
                onUpdate={studio.update}
                onUpdateOption={studio.updateOption}
                onAddOption={studio.addOption}
                onRemoveOption={studio.removeOption} />
              
            </div>
            <div className="xl:sticky xl:top-8 xl:order-1">
              <ExercisePreview draft={studio.draft} templateName={studio.template.name} />
            </div>
          </div>
        </main>

        <StudioActionBar
          saveState={studio.saveState}
          hasErrors={studio.hasErrors}
          assigneeName={assignee?.nickname}
          onSaveDraft={studio.saveDraft}
          onPublish={studio.publish} />
        
      </div>
    </SpecialistLayout>);

}