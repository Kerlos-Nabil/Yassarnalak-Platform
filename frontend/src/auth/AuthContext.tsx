import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Role } from '../data/signup';
import { normalizeEmail } from './validators';

/**
 * Prototype auth: accounts live in this browser's localStorage so the full flow can be clicked through.
 * Replace the bodies of register / login / logout with calls to the ASP.NET Core Identity + JWT API.
 */

const USERS_KEY = 'yassarnalak:users:v1';
const SESSION_KEY = 'yassarnalak:session:v1';

export interface ChildInfo {
  name: string;
  birth: string;
  certificateName: string;
}

export interface ProInfo {
  specialty: string;
  licenseNo: string;
  workplace: string;
  documents: string[];
}

export interface User {
  id: string;
  role: Role;
  name: string;
  email: string;
  phone: string;
  governorate: string;
  area: string;
  status: 'active' | 'pending' | 'approved';
  child?: ChildInfo;
  pro?: ProInfo;
  createdAt: string;
}

interface StoredUser extends User {
  salt: string;
  passwordHash: string;
}

export interface RegisterInput {
  role: Role;
  name: string;
  email: string;
  phone: string;
  password: string;
  governorate: string;
  area: string;
  child?: ChildInfo;
  pro?: ProInfo;
}

type Result = {ok: true;user: User;} | {ok: false;error: string;};

interface AuthValue {
  user: User | null;
  register: (input: RegisterInput) => Promise<Result>;
  login: (email: string, password: string) => Promise<Result>;
  logout: () => void;
  /** demo only: stands in for the admin approving a doctor / specialist */
  approveDemo: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

export function homePathFor(user: User | null): string {
  if (!user) return '/login';
  if (user.role === 'parent') return '/profile';
  if (user.status !== 'approved') return '/pending';
  return user.role === 'doctor' ? '/doctor' : '/dashboard';
}

const readUsers = (): StoredUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]') as StoredUser[];
  } catch {
    return [];
  }
};
const writeUsers = (users: StoredUser[]) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* storage unavailable */
  }
};

async function hash(salt: string, password: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  if (globalThis.crypto?.subtle) {
    const buf = await globalThis.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // very weak fallback for non-secure contexts (prototype only)
  let h = 5381;
  for (const b of data) h = (h * 33 ^ b) >>> 0;
  return h.toString(16);
}

const randomId = () =>
globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);

const publicUser = (u: StoredUser): User => {
  const { salt: _s, passwordHash: _p, ...rest } = u;
  return rest;
};

/** Approved doctors / specialists of real accounts (used by the directory and by follow-up assignment). */
export function listApprovedProfessionals(): User[] {
  return readUsers().filter((u) => u.role !== 'parent' && u.status === 'approved').map(publicUser);
}

function loadSession(): User | null {
  try {
    const id = localStorage.getItem(SESSION_KEY);
    if (!id) return null;
    const found = readUsers().find((u) => u.id === id);
    return found ? publicUser(found) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<User | null>(loadSession);

  const startSession = (u: StoredUser) => {
    try {
      localStorage.setItem(SESSION_KEY, u.id);
    } catch {
      /* ignore */
    }
    setUser(publicUser(u));
  };

  const register = useCallback(async (input: RegisterInput): Promise<Result> => {
    const email = normalizeEmail(input.email);
    const users = readUsers();
    if (users.some((u) => u.email === email)) return { ok: false, error: 'الإيميل ده مسجّل قبل كده. جرّب تسجّل دخول.' };
    const salt = randomId();
    const stored: StoredUser = {
      id: randomId(),
      role: input.role,
      name: input.name.trim().replace(/\s+/g, ' '),
      email,
      phone: input.phone.trim(),
      governorate: input.governorate,
      area: input.area,
      status: input.role === 'parent' ? 'active' : 'pending',
      child: input.child,
      pro: input.pro,
      createdAt: new Date().toISOString(),
      salt,
      passwordHash: await hash(salt, input.password)
    };
    writeUsers([...users, stored]);
    startSession(stored);
    return { ok: true, user: publicUser(stored) };
  }, []);

  const login = useCallback(async (emailRaw: string, password: string): Promise<Result> => {
    const email = normalizeEmail(emailRaw);
    const found = readUsers().find((u) => u.email === email);
    const generic: Result = { ok: false, error: 'الإيميل أو كلمة المرور غير صحيحة.' };
    if (!found) return generic;
    if ((await hash(found.salt, password)) !== found.passwordHash) return generic;
    startSession(found);
    return { ok: true, user: publicUser(found) };
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setUser(null);
  }, []);

  const approveDemo = useCallback(() => {
    setUser((current) => {
      if (!current || current.role === 'parent') return current;
      const users = readUsers().map((u) => u.id === current.id ? { ...u, status: 'approved' as const } : u);
      writeUsers(users);
      return { ...current, status: 'approved' };
    });
  }, []);

  const value = useMemo(() => ({ user, register, login, logout, approveDemo }), [user, register, login, logout, approveDemo]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
