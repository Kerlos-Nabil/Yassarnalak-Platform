import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeftIcon, RotateCcwIcon, StarIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { mascotName, mascotUrl } from '../../data/exercise';
import { toArabicDigits } from '../../utils/numbers';

interface ResultScreenProps {
  stars: number;
  points: number;
  firstTryCount: number;
  total: number;
  onNext: () => void;
  onRestart: () => void;
}

const messages: Record<number, {title: string;body: string;}> = {
  3: { title: 'عمل رائع يا بطل!', body: 'سمعت الكلمات بوضوح واخترتها بثقة.' },
  2: { title: 'أحسنت!', body: 'أنت تتحسّن مع كل تمرين. استمر هكذا.' },
  1: { title: 'بداية جميلة!', body: 'كل محاولة تقرّبك أكثر. نحن فخورون بك.' }
};

const ease = [0.23, 1, 0.32, 1] as const;

export function ResultScreen({ stars, points, firstTryCount, total, onNext, onRestart }: ResultScreenProps) {
  const reduceMotion = useReducedMotion();
  const message = messages[stars];

  return (
    <motion.section
      aria-labelledby="result-title"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease }}
      className="my-auto flex flex-col items-center rounded-[32px] border border-line bg-white px-6 py-10 text-center shadow-soft md:px-12">
      
      <img src={mascotUrl} alt={`${mascotName} سعيدة بإنجازك`} className="h-28 w-28 rounded-full object-cover" />

      <div className="mt-6 flex items-end gap-3" role="img" aria-label={`حصلت على ${toArabicDigits(stars)} من ٣ نجوم`}>
        {[0, 1, 2].map((i) => {
          const isEarned = i < stars;
          return (
            <motion.span
              key={i}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.25, ease, delay: reduceMotion ? 0 : 0.15 + i * 0.12 }}
              className={i === 1 ? 'mb-3' : ''}>
              
              <StarIcon
                className={`h-14 w-14 ${isEarned ? 'fill-kid-sun text-[#E9B84A]' : 'fill-transparent text-line'}`}
                strokeWidth={1.75}
                aria-hidden="true" />
              
            </motion.span>);

        })}
      </div>

      <h1 id="result-title" className="mt-6 text-3xl font-bold text-ink md:text-4xl">
        {message.title}
      </h1>
      <p className="mt-2 text-lg text-ink-soft">{message.body}</p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-kid-sun px-5 py-2 text-xl font-bold text-ink">
          <StarIcon className="h-5 w-5 fill-ink" aria-hidden="true" />+{toArabicDigits(points)} نقطة
        </span>
        <span className="text-base text-ink-soft">
          {toArabicDigits(firstTryCount)} من {toArabicDigits(total)} من أول محاولة
        </span>
      </div>

      <div className="mt-10 flex w-full max-w-sm flex-col gap-3">
        <Button variant="accent" size="xl" fullWidth onClick={onNext}>
          التمرين التالي
          <ArrowLeftIcon aria-hidden="true" />
        </Button>
        <Button variant="ghost" fullWidth onClick={onRestart}>
          <RotateCcwIcon aria-hidden="true" />
          أعد التمرين
        </Button>
      </div>
    </motion.section>);

}