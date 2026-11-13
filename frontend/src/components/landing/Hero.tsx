import React from 'react';
import { BookOpenIcon, ShieldCheckIcon, UserSearchIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { heroImage } from '../../data/landing';

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <div className="mx-auto grid max-w-[1100px] items-center gap-14 px-6 pb-20 pt-12 md:pt-20 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <h1 id="hero-title" className="text-4xl font-bold leading-[1.4] text-ink md:text-[54px] md:leading-[1.35]">
            افهم صعوبات التعلّم..{' '}
            <span className="text-primary">وابدأ رحلة التعافي بثقة</span>
          </h1>
          <p className="mt-6 max-w-[520px] text-lg text-ink-soft">
            أدلة مبسّطة بلغة واضحة، وأخصائيون موثّقون، وتمارين صوتية قصيرة تساعد طفلك على التقدّم خطوة
            بخطوة.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" href="#difficulties">
              <BookOpenIcon aria-hidden="true" />
              تصفّح الأدلة
            </Button>
            <Button size="lg" variant="secondary" href="#specialists">
              <UserSearchIcon aria-hidden="true" />
              ابحث عن أخصائي
            </Button>
          </div>
          <p className="mt-8 flex items-center gap-2 text-base text-ink-soft">
            <ShieldCheckIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            محتوى توعوي وداعم — المنصة لا تقدّم تشخيصًا.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <div
            aria-hidden="true"
            className="absolute -inset-5 -rotate-3 rounded-[48px] bg-gradient-to-br from-primary/25 via-primary-light to-primary-light" />
          
          <img
            src={heroImage}
            alt="رسم توضيحي لأم تقرأ قصة مع طفلها الذي يرتدي سماعات أذن"
            className="relative aspect-[4/3] w-full rounded-[32px] object-cover shadow-soft" />
          
        </div>
      </div>
    </section>);

}


 