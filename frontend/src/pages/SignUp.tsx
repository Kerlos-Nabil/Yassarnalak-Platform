import React, { useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BabyIcon,
  CheckCircle2Icon,
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
  StethoscopeIcon,
  UserRoundCheckIcon } from
'lucide-react';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { Field, inputClass } from '../components/signup/Field';
import { FileDrop } from '../components/signup/FileDrop';
import { PasswordField } from '../components/signup/PasswordField';
import { homePathFor, useAuth } from '../auth/AuthContext';
import { emailError, nameError, passwordError, phoneError } from '../auth/validators';
import { Role, governorateNames, governorates, roleOptions, specialties } from '../data/signup';

const roleIcons: Record<Role, React.ReactNode> = {
  parent: <BabyIcon className="h-7 w-7" aria-hidden="true" />,
  doctor: <StethoscopeIcon className="h-7 w-7" aria-hidden="true" />,
  specialist: <UserRoundCheckIcon className="h-7 w-7" aria-hidden="true" />
};

const stepTitles = ['نوع الحساب', 'بياناتك', 'التوثيق'];

interface FormState {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  governorate: string;
  area: string;
  // parent
  childName: string;
  childBirth: string;
  birthCert: File | null;
  // doctor / specialist
  specialty: string;
  licenseNo: string;
  workplace: string;
  licenseFile: File | null;
  degreeFile: File | null;
  idFile: File | null;
}

const initial: FormState = {
  name: '', phone: '', email: '', password: '', confirmPassword: '',
  governorate: 'القاهرة', area: '',
  childName: '', childBirth: '', birthCert: null,
  specialty: '', licenseNo: '', workplace: '',
  licenseFile: null, degreeFile: null, idFile: null
};

export function SignUp() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<Role | null>(null);
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const areas = useMemo(() => governorates[form.governorate] ?? [], [form.governorate]);

  const set = <K extends keyof FormState,>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const changeGovernorate = (g: string) => {
    // changing the governorate resets the area, so the list always matches
    setForm((f) => ({ ...f, governorate: g, area: '' }));
    setErrors((e) => ({ ...e, governorate: '', area: '' }));
  };

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0 && !role) e.role = 'اختر نوع الحساب للمتابعة';
    if (s === 1) {
      const n = nameError(form.name);
      if (n) e.name = n;
      const ph = phoneError(form.phone);
      if (ph) e.phone = ph;
      const em = emailError(form.email);
      if (em) e.email = em;
      const pw = passwordError(form.password);
      if (pw) e.password = pw;
      if (!pw && form.confirmPassword !== form.password) e.confirmPassword = 'كلمتا المرور غير متطابقتين';
      if (!form.area) e.area = 'اختر المنطقة';
    }
    if (s === 2 && role === 'parent') {
      const cn = nameError(form.childName);
      if (cn) e.childName = cn;
      if (!form.childBirth) e.childBirth = 'اختر تاريخ ميلاد الطفل';
      if (!form.birthCert) e.birthCert = 'ارفع شهادة ميلاد الطفل';
    }
    if (s === 2 && role && role !== 'parent') {
      if (!form.specialty) e.specialty = 'اختر التخصص';
      if (form.licenseNo.trim().length < 4) e.licenseNo = 'اكتب رقم الترخيص / القيد';
      if (form.workplace.trim().length < 3) e.workplace = 'اكتب اسم العيادة أو المركز';
      if (!form.licenseFile) e.licenseFile = 'ارفع إثبات مزاولة المهنة';
      if (!form.degreeFile) e.degreeFile = 'ارفع الشهادة العلمية';
      if (!form.idFile) e.idFile = 'ارفع صورة البطاقة الشخصية';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const { user, register } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const next = async () => {
    if (!validate(step)) return;
    if (step === 2 && role) {
      setSubmitting(true);
      const result = await register({
        role,
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        governorate: form.governorate,
        area: form.area,
        child: role === 'parent' ? { name: form.childName.trim(), birth: form.childBirth, certificateName: form.birthCert?.name ?? '' } : undefined,
        pro: role !== 'parent' ? {
          specialty: form.specialty,
          licenseNo: form.licenseNo.trim(),
          workplace: form.workplace.trim(),
          documents: [form.licenseFile?.name, form.degreeFile?.name, form.idFile?.name].filter(Boolean) as string[]
        } : undefined
      });
      setSubmitting(false);
      if (!result.ok) {
        setErrors({ email: result.error });
        setStep(1);
        return;
      }
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
  };

  const needsReview = role !== 'parent';

  // signed-in users have no reason to be here (except to see the success screen right after registering)
  if (user && !done) return <Navigate to={homePathFor(user)} replace />;

  return (
    <div className="min-h-screen w-full bg-cream">
      <header className="border-b border-line/70">
        <div className="mx-auto flex h-20 max-w-[1100px] items-center justify-between px-6">
          <Link to="/" aria-label="يَسَّرْنَالَك — الصفحة الرئيسية" className="rounded-xl">
            <Logo />
          </Link>
          <p className="text-base text-ink-soft">
            عندك حساب؟{' '}
            <Link to="/login" className="font-bold text-primary hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1100px] gap-12 px-6 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:py-16">
        <aside className="hidden lg:block">
          <div className="sticky top-10">
            <h1 className="text-4xl font-bold leading-[1.4] text-ink">
              ابدأ رحلتك <span className="text-primary">بخطوات بسيطة</span>
            </h1>
            <p className="mt-5 text-lg text-ink-soft">
              نتأكد من هوية كل مستخدم عشان أطفالنا يفضلوا في أمان، وتتعامل دايمًا مع أشخاص موثّقين.
            </p>
            <div className="mt-8 rounded-card border border-line bg-surface p-6 shadow-soft">
              <ShieldCheckIcon className="h-8 w-8 text-primary" aria-hidden="true" />
              <p className="mt-3 text-base font-bold text-ink">خصوصية مضمونة</p>
              <p className="mt-1 text-sm text-ink-soft">
                المستندات بتتشاف بس من فريق المراجعة، ومش بتتعرض لأي مستخدم تاني.
              </p>
            </div>
          </div>
        </aside>

        <section aria-label="إنشاء حساب" className="rounded-card border border-line bg-surface p-6 shadow-soft md:p-10">
          {done ?
          <div className="py-6 text-center">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success-tint text-success-ink">
                {needsReview ?
              <ClockIcon className="h-10 w-10" aria-hidden="true" /> :
              <CheckCircle2Icon className="h-10 w-10" aria-hidden="true" />}
              </span>
              <h2 className="mt-6 text-3xl font-bold text-ink">
                {needsReview ? 'تم استلام طلبك' : 'تم إنشاء حسابك'}
              </h2>
              <p className="mx-auto mt-3 max-w-[460px] text-ink-soft">
                {needsReview ?
              'فريق المراجعة هيتأكد من مستنداتك خلال 48 ساعة، وهنبعتلك إشعار أول ما الحساب يتفعّل بشارة التوثيق.' :
              'استلمنا شهادة الميلاد وهيراجعها فريقنا. تقدر دلوقتي تدخل حسابك وتشوف ملف طفلك وتدوّر على دكتور قريب منك.'}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button to="/" variant="secondary">الصفحة الرئيسية</Button>
                <Button to={homePathFor(user)} variant="accent">{needsReview ? 'حالة الطلب' : 'ادخل حسابك'}</Button>
              </div>
            </div> :

          <>
              <ol className="mb-8 flex items-center gap-2" aria-label="خطوات التسجيل">
                {stepTitles.map((t, i) =>
              <li key={t} className="flex flex-1 items-center gap-2" aria-current={i === step ? 'step' : undefined}>
                    <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  i < step ? 'bg-primary text-white' : i === step ? 'bg-accent text-ink' : 'bg-cream text-ink-soft border border-line'}`
                  }>
                  
                      {i < step ? <CheckCircle2Icon className="h-5 w-5" aria-hidden="true" /> : i + 1}
                    </span>
                    <span className={`hidden text-sm font-bold sm:inline ${i === step ? 'text-ink' : 'text-ink-soft'}`}>{t}</span>
                    {i < stepTitles.length - 1 && <span className="h-0.5 flex-1 rounded bg-line" aria-hidden="true" />}
                  </li>
              )}
              </ol>

              <AnimatePresence mode="wait">
                <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                
                  {step === 0 &&
                <div>
                      <h2 className="text-2xl font-bold text-ink">إنت مين؟</h2>
                      <p className="mt-1 text-ink-soft">اختار نوع الحساب، وعلى أساسه هنطلب منك المستند المناسب.</p>
                      <div className="mt-6 grid gap-4" role="radiogroup" aria-label="نوع الحساب">
                        {roleOptions.map((r) =>
                    <button
                      key={r.id}
                      type="button"
                      role="radio"
                      aria-checked={role === r.id}
                      onClick={() => {setRole(r.id);setErrors({});}}
                      className={`flex items-center gap-4 rounded-card border-2 p-5 text-start transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 ${
                      role === r.id ? 'border-primary bg-primary-light' : 'border-line bg-surface hover:border-primary/50'}`
                      }>
                      
                            <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${role === r.id ? 'bg-primary text-white' : 'bg-cream text-primary'}`}>
                              {roleIcons[r.id]}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-xl font-bold text-ink">{r.title}</span>
                              <span className="block text-base text-ink-soft">{r.hint}</span>
                              <span className="mt-1 inline-block rounded-full bg-warning-tint px-3 text-sm font-semibold text-warning-ink">
                                المطلوب: {r.proof}
                              </span>
                            </span>
                          </button>
                    )}
                      </div>
                      {errors.role && <p role="alert" className="mt-3 text-sm font-semibold text-error">{errors.role}</p>}
                    </div>
                }

                  {step === 1 &&
                <div className="grid gap-5">
                      <div>
                        <h2 className="text-2xl font-bold text-ink">بياناتك الأساسية</h2>
                        <p className="mt-1 text-ink-soft">هنستخدم موقعك عشان نظهرلك الدكاترة القريبين منك.</p>
                      </div>
                      <Field id="name" label="الاسم بالكامل" error={errors.name}>
                        <input id="name" className={inputClass} value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
                      </Field>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="phone" label="رقم الموبايل" error={errors.phone}>
                          <input id="phone" dir="ltr" inputMode="numeric" placeholder="01XXXXXXXXX" className={`${inputClass} text-end`} value={form.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" />
                        </Field>
                        <Field id="email" label="البريد الإلكتروني" error={errors.email}>
                          <input id="email" dir="ltr" type="email" className={`${inputClass} text-end`} value={form.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />
                        </Field>
                      </div>
                      <PasswordField id="password" label="كلمة المرور" value={form.password} onChange={(v) => set('password', v)} error={errors.password} showRules autoComplete="new-password" />
                      <PasswordField id="confirmPassword" label="تأكيد كلمة المرور" value={form.confirmPassword} onChange={(v) => set('confirmPassword', v)} error={errors.confirmPassword} autoComplete="new-password" />

                      <fieldset className="rounded-2xl border border-line bg-cream/60 p-5">
                        <legend className="flex items-center gap-2 px-2 text-base font-bold text-ink">
                          <MapPinIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                          مكانك
                        </legend>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field id="governorate" label="المحافظة" error={errors.governorate}>
                            <select id="governorate" className={inputClass} value={form.governorate} onChange={(e) => changeGovernorate(e.target.value)}>
                              {governorateNames.map((g) => <option key={g} value={g}>{g}</option>)}
                            </select>
                          </Field>
                          <Field id="area" label={`المنطقة في ${form.governorate}`} error={errors.area}>
                            <select id="area" className={inputClass} value={form.area} onChange={(e) => set('area', e.target.value)}>
                              <option value="">اختر المنطقة</option>
                              {areas.map((a) => <option key={a} value={a}>{a}</option>)}
                            </select>
                          </Field>
                        </div>
                      </fieldset>
                    </div>
                }

                  {step === 2 && role === 'parent' &&
                <div className="grid gap-5">
                      <div>
                        <h2 className="text-2xl font-bold text-ink">بيانات طفلك</h2>
                        <p className="mt-1 text-ink-soft">شهادة الميلاد بتأكد إنك ولي الأمر، وبتتشاف بس من فريق المراجعة.</p>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="childName" label="اسم الطفل" error={errors.childName}>
                          <input id="childName" className={inputClass} value={form.childName} onChange={(e) => set('childName', e.target.value)} />
                        </Field>
                        <Field id="childBirth" label="تاريخ الميلاد" error={errors.childBirth}>
                          <input id="childBirth" type="date" max={new Date().toISOString().slice(0, 10)} className={inputClass} value={form.childBirth} onChange={(e) => set('childBirth', e.target.value)} />
                        </Field>
                      </div>
                      <div>
                        <FileDrop id="birthCert" label="شهادة ميلاد الطفل" hint="صورة واضحة أو PDF" file={form.birthCert} onChange={(f) => set('birthCert', f)} />
                        {errors.birthCert && <p role="alert" className="mt-1.5 text-sm font-semibold text-error">{errors.birthCert}</p>}
                      </div>
                    </div>
                }

                  {step === 2 && role && role !== 'parent' &&
                <div className="grid gap-5">
                      <div>
                        <h2 className="text-2xl font-bold text-ink">
                          {role === 'doctor' ? 'إثبات إنك دكتور' : 'إثبات إنك أخصائي'}
                        </h2>
                        <p className="mt-1 text-ink-soft">بعد مراجعة المستندات بتاخد شارة "موثّق" ويظهر ملفك للأهالي.</p>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="specialty" label="التخصص" error={errors.specialty}>
                          <select id="specialty" className={inputClass} value={form.specialty} onChange={(e) => set('specialty', e.target.value)}>
                            <option value="">اختر التخصص</option>
                            {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </Field>
                        <Field id="licenseNo" label={role === 'doctor' ? 'رقم القيد بالنقابة' : 'رقم الترخيص'} error={errors.licenseNo}>
                          <input id="licenseNo" dir="ltr" className={`${inputClass} text-end`} value={form.licenseNo} onChange={(e) => set('licenseNo', e.target.value)} />
                        </Field>
                      </div>
                      <Field id="workplace" label="العيادة / المركز" error={errors.workplace}>
                        <input id="workplace" className={inputClass} value={form.workplace} onChange={(e) => set('workplace', e.target.value)} />
                      </Field>
                      <div>
                        <FileDrop id="licenseFile" label={role === 'doctor' ? 'كارنيه النقابة أو ترخيص مزاولة المهنة' : 'ترخيص مزاولة المهنة'} file={form.licenseFile} onChange={(f) => set('licenseFile', f)} />
                        {errors.licenseFile && <p role="alert" className="mt-1.5 text-sm font-semibold text-error">{errors.licenseFile}</p>}
                      </div>
                      <div>
                        <FileDrop id="degreeFile" label="الشهادة العلمية" hint="بكالوريوس / ماجستير / دبلومة" file={form.degreeFile} onChange={(f) => set('degreeFile', f)} />
                        {errors.degreeFile && <p role="alert" className="mt-1.5 text-sm font-semibold text-error">{errors.degreeFile}</p>}
                      </div>
                      <div>
                        <FileDrop id="idFile" label="صورة البطاقة الشخصية" hint="للتأكد إن الاسم مطابق للمستندات" file={form.idFile} onChange={(f) => set('idFile', f)} />
                        {errors.idFile && <p role="alert" className="mt-1.5 text-sm font-semibold text-error">{errors.idFile}</p>}
                      </div>
                    </div>
                }
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex items-center justify-between gap-3">
                {step > 0 ?
              <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                    <ArrowRightIcon aria-hidden="true" />
                    رجوع
                  </Button> :
              <span />}
                <Button variant="accent" size="lg" onClick={next} disabled={submitting}>
                  {step === 2 ? submitting ? 'جاري الإنشاء…' : needsReview ? 'إرسال للمراجعة' : 'إنشاء الحساب' : 'التالي'}
                  {step < 2 && <ArrowLeftIcon aria-hidden="true" />}
                </Button>
              </div>
            </>
          }
        </section>
      </main>
    </div>);

}
