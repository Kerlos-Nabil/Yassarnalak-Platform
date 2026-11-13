 import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowRightIcon, AwardIcon, BadgeCheckIcon, BuildingIcon, CalendarCheckIcon, CheckCircle2Icon, ClockIcon, MapPinIcon, StarIcon, WalletIcon } from 'lucide-react';
import { AccountHeader } from '../components/account/AccountHeader';
import { Button } from '../components/ui/Button';
import { useAuth } from '../auth/AuthContext';
import { findDoctor } from '../data/directory';
import { platform, usePlatform } from '../store/platform';
import { availableDays, longDate } from '../utils/dates';
import { toArabicDigits } from '../utils/numbers';

const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const card = 'rounded-card border border-line/70 bg-surface p-7 shadow-xs';

export function DoctorProfile() {
  const { id = '' } = useParams();
  const { user } = useAuth();
  const { bookings } = usePlatform();
  const location = useLocation();
  const doctor = useMemo(() => findDoctor(id), [id]);

  const days = useMemo(() => doctor ? availableDays(doctor, bookings) : [], [doctor, bookings]);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [error, setError] = useState('');
  const [booked, setBooked] = useState<{date: string; slot: string;} | null>(null);

  useEffect(() => {
    if (location.hash === '#book') document.getElementById('book')?.scrollIntoView();
  }, [location.hash, doctor]);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-cream" dir="rtl">
        <AccountHeader />
        <main className="mx-auto max-w-[600px] px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-ink tracking-tight">مش لاقيين الدكتور ده</h1>
          <Button to="/doctors" className="mt-6">رجوع للأطباء</Button>
        </main>
      </div>
    );
  }

  const day = days.find((d) => d.iso === date);
  const isParent = user?.role === 'parent';
  const child = user?.child;

  const confirm = () => {
    if (!user || !child || !date || !slot) return;
    const res = platform.addBooking({
      parentId: user.id,
      parentName: user.name,
      childName: child.name,
      childBirth: child.birth,
      doctorId: doctor.id,
      doctorName: doctor.name,
      date,
      slot
    });
    if (!res.ok) {
      setError(res.error);
      setSlot('');
      return;
    }
    setError('');
    setBooked({ date, slot });
  };

  return (
    <div className="min-h-screen w-full bg-cream" dir="rtl">
      <AccountHeader />
      <main className="mx-auto max-w-[1140px] px-6 py-12">
        <Link to="/doctors" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors">
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          <span>كل الأطباء</span>
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            
             
            <section className={card} aria-labelledby="doc-name">
              <div className="flex flex-wrap items-start gap-5">
                <span aria-hidden="true" className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-primary-light text-4xl font-bold text-primary shadow-xs">
                  {doctor.name.replace('د. ', '').charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <h1 id="doc-name" className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">{doctor.name}</h1>
                  <p className="text-base sm:text-lg text-ink-soft mt-0.5">{doctor.specialty}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-success-tint px-3 py-1 text-xs sm:text-sm font-bold text-success-ink">
                      <BadgeCheckIcon className="h-4 w-4 text-success" aria-hidden="true" />
                      <span>موثّق من المنصة</span>
                    </span>
                    {doctor.rating !== null && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-warning-tint px-3 py-1 text-xs sm:text-sm font-bold text-warning-ink">
                        <StarIcon className="h-4 w-4 fill-current" aria-hidden="true" />
                        <span>{toArabicDigits(doctor.rating)} ({toArabicDigits(doctor.reviews ?? 0)} تقييم)</span>
                      </span>
                    )}
                    {doctor.sample && <span className="text-xs sm:text-sm text-ink-soft font-medium">بيانات تجريبية</span>}
                  </div>
                </div>
              </div>
            </section>

            
            <section className={card} aria-labelledby="about">
              <h2 id="about" className="text-xl sm:text-2xl font-bold text-ink tracking-tight">نبذة</h2>
              <p className="mt-3 text-base text-ink-soft leading-relaxed">{doctor.bio}</p>
              {doctor.years !== null && (
                <p className="mt-4 flex items-center gap-2.5 text-base font-semibold text-ink">
                  <AwardIcon className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                  <span>خبرة {toArabicDigits(doctor.years)} سنة</span>
                </p>
              )}
              <h3 className="mt-6 text-lg font-bold text-ink">المؤهلات</h3>
              <ul className="mt-3 space-y-2">
                {doctor.qualifications.map((q) => (
                  <li key={q} className="flex items-start gap-2.5 text-base text-ink-soft">
                    <CheckCircle2Icon className="mt-1 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </section>

             
            <section className={card} aria-labelledby="clinic">
              <h2 id="clinic" className="text-xl sm:text-2xl font-bold text-ink tracking-tight">العيادة والمواعيد</h2>
              <dl className="mt-5 space-y-3.5 text-base text-ink-soft">
                <div className="flex items-start gap-3">
                  <BuildingIcon className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div><dt className="sr-only">العيادة</dt><dd className="font-bold text-ink">{doctor.clinic}</dd></div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div><dt className="sr-only">العنوان</dt><dd className="leading-relaxed">{doctor.address}، {doctor.area}، {doctor.governorate}</dd></div>
                </div>
                <div className="flex items-start gap-3">
                  <WalletIcon className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div><dt className="sr-only">سعر الكشف</dt><dd className="font-semibold text-ink">{doctor.price ? `سعر الكشف ${toArabicDigits(doctor.price)} ج.م` : 'سعر الكشف عند التواصل'}</dd></div>
                </div>
                <div className="flex items-start gap-3">
                  <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div><dt className="sr-only">أيام العمل</dt><dd className="leading-relaxed">{doctor.workDays.map((d) => dayNames[d]).join('، ')}{doctor.slots.length ? ` — من ${doctor.slots[0]} إلى ${doctor.slots[doctor.slots.length - 1]}` : ''}</dd></div>
                </div>
              </dl>
            </section>

          </div>

           
          <aside id="book" aria-labelledby="book-title" className="lg:sticky lg:top-28 lg:self-start">
            <div className={card}>
              <h2 id="book-title" className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-ink tracking-tight">
                <CalendarCheckIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                <span>احجز كشف</span>
              </h2>

              {booked ? (
                <div className="mt-6 text-center space-y-3">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-tint text-success-ink shadow-xs">
                    <CheckCircle2Icon className="h-9 w-9" aria-hidden="true" />
                  </span>
                  <p className="text-xl font-bold text-ink">تم تأكيد الحجز</p>
                  <p className="text-base font-semibold text-ink-soft">{longDate(booked.date)} — {booked.slot}</p>
                  <p className="text-sm text-ink-soft">{doctor.clinic}، {doctor.area}</p>
                  <Button to="/profile" variant="accent" className="mt-6 shadow-xs">شوف حجوزاتي</Button>
                </div>
              ) : !user ? (
                <div className="mt-5 space-y-4">
                  <p className="text-base text-ink-soft">سجّل دخولك كولي أمر عشان تحجز.</p>
                  <div className="flex gap-3">
                    <Button to="/login" variant="accent">تسجيل الدخول</Button>
                    <Button to="/signup" variant="secondary">حساب جديد</Button>
                  </div>
                </div>
              ) : !isParent || !child ? (
                <p className="mt-5 text-base text-ink-soft">الحجز متاح لحسابات أولياء الأمور فقط.</p>
              ) : doctor.slots.length === 0 || days.length === 0 ? (
                <p className="mt-5 text-base text-ink-soft">مفيش مواعيد متاحة حاليًا.</p>
              ) : (
                <>
                  <p className="mt-3 text-base text-ink-soft">الحجز للطفل: <strong className="text-ink">{child.name}</strong></p>

                  <fieldset className="mt-6">
                    <legend className="text-sm font-bold text-ink mb-2.5">اختار اليوم</legend>
                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="اليوم">
                      {days.map((d) => (
                        <button 
                          key={d.iso} 
                          type="button" 
                          role="radio" 
                          aria-checked={date === d.iso} 
                          onClick={() => { setDate(d.iso); setSlot(''); setError(''); }}
                          className={`min-h-[44px] rounded-full border-2 px-4 text-sm font-bold transition-all duration-200 ${
                            date === d.iso 
                              ? 'border-primary bg-primary text-white shadow-xs' 
                              : 'border-line/80 bg-surface text-ink hover:border-primary/60'
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {day && (
                    <fieldset className="mt-6">
                      <legend className="text-sm font-bold text-ink mb-2.5">اختار الميعاد</legend>
                      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="الميعاد">
                        {day.slots.map((s) => (
                          <button 
                            key={s.time} 
                            type="button" 
                            role="radio" 
                            aria-checked={slot === s.time} 
                            disabled={s.taken} 
                            onClick={() => { setSlot(s.time); setError(''); }}
                            className={`min-h-[44px] rounded-full border-2 px-4 text-sm font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:border-line/40 disabled:bg-cream/60 disabled:text-ink-soft/50 disabled:line-through ${
                              slot === s.time 
                                ? 'border-accent bg-accent text-ink shadow-xs' 
                                : 'border-line/80 bg-surface text-ink hover:border-accent/60'
                            }`}
                          >
                            <span>{s.time}</span>
                            {s.taken && <span className="sr-only"> (محجوز)</span>}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {error && <p role="alert" className="mt-5 rounded-2xl bg-error-tint px-4 py-3 text-sm font-semibold text-error">{error}</p>}

                  <Button variant="accent" size="lg" fullWidth className="mt-6 shadow-xs" onClick={confirm} disabled={!date || !slot}>
                    تأكيد الحجز
                  </Button>
                  <p className="mt-4 text-xs sm:text-sm text-ink-soft text-center leading-relaxed">الدفع في العيادة. تقدر تلغي الحجز من بروفايلك.</p>
                </>
              )}
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}