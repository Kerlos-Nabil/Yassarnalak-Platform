import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { mascotName, mascotUrl } from '../../data/exercise';
import { toArabicDigits } from '../../utils/numbers';

interface ExerciseHeaderProps {
  current: number;
  total: number;
  progress: number;
}

export function ExerciseHeader({ current, total, progress }: ExerciseHeaderProps) {
  const percent = Math.round(progress * 100);

  return (
    <header className="flex items-center gap-4">
      <img
        src={mascotUrl}
        alt={`${mascotName}، صديقتك في التمرين`}
        className="h-14 w-14 shrink-0 rounded-full object-cover ring-4 ring-white" />
      
      <div className="flex-1">
        <div className="flex items-center justify-between text-sm font-semibold text-ink-soft">
          <span>هيّا نتعلّم مع {mascotName}</span>
          <span>
            {toArabicDigits(current)} من {toArabicDigits(total)}
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="تقدّم التمرين"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          className="mt-1 h-2.5 overflow-hidden rounded-full bg-line">
          
          <motion.div
            className="h-full rounded-full bg-kid-sky"
            initial={false}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} />
          
        </div>
      </div>
      <Link
        to="/"
        className="flex min-h-[48px] shrink-0 items-center gap-2 rounded-full border border-line bg-white px-4 font-semibold text-ink transition-colors duration-200 hover:bg-primary-light">
        
        <XIcon className="h-5 w-5" aria-hidden="true" />
        خروج
      </Link>
    </header>);

}