import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowRightIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { Logo } from '../ui/Logo';
import { sidebarItems } from '../../data/dashboard';
import { toArabicDigits } from '../../utils/numbers';

const baseItem =
'flex min-h-[48px] items-center gap-3 rounded-2xl px-4 text-base font-semibold transition-colors duration-200';
const idleItem = 'text-ink hover:bg-primary-light hover:text-primary';
const activeItem = 'bg-primary text-white';

export function Sidebar() {
  const { user, logout } = useAuth();
  const displayName = `${user?.role === 'doctor' ? 'د. ' : ''}${user?.name ?? ''}`;
  const displayRole = user?.pro?.specialty ?? (user?.role === 'doctor' ? 'دكتور' : 'أخصائي متابعة');
  return (
    <aside className="fixed inset-y-0 start-0 z-30 flex w-64 flex-col border-e border-line bg-surface px-4 py-6">
      <Link to="/" className="rounded-xl px-2" aria-label="يَسَّرْنَالَك — الموقع الرئيسي">
        <Logo />
      </Link>
      <p className="mt-1 px-2 text-sm text-ink-soft">لوحة الأخصائي</p>

      <nav aria-label="قائمة لوحة الأخصائي" className="mt-8 flex-1">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const content =
            <>
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="flex-1">{item.label}</span>
                {item.badge !== undefined &&
              <span className="rounded-full bg-accent px-2 text-sm font-bold text-ink">
                    {toArabicDigits(item.badge)}
                    <span className="sr-only"> جديدة</span>
                  </span>
              }
              </>;

            return (
              <li key={item.label}>
                {item.to ?
                <NavLink to={item.to} end className={({ isActive }) => `${baseItem} ${isActive ? activeItem : idleItem}`}>
                    {content}
                  </NavLink> :

                <a href={item.href} className={`${baseItem} ${idleItem}`}>
                    {content}
                  </a>
                }
              </li>);

          })}
        </ul>
      </nav>

      <div className="border-t border-line pt-4">
        <div className="flex items-center gap-3 px-2">
          <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
            {user?.name.trim().charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-ink">{displayName}</p>
            <p className="truncate text-sm text-ink-soft">{displayRole}</p>
          </div>
        </div>
        <Link
          to="/"
          className="mt-3 flex min-h-[44px] items-center gap-2 rounded-2xl px-3 text-sm font-semibold text-ink-soft hover:bg-primary-light hover:text-primary">
          
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          العودة إلى الموقع
        </Link>
        <button
          type="button"
          onClick={logout}
          className="mt-1 flex min-h-[44px] w-full items-center gap-2 rounded-2xl px-3 text-sm font-semibold text-ink-soft hover:bg-primary-light hover:text-primary">
          
          <LogOutIcon className="h-4 w-4" aria-hidden="true" />
          تسجيل الخروج
        </button>
      </div>
    </aside>);

}