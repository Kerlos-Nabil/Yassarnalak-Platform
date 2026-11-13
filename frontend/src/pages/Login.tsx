import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogInIcon, ShieldCheckIcon } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { Field, inputClass } from '../components/signup/Field';
import { PasswordField } from '../components/signup/PasswordField';
import { homePathFor, useAuth } from '../auth/AuthContext';
import { emailError } from '../auth/validators';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {from?: string;} | null)?.from;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string;password?: string;form?: string;}>({});
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    const em = emailError(email);
    if (em) next.email = em;
    if (!password) next.password = 'اكتب كلمة المرور';
    setErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    const res = await login(email, password);
    setBusy(false);
    if (!res.ok) {
      setErrors({ form: res.error });
      return;
    }
    // route guards send the user to the right place if `from` isn't theirs
    navigate(from ?? homePathFor(res.user), { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-cream">
      <header className="border-b border-line/70">
        <div className="mx-auto flex h-20 max-w-[1100px] items-center justify-between px-6">
          <Link to="/" aria-label="يَسَّرْنَالَك — الصفحة الرئيسية" className="rounded-xl">
            <Logo />
          </Link>
          <p className="text-base text-ink-soft">
            مستخدم جديد؟{' '}
            <Link to="/signup" className="font-bold text-primary hover:underline">إنشاء حساب</Link>
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[520px] px-6 py-14">
        <section aria-labelledby="login-title" className="rounded-card border border-line bg-surface p-6 shadow-soft md:p-10">
          <h1 id="login-title" className="text-3xl font-bold text-ink">أهلًا بعودتك</h1>
          <p className="mt-1 text-ink-soft">سجّل دخولك عشان تكمل من حيث وقفت.</p>

          <form onSubmit={submit} noValidate className="mt-8 grid gap-5">
            {errors.form &&
            <p role="alert" className="rounded-2xl bg-error-tint px-4 py-3 text-base font-semibold text-error">{errors.form}</p>
            }
            <Field id="email" label="البريد الإلكتروني" error={errors.email}>
              <input
                id="email"
                dir="ltr"
                type="email"
                autoComplete="email"
                className={`${inputClass} text-end`}
                value={email}
                onChange={(e) => {setEmail(e.target.value);setErrors((x) => ({ ...x, email: '', form: '' }));}} />
              
            </Field>
            <PasswordField
              id="password"
              label="كلمة المرور"
              value={password}
              onChange={(v) => {setPassword(v);setErrors((x) => ({ ...x, password: '', form: '' }));}}
              error={errors.password}
              autoComplete="current-password" />
            

            <Button type="submit" variant="accent" size="lg" fullWidth disabled={busy}>
              <LogInIcon aria-hidden="true" />
              {busy ? 'جاري الدخول…' : 'تسجيل الدخول'}
            </Button>
          </form>

          <p className="mt-6 flex items-center gap-2 text-sm text-ink-soft">
            <ShieldCheckIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            بياناتك وبيانات طفلك محمية ومش بتتعرض لأي مستخدم تاني.
          </p>
        </section>
      </main>
    </div>);

}
