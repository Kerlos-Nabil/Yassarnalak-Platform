
import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { journeySteps } from '../../data/landing';
import { toArabicDigits } from '../../utils/numbers';

export function JourneyStepper() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="py-24 relative overflow-hidden" dir="rtl">
      <div className="mx-auto max-w-[1140px] px-6">
        <SectionHeading
          id="journey-title"
          title="رحلة واضحة من ثلاث مراحل"
          description="لا تحتاج أن تعرف كل شيء من البداية. نرافقك في كل مرحلة بهدوء." 
        />
        
        <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === journeySteps.length - 1;
            return (
              <li key={step.title} className="relative group">
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute top-8 hidden h-0.5 rounded-full bg-primary/20 md:block start-[80px] -end-8 transition-colors group-hover:bg-primary/40" 
                  />
                )}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary shadow-xs transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                  <span className="absolute -top-2 -start-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-ink shadow-xs">
                    {toArabicDigits(index + 1)}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-ink tracking-tight">{step.title}</h3>
                <p className="mt-2 max-w-[320px] text-base text-ink-soft leading-relaxed">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}