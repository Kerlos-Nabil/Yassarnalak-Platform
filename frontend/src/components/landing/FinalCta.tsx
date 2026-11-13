
import React from 'react';
import { ArrowLeftIcon, UserSearchIcon } from 'lucide-react';
import { Button } from '../ui/Button';

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="py-24 relative overflow-hidden" dir="rtl">
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="grid items-center gap-8 rounded-[32px] bg-primary-light/70 border border-primary/15 p-8 md:grid-cols-[1fr_auto] md:p-14 shadow-sm backdrop-blur-sm">
          <div>
            <h2 id="cta-title" className="text-3xl font-bold leading-snug text-ink md:text-[36px] tracking-tight">
              رحلة طفلك تبدأ بخطوة صغيرة
            </h2>
            <p className="mt-3 max-w-[540px] text-base text-ink-soft leading-relaxed">
              ابدأ بقراءة دليل واحد، أو تحدّث مع أخصائي معتمد. لست وحدك في هذا الطريق.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5">
            <Button variant="accent" size="lg" href="#journey" className="shadow-xs hover:shadow-md transition-shadow">
              <span>ابدأ الآن</span>
              <ArrowLeftIcon aria-hidden="true" className="w-4 h-4 mr-1.5" />
            </Button>
            <Button variant="secondary" size="lg" href="#specialists" className="bg-surface/90 hover:bg-surface border-line/60">
              <UserSearchIcon aria-hidden="true" className="w-4 h-4 ml-1.5" />
              <span>تحدّث مع أخصائي</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}