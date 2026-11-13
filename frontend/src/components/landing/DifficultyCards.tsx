
import { ArrowLeftIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { difficulties } from '../../data/landing';

export function DifficultyCards() {
  return (
    <section id="difficulties" aria-labelledby="difficulties-title" className="py-24 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="mx-auto max-w-[1140px] px-6 relative z-10">
        <SectionHeading
          id="difficulties-title"
          title="أدلة لأربع صعوبات شائعة"
          description="شرح هادئ ومبسّط لكل صعوبة: ماذا تعني، وكيف تظهر، وما الذي يساعد."
        />
        
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {difficulties.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="flex h-full">
                <a
                  href={item.href}
                  className="group relative flex w-full flex-col rounded-card border border-line bg-surface p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] active:translate-y-0"
                  style={{
                   
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                   
                  <div className="relative mb-6">
                    <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-primary-light text-primary transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>

                  
                  <h3 className="text-lg font-bold text-ink tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft line-clamp-3">
                    {item.description}
                  </p>

                   
                  <div className="mt-auto pt-8 flex items-center justify-between border-t border-line/40 mt-6">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-200">
                      <span>اقرأ المزيد</span>
                      <ArrowLeftIcon
                        className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-1.5"
                        aria-hidden="true"
                      />
                    </span>
                    
                    
                    <span className="text-xs font-mono text-ink-soft/40 select-none" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}