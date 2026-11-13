import type { ExerciseQuestion, KidAccent } from '../types/exercise';

export const mascotUrl = "/325079b6-d76e-44c2-a00e-6b0bd1df80fa.jpg";


export const mascotName = 'بومة';

export const exerciseQuestions: ExerciseQuestion[] = [
{ id: 'q1', spokenWord: 'شمس', options: ['شمس', 'سمش', 'شمش', 'سمس'], correctIndex: 0 },
{ id: 'q2', spokenWord: 'قمر', options: ['قرم', 'قمر', 'كمر', 'غمر'], correctIndex: 1 },
{ id: 'q3', spokenWord: 'كتاب', options: ['كتاد', 'تكاب', 'كتاب', 'كباب'], correctIndex: 2 },
{ id: 'q4', spokenWord: 'بيت', options: ['بنت', 'تيب', 'بيث', 'بيت'], correctIndex: 3 },
{ id: 'q5', spokenWord: 'سمكة', options: ['سمكة', 'سكمة', 'شمكة', 'سمقة'], correctIndex: 0 }];


export const kidAccents: KidAccent[] = [
{ tint: '#6EC1E4', edge: '#4FA9CF' },
{ tint: '#FFD166', edge: '#E9B84A' },
{ tint: '#FF8A7A', edge: '#E9705F' },
{ tint: '#8ED6B5', edge: '#5FBF94' }];