import { BookOpenIcon, CalculatorIcon, FocusIcon, PencilLineIcon } from 'lucide-react';
import type { DifficultyKey } from '../types/dashboard';

export const conditions: {key: DifficultyKey;label: string;blurb: string;icon: typeof BookOpenIcon;}[] = [
{ key: 'dyslexia', label: 'عُسر القراءة', blurb: 'أهالي أطفال عندهم صعوبة في القراءة والتهجي. تجارب وأسئلة ونصايح من البيت.', icon: BookOpenIcon },
{ key: 'dysgraphia', label: 'عُسر الكتابة', blurb: 'صعوبات الخط والكتابة اليدوية والتعبير الكتابي، وإزاي نساعد أطفالنا.', icon: PencilLineIcon },
{ key: 'dyscalculia', label: 'عُسر الحساب', blurb: 'صعوبة الأرقام والعمليات الحسابية، وطرق تبسيط الرياضيات للطفل.', icon: CalculatorIcon },
{ key: 'attention', label: 'الانتباه والمعالجة', blurb: 'تشتت الانتباه وبطء المعالجة، وتنظيم الروتين والمذاكرة.', icon: FocusIcon }];


export const conditionLabel = (k?: DifficultyKey) => conditions.find((c) => c.key === k)?.label ?? '';

export const severityLabels = { mild: 'خفيف', moderate: 'متوسط', severe: 'شديد' } as const;
