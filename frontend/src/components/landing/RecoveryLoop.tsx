
import React from 'react';
import { ChevronLeftIcon, RefreshCwIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { loopSteps } from '../../data/landing';

export function RecoveryLoop() {
  return (
    <section aria-labelledby="loop-title" className="py-20" dir="rtl">
      <div className="mx-auto max-w-[1140px] px-6">
        <SectionHeading
          id="loop-title"
          title="كيف تعمل حلقة التعافي؟"
          description="دورة بسيطة تتكرّر كل أسبوع، يقودها المختص ويعيشها الطفل كلعبة قصيرة." 
        />
        
        <div className="mt-12 rounded-[32px] border border-line/60 bg-surface p-6 md:p-10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)]">
          <ol className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-0">
            {loopSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === loopSteps.length - 1;
              return (
                <React.Fragment key={step.title}>
                  <li className="flex flex-1 items-start gap-4 lg:flex-col lg:gap-0">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary shadow-xs">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div className="lg:mt-5">
                      <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                      <p className="mt-1.5 text-base text-ink-soft leading-relaxed">{step.description}</p>
                    </div>
                  </li>
                  {!isLast && (
                    <li aria-hidden="true" className="hidden px-4 pt-4 text-primary/40 lg:block rotate-180">
                      <ChevronLeftIcon className="h-6 w-6" />
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </ol>
          <p className="mt-8 flex items-center gap-3 border-t border-line/40 pt-6 text-base text-ink-soft font-medium">
            <RefreshCwIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            ثم تبدأ الحلقة من جديد بتمارين أنسب، حتى يصل الطفل إلى مستوى الإتقان.
          </p>
        </div>
      </div>
    </section>
  );
}
 