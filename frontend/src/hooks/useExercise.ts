import { useState } from 'react';
import type { AnswerState, ExerciseQuestion, FeedbackStatus } from '../types/exercise';

const FIRST_TRY_POINTS = 10;
const RETRY_POINTS = 5;

export function useExercise(questions: ExerciseQuestion[]) {
  const [index, setIndex] = useState(0);
  const [wrongPicks, setWrongPicks] = useState<number[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [points, setPoints] = useState(0);
  const [firstTryCount, setFirstTryCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[index];
  const total = questions.length;
  const isLast = index === total - 1;

  const select = (optionIndex: number) => {
    if (isSolved || wrongPicks.includes(optionIndex)) return;
    if (optionIndex === question.correctIndex) {
      const isFirstTry = wrongPicks.length === 0;
      setIsSolved(true);
      setPoints((p) => p + (isFirstTry ? FIRST_TRY_POINTS : RETRY_POINTS));
      if (isFirstTry) setFirstTryCount((c) => c + 1);
    } else {
      setWrongPicks((w) => [...w, optionIndex]);
    }
  };

  const next = () => {
    if (isLast) {
      setIsFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setWrongPicks([]);
    setIsSolved(false);
  };

  const restart = () => {
    setIndex(0);
    setWrongPicks([]);
    setIsSolved(false);
    setPoints(0);
    setFirstTryCount(0);
    setIsFinished(false);
  };

  const getOptionState = (optionIndex: number): AnswerState => {
    if (isSolved) return optionIndex === question.correctIndex ? 'correct' : 'muted';
    if (wrongPicks.includes(optionIndex)) return 'wrong';
    return 'idle';
  };

  const status: FeedbackStatus = isSolved ? 'correct' : wrongPicks.length > 0 ? 'wrong' : 'idle';
  const ratio = firstTryCount / total;
  const stars = ratio >= 0.8 ? 3 : ratio >= 0.5 ? 2 : 1;
  const progress = (index + (isSolved ? 1 : 0)) / total;

  return {
    question,
    index,
    total,
    isLast,
    status,
    points,
    stars,
    firstTryCount,
    progress,
    isFinished,
    select,
    next,
    restart,
    getOptionState
  };
}