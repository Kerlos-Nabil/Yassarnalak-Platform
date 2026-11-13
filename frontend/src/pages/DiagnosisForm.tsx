import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRightIcon, CheckCircle2Icon } from 'lucide-react';
import { AccountHeader } from '../components/account/AccountHeader';
import { Button } from '../components/ui/Button';
import { Field, inputClass } from '../components/signup/Field';
import { FileDrop } from '../components/signup/FileDrop';
import { useAuth } from '../auth/AuthContext';
import { allSpecialists } from '../data/directory';
import { conditionLabel, conditions, severityLabels } from '../data/conditions';
import { DiagCase, platform, usePlatform } from '../store/platform';
import type { DifficultyKey } from '../types/dashboard';
import { ageText, longDate } from '../utils/dates';

const card = 'rounded-card border border-line bg-surface p-6 shadow-soft md:p-8';
const area = `${inputClass} min-h-[120px] py-3`;

const readDataUrl = (file: File) =>
new Promise<string | undefined>((resolve) => {
  if (file.size > 1024 * 1024) return resolve(undefined); // too big to keep in localStorage
  const r = new FileReader();
  r.onload = () => resolve(typeof r.result === 'string' ? r.result : undefined);
  r.onerror = () => resolve(undefined);
  r.readAsDataURL(file);
});

function Shell({ children }: {children: React.ReactNode;}) {
  return (
  <div className="min-h-screen w-full bg-cream">
      <AccountHeader />
      <main className="mx-auto max-w-[760px] px-6 py-10">
        <Link to="/doctor" className="inline-flex min-h-[44px] items-center gap-2 font-bold text-primary hover:underline">
          <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          حالاتي
        </Link>
        {children}
      </main>
    </div>);
}

export function DiagnosisForm() {
  const { bookingId = '' } = useParams();
  const { user } = useAuth();
  const { bookings, cases } = usePlatform();
  const booking = bookings.find((b) => b.id === bookingId);
  const existing = cases.find((c) => c.bookingId === bookingId);

  const specialists = useMemo(() => {
    const list = allSpecialists();
    return [...list].sort((a, b) => Number(b.governorate === user?.governorate) - Number(a.governorate === user?.governorate));
  }, [user]);

  const [confirmed, setConfirmed] = useState<boolean | null>(null);
  const [condition, setCondition] = useState<DifficultyKey | ''>('');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe' | ''>('');
  const [notes, setNotes] = useState('');
  const [recs, setRecs] = useState('');
  const [rx, setRx] = useState<File | null>(null);
  const [specialistId, setSpecialistId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<DiagCase | null>(null);

  if (!user) return null;

  if (!booking || booking.doctorId !== user.id) {
    return <Shell><p className="mt-8 text-xl font-bold text-ink">الحجز ده مش موجود أو مش تابع لك.</p></Shell>;
  }

  const finished = done ?? existing;
  if (finished) {
    return (
      <Shell>
        <section className={`${card} mt-4 text-center`}>
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success-tint text-success-ink"><CheckCircle2Icon className="h-10 w-10" aria-hidden="true" /></span>
          <h1 className="mt-5 text-3xl font-bold text-ink">تم إرسال التشخيص والروشتة لولي الأمر</h1>
          <p className="mt-2 text-ink-soft">
            {finished.confirmed ?
            <>تم تأكيد <strong>{conditionLabel(finished.condition)}</strong> للطفل {finished.childName}، وتم تحويله إلى <strong>{finished.specialistName}</strong> للمتابعة.</> :
            <>تم حفظ نتيجة الكشف للطفل {finished.childName} (لم يتأكد التشخيص).</>}
          </p>
          <Button to="/doctor" variant="accent" className="mt-6">رجوع لحالاتي</Button>
        </section>
      </Shell>);

  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (confirmed === null) er.confirmed = 'اختار نتيجة الكشف';
    if (notes.trim().length < 10) er.notes = 'اكتب ملاحظات الكشف (10 حروف على الأقل)';
    if (recs.trim().length < 10) er.recs = 'اكتب التوصيات (10 حروف على الأقل)';
    if (confirmed) {
      if (!condition) er.condition = 'اختار نوع الصعوبة';
      if (!severity) er.severity = 'اختار درجة الشدة';
      if (!rx) er.rx = 'ارفع الروشتة';
      if (!specialistId) er.specialistId = 'اختار المتخصص المتابع';
    }
    setErrors(er);
    if (Object.keys(er).length) return;

    setBusy(true);
    const specialist = specialists.find((s) => s.id === specialistId);
    const prescription = confirmed && rx ? { name: rx.name, size: rx.size, dataUrl: await readDataUrl(rx) } : undefined;
    const c = platform.createCase({
      bookingId: booking.id,
      parentId: booking.parentId,
      doctorId: user.id,
      doctorName: booking.doctorName,
      childName: booking.childName,
      childBirth: booking.childBirth,
      confirmed: Boolean(confirmed),
      condition: confirmed ? (condition as DifficultyKey) : undefined,
      severity: confirmed ? (severity as 'mild') : undefined,
      notes: notes.trim(),
      recommendations: recs.trim(),
      prescription,
      specialistId: confirmed ? specialistId : undefined,
      specialistName: confirmed ? specialist?.name : undefined
    });
    setBusy(false);
    setDone(c);
  };

  return (
    <Shell>
      <form onSubmit={submit} noValidate className={`${card} mt-4 grid gap-6`}>
        <div>
          <h1 className="text-3xl font-bold text-ink">نتيجة الكشف</h1>
          <p className="mt-1 text-ink-soft">{booking.childName} — {ageText(booking.childBirth)} — {longDate(booking.date)}، {booking.slot}</p>
          <p className="text-sm text-ink-soft">ولي الأمر: {booking.parentName}</p>
        </div>

        <fieldset>
          <legend className="mb-2 font-bold text-ink">هل تأكد التشخيص؟</legend>
          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="هل تأكد التشخيص؟">
            {([[true, 'نعم، تأكد التشخيص'], [false, 'لم يتأكد التشخيص']] as const).map(([v, label]) =>
            <button key={label} type="button" role="radio" aria-checked={confirmed === v} onClick={() => {setConfirmed(v);setErrors({});}}
            className={`min-h-[56px] rounded-2xl border-2 px-4 font-bold transition-colors duration-200 ${confirmed === v ? 'border-primary bg-primary-light text-primary' : 'border-line bg-surface text-ink hover:border-primary/50'}`}>
                {label}
              </button>
            )}
          </div>
          {errors.confirmed && <p role="alert" className="mt-1.5 text-sm font-semibold text-error">{errors.confirmed}</p>}
        </fieldset>

        {confirmed &&
        <>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="condition" label="نوع الصعوبة" error={errors.condition}>
                <select id="condition" className={inputClass} value={condition} onChange={(e) => setCondition(e.target.value as DifficultyKey)}>
                  <option value="">اختر</option>
                  {conditions.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
                </select>
              </Field>
              <Field id="severity" label="درجة الشدة" error={errors.severity}>
                <select id="severity" className={inputClass} value={severity} onChange={(e) => setSeverity(e.target.value as 'mild')}>
                  <option value="">اختر</option>
                  {Object.entries(severityLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </Field>
            </div>
          </>
        }

        <Field id="notes" label="ملاحظات الكشف" error={errors.notes}>
          <textarea id="notes" className={area} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </Field>
        <Field id="recs" label="التوصيات للأسرة" error={errors.recs}>
          <textarea id="recs" className={area} value={recs} onChange={(e) => setRecs(e.target.value)} />
        </Field>

        {confirmed &&
        <>
            <div>
              <FileDrop id="rx" label="رفع الروشتة" hint="هتظهر لولي الأمر في بروفايله" file={rx} onChange={setRx} />
              {errors.rx && <p role="alert" className="mt-1.5 text-sm font-semibold text-error">{errors.rx}</p>}
            </div>
            <Field id="specialistId" label="المتخصص المتابع" error={errors.specialistId}>
              <select id="specialistId" className={inputClass} value={specialistId} onChange={(e) => setSpecialistId(e.target.value)}>
                <option value="">اختر المتخصص</option>
                {specialists.map((s) => <option key={s.id} value={s.id}>{s.name} — {s.specialty} ({s.governorate}){s.sample ? ' — تجريبي' : ''}</option>)}
              </select>
            </Field>
          </>
        }

        <Button type="submit" variant="accent" size="lg" fullWidth disabled={busy}>
          {busy ? 'جاري الإرسال…' : 'تأكيد التشخيص وإرسال للمنصة'}
        </Button>
      </form>
    </Shell>);

}
