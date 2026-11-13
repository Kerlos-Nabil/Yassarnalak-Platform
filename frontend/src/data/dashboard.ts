import {
  CircleCheckIcon,
  CircleHelpIcon,
  ClipboardCheckIcon,
  GaugeIcon,
  HourglassIcon,
  HouseIcon,
  LibraryIcon,
  PencilRulerIcon,
  UsersIcon } from
'lucide-react';
import type { CaseStatus, ChildCase, DifficultyKey, SidebarItem, StatCard } from '../types/dashboard';

export const specialistProfile = {
  name: 'د. سارة الخطيب',
  role: 'أخصائية نطق وتخاطب',
  avatar: "/3ce006ad-1ef0-4360-8343-462077850f26.jpg"

};

export const sidebarItems: SidebarItem[] = [
{ label: 'الرئيسية', icon: HouseIcon, to: '/dashboard' },
{ label: 'الأطفال المرتبطون', icon: UsersIcon, href: '#caseload' },
{ label: 'استوديو التمارين', icon: PencilRulerIcon, to: '/studio' },
{ label: 'مكتبة التمارين', icon: LibraryIcon, href: '#' },
{ label: 'التقييمات', icon: ClipboardCheckIcon, href: '#' },
{ label: 'الأسئلة', icon: CircleHelpIcon, href: '#', badge: 3 }];


export const statCards: StatCard[] = [
{ id: 'children', label: 'عدد الأطفال', value: '٢٤', note: '+٣ هذا الشهر', icon: UsersIcon },
{ id: 'completed', label: 'تمارين مكتملة', value: '١٨٦', note: 'هذا الأسبوع', icon: CircleCheckIcon },
{ id: 'average', label: 'متوسط الدرجات', value: '٪٧٨', note: '+٤٪ عن الأسبوع الماضي', icon: GaugeIcon },
{
  id: 'pending',
  label: 'تمارين بانتظار التكليف',
  value: '٧',
  note: 'كلّف الآن',
  icon: HourglassIcon,
  isActionable: true
}];


export const difficultyLabels: Record<DifficultyKey, string> = {
  dyslexia: 'عُسر القراءة',
  dysgraphia: 'عُسر الكتابة',
  dyscalculia: 'عُسر الحساب',
  attention: 'الانتباه والمعالجة'
};

export const statusLabels: Record<CaseStatus, string> = {
  progressing: 'يتقدّم',
  'needs-attention': 'يحتاج متابعة',
  inactive: 'غير نشط',
  new: 'جديد'
};

const weeks = ['أسبوع ١', 'أسبوع ٢', 'أسبوع ٣', 'أسبوع ٤', 'أسبوع ٥', 'أسبوع ٦', 'أسبوع ٧', 'أسبوع ٨'];
const toSeries = (scores: number[]) => scores.map((score, i) => ({ label: weeks[i], score }));

export const caseload: ChildCase[] = [
{
  id: 'c1',
  nickname: 'نجمة',
  ageGroup: '٧–٩ سنوات',
  difficulty: 'dyslexia',
  lastActivity: 'منذ ساعتين',
  mastery: 72,
  status: 'progressing',
  progress: toSeries([38, 44, 49, 55, 58, 63, 68, 72]),
  weakAreas: [
  { skill: 'التمييز بين ب / ت / ث', score: 46 },
  { skill: 'المقاطع الطويلة', score: 58 },
  { skill: 'سرعة القراءة', score: 64 }]

},
{
  id: 'c2',
  nickname: 'صقر',
  ageGroup: '١٠–١٢ سنة',
  difficulty: 'dysgraphia',
  lastActivity: 'أمس',
  mastery: 48,
  status: 'needs-attention',
  progress: toSeries([40, 42, 41, 45, 44, 47, 46, 48]),
  weakAreas: [
  { skill: 'اتجاه كتابة الحروف', score: 32 },
  { skill: 'التاء المربوطة والمفتوحة', score: 41 },
  { skill: 'تنظيم السطر', score: 55 }]

},
{
  id: 'c3',
  nickname: 'قمر',
  ageGroup: '٦–٧ سنوات',
  difficulty: 'dyslexia',
  lastActivity: 'منذ ٣ أيام',
  mastery: 35,
  status: 'needs-attention',
  progress: toSeries([20, 24, 27, 26, 30, 31, 33, 35]),
  weakAreas: [
  { skill: 'الوعي الصوتي', score: 28 },
  { skill: 'الحروف المتشابهة شكلًا', score: 36 },
  { skill: 'دمج الأصوات', score: 44 }]

},
{
  id: 'c4',
  nickname: 'بطل',
  ageGroup: '١٠–١٢ سنة',
  difficulty: 'dyscalculia',
  lastActivity: 'اليوم',
  mastery: 84,
  status: 'progressing',
  progress: toSeries([52, 58, 63, 69, 74, 78, 81, 84]),
  weakAreas: [
  { skill: 'القسمة الطويلة', score: 61 },
  { skill: 'المسائل الكلامية', score: 68 },
  { skill: 'الكسور', score: 72 }]

},
{
  id: 'c5',
  nickname: 'فراشة',
  ageGroup: '٧–٩ سنوات',
  difficulty: 'attention',
  lastActivity: 'منذ أسبوعين',
  mastery: 22,
  status: 'inactive',
  progress: toSeries([30, 34, 33, 28, 25, 24, 22, 22]),
  weakAreas: [
  { skill: 'الانتباه السمعي', score: 25 },
  { skill: 'تتبّع التعليمات', score: 30 },
  { skill: 'الذاكرة العاملة', score: 38 }]

},
{
  id: 'c6',
  nickname: 'نسمة',
  ageGroup: '١٣–١٥ سنة',
  difficulty: 'dyslexia',
  lastActivity: 'انضمّت أمس',
  mastery: 12,
  status: 'new',
  progress: toSeries([8, 12]),
  weakAreas: [
  { skill: 'التقييم الأولي', score: 12 },
  { skill: 'الوعي الصوتي', score: 20 }]

}];