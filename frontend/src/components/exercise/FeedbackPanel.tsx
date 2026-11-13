import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, CircleCheckIcon, EarIcon, Volume2Icon } from 'lucide-react';
import { Button } from '../ui/Button';
import type { FeedbackStatus } from '../../types/exercise';

interface FeedbackPanelProps {
  status: FeedbackStatus;
  isLast: boolean;
  onNext: () => void;
  onReplay: () => void;
}

const enter = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] as const }
};

export function FeedbackPanel({ status, isLast, onNext, onReplay }: FeedbackPanelProps) {
  return (
    <div className="min-h-[136px]" aria-live="polite">
      <AnimatePresence mode="wait">
        {status === 'correct' &&
        <motion.div
          key="correct"
          {...enter}
          className="flex flex-col items-stretch gap-4 rounded-[24px] border-2 border-success bg-success-tint p-5 sm:flex-row sm:items-center">
          
            <div className="flex flex-1 items-center gap-3">
              <CircleCheckIcon className="h-10 w-10 shrink-0 text-success" aria-hidden="true" />
              <div>
                <p className="text-2xl font-bold text-success-ink">أحسنت!</p>
                <p className="text-base text-ink-soft">هذه هي الكلمة الصحيحة.</p>
              </div>
            </div>
            <Button variant="accent" size="xl" onClick={onNext}>
              {isLast ? 'عرض النتيجة' : 'التالي'}
              <ArrowLeftIcon aria-hidden="true" />
            </Button>
          </motion.div>
        }
        {status === 'wrong' &&
        <motion.div
          key="wrong"
          {...enter}
          className="flex flex-col items-stretch gap-4 rounded-[24px] border-2 border-warning bg-notice p-5 sm:flex-row sm:items-center">
          
            <div className="flex flex-1 items-center gap-3">
              <EarIcon className="h-10 w-10 shrink-0 text-warning-ink" aria-hidden="true" />
              <div>
                <p className="text-2xl font-bold text-warning-ink">قرّب! جرّب تاني</p>
                <p className="text-base text-ink-soft">استمع مرة أخرى، ثم اختر من جديد.</p>
              </div>
            </div>
            <Button variant="secondary" size="lg" onClick={onReplay}>
              <Volume2Icon aria-hidden="true" />
              استمع مرة أخرى
            </Button>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}