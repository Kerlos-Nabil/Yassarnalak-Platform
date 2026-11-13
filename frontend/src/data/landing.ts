import {
  BookOpenIcon,
  BrainIcon,
  CalculatorIcon,
  ClipboardListIcon,
  HeadphonesIcon,
  LightbulbIcon,
  PenLineIcon,
  SlidersHorizontalIcon,
  TrendingUpIcon,
  UserCheckIcon } from
'lucide-react';
import type {
  DifficultyItem,
  FooterGroup,
  IconTextItem,
  NavLinkItem,
  Specialist } from
'../types/landing';

export const heroImage = "/7203fa25-11e1-4258-a1f3-fc588c1f81eb.jpg";


export const navLinks: NavLinkItem[] = [
{ label: 'الأدلة', href: '#difficulties' },
{ label: 'الأطباء والأخصائيون', href: '/doctors' },
{ label: 'محاكي الدسلكسيا', href: '#features' }];


export const journeySteps: IconTextItem[] = [
{
  title: 'تعرّف',
  description: 'اقرأ أدلة مبسّطة تشرح كل صعوبة، وتعرّف على العلامات التي قد تلاحظها في طفلك.',
  icon: LightbulbIcon
},
{
  title: 'اختر المختص',
  description: 'تصفّح أخصائيين موثّقين حسب التخصص والخبرة، واختر من يناسب احتياجات طفلك.',
  icon: UserCheckIcon
},
{
  title: 'ابدأ التعافي',
  description: 'يكلّف المختص تمارين صوتية قصيرة، وتتابع تقدّم طفلك أسبوعًا بعد أسبوع.',
  icon: HeadphonesIcon
}];


export const difficulties: DifficultyItem[] = [
{
  title: 'عُسر القراءة (دسلكسيا)',
  description: 'صعوبة في ربط الحروف بأصواتها وقراءة الكلمات بطلاقة، رغم ذكاء الطفل الطبيعي.',
  icon: BookOpenIcon,
  href: '#difficulties'
},
{
  title: 'عُسر الكتابة',
  description: 'صعوبة في تشكيل الحروف وتنظيم الكتابة والإملاء، وقد تظهر في خطٍّ غير مقروء.',
  icon: PenLineIcon,
  href: '#difficulties'
},
{
  title: 'عُسر الحساب',
  description: 'صعوبة في فهم الأرقام والعمليات الحسابية وتذكّر الحقائق الرياضية البسيطة.',
  icon: CalculatorIcon,
  href: '#difficulties'
},
{
  title: 'صعوبات الانتباه والمعالجة',
  description: 'صعوبة في التركيز أو في معالجة ما يسمعه الطفل ويراه بالسرعة المتوقّعة.',
  icon: BrainIcon,
  href: '#difficulties'
}];


export const verificationChecks: string[] = [
'التحقق من الترخيص المهني',
'مراجعة الخبرة والتخصص',
'تقييمات العائلات'];


export const specialists: Specialist[] = [
{
  id: 'd-hala' ,
  name: 'د. هالة منصور', specialty: 'طب أطفال / مخ وأعصاب',
  experience: '١٢ سنة خبرة',
  focus: 'عُسر القراءة',
  avatar: "/3ce006ad-1ef0-4360-8343-462077850f26.jpg"

},
{
  id: 'd-karim',
   name: 'د. كريم عبد الله', specialty: 'أخصائي نفسي',
  experience: '٩ سنوات خبرة',
  focus: 'عُسر الكتابة والحساب',
  avatar: "/8ce6438c-7f1f-4c65-bcbb-818f1dc4c8de.jpg"

},
{
  id: 'd-noha',
    name: 'د. نهى فؤاد', specialty: 'أخصائي صعوبات تعلم',
  experience: '١٥ سنة خبرة',
  focus: 'الانتباه والمعالجة',
  avatar: "/ff4e7bfb-0075-4a2d-b723-8709987cea2a.jpg"

}

 
];

export const loopSteps: IconTextItem[] = [
{ title: 'المختص يكلّف التمرين', description: 'يختار تمرينًا يناسب مستوى الطفل.', icon: ClipboardListIcon },
{ title: 'الطفل يستمع ويجيب', description: 'دقائق قليلة يوميًا، بلا مؤقّت ولا ضغط.', icon: HeadphonesIcon },
{ title: 'المنصة تسجّل التقدّم', description: 'تُحفظ النتائج في تقارير واضحة.', icon: TrendingUpIcon },
{ title: 'المختص يحدّث الخطة', description: 'يعدّل التمارين حسب نقاط القوة والضعف.', icon: SlidersHorizontalIcon }];


export const footerGroups: FooterGroup[] = [
{
  title: 'المنصة',
  links: [
  { label: 'الأدلة', href: '#difficulties' },
  { label: 'الأطباء والأخصائيون', href: '#specialists' },
  { label: 'محاكي الدسلكسيا', href: '#features' }]

},
{
  title: 'للأخصائيين',
  links: [
  { label: 'لوحة الأخصائي', to: '/dashboard' },
  { label: 'استوديو التمارين', to: '/studio' },
  { label: 'انضم كأخصائي', href: '#specialists' }]

},
{
  title: 'جرّب',
  links: [
  { label: 'تمرين تجريبي للطفل', to: '/exercise' },
  { label: 'كيف تعمل المنصة', href: '#journey' }]

},
{
  title: 'عن يَسَّرْنَالَك',
  links: [
  { label: 'من نحن', href: '#' },
  { label: 'سياسة الخصوصية', href: '#' },
  { label: 'تواصل معنا', href: '#' }]

}];