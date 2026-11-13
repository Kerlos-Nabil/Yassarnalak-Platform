import React from 'react';
import { Link } from 'react-router-dom';
import { LockIcon, MessageCircleIcon, ShieldCheckIcon, UsersIcon } from 'lucide-react';
import { AccountHeader } from '../components/account/AccountHeader';
import { useAuth } from '../auth/AuthContext';
import { conditions } from '../data/conditions';
import { usePlatform } from '../store/platform';
import { toArabicDigits } from '../utils/numbers';

export function Communities() {
  const { user } = useAuth();
  const { posts, cases } = usePlatform();
  const mine = new Set(cases.filter((c) => c.parentId === user?.id && c.confirmed && c.condition).map((c) => c.condition));

  return (
    <div className="min-h-screen w-full bg-cream">
      <AccountHeader />
      <main className="mx-auto max-w-[1100px] px-6 py-10">
        <h1 className="text-4xl font-bold text-ink">مجتمع الأهالي</h1>
        <p className="mt-1 max-w-[640px] text-ink-soft">لكل صعوبة مجتمع خاص بيها. بعد تأكيد تشخيص طفلك، بتنضم لمجتمعه وتشارك وتتعلم من تجارب أهالي مرّوا بنفس الرحلة.</p>

        <p className="mt-5 flex items-start gap-2 rounded-2xl border border-line bg-surface p-4 text-sm text-ink-soft">
          <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          التجارب المشتركة بتدعم بعض، لكنها مش بديل عن تقييم متخصص. ما تكتبش اسم طفلك أو بياناتك الشخصية.
        </p>

        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {conditions.map((c) => {
            const Icon = c.icon;
            const count = posts.filter((p) => p.community === c.key).length;
            const members = new Set(cases.filter((x) => x.confirmed && x.condition === c.key).map((x) => x.parentId)).size;
            const joined = mine.has(c.key);
            return (
              <li key={c.key}>
                <Link to={`/community/${c.key}`} className="flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-soft transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-primary">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary"><Icon className="h-7 w-7" aria-hidden="true" /></span>
                    {joined ?
                    <span className="rounded-full bg-success-tint px-3 py-1 text-sm font-bold text-success-ink">مجتمعك</span> :
                    user?.role === 'parent' &&
                    <span className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-sm font-bold text-ink-soft"><LockIcon className="h-4 w-4" aria-hidden="true" />قراءة فقط</span>
                    }
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-ink">{c.label}</h2>
                  <p className="mt-1 flex-1 text-ink-soft">{c.blurb}</p>
                  <p className="mt-4 flex items-center gap-4 text-sm font-semibold text-ink-soft">
                    <span className="inline-flex items-center gap-1"><MessageCircleIcon className="h-4 w-4" aria-hidden="true" />{toArabicDigits(count)} منشور</span>
                    <span className="inline-flex items-center gap-1"><UsersIcon className="h-4 w-4" aria-hidden="true" />{toArabicDigits(members)} ولي أمر منضم</span>
                  </p>
                </Link>
              </li>);

          })}
        </ul>
      </main>
    </div>);

}
