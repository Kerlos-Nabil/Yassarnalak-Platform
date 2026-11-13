import React from 'react';
import { CheckCircle2Icon, ClockIcon, FileTextIcon, FlaskConicalIcon, ShieldCheckIcon } from 'lucide-react';
import { AccountHeader } from '../components/account/AccountHeader';
import { Button } from '../components/ui/Button';
import { Navigate } from 'react-router-dom';
import { homePathFor, useAuth } from '../auth/AuthContext';

const steps = [
{ label: 'تم استلام طلبك', done: true },
{ label: 'مراجعة المستندات', done: false, current: true },
{ label: 'تفعيل الحساب بشارة "موثّق"', done: false }];


export function PendingReview() {
  const { user, approveDemo } = useAuth();
  if (!user || !user.pro) return null;
  if (user.status === 'approved') return <Navigate to={homePathFor(user)} replace />;
  const isDoctor = user.role === 'doctor';

  return (
    <div className="min-h-screen w-full bg-cream">
      <AccountHeader />
      <main className="mx-auto max-w-[760px] space-y-6 px-6 py-10">
        <section aria-labelledby="pending-title" className="rounded-card border border-line bg-surface p-6 shadow-soft md:p-10">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-warning-tint text-warning-ink">
            <ClockIcon className="h-8 w-8" aria-hidden="true" />
          </span>
          <h1 id="pending-title" className="mt-5 text-3xl font-bold text-ink">طلبك تحت المراجعة</h1>
          <p className="mt-2 text-ink-soft">
            أهلًا {isDoctor ? 'د. ' : ''}{user.name.split(' ')[0]}، فريق المراجعة هيتأكد من مستنداتك خلال 48 ساعة، وهنبعتلك إشعار أول ما حسابك يتفعّل.
          </p>

          <ol className="mt-8 space-y-4" aria-label="مراحل الطلب">
            {steps.map((s) =>
            <li key={s.label} className="flex items-center gap-3" aria-current={s.current ? 'step' : undefined}>
                <span className={`flex h-9 w-9 items-center justify-center rounded-full ${s.done ? 'bg-success text-white' : s.current ? 'bg-accent text-ink' : 'border border-line bg-cream text-ink-soft'}`}>
                  {s.done ? <CheckCircle2Icon className="h-5 w-5" aria-hidden="true" /> : <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-current" />}
                </span>
                <span className={`text-lg ${s.current ? 'font-bold text-ink' : s.done ? 'font-semibold text-ink' : 'text-ink-soft'}`}>{s.label}</span>
              </li>
            )}
          </ol>
        </section>

        <section aria-labelledby="docs-title" className="rounded-card border border-line bg-surface p-6 shadow-soft">
          <h2 id="docs-title" className="text-xl font-bold text-ink">البيانات والمستندات المرسلة</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div><dt className="text-sm text-ink-soft">التخصص</dt><dd className="font-bold text-ink">{user.pro.specialty}</dd></div>
            <div><dt className="text-sm text-ink-soft">{isDoctor ? 'رقم القيد بالنقابة' : 'رقم الترخيص'}</dt><dd dir="ltr" className="text-end font-bold text-ink">{user.pro.licenseNo}</dd></div>
            <div className="sm:col-span-2"><dt className="text-sm text-ink-soft">العيادة / المركز</dt><dd className="font-bold text-ink">{user.pro.workplace}</dd></div>
          </dl>
          <ul className="mt-5 flex flex-wrap gap-2">
            {user.pro.documents.map((d) =>
            <li key={d} className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-1.5 text-sm font-semibold text-ink">
                <FileTextIcon className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="max-w-[220px] truncate">{d}</span>
              </li>
            )}
          </ul>
          <p className="mt-5 flex items-start gap-2 text-sm text-ink-soft">
            <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            المستندات بتتشاف بس من فريق المراجعة.
          </p>
        </section>

        <section aria-label="للتجربة فقط" className="rounded-card border-2 border-dashed border-line p-5">
          <p className="flex items-center gap-2 font-bold text-ink">
            <FlaskConicalIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            للتجربة فقط
          </p>
            <p className="mt-1 text-sm text-ink-soft">لحد ما صفحة اعتماد الأدمن تتعمل، تقدر تعتمد حسابك من هنا عشان تشوف لوحة المتابعة.</p>
          <Button variant="secondary" className="mt-4" onClick={approveDemo}>اعتماد حسابي (تجربة)</Button>
        </section>
      </main>
    </div>);

}
