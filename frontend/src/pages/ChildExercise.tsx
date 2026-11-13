import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExerciseHeader } from '../components/exercise/ExerciseHeader';
import { AudioButton } from '../components/exercise/AudioButton';
import { AnswerOption } from '../components/exercise/AnswerOption';
import { FeedbackPanel } from '../components/exercise/FeedbackPanel';
import { ResultScreen } from '../components/exercise/ResultScreen';
import { useExercise } from '../hooks/useExercise';
import { useSpeech } from '../hooks/useSpeech';
import { exerciseQuestions, kidAccents } from '../data/exercise';

export function ChildExercise() {
  const exercise = useExercise(exerciseQuestions);
  const { speak, isPlaying } = useSpeech();
  const playWord = () => speak(exercise.question.spokenWord);

  return (
    <div className="min-h-screen w-full bg-cream">
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-5 py-6 md:px-8 md:py-10">
        {exercise.isFinished ?
        <ResultScreen
          stars={exercise.stars}
          points={exercise.points}
          firstTryCount={exercise.firstTryCount}
          total={exercise.total}
          onNext={exercise.restart}
          onRestart={exercise.restart} /> :


        <>
            <ExerciseHeader current={exercise.index + 1} total={exercise.total} progress={exercise.progress} />
            <AnimatePresence mode="wait">
              <motion.section
              key={exercise.question.id}
              aria-labelledby="question-title"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="mt-10 flex flex-1 flex-col">
              
                <div className="flex flex-col items-center text-center">
                  <h1 id="question-title" className="text-3xl font-bold text-ink md:text-4xl">
                    اختر الكلمة الصحيحة
                  </h1>
                  <p className="mt-2 text-ink-soft">اضغط «استمع»، ثم اختر الكلمة التي سمعتها.</p>
                  <div className="mt-8">
                    <AudioButton onPlay={playWord} isPlaying={isPlaying} />
                  </div>
                </div>

                <div role="group" aria-label="الخيارات" className="mt-10 grid grid-cols-2 gap-4 md:gap-6">
                  {exercise.question.options.map((option, i) =>
                <AnswerOption
                  key={option}
                  label={option}
                  state={exercise.getOptionState(i)}
                  accent={kidAccents[i % kidAccents.length]}
                  onSelect={() => exercise.select(i)} />

                )}
                </div>

                <div className="mt-8">
                  <FeedbackPanel
                  status={exercise.status}
                  isLast={exercise.isLast}
                  onNext={exercise.next}
                  onReplay={playWord} />
                
                </div>
              </motion.section>
            </AnimatePresence>
          </>
        }
      </main>
    </div>);

}