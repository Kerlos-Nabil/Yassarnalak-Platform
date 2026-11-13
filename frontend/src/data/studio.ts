import { HeadphonesIcon, PuzzleIcon, SpellCheckIcon, TypeIcon } from 'lucide-react';
import type { DifficultyLevel, ExerciseTemplate } from '../types/studio';

export const exerciseTemplates: ExerciseTemplate[] = [
{
  id: 'spelling',
  name: 'اختيار الإملاء',
  description: 'اختيار الكتابة الصحيحة للكلمة',
  icon: SpellCheckIcon,
  defaults: { question: 'اختر الكتابة الصحيحة', audioText: 'مدرسة', options: ['مدرسة', 'مدرسه', 'مدرصة'] }
},
{
  id: 'listen-choose',
  name: 'استمع واختر',
  description: 'يسمع الطفل كلمة ثم يختارها',
  icon: HeadphonesIcon,
  defaults: { question: 'اختر الكلمة الصحيحة', audioText: 'شمس', options: ['شمس', 'سمش', 'شمش', 'سمس'] }
},
{
  id: 'letter-sound',
  name: 'الحرف والصوت',
  description: 'ربط الصوت بالحرف المناسب',
  icon: TypeIcon,
  defaults: { question: 'بأي حرف تبدأ الكلمة؟', audioText: 'باب', options: ['ب', 'ت', 'ث', 'ن'] }
},
{
  id: 'complete-word',
  name: 'أكمل الكلمة',
  description: 'اختيار الحرف الناقص في الكلمة',
  icon: PuzzleIcon,
  defaults: { question: 'أكمل الكلمة: قـ ـر', audioText: 'قمر', options: ['م', 'ن', 'ل'] }
}];


export const difficultyLevels: {id: DifficultyLevel;label: string;bars: number;}[] = [
{ id: 'easy', label: 'سهل', bars: 1 },
{ id: 'medium', label: 'متوسط', bars: 2 },
{ id: 'hard', label: 'صعب', bars: 3 }];


export const MIN_OPTIONS = 2;
export const MAX_OPTIONS = 4;