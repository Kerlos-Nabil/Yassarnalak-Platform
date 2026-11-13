export interface ExerciseQuestion {
  id: string;
  spokenWord: string;
  options: string[];
  correctIndex: number;
}

export type AnswerState = 'idle' | 'correct' | 'wrong' | 'muted';

export type FeedbackStatus = 'idle' | 'correct' | 'wrong';

export interface KidAccent {
  tint: string;
  edge: string;
}