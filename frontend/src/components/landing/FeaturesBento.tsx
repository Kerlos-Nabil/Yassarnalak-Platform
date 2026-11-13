
import React from 'react';
import { CheckIcon, CircleCheckIcon, HeadphonesIcon, LockIcon, ShieldCheckIcon, TrendingUpIcon, Volume2Icon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { verificationChecks } from '../../data/landing';

const waveform = [28, 44, 20, 56, 36, 64, 30, 48, 22, 40, 58, 26, 46, 34];
const progressSample = [
  { label: 'القراءة', value: 72 },
  { label: 'الإملاء', value: 54 }
];

export function FeaturesBento() {
  return (
    <section id="features" aria-labelledby="features-title" className="py-24 relative overflow-hidden" dir="rtl">
      <div className="mx-auto max-w-[1140px] px-6 relative z-10">
        
         
        <SectionHeading
          id="features-title"
          title="صُمّمت لتكون آمنة وواضحة"
          description="كل ما يحتاجه طفلك وعائلته في مكان واحد، بلا تعقيد ولا ضغط." 
        />
        
        
        <div className="mt-14 grid gap-6 md:grid-cols-6">
          
           
          <article className="group flex flex-col rounded-card bg-primary p-8 md:p-10 text-white md:col-span-4 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
             
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
            
            <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white/15 transition-transform duration-300 group-hover:scale-105">
              <ShieldCheckIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-2xl font-bold tracking-tight">أخصائيون موثّقون فقط</h3>
            <p className="mt-2.5 max-w-[480px] text-base text-white/90 leading-relaxed">
              لا يظهر أي أخصائي على المنصة قبل مراجعة ترخيصه وخبرته يدويًا من فريقنا.
            </p>
            <ul className="mt-auto flex flex-wrap gap-2.5 pt-10">
              {verificationChecks.map((check) => (
                <li key={check} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm sm:text-base font-semibold backdrop-blur-sm transition-colors hover:bg-white/15">
                  <CircleCheckIcon className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </article>

           
          <article className="group flex flex-col rounded-card border border-line/70 bg-surface p-8 md:col-span-2 md:row-span-2 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06)]"
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-primary-light text-primary transition-transform duration-300 group-hover:scale-105">
              <HeadphonesIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-xl font-bold text-ink tracking-tight">تمارين تعتمد على الصوت</h3>
            <p className="mt-2.5 text-sm sm:text-base text-ink-soft leading-relaxed">
              يسمع الطفل الكلمة ثم يختارها، فيتدرّب دون أن يشعر بثقل القراءة.
            </p>
            
            
            <div className="mt-auto pt-8" aria-hidden="true">
              <div className="rounded-3xl bg-primary-light/60 border border-primary/10 p-5">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-ink shadow-sm">
                    <Volume2Icon className="h-5 w-5" />
                  </span>
                  <div className="flex h-10 flex-1 items-center gap-1">
                    {waveform.map((h, i) => (
                      <span key={i} className="flex-1 rounded-full bg-primary/40 transition-all duration-300" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <span className="flex min-h-[46px] items-center justify-center gap-1.5 rounded-2xl border-2 border-success bg-success-tint text-base sm:text-lg font-bold text-success-ink shadow-xs">
                    <CheckIcon className="h-4 w-4" />
                    شمس
                  </span>
                  <span className="flex min-h-[46px] items-center justify-center rounded-2xl border-2 border-line bg-surface text-base sm:text-lg font-bold text-ink-soft">
                    سمش
                  </span>
                </div>
              </div>
            </div>
          </article>

           
          <article className="group flex flex-col rounded-card border border-line/70 bg-surface p-8 md:col-span-2 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06)]"
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <span className="flex h-19 w-13 items-center justify-center rounded-2xl bg-primary-light text-primary transition-transform duration-300 group-hover:scale-105">
              <TrendingUpIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-xl font-bold text-ink tracking-tight">متابعة التقدّم لحظة بلحظة</h3>
            <ul className="mt-auto space-y-4 pt-6">
              {progressSample.map((item) => (
                <li key={item.label} className="space-y-1.5">
                  <div className="flex justify-between text-sm font-semibold text-ink">
                    <span>{item.label}</span>
                    <span className="text-primary font-bold">٪{item.value.toLocaleString('ar-EG')}</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-primary-light/80">
                    <div className="h-full rounded-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${item.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </article>

          
          <article className="group flex flex-col rounded-card border border-line/70 bg-surface p-8 md:col-span-2 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06)]"
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-primary-light text-primary transition-transform duration-300 group-hover:scale-105">
              <LockIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-xl font-bold text-ink tracking-tight">خصوصية الطفل وأمانه</h3>
            <p className="mt-2.5 text-sm sm:text-base text-ink-soft leading-relaxed">
              اسم مستعار للطفل، وبيانات مشفّرة لا تُشارك إلا مع المختص الذي تختاره.
            </p>
          </article>

        </div>
      </div>
    </section>
  );
}