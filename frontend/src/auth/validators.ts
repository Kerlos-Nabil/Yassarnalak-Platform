export const nameError = (value: string): string => {
  const t = value.trim().replace(/\s+/g, ' ');
  const letters = (t.match(/\p{L}/gu) ?? []).length;
  if (!t) return 'اكتب الاسم';
  if (letters < 3) return 'الاسم لازم يكون 3 حروف على الأقل';
  if (!/^[\p{L}\s'’.-]+$/u.test(t)) return 'الاسم يحتوي على حروف فقط (من غير أرقام أو رموز)';
  return '';
};

const emailPattern = /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]*[A-Za-z0-9])?@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

export const normalizeEmail = (value: string) => value.trim().toLowerCase();

export const emailError = (value: string): string => {
  const v = value.trim();
  if (!v) return 'اكتب البريد الإلكتروني';
  if (/\s/.test(v)) return 'البريد الإلكتروني ما يحتويش على مسافات';
  if (v.includes('..') || !emailPattern.test(v)) return 'اكتب بريد إلكتروني صحيح، مثال: name@example.com';
  return '';
};

export interface PasswordRule {
  id: string;
  label: string;
  test: (pw: string) => boolean;
}

export const passwordRules: PasswordRule[] = [
{ id: 'len', label: '8 أحرف على الأقل', test: (p) => p.length >= 8 },
{ id: 'upper', label: 'حرف إنجليزي كبير (A-Z)', test: (p) => /[A-Z]/.test(p) },
{ id: 'lower', label: 'حرف إنجليزي صغير (a-z)', test: (p) => /[a-z]/.test(p) },
{ id: 'digit', label: 'رقم واحد على الأقل (0-9)', test: (p) => /\d/.test(p) },
{ id: 'special', label: 'رمز خاص واحد على الأقل (! @ # $ % …)', test: (p) => /[^A-Za-z0-9\s]/.test(p) },
{ id: 'space', label: 'من غير مسافات', test: (p) => p.length > 0 && !/\s/.test(p) }];


export const passwordScore = (pw: string) => passwordRules.filter((r) => r.test(pw)).length;

export const passwordError = (pw: string): string => {
  if (!pw) return 'اكتب كلمة المرور';
  const missing = passwordRules.find((r) => !r.test(pw));
  return missing ? `كلمة المرور لازم تحقق الشروط كلها (ناقص: ${missing.label})` : '';
};

export const phoneError = (value: string): string =>
/^01[0125]\d{8}$/.test(value.trim()) ? '' : 'رقم موبايل مصري صحيح (11 رقم يبدأ بـ 010 أو 011 أو 012 أو 015)';
