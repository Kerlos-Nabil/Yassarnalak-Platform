import React from 'react';
import {
  AccessibilityIcon,
  BabyIcon,
  BookOpenIcon,
  CalendarCheckIcon,
  FileTextIcon,
  LockIcon,
  MapPinIcon,
  PlayCircleIcon,
  SearchIcon,
  ShieldCheckIcon,
  UserRoundCheckIcon } from
'lucide-react';
import { AccountHeader } from '../components/account/AccountHeader';
import { Button } from '../components/ui/Button';
import { useAuth } from '../auth/AuthContext';
import { useA11y } from '../a11y/AccessibilityProvider';
import { ageText, longDate } from '../utils/dates';
import { Link } from 'react-router-dom';
import { conditionLabel, conditions, severityLabels } from '../data/conditions';
import { platform, usePlatform } from '../store/platform';
import { ExternalLinkIcon, UsersRoundIcon } from 'lucide-react';

const card = 'rounded-card border border-line bg-surface p-6 shadow-soft';

export function ParentProfile() {
  const { user } = useAuth();
  const { openPanel } = useA11y();
  const { bookings, cases } = usePlatform();
  if (!user) return null;

  const firstName = user.name.split(' ')[0];
  const child = user.child;
  const myBookings = bookings.filter((b) => b.parentId === user.id && b.status !== 'cancelled').sort((a, b) => (a.date + a.slot).localeCompare(b.date + b.slot));
  const myCases = cases.filter((c) => c.parentId === user.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const latest = myCases[0];
  const confirmedCase = myCases.find((c) => c.confirmed);
  const upcoming = myBookings.filter((b) => b.status === 'confirmed');

  const headline = confirmedCase ?
  { text: 'مؤكد ومتابَع', cls: 'bg-success-tint text-success-ink', dot: 'bg-success' } :
  upcoming.length ?
  { text: 'الحجز مؤكد', cls: 'bg-primary-light text-primary', dot: 'bg-primary' } :
  { text: 'بانتظار الكشف الطبي', cls: 'bg-warning-tint text-warning-ink', dot: 'bg-warning' };

  const childChip = confirmedCase ? `تحت المتابعة — ${conditionLabel(confirmedCase.condition)}` : latest ? 'تم الكشف — لم يتأكد التشخيص' : upcoming.length ? 'بانتظار الكشف' : 'لم يُشخَّص بعد';

  const tiles = [
  { icon: <SearchIcon className="h-6 w-6" aria-hidden="true" />, label: 'ابحث عن دكتور قريب منك', to: '/doctors' },
  { icon: <UsersRoundIcon className="h-6 w-6" aria-hidden="true" />, label: 'مجتمع الأهالي', to: '/community' },
  { icon: <BookOpenIcon className="h-6 w-6" aria-hidden="true" />, label: 'الأدلة والمعرفة', href: '/#difficulties' },
  { icon: <PlayCircleIcon className="h-6 w-6" aria-hidden="true" />, label: 'تمرين تجريبي', to: '/exercise' }];

  const tileClass = 'flex min-h-[56px] items-center gap-3 rounded-2xl px-3 font-semibold text-ink transition-colors duration-200 hover:bg-primary-light hover:text-primary';

  return (
    <div className="min-h-screen w-full bg-cream">
      <AccountHeader />
      <main className="mx-auto max-w-[1100px] space-y-6 px-6 py-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-ink">أهلًا، {firstName}</h1>
            <p className="mt-1 flex items-center gap-2 text-ink-soft">
              <MapPinIcon className="h-5 w-5 text-primary" aria-hidden="true" />
              {user.area}، {user.governorate}
            </p>
          </div>
          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-base font-bold ${headline.cls}`}>
            <span className={`h-2 w-2 rounded-full ${headline.dot}`} aria-hidden="true" />
            {headline.text}
          </span>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <section aria-labelledby="children-title" className={`${card} lg:col-span-2`}>
            <h2 id="children-title" className="flex items-center gap-2 text-2xl font-bold text-ink">
              <BabyIcon className="h-6 w-6 text-primary" aria-hidden="true" />
              أطفالي
            </h2>
            {child ?
            <div className="mt-5 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-cream/60 p-5">
                <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-2xl bg-kid-sun text-2xl font-bold text-ink">
                  {child.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xl font-bold text-ink">{child.name}</p>
                  <p className="text-base text-ink-soft">{ageText(child.birth)}</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    شهادة الميلاد: <span className="font-semibold text-success-ink">تم الاستلام وقيد المراجعة</span>
                  </p>
                </div>
                <span className={`rounded-full px-4 py-1.5 text-base font-bold ${confirmedCase ? 'bg-success-tint text-success-ink' : 'bg-primary-light text-primary'}`}>{childChip}</span>
              </div> :
            <p className="mt-5 text-ink-soft">لسه ما أضفتش طفل.</p>
            }
            {!confirmedCase &&
            <p className="mt-4 flex items-start gap-2 text-sm text-ink-soft">
                <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                بعد ما الدكتور يؤكد التشخيص، بتتفتح تمارين طفلك ومجتمع الأهالي الخاص بصعوبته.
              </p>
            }
          </section>

          <section aria-labelledby="quick-title" className={card}>
            <h2 id="quick-title" className="text-2xl font-bold text-ink">اختصارات</h2>
            <ul className="mt-4 space-y-2">
              {tiles.map((t) =>
              <li key={t.label}>
                  {t.to ?
                <Link to={t.to} className={tileClass}><span className="text-primary">{t.icon}</span>{t.label}</Link> :
                <a href={t.href} className={tileClass}><span className="text-primary">{t.icon}</span>{t.label}</a>}
                </li>
              )}
              <li>
                <button type="button" onClick={openPanel} className={`${tileClass} w-full text-start`}>
                  <span className="text-primary"><AccessibilityIcon className="h-6 w-6" aria-hidden="true" /></span>
                  إعدادات سهولة الوصول
                </button>
              </li>
            </ul>
          </section>

          <section aria-labelledby="bookings-title" className={card}>
            <h2 id="bookings-title" className="flex items-center gap-2 text-2xl font-bold text-ink">
              <CalendarCheckIcon className="h-6 w-6 text-primary" aria-hidden="true" />
              حجوزاتي
            </h2>
            {myBookings.length === 0 ?
            <>
                <p className="mt-5 text-ink-soft">مفيش حجوزات لسه. ابدأ بالبحث عن دكتور قريب منك في {user.governorate}.</p>
                <Button to="/doctors" variant="accent" className="mt-5"><SearchIcon aria-hidden="true" />ابحث عن دكتور</Button>
              </> :
            <ul className="mt-4 space-y-3">
                {myBookings.map((b) =>
              <li key={b.id} className="rounded-2xl border border-line bg-cream/60 p-4">
                    <Link to={`/doctors/${b.doctorId}`} className="font-bold text-ink hover:text-primary hover:underline">{b.doctorName}</Link>
                    <p className="text-sm text-ink-soft">{longDate(b.date)} — {b.slot}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className={`rounded-full px-3 py-0.5 text-sm font-bold ${b.status === 'confirmed' ? 'bg-primary-light text-primary' : 'bg-success-tint text-success-ink'}`}>{b.status === 'confirmed' ? 'مؤكد' : 'تم الكشف'}</span>
                      {b.status === 'confirmed' &&
                  <button type="button" onClick={() => platform.cancelBooking(b.id)} className="min-h-[44px] rounded-full px-3 text-sm font-bold text-error hover:bg-error-tint">إلغاء الحجز</button>
                  }
                    </div>
                  </li>
              )}
              </ul>
            }
          </section>

          <section aria-labelledby="dx-title" className={card}>
            <h2 id="dx-title" className="flex items-center gap-2 text-2xl font-bold text-ink">
              <FileTextIcon className="h-6 w-6 text-primary" aria-hidden="true" />
              التشخيص والروشتة
            </h2>
            {latest ?
            <div className="mt-4 space-y-2">
                <p className="text-lg font-bold text-ink">{latest.confirmed ? `${conditionLabel(latest.condition)} — ${latest.severity ? severityLabels[latest.severity] : ''}` : 'لم يتأكد التشخيص'}</p>
                <p className="text-sm text-ink-soft">{latest.doctorName} — {longDate(latest.createdAt.slice(0, 10))}</p>
                <p className="text-ink-soft"><strong className="text-ink">التوصيات:</strong> {latest.recommendations}</p>
                {latest.prescription &&
              <p className="pt-1">
                    {latest.prescription.dataUrl ?
                <a href={latest.prescription.dataUrl} download={latest.prescription.name} className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary-light px-4 font-bold text-primary hover:underline">
                        <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                        تحميل الروشتة ({latest.prescription.name})
                      </a> :
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-2 font-bold text-primary">
                        <FileTextIcon className="h-4 w-4" aria-hidden="true" />
                        الروشتة: {latest.prescription.name}
                      </span>}
                  </p>
              }
              </div> :
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-cream/60 p-4 text-ink-soft">
                <LockIcon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <p>هتظهر هنا بعد ما الدكتور يكشف على طفلك ويؤكد التشخيص.</p>
              </div>
            }
          </section>

          <section aria-labelledby="sp-title" className={card}>
            <h2 id="sp-title" className="flex items-center gap-2 text-2xl font-bold text-ink">
              <UserRoundCheckIcon className="h-6 w-6 text-primary" aria-hidden="true" />
              المتخصص المتابع
            </h2>
            {confirmedCase?.specialistName ?
            <div className="mt-4">
                <p className="text-lg font-bold text-ink">{confirmedCase.specialistName}</p>
                <p className="text-sm text-ink-soft">بيتابع تقدّم {confirmedCase.childName} وبيكلّفه بالتمارين.</p>
              </div> :
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-cream/60 p-4 text-ink-soft">
                <LockIcon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <p>هيتعيّن لطفلك أخصائي متابعة بعد تأكيد التشخيص.</p>
              </div>
            }
          </section>

          <section aria-labelledby="com-title" className={`${card} lg:col-span-3`}>
            <h2 id="com-title" className="flex items-center gap-2 text-2xl font-bold text-ink">
              <UsersRoundIcon className="h-6 w-6 text-primary" aria-hidden="true" />
              مجتمعي
            </h2>
            {confirmedCase?.condition ?
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-ink-soft">انضممت أوتوماتيك لمجتمع <strong className="text-ink">{conditionLabel(confirmedCase.condition)}</strong>. شارك وتعلّم من أهالي بنفس رحلتك.</p>
                <Button to={`/community/${confirmedCase.condition}`} variant="accent">ادخل المجتمع</Button>
              </div> :
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-ink-soft">لكل صعوبة مجتمع خاص. بعد تأكيد التشخيص بتنضم لمجتمع طفلك، وتقدر تقرا المجتمعات كلها من دلوقتي ({conditions.map((c) => c.label).join('، ')}).</p>
                <Button to="/community" variant="secondary">تصفح المجتمعات</Button>
              </div>
            }
          </section>
        </div>

        <p className="flex items-center gap-2 text-sm text-ink-soft">
          <ShieldCheckIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          المنصة محتوى توعوي وداعم — لا تقدّم تشخيصًا. التشخيص من اختصاص الدكتور فقط.
        </p>
      </main>
    </div>);

}
