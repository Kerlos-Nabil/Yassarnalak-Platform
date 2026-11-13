import { NavLink } from 'react-router-dom';
import { useMemo , useState } from 'react';
 
import { ArrowLeftIcon, BadgeCheckIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';
import { specialists } from '../../data/landing';
 
export function SpecialistsPreview() {
   
    
  return (
    <section id="specialists" aria-labelledby="specialists-title" className="py-24 relative overflow-hidden" dir="rtl">
      <div className="mx-auto max-w-[1140px] px-6 relative z-10">
        
         
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="specialists-title"
            title="أخصائيون معتمدون بانتظاركم"
            description="كل أخصائي هنا مرّ بمراجعة للترخيص والخبرة قبل أن يظهر لكم."
          />
          
          <NavLink
            to="/Doctors" 
            className="group inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary/80"
          >
            <span>عرض كل الأخصائيين</span>
            <ArrowLeftIcon 
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" 
              aria-hidden="true" 
            />
          </NavLink>
        </div>

         
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {specialists.map((s) => (
            <li 
              key={s.id} 
              className="group relative flex flex-col rounded-card border border-line/70 bg-surface p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06)]"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <img 
                    src={s.avatar} 
                    alt={`صورة توضيحية لـ ${s.name}`} 
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-line/50 transition-transform duration-300 group-hover:scale-105" 
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-ink tracking-tight leading-snug truncate">{s.name}</h3>
                  <p className="mt-0.5 text-sm text-ink-soft truncate">{s.specialty}</p>
                </div>
              </div>

               
              <div className="mt-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success-tint px-3 py-1 text-xs font-bold text-success-ink">
                  <BadgeCheckIcon className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                  معتمد
                </span>
              </div>

              
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line/50 pt-5 text-xs sm:text-sm">
                <div className="space-y-1">
                  <dt className="text-ink-soft font-normal">الخبرة</dt>
                  <dd className="font-bold text-ink">{s.experience}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-ink-soft font-normal">يركّز على</dt>
                  <dd className="font-bold text-ink truncate" title={s.focus}>{s.focus}</dd>
                </div>
              </dl>

               
              <div className="mt-8 pt-4 border-t border-line/30" to="/doctors/${s.id}">
                  <Button variant="secondary" to={`/doctors/${s.id}`}>عرض الملف</Button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}