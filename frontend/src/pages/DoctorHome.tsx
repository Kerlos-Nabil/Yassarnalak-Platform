import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheckIcon, CheckCircle2Icon, ClipboardListIcon, FileTextIcon, UserRoundCheckIcon, UsersIcon } from 'lucide-react';
import { AccountHeader } from '../components/account/AccountHeader';
import { Button } from '../components/ui/Button';
import { useAuth } from '../auth/AuthContext';
import { usePlatform } from '../store/platform';
import { conditionLabel } from '../data/conditions';
import { ageText, longDate } from '../utils/dates';
import { toArabicDigits } from '../utils/numbers';

const card = 'rounded-card border border-line bg-surface p-6 shadow-soft';

export function DoctorHome() {
  const { user } = useAuth();
  const { bookings, cases } = usePlatform();
  if (!user) return null;

  const mine = bookings.filter((b) => b.doctorId === user.id);
  const upcoming = mine.filter((b) => b.status === 'confirmed').sort((a, b) => (a.date + a.slot).localeCompare(b.date + b.slot));
  const myCases = cases.filter((c) => c.doctorId === user.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const confirmed = myCases.filter((c) => c.confirmed).length;

  const stats = [
  { icon: <CalendarCheckIcon className="h-6 w-6" aria-hidden="true" />, value: upcoming.length, label: 'حجوزات قادمة' },
  { icon: <ClipboardListIcon className="h-6 w-6" aria-hidden="true" />, value: myCases.length, label: 'حالات تم الكشف عليها' },
  { icon: <CheckCircle2Icon className="h-6 w-6" aria-hidden="true" />, value: confirmed, label: 'تشخيصات مؤكدة' }];


  return (
    <div className="min-h-screen w-full bg-cream">
      <AccountHeader />
      <main className="mx-auto max-w-[1100px] space-y-6 px-6 py-10">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-4xl font-bold text-ink">مرحبًا، د. {user.name.split(' ')[0]}</h1>
            <p className="text-ink-soft">كل الحالات اللي كشفت عليها على المنصة في مكان واحد.</p>
          </div>
          <Button variant="secondary" to={`/doctors/${user.id}`}>شوف ملفك العام</Button>
        </header>

        <ul className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) =>
          <li key={s.label} className={card}>
              <span className="text-primary">{s.icon}</span>
              <p className="mt-2 text-5xl font-bold text-ink">{toArabicDigits(s.value)}</p>
              <p className="text-base text-ink-soft">{s.label}</p>
            </li>
          )}
        </ul>

        <section aria-labelledby="up-title" className={card}>
          <h2 id="up-title" className="flex items-center gap-2 text-2xl font-bold text-ink"><UsersIcon className="h-6 w-6 text-primary" aria-hidden="true" />الحجوزات القادمة</h2>
          {upcoming.length === 0 ?
          <p className="mt-4 text-ink-soft">مفيش حجوزات قادمة. ملفك ظاهر للأهالي في صفحة الأطباء، وأي حجز هيظهر هنا.</p> :

          <ul className="mt-4 divide-y divide-line">
              {upcoming.map((b) =>
            <li key={b.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div>
                    <p className="text-lg font-bold text-ink">{b.childName} <span className="text-base font-normal text-ink-soft">({ageText(b.childBirth)})</span></p>
                    <p className="text-ink-soft">ولي الأمر: {b.parentName}</p>
                    <p className="text-ink-soft">{longDate(b.date)} — {b.slot}</p>
                  </div>
                  <Button variant="accent" to={`/doctor/case/${b.id}`}>ابدأ الكشف</Button>
                </li>
            )}
            </ul>
          }
        </section>

        <section aria-labelledby="cases-title" className={card}>
          <h2 id="cases-title" className="flex items-center gap-2 text-2xl font-bold text-ink"><FileTextIcon className="h-6 w-6 text-primary" aria-hidden="true" />حالاتي</h2>
          {myCases.length === 0 ?
          <p className="mt-4 text-ink-soft">لسه ما كشفتش على حالات. بعد الكشف وتأكيد التشخيص هتظهر هنا.</p> :

          <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] text-start">
                <thead>
                  <tr className="border-b border-line text-sm text-ink-soft">
                    <th scope="col" className="py-2 pe-4 text-start font-semibold">الطفل</th>
                    <th scope="col" className="py-2 pe-4 text-start font-semibold">التاريخ</th>
                    <th scope="col" className="py-2 pe-4 text-start font-semibold">التشخيص</th>
                    <th scope="col" className="py-2 pe-4 text-start font-semibold">المتخصص المتابع</th>
                    <th scope="col" className="py-2 text-start font-semibold">الروشتة</th>
                  </tr>
                </thead>
                <tbody>
                  {myCases.map((c) =>
                <tr key={c.id} className="border-b border-line/60 last:border-0">
                      <td className="py-3 pe-4 font-bold text-ink">{c.childName}<span className="block text-sm font-normal text-ink-soft">{ageText(c.childBirth)}</span></td>
                      <td className="py-3 pe-4 text-ink-soft">{longDate(c.createdAt.slice(0, 10))}</td>
                      <td className="py-3 pe-4">
                        {c.confirmed ?
                    <span className="rounded-full bg-success-tint px-3 py-1 text-sm font-bold text-success-ink">{conditionLabel(c.condition)}</span> :
                    <span className="rounded-full bg-cream px-3 py-1 text-sm font-bold text-ink-soft">لم يتأكد التشخيص</span>}
                      </td>
                      <td className="py-3 pe-4 text-ink-soft">{c.specialistName ?? '—'}</td>
                      <td className="py-3 text-ink-soft">{c.prescription ? c.prescription.name : '—'}</td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          }
          <p className="mt-4 flex items-center gap-2 text-sm text-ink-soft"><UserRoundCheckIcon className="h-5 w-5 text-primary" aria-hidden="true" />بعد تأكيد التشخيص، الطفل بيتحوّل للمتخصص اللي اخترته، وبتظهر الروشتة في بروفايل ولي الأمر.</p>
        </section>
      </main>
    </div>);

}
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { CalendarCheckIcon, CheckCircle2Icon, ClipboardListIcon, FileTextIcon, UserRoundCheckIcon, UsersIcon } from 'lucide-react';
// import { AccountHeader } from '../components/account/AccountHeader';
// import { Button } from '../components/ui/Button';
// import { useAuth } from '../auth/AuthContext';
// import { usePlatform } from '../store/platform';
// import { conditionLabel } from '../data/conditions';
// import { ageText, longDate } from '../utils/dates';
// import { toArabicDigits } from '../utils/numbers';

// // استخدام خلفية بيضاء ناعمة مع حدود خفيفة وظل هادئ لتقليل الإجهاد البصري
// const card = 'rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-all';

// export function DoctorHome() {
//   const { user } = useAuth();
//   const { bookings, cases } = usePlatform();
//   if (!user) return null;

//   const mine = bookings.filter((b) => b.doctorId === user.id);
//   const upcoming = mine.filter((b) => b.status === 'confirmed').sort((a, b) => (a.date + a.slot).localeCompare(b.date + b.slot));
//   const myCases = cases.filter((c) => c.doctorId === user.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
//   const confirmed = myCases.filter((c) => c.confirmed).length;

//   const stats = [
//     { icon: <CalendarCheckIcon className="h-6 w-6" aria-hidden="true" />, value: upcoming.length, label: 'حجوزات قادمة' },
//     { icon: <ClipboardListIcon className="h-6 w-6" aria-hidden="true" />, value: myCases.length, label: 'حالات تم الكشف عليها' },
//     { icon: <CheckCircle2Icon className="h-6 w-6" aria-hidden="true" />, value: confirmed, label: 'تشخيصات مؤكدة' },
//   ];

//   return (
//     <div className="min-h-screen w-full bg-slate-50/60 text-slate-800 antialiased">
//       <AccountHeader />
//       <main className="mx-auto max-w-[1100px] space-y-6 px-6 py-10">
//         <header className="flex flex-wrap items-end justify-between gap-3">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">مرحبًا، د. {user.name.split(' ')[0]}</h1>
//             <p className="mt-1 text-slate-500">كل الحالات اللي كشفت عليها على المنصة في مكان واحد.</p>
//           </div>
//           <Button variant="secondary" to={`/doctors/${user.id}`}>شوف ملفك العام</Button>
//         </header>

//         <ul className="grid gap-4 sm:grid-cols-3">
//           {stats.map((s) => (
//             <li key={s.label} className={card}>
//               <span className="inline-flex rounded-xl bg-teal-50 p-2.5 text-teal-600 dark:bg-teal-950/30">{s.icon}</span>
//               <p className="mt-3 text-4xl font-bold text-slate-800">{toArabicDigits(s.value)}</p>
//               <p className="mt-1 text-sm font-medium text-slate-500">{s.label}</p>
//             </li>
//           ))}
//         </ul>

//         <section aria-labelledby="up-title" className={card}>
//           <h2 id="up-title" className="flex items-center gap-2.5 text-xl font-bold text-slate-800">
//             <UsersIcon className="h-6 w-6 text-teal-600" aria-hidden="true" />
//             الحجوزات القادمة
//           </h2>
//           {upcoming.length === 0 ? (
//             <p className="mt-4 text-slate-500 font-normal">مفيش حجوزات قادمة. ملفك ظاهر للأهالي في صفحة الأطباء، وأي حجز هيظهر هنا.</p>
//           ) : (
//             <ul className="mt-4 divide-y divide-slate-100">
//               {upcoming.map((b) => (
//                 <li key={b.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
//                   <div>
//                     <p className="text-base font-bold text-slate-800">
//                       {b.childName} <span className="text-sm font-normal text-slate-500">({ageText(b.childBirth)})</span>
//                     </p>
//                     <p className="text-sm text-slate-500">ولي الأمر: {b.parentName}</p>
//                     <p className="text-sm text-slate-400">{longDate(b.date)} — {b.slot}</p>
//                   </div>
//                   <Button variant="accent" to={`/doctor/case/${b.id}`}>ابدأ الكشف</Button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </section>

//         <section aria-labelledby="cases-title" className={card}>
//           <h2 id="cases-title" className="flex items-center gap-2.5 text-xl font-bold text-slate-800">
//             <FileTextIcon className="h-6 w-6 text-teal-600" aria-hidden="true" />
//             حالاتي
//           </h2>
//           {myCases.length === 0 ? (
//             <p className="mt-4 text-slate-500 font-normal">لسه ما كشفتش على حالات. بعد الكشف وتأكيد التشخيص هتظهر هنا.</p>
//           ) : (
//             <div className="mt-4 overflow-x-auto">
//               <table className="w-full min-w-[640px] text-start">
//                 <thead>
//                   <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400">
//                     <th scope="col" className="py-2.5 pe-4 text-start">الطفل</th>
//                     <th scope="col" className="py-2.5 pe-4 text-start">التاريخ</th>
//                     <th scope="col" className="py-2.5 pe-4 text-start">التشخيص</th>
//                     <th scope="col" className="py-2.5 pe-4 text-start">المتخصص المتابع</th>
//                     <th scope="col" className="py-2.5 text-start">الروشتة</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100/80 text-sm">
//                   {myCases.map((c) => (
//                     <tr key={c.id} className="transition-colors hover:bg-slate-50/50">
//                       <td className="py-3.5 pe-4 font-semibold text-slate-800">
//                         {c.childName}
//                         <span className="block text-xs font-normal text-slate-400">{ageText(c.childBirth)}</span>
//                       </td>
//                       <td className="py-3.5 pe-4 text-slate-500">{longDate(c.createdAt.slice(0, 10))}</td>
//                       <td className="py-3.5 pe-4">
//                         {c.confirmed ? (
//                           <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
//                             {conditionLabel(c.condition)}
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-0.5 text-xs font-medium text-slate-500">
//                             لم يتأكد التشخيص
//                           </span>
//                         )}
//                       </td>
//                       <td className="py-3.5 pe-4 text-slate-500">{c.specialistName ?? '—'}</td>
//                       <td className="py-3.5 text-slate-500">{c.prescription ? c.prescription.name : '—'}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//           <p className="mt-5 flex items-center gap-2 text-xs text-slate-500">
//             <UserRoundCheckIcon className="h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
//             بعد تأكيد التشخيص، الطفل بيتحوّل للمتخصص اللي اخترته، وبتظهر الروشتة في بروفايل ولي الأمر.
//           </p>
//         </section>
//       </main>
//     </div>
//   );
// }