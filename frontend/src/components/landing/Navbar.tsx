 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LogInIcon, LogOutIcon, MenuIcon, UserRoundIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { homePathFor, useAuth } from '../../auth/AuthContext';
import { navLinks } from '../../data/landing';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const accountPath = homePathFor(user);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-cream/90 backdrop-blur-md shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] border-b border-line/40' 
        : 'bg-cream/70 backdrop-blur-sm border-b border-line/20'
    }`}>
      <nav
        aria-label="التنقل الرئيسي"
        dir="rtl"
        className="mx-auto flex h-20 max-w-[1140px] items-center justify-between gap-6 px-6"
      >
         
        <div className="flex items-center gap-10">
          <Link 
            to="/" 
            aria-label="يَسَّرْنَالَك — الصفحة الرئيسية" 
            className="rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary/60 shrink-0 transition-opacity hover:opacity-90"
          >
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-ink/80 transition-all duration-200 hover:bg-primary-light/60 hover:text-primary hover:font-semibold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

         
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <Button variant="accent" to={accountPath} className="shadow-sm">
                <UserRoundIcon aria-hidden="true" className="w-4 h-4 ml-1.5" />
                حسابي
              </Button>
              <Button variant="ghost" onClick={logout} className="text-ink/70 hover:text-ink">
                <LogOutIcon aria-hidden="true" className="w-4 h-4 ml-1.5" />
                خروج
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" to="/login" className="text-ink/80 hover:text-ink hover:bg-black/5">
                <LogInIcon aria-hidden="true" className="w-4 h-4 ml-1.5" />
                تسجيل الدخول
              </Button>
              <Button variant="accent" to="/signup" className="shadow-sm hover:shadow-md transition-shadow">
                ابدأ الآن
              </Button>
            </>
          )}
        </div>

        {/* زر القائمة لشاشات الجوال */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="group flex min-h-[44px] items-center gap-2 rounded-full border border-line/80 bg-surface/80 px-4 text-sm font-semibold text-ink transition-all hover:border-primary/50 hover:bg-surface lg:hidden shadow-xs"
        >
          {isOpen ? (
            <XIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90 text-primary" aria-hidden="true" />
          ) : (
            <MenuIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
          )}
          <span>القائمة</span>
        </button>
      </nav>

      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 bg-cream/98 backdrop-blur-xl px-6 py-6 shadow-xl lg:hidden border-b border-line/40"
            dir="rtl"
          >
            <ul className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-[44px] items-center rounded-2xl px-4 text-sm font-semibold text-ink transition-colors hover:bg-primary-light hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 pt-5 border-t border-line/30">
              {user ? (
                <>
                  <Button variant="accent" to={accountPath} fullWidth onClick={() => setIsOpen(false)}>
                    <UserRoundIcon aria-hidden="true" className="w-4 h-4 ml-2" />
                    حسابي
                  </Button>
                  <Button variant="secondary" onClick={() => { setIsOpen(false); logout(); }} fullWidth>
                    <LogOutIcon aria-hidden="true" className="w-4 h-4 ml-2" />
                    تسجيل الخروج
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="secondary" to="/login" fullWidth onClick={() => setIsOpen(false)}>
                    <LogInIcon aria-hidden="true" className="w-4 h-4 ml-2" />
                    تسجيل الدخول
                  </Button>
                  <Button variant="accent" to="/signup" fullWidth onClick={() => setIsOpen(false)}>
                    ابدأ الآن
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}



 
                  