

import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { footerGroups } from '../../data/landing';

const linkClass = 'text-sm sm:text-base text-ink-soft transition-colors duration-200 hover:text-primary inline-block py-0.5';

export function Footer() {
  return (
    <footer className="bg-cream border-t border-line/60 relative overflow-hidden" dir="rtl">
      
      <div className="mx-auto grid max-w-[1140px] gap-12 px-6 py-16 md:grid-cols-[1.5fr_repeat(4,1fr)] lg:gap-8">
        
         
        <div className="space-y-4">
          <Logo />
          <p className="max-w-[280px] text-sm sm:text-base leading-relaxed text-ink-soft">
            نساعد العائلات على فهم صعوبات التعلّم، والوصول إلى أخصائيين موثّقين.
          </p>
        </div>

        
        {footerGroups.map((group) => (
          <nav key={group.title} aria-label={group.title} className="space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-ink tracking-tight">
              {group.title}
            </h2>
            <ul className="space-y-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}

      </div>

      
      <div className="border-t border-line/40 bg-black/[0.01]">
        <div className="mx-auto max-w-[1140px] px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-ink-soft">
          <p>© ٢٠٢٦ يَسَّرْنَالَك. جميع الحقوق محفوظة.</p>
          
          <div className="flex items-center gap-6">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/40" aria-hidden="true" />
            <span className="text-ink-soft/70">مصمم بعناية لدعم العائلات</span>
          </div>
        </div>
      </div>
    </footer>
  );
}