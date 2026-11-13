import { useSyncExternalStore } from 'react';
import type { DifficultyKey } from '../types/dashboard';

/**
 * Prototype data layer (bookings, diagnoses, community posts) kept in localStorage.
 * Every function here maps 1:1 to a REST endpoint to build later in the ASP.NET Core API.
 */

export interface Booking {
  id: string;
  parentId: string;
  parentName: string;
  childName: string;
  childBirth: string;
  doctorId: string;
  doctorName: string;
  date: string; // YYYY-MM-DD
  slot: string;
  status: 'confirmed' | 'examined' | 'cancelled';
  createdAt: string;
}

export interface Prescription {
  name: string;
  size: number;
  dataUrl?: string;
}

export interface DiagCase {
  id: string;
  bookingId: string;
  parentId: string;
  doctorId: string;
  doctorName: string;
  childName: string;
  childBirth: string;
  confirmed: boolean;
  condition?: DifficultyKey;
  severity?: 'mild' | 'moderate' | 'severe';
  notes: string;
  recommendations: string;
  prescription?: Prescription;
  specialistId?: string;
  specialistName?: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: 'parent' | 'doctor' | 'specialist';
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  community: DifficultyKey;
  authorId: string;
  authorName: string;
  authorRole: 'parent' | 'doctor' | 'specialist';
  anonymous: boolean;
  text: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
  sample?: boolean;
}

interface DataState {
  bookings: Booking[];
  cases: DiagCase[];
  posts: Post[];
}

const KEY = 'yassarnalak:data:v1';
const day = 86400000;
const ago = (ms: number) => new Date(Date.now() - ms).toISOString();

const seedPosts = (): Post[] => [
{ id: 'p1', community: 'dyslexia', authorId: 'seed', authorName: 'ولي أمر', authorRole: 'parent', anonymous: false, sample: true, text: 'ابني عنده 8 سنين وبيخلط بين ب وت وث. بدأنا نقرا 10 دقايق كل يوم بصوت عالي وبنلعب لعبة تلوين الحروف. حد جرّب حاجة شبهها؟', createdAt: ago(2 * day), likes: [], comments: [{ id: 'c1', authorId: 'seed', authorName: 'ولي أمر', authorRole: 'parent', text: 'جربنا القراءة بإصبع بيتحرك تحت السطر وفرق معانا كتير.', createdAt: ago(day) }] },
{ id: 'p2', community: 'dyslexia', authorId: 'seed', authorName: 'ولي أمر', authorRole: 'parent', anonymous: true, sample: true, text: 'المدرسة طلبت تقرير رسمي عشان يدّوا بنتي وقت زيادة في الامتحان. الدكتور كتبلنا توصيات وده ساعدنا جدًا.', createdAt: ago(5 * day), likes: [], comments: [] },
{ id: 'p3', community: 'dysgraphia', authorId: 'seed', authorName: 'ولي أمر', authorRole: 'parent', anonymous: false, sample: true, text: 'خط ابني صعب يتقرأ وبيتعب بسرعة وهو بيكتب. حد استخدم مسكة قلم مخصوصة؟', createdAt: ago(3 * day), likes: [], comments: [] },
{ id: 'p4', community: 'dyscalculia', authorId: 'seed', authorName: 'ولي أمر', authorRole: 'parent', anonymous: false, sample: true, text: 'بنذاكر جدول الضرب بالأغاني والألوان بدل الحفظ. النتيجة أحسن من الورقة والقلم.', createdAt: ago(4 * day), likes: [], comments: [] },
{ id: 'p5', community: 'attention', authorId: 'seed', authorName: 'ولي أمر', authorRole: 'parent', anonymous: false, sample: true, text: 'قسمنا المذاكرة لفترات 15 دقيقة بينها استراحة قصيرة، وبقى تركيزه أفضل بكتير.', createdAt: ago(day), likes: [], comments: [] }];


function load(): DataState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw) as Partial<DataState>;
      return { bookings: p.bookings ?? [], cases: p.cases ?? [], posts: p.posts ?? seedPosts() };
    }
  } catch {
    /* ignore */
  }
  return { bookings: [], cases: [], posts: seedPosts() };
}

let state: DataState = load();
const listeners = new Set<() => void>();

function commit(next: DataState) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // quota exceeded (e.g. a large prescription): keep it in memory for this session
  }
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {listeners.delete(l);};
};
const uid = () => globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);

export function usePlatform() {
  return useSyncExternalStore(subscribe, () => state);
}

export const platform = {
  addBooking(b: Omit<Booking, 'id' | 'status' | 'createdAt'>): {ok: true;booking: Booking;} | {ok: false;error: string;} {
    const taken = state.bookings.some((x) => x.doctorId === b.doctorId && x.date === b.date && x.slot === b.slot && x.status !== 'cancelled');
    if (taken) return { ok: false, error: 'الميعاد ده اتحجز لتوّه. اختار ميعاد تاني.' };
    const dup = state.bookings.some((x) => x.parentId === b.parentId && x.childName === b.childName && x.doctorId === b.doctorId && x.status === 'confirmed');
    if (dup) return { ok: false, error: 'عندك حجز قائم مع الدكتور ده لنفس الطفل.' };
    const booking: Booking = { ...b, id: uid(), status: 'confirmed', createdAt: new Date().toISOString() };
    commit({ ...state, bookings: [...state.bookings, booking] });
    return { ok: true, booking };
  },
  cancelBooking(id: string) {
    commit({ ...state, bookings: state.bookings.map((b) => b.id === id && b.status === 'confirmed' ? { ...b, status: 'cancelled' } : b) });
  },
  createCase(input: Omit<DiagCase, 'id' | 'createdAt'>) {
    const c: DiagCase = { ...input, id: uid(), createdAt: new Date().toISOString() };
    commit({
      ...state,
      cases: [...state.cases, c],
      bookings: state.bookings.map((b) => b.id === input.bookingId ? { ...b, status: 'examined' } : b)
    });
    return c;
  },
  addPost(p: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments'>) {
    commit({ ...state, posts: [{ ...p, id: uid(), createdAt: new Date().toISOString(), likes: [], comments: [] }, ...state.posts] });
  },
  toggleLike(postId: string, userId: string) {
    commit({
      ...state,
      posts: state.posts.map((p) => p.id === postId ? { ...p, likes: p.likes.includes(userId) ? p.likes.filter((x) => x !== userId) : [...p.likes, userId] } : p)
    });
  },
  addComment(postId: string, c: Omit<Comment, 'id' | 'createdAt'>) {
    commit({
      ...state,
      posts: state.posts.map((p) => p.id === postId ? { ...p, comments: [...p.comments, { ...c, id: uid(), createdAt: new Date().toISOString() }] } : p)
    });
  }
};
