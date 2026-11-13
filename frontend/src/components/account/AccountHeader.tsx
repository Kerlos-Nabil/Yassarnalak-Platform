import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogInIcon, LogOutIcon } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { homePathFor, useAuth } from '../../auth/AuthContext';

const roleLabel = { parent: 'ولي أمر', doctor: 'دكتور', specialist: 'أخصائي متابعة' } as const;

export function AccountHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const links: {to: string;label: string;}[] = [];
  if (user?.role === 'parent') links.push({ to: '/profile', label: 'بروفايلي' }, { to: '/doctors', label: 'الأطباء' }, { to: '/community', label: 'المجتمع' });
  else if (user?.role === 'doctor') links.push({ to: homePathFor(user), label: user.status === 'approved' ? 'حالاتي' : 'حالة الطلب' }, { to: '/doctors', label: 'الأطباء' }, ...(user.status === 'approved' ? [{ to: '/community', label: 'المجتمع' }] : []));
  else if (user?.role === 'specialist') links.push({ to: homePathFor(user), label: user.status === 'approved' ? 'لوحة المتابعة' : 'حالة الطلب' }, { to: '/doctors', label: 'الأطباء' }, ...(user.status === 'approved' ? [{ to: '/community', label: 'المجتمع' }] : []));
  else links.push({ to: '/doctors', label: 'الأطباء' });

  const linkClass = ({ isActive }: {isActive: boolean;}) =>
  `whitespace-nowrap rounded-full px-4 py-2 font-semibold transition-colors duration-200 ${isActive ? 'bg-primary text-white' : 'text-ink hover:bg-primary-light hover:text-primary'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/75 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1100px] items-center justify-between gap-4 px-6">
        <Link to="/" aria-label="يَسَّرْنَالَك — الصفحة الرئيسية" className="shrink-0 rounded-xl">
          <Logo />
        </Link>
        <nav aria-label="التنقل الرئيسي" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => <li key={l.to}><NavLink to={l.to} className={linkClass}>{l.label}</NavLink></li>)}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          {user ?
          <>
              <div className="hidden text-end lg:block">
                <p className="max-w-[180px] truncate text-base font-bold leading-tight text-ink">{user.name}</p>
                <p className="text-sm leading-tight text-ink-soft">{roleLabel[user.role]}</p>
              </div>
              <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {user.name.trim().charAt(0)}
              </span>
              <button
              type="button"
              onClick={() => {
                logout();
                navigate('/', { replace: true });
              }}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-4 font-bold text-primary transition-colors duration-200 hover:bg-primary-light">
              
                <LogOutIcon className="h-5 w-5" aria-hidden="true" />
                <span className="hidden sm:inline">تسجيل الخروج</span>
                <span className="sr-only sm:hidden">تسجيل الخروج</span>
              </button>
            </> :
          <>
              <Link to="/login" className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-4 font-bold text-primary hover:bg-primary-light">
                <LogInIcon className="h-5 w-5" aria-hidden="true" />
                تسجيل الدخول
              </Link>
              <Link to="/signup" className="hidden min-h-[48px] items-center rounded-full bg-accent px-6 font-bold text-ink hover:bg-accent-hover sm:inline-flex">
                ابدأ الآن
              </Link>
            </>
          }
        </div>
      </div>
      <nav aria-label="التنقل الرئيسي (موبايل)" className="border-t border-line/60 md:hidden">
        <ul className="flex gap-1 overflow-x-auto px-4 py-2">
          {links.map((l) => <li key={l.to}><NavLink to={l.to} className={linkClass}>{l.label}</NavLink></li>)}
        </ul>
      </nav>
    </header>);

}
