
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheckIcon, BuildingIcon, CalendarClockIcon, MapPinIcon, SearchIcon, StarIcon, XIcon } from 'lucide-react';
import { AccountHeader } from '../components/account/AccountHeader';
import { Button } from '../components/ui/Button';
import { inputClass } from '../components/signup/Field';
import { useAuth } from '../auth/AuthContext';
import { allDoctors } from '../data/directory';
import { governorateNames, governorates, specialties } from '../data/signup';
import { usePlatform } from '../store/platform';
import { nextFreeSlot } from '../utils/dates';
import { toArabicDigits } from '../utils/numbers';

type Sort = 'near' | 'rating' | 'price';

export function Doctors() {
  const { user } = useAuth();
  const { bookings } = usePlatform();
  const doctors = useMemo(allDoctors, []);

  const [governorate, setGovernorate] = useState<string>(user?.role === 'parent' ? user.governorate : '');
  const [area, setArea] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('near');

  const areas = governorate ? governorates[governorate] ?? [] : [];
  const changeGovernorate = (g: string) => { setGovernorate(g); setArea(''); };
  const clear = () => { setGovernorate(''); setArea(''); setSpecialty(''); setQuery(''); };
  const hasFilters = Boolean(governorate || area || specialty || query);

  const results = useMemo(() => {
    const q = query.trim();
    const list = doctors.filter((d) =>
      (!governorate || d.governorate === governorate) &&
      (!area || d.area === area) &&
      (!specialty || d.specialty === specialty) &&
      (!q || d.name.includes(q) || d.clinic.includes(q))
    );

    const rank = (d: (typeof doctors)[number]) =>
      user?.role === 'parent' ? d.area === user.area ? 0 : d.governorate === user.governorate ? 1 : 2 : 0;
    return [...list].sort((a, b) => {
      if (sort === 'rating') return (b.rating ?? 0) - (a.rating ?? 0);
      if (sort === 'price') return (a.price ?? 9999) - (b.price ?? 9999);
      return rank(a) - rank(b) || (b.rating ?? 0) - (a.rating ?? 0);
    });
  }, [doctors, governorate, area, specialty, query, sort, user]);

  return (
    <div className="min-h-screen w-full bg-cream" dir="rtl">
      <AccountHeader />
      <main className="mx-auto max-w-[1140px] px-6 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">الأطباء المعتمدون</h1>
          <p className="text-base text-ink-soft">اختار دكتور قريب منك، واقرأ عنه، واحجز كشف.</p>
        </div>
        
        <p role="note" className="mt-6 rounded-2xl bg-notice/80 border border-warning-ink/10 px-5 py-3.5 text-sm font-semibold text-warning-ink backdrop-blur-sm">
          الأسماء والبيانات المعروضة (عدا حسابات المسجّلين فعلًا) نماذج تجريبية للعرض فقط.
        </p>

        <form role="search" aria-label="تصفية الأطباء" onSubmit={(e) => e.preventDefault()} className="mt-8 rounded-card border border-line/70 bg-surface p-6 shadow-xs">
          <div className="grid gap-5 md:grid-cols-4">
            <div>
              <label htmlFor="f-gov" className="mb-2 block text-sm font-bold text-ink">المحافظة</label>
              <select id="f-gov" className={inputClass} value={governorate} onChange={(e) => changeGovernorate(e.target.value)}>
                <option value="">كل المحافظات</option>
                {governorateNames.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="f-area" className="mb-2 block text-sm font-bold text-ink">المنطقة</label>
              <select id="f-area" className={inputClass} value={area} onChange={(e) => setArea(e.target.value)} disabled={!governorate}>
                <option value="">{governorate ? 'كل المناطق' : 'اختر المحافظة أولًا'}</option>
                {areas.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="f-spec" className="mb-2 block text-sm font-bold text-ink">التخصص</label>
              <select id="f-spec" className={inputClass} value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                <option value="">كل التخصصات</option>
                {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="f-q" className="mb-2 block text-sm font-bold text-ink">بحث بالاسم</label>
              <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
                <input id="f-q" className={`${inputClass} pl-12`} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="اسم الدكتور أو المركز" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-line/40">
            <div className="flex items-center gap-3">
              <label htmlFor="f-sort" className="text-sm font-bold text-ink">ترتيب:</label>
              <select id="f-sort" className={`${inputClass} !min-h-[44px] w-auto text-sm`} value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                <option value="near">{user?.role === 'parent' ? 'الأقرب ليك' : 'الأعلى تقييمًا'}</option>
                <option value="rating">الأعلى تقييمًا</option>
                <option value="price">الأقل سعرًا</option>
              </select>
            </div>
            {hasFilters && (
              <button type="button" onClick={clear} className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-bold text-primary hover:bg-primary-light/60 transition-colors">
                <XIcon className="h-4 w-4" aria-hidden="true" />
                <span>مسح التصفية</span>
              </button>
            )}
          </div>
        </form>

        <p role="status" className="mt-8 text-base font-bold text-ink">
          {results.length ? `${toArabicDigits(results.length)} ${results.length > 2 && results.length < 11 ? 'أطباء' : 'دكتور'}` : 'مفيش نتائج'}
        </p>

        {results.length === 0 ? (
          <div className="mt-4 rounded-card border border-dashed border-line/80 bg-surface p-12 text-center shadow-xs">
            <p className="text-xl font-bold text-ink">مفيش دكاترة بالمواصفات دي لسه</p>
            <p className="mt-2 text-base text-ink-soft">جرّب منطقة تانية أو شيل بعض الفلاتر.</p>
            <Button variant="secondary" className="mt-6" onClick={clear}>مسح التصفية</Button>
          </div>
        ) : (
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {results.map((d) => {
              const next = nextFreeSlot(d, bookings);
              return (
                <li key={d.id} className="group flex flex-col rounded-card border border-line/70 bg-surface p-7 shadow-xs transition-all duration-300 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <span aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-2xl font-bold text-primary shadow-xs">
                      {d.name.replace('د. ', '').charAt(0)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-bold text-ink tracking-tight">
                        <Link to={`/doctors/${d.id}`} className="hover:text-primary transition-colors">{d.name}</Link>
                      </h2>
                      <p className="text-sm text-ink-soft mt-0.5">{d.specialty}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-success-tint px-3 py-0.5 text-xs font-bold text-success-ink">
                          <BadgeCheckIcon className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                          <span>موثّق</span>
                        </span>
                        {d.sample && <span className="text-xs text-ink-soft">(تجريبي)</span>}
                      </div>
                    </div>
                    {d.rating !== null && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-warning-tint px-3 py-1 text-sm font-bold text-warning-ink shrink-0">
                        <StarIcon className="h-4 w-4 fill-current" aria-hidden="true" />
                        <span>{toArabicDigits(d.rating)}</span>
                      </span>
                    )}
                  </div>
                  <dl className="mt-6 space-y-2.5 text-sm text-ink-soft border-t border-line/40 pt-5">
                    <div className="flex items-center gap-2.5">
                      <BuildingIcon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <dt className="sr-only">المركز</dt>
                      <dd className="font-medium text-ink truncate">{d.clinic}</dd>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPinIcon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <dt className="sr-only">المكان</dt>
                      <dd className="font-medium text-ink">{d.area}، {d.governorate}</dd>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CalendarClockIcon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <dt className="sr-only">أقرب ميعاد</dt>
                      <dd className="font-medium text-ink">{next ?? 'مفيش مواعيد متاحة حاليًا'}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line/40 pt-5">
                    <p className="text-lg font-bold text-ink">{d.price ? `${toArabicDigits(d.price)} ج.م` : 'السعر عند التواصل'}</p>
                    <div className="flex gap-2.5">
                      <Button variant="secondary" to={`/doctors/${d.id}`}>عرض الملف</Button>
                      <Button variant="accent" to={`/doctors/${d.id}#book`}>احجز كشف</Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
