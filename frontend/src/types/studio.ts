import type { LucideIcon } from 'lucide-react';

export type TemplateId = 'spelling' | 'listen-choose' | 'letter-sound' | 'complete-word';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type SaveState = 'idle' | 'saving' | 'publishing' | 'saved' | 'published';

export interface ExerciseTemplate {
  id: TemplateId;
  name: string;
  description: string;
  icon: LucideIcon;
  defaults: {
    question: string;
    audioText: string;
    options: string[];
  };
}

export interface AnswerDraft {
  id: string;
  text: string;
}

export interface ExerciseDraft {
  templateId: TemplateId;
  question: string;
  audioText: string;
  options: AnswerDraft[];
  correctId: string;
  difficulty: DifficultyLevel;
  assigneeId: string;
}

export type DraftErrors = Partial<Record<'question' | 'audioText' | 'options' | 'assigneeId', string>>;