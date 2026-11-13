export interface Professional {
  id: string;
  kind: 'doctor' | 'specialist';
  name: string;
  specialty: string;
  governorate: string;
  area: string;
  clinic: string;
  address: string;
  price: number | null;
  rating: number | null;
  reviews: number | null;
  years: number | null;
  bio: string;
  qualifications: string[];
  workDays: number[]; // 0 = Sunday
  slots: string[];
  /** true for the made-up demo people; false for real registered accounts */
  sample: boolean;
}

const evening = ['4:00 م', '5:00 م', '6:00 م', '7:00 م', '8:00 م'];
const morning = ['10:00 ص', '11:00 ص', '12:00 م', '1:00 م'];

export const sampleDoctors: Professional[] = [
{ id: 'd-hala', kind: 'doctor', name: 'د. هالة منصور', specialty: 'طب أطفال / مخ وأعصاب', governorate: 'القاهرة', area: 'مدينة نصر', clinic: 'مركز النور لصعوبات التعلم', address: 'شارع عباس العقاد، مدينة نصر', price: 500, rating: 4.9, reviews: 128, years: 15, bio: 'استشارية مخ وأعصاب أطفال، تهتم بالتقييم المبكر لصعوبات القراءة والكتابة وتوجيه الأسرة بخطة واضحة.', qualifications: ['دكتوراه أمراض المخ والأعصاب للأطفال', 'زمالة صعوبات التعلم'], workDays: [0, 1, 2, 3], slots: evening, sample: true },
{ id: 'd-karim', kind: 'doctor', name: 'د. كريم عبد الله', specialty: 'أخصائي نفسي', governorate: 'القاهرة', area: 'المعادي', clinic: 'عيادة بداية', address: 'شارع 9، المعادي', price: 450, rating: 4.7, reviews: 86, years: 10, bio: 'أخصائي نفسي تربوي، متخصص في تقييم صعوبات التعلم عند الأطفال من 5 إلى 12 سنة.', qualifications: ['ماجستير علم النفس التربوي', 'دبلومة تشخيص صعوبات التعلم'], workDays: [0, 2, 4], slots: evening, sample: true },
{ id: 'd-noha', kind: 'doctor', name: 'د. نهى فؤاد', specialty: 'أخصائي صعوبات تعلم', governorate: 'القاهرة', area: 'التجمع الخامس', clinic: 'مركز خطوة', address: 'التجمع الخامس، الحي الأول', price: 600, rating: 4.8, reviews: 64, years: 12, bio: 'تعمل مع الأطفال وأسرهم على تقييم عُسر القراءة وخطط التدخل المبكر داخل المدرسة وخارجها.', qualifications: ['دكتوراه التربية الخاصة', 'عضو الجمعية الدولية للديسلكسيا'], workDays: [1, 3, 4], slots: morning, sample: true },
{ id: 'd-ayman', kind: 'doctor', name: 'د. أيمن سعيد', specialty: 'طب أطفال / مخ وأعصاب', governorate: 'القاهرة', area: 'مصر الجديدة', clinic: 'عيادة الشفاء للأطفال', address: 'شارع الحجاز، مصر الجديدة', price: 400, rating: 4.6, reviews: 51, years: 18, bio: 'استشاري أطفال بخبرة طويلة في متابعة النمو واللغة والتعلم.', qualifications: ['استشاري طب الأطفال', 'ماجستير الأعصاب'], workDays: [0, 1, 2, 3, 4], slots: evening, sample: true },
{ id: 'd-dina', kind: 'doctor', name: 'د. دينا رشدي', specialty: 'أخصائي تخاطب', governorate: 'القاهرة', area: 'الزمالك', clinic: 'مركز كلمة', address: 'شارع 26 يوليو، الزمالك', price: 550, rating: 4.9, reviews: 97, years: 9, bio: 'أخصائية تخاطب ولغة، تقيّم الوعي الصوتي ومهارات القراءة المبكرة.', qualifications: ['ماجستير اضطرابات النطق واللغة'], workDays: [0, 2, 3], slots: morning, sample: true },
{ id: 'd-yasser', kind: 'doctor', name: 'د. ياسر البنا', specialty: 'أخصائي نفسي', governorate: 'الجيزة', area: 'الدقي', clinic: 'عيادة أفق', address: 'شارع التحرير، الدقي', price: 420, rating: 4.5, reviews: 39, years: 8, bio: 'أخصائي نفسي للأطفال والمراهقين، يركّز على الدعم النفسي مع صعوبات التعلم.', qualifications: ['ماجستير الصحة النفسية للطفل'], workDays: [1, 2, 4], slots: evening, sample: true },
{ id: 'd-salma', kind: 'doctor', name: 'د. سلمى حسن', specialty: 'أخصائي صعوبات تعلم', governorate: 'الجيزة', area: '6 أكتوبر', clinic: 'مركز مسار', address: 'الحي المتميز، 6 أكتوبر', price: 480, rating: 4.7, reviews: 44, years: 11, bio: 'تقييم شامل لصعوبات القراءة والكتابة والحساب مع تقرير مفصّل للأسرة والمدرسة.', qualifications: ['دكتوراه صعوبات التعلم'], workDays: [0, 1, 3], slots: evening, sample: true },
{ id: 'd-mai', kind: 'doctor', name: 'د. مي الشناوي', specialty: 'طب أطفال / مخ وأعصاب', governorate: 'الإسكندرية', area: 'سموحة', clinic: 'مركز الإسكندرية للنمو والتعلم', address: 'شارع فوزي معاذ، سموحة', price: 450, rating: 4.8, reviews: 72, years: 13, bio: 'استشارية أعصاب أطفال، تتابع حالات عسر القراءة وتشتت الانتباه.', qualifications: ['دكتوراه طب الأطفال', 'زمالة الأعصاب'], workDays: [0, 1, 2, 3], slots: evening, sample: true },
{ id: 'd-tarek', kind: 'doctor', name: 'د. طارق عزمي', specialty: 'أخصائي نفسي', governorate: 'الإسكندرية', area: 'سيدي جابر', clinic: 'عيادة رؤية', address: 'شارع سعد زغلول، سيدي جابر', price: 380, rating: 4.4, reviews: 28, years: 7, bio: 'أخصائي نفسي إكلينيكي للأطفال.', qualifications: ['ماجستير علم النفس الإكلينيكي'], workDays: [2, 3, 4], slots: evening, sample: true },
{ id: 'd-rana', kind: 'doctor', name: 'د. رنا فتحي', specialty: 'أخصائي صعوبات تعلم', governorate: 'الإسكندرية', area: 'ستانلي', clinic: 'مركز اقرأ', address: 'كورنيش ستانلي', price: 500, rating: 4.9, reviews: 58, years: 10, bio: 'متخصصة في برامج القراءة متعددة الحواس وتقييم الديسلكسيا.', qualifications: ['دكتوراه التربية الخاصة', 'تدريب Orton-Gillingham'], workDays: [0, 1, 4], slots: morning, sample: true },
{ id: 'd-amr', kind: 'doctor', name: 'د. عمرو لطفي', specialty: 'أخصائي تخاطب', governorate: 'الإسكندرية', area: 'العجمي', clinic: 'مركز تواصل', address: 'الهانوفيل، العجمي', price: 300, rating: 4.3, reviews: 22, years: 6, bio: 'أخصائي تخاطب ولغة للأطفال.', qualifications: ['بكالوريوس علاج طبيعي وتخاطب'], workDays: [1, 2, 3], slots: evening, sample: true },
{ id: 'd-mans', kind: 'doctor', name: 'د. إيناس رمضان', specialty: 'أخصائي صعوبات تعلم', governorate: 'الدقهلية', area: 'المنصورة', clinic: 'مركز الدلتا للتعلم', address: 'شارع الجمهورية، المنصورة', price: 350, rating: 4.6, reviews: 31, years: 9, bio: 'تقييم وتدخل مبكر لصعوبات التعلم لأطفال الدلتا.', qualifications: ['ماجستير التربية الخاصة'], workDays: [0, 2, 4], slots: evening, sample: true }];


export const sampleSpecialists: Professional[] = [
{ id: 's-heba', kind: 'specialist', name: 'أ. هبة سامي', specialty: 'أخصائي صعوبات تعلم', governorate: 'القاهرة', area: 'مدينة نصر', clinic: 'فريق المتابعة', address: 'متابعة عن بُعد', price: null, rating: null, reviews: null, years: 8, bio: 'أخصائية متابعة، تضع خطة تمارين أسبوعية وتراجع التقدم مع الأسرة.', qualifications: ['ماجستير صعوبات التعلم'], workDays: [], slots: [], sample: true },
{ id: 's-mahmoud', kind: 'specialist', name: 'أ. محمود نادر', specialty: 'أخصائي تخاطب', governorate: 'الإسكندرية', area: 'سموحة', clinic: 'فريق المتابعة', address: 'متابعة عن بُعد', price: null, rating: null, reviews: null, years: 6, bio: 'أخصائي تخاطب ومتابعة مهارات القراءة الصوتية.', qualifications: ['بكالوريوس تخاطب'], workDays: [], slots: [], sample: true },
{ id: 's-laila', kind: 'specialist', name: 'أ. ليلى عادل', specialty: 'أخصائي صعوبات تعلم', governorate: 'الجيزة', area: 'الدقي', clinic: 'فريق المتابعة', address: 'متابعة عن بُعد', price: null, rating: null, reviews: null, years: 7, bio: 'متابعة الأطفال بعد التشخيص وربط خطة البيت بالمدرسة.', qualifications: ['دبلومة صعوبات التعلم'], workDays: [], slots: [], sample: true },
{ id: 's-shaimaa', kind: 'specialist', name: 'أ. شيماء ناصر', specialty: 'تربية خاصة', governorate: 'القاهرة', area: 'المعادي', clinic: 'فريق المتابعة', address: 'متابعة عن بُعد', price: null, rating: null, reviews: null, years: 5, bio: 'متابعة تمارين الأطفال وتحفيزهم أسبوعيًا.', qualifications: ['ليسانس تربية خاصة'], workDays: [], slots: [], sample: true }];

