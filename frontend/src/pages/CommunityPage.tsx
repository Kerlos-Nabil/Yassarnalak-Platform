import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRightIcon, BadgeCheckIcon, HeartIcon, LockIcon, MessageCircleIcon, SendIcon } from 'lucide-react';
import { AccountHeader } from '../components/account/AccountHeader';
import { Button } from '../components/ui/Button';
import { inputClass } from '../components/signup/Field';
import { User, useAuth } from '../auth/AuthContext';
import { conditions } from '../data/conditions';
import { Post, platform, usePlatform } from '../store/platform';
import { toArabicDigits } from '../utils/numbers';

const card = 'rounded-card border border-line bg-surface p-6 shadow-soft';

const when = (iso: string) => new Date(iso).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' });

function displayName(user: User, anonymous: boolean) {
  if (user.role === 'parent') return anonymous ? 'ولي أمر مجهول' : user.name.split(' ')[0];
  return `${user.role === 'doctor' ? 'د. ' : 'أ. '}${user.name.split(' ')[0]}`;
}

function Author({ name, role }: {name: string;role: Post['authorRole'];}) {
  return (
    <span className="inline-flex items-center gap-2 font-bold text-ink">
      <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">{name.replace(/^(د\.|أ\.)\s*/, '').charAt(0)}</span>
      {name}
      {role !== 'parent' &&
      <span className="inline-flex items-center gap-1 rounded-full bg-success-tint px-2 text-sm font-bold text-success-ink">
          <BadgeCheckIcon className="h-4 w-4" aria-hidden="true" />
          {role === 'doctor' ? 'دكتور موثّق' : 'أخصائي موثّق'}
        </span>
      }
    </span>);

}

function PostCard({ post, user, canComment }: {post: Post;user: User;canComment: boolean;}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [err, setErr] = useState('');
  const liked = post.likes.includes(user.id);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (t.length < 2) return setErr('اكتب تعليق');
    if (t.length > 500) return setErr('التعليق أطول من 500 حرف');
    platform.addComment(post.id, { authorId: user.id, authorName: displayName(user, false), authorRole: user.role, text: t });
    setText('');
    setErr('');
  };

  return (
    <li className={card}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Author name={post.authorName} role={post.authorRole} />
        <span className="text-sm text-ink-soft">{when(post.createdAt)}{post.sample && ' · منشور تجريبي'}</span>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-ink">{post.text}</p>
      <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
        <button type="button" aria-pressed={liked} onClick={() => platform.toggleLike(post.id, user.id)}
        className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 font-bold transition-colors duration-200 ${liked ? 'bg-error-tint text-error' : 'text-ink-soft hover:bg-primary-light hover:text-primary'}`}>
          <HeartIcon className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} aria-hidden="true" />
          {toArabicDigits(post.likes.length)}
          <span className="sr-only">إعجاب</span>
        </button>
        <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 font-bold text-ink-soft transition-colors duration-200 hover:bg-primary-light hover:text-primary">
          <MessageCircleIcon className="h-5 w-5" aria-hidden="true" />
          {toArabicDigits(post.comments.length)} تعليق
        </button>
      </div>

      {open &&
      <div className="mt-3 space-y-3">
          {post.comments.map((c) =>
        <div key={c.id} className="rounded-2xl bg-cream/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Author name={c.authorName} role={c.authorRole} />
                <span className="text-sm text-ink-soft">{when(c.createdAt)}</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-ink-soft">{c.text}</p>
            </div>
        )}
          {canComment ?
        <form onSubmit={send} noValidate className="flex flex-wrap items-start gap-2">
              <div className="min-w-0 flex-1">
                <label htmlFor={`c-${post.id}`} className="sr-only">اكتب تعليقًا</label>
                <input id={`c-${post.id}`} className={inputClass} value={text} onChange={(e) => {setText(e.target.value);setErr('');}} placeholder="اكتب تعليقًا…" />
                {err && <p role="alert" className="mt-1 text-sm font-semibold text-error">{err}</p>}
              </div>
              <Button type="submit" variant="primary"><SendIcon aria-hidden="true" />إرسال</Button>
            </form> :

        <p className="flex items-center gap-2 text-sm text-ink-soft"><LockIcon className="h-4 w-4" aria-hidden="true" />التعليق متاح لأعضاء المجتمع بعد تأكيد التشخيص.</p>
        }
        </div>
      }
    </li>);

}

export function CommunityPage() {
  const { key = '' } = useParams();
  const { user } = useAuth();
  const { posts, cases } = usePlatform();
  const community = conditions.find((c) => c.key === key);

  const [text, setText] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [err, setErr] = useState('');

  if (!community) return <Navigate to="/community" replace />;
  if (!user) return null;

  const isMember = user.role === 'parent' && cases.some((c) => c.parentId === user.id && c.confirmed && c.condition === community.key);
  const isPro = user.role !== 'parent';
  const canComment = isMember || isPro;
  const list = posts.filter((p) => p.community === community.key).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const Icon = community.icon;

  const publish = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (t.length < 10) return setErr('اكتب 10 حروف على الأقل');
    if (t.length > 1000) return setErr('المنشور أطول من 1000 حرف');
    platform.addPost({ community: community.key, authorId: user.id, authorName: displayName(user, anonymous), authorRole: user.role, anonymous, text: t });
    setText('');
    setErr('');
  };

  return (
    <div className="min-h-screen w-full bg-cream">
      <AccountHeader />
      <main className="mx-auto max-w-[760px] px-6 py-10">
        <Link to="/community" className="inline-flex min-h-[44px] items-center gap-2 font-bold text-primary hover:underline">
          <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          كل المجتمعات
        </Link>

        <header className="mt-3 flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary"><Icon className="h-8 w-8" aria-hidden="true" /></span>
          <div>
            <h1 className="text-3xl font-bold text-ink">مجتمع {community.label}</h1>
            <p className="text-ink-soft">{community.blurb}</p>
          </div>
        </header>

        <p className="mt-5 rounded-2xl border border-line bg-surface p-4 text-sm text-ink-soft">التجارب المشتركة مش بديل عن تقييم متخصص. ما تكتبش اسم طفلك أو أي بيانات شخصية.</p>

        <section aria-label="منشور جديد" className={`${card} mt-6`}>
          {isMember ?
          <form onSubmit={publish} noValidate>
              <label htmlFor="new-post" className="font-bold text-ink">شاركنا سؤالك أو تجربتك</label>
              <textarea id="new-post" className={`${inputClass} mt-2 min-h-[110px] py-3`} value={text} onChange={(e) => {setText(e.target.value);setErr('');}} />
              {err && <p role="alert" className="mt-1.5 text-sm font-semibold text-error">{err}</p>}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-ink-soft">
                  <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="h-5 w-5 accent-primary" />
                  انشر باسم مجهول
                </label>
                <Button type="submit" variant="accent"><SendIcon aria-hidden="true" />نشر</Button>
              </div>
            </form> :
          isPro ?
          <p className="text-ink-soft">تقدر تعلّق على المنشورات كمتخصص موثّق وتساعد الأهالي.</p> :

          <div className="flex items-start gap-3 text-ink-soft">
              <LockIcon className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-bold text-ink">النشر والتعليق لأعضاء المجتمع</p>
                <p>بتنضم أوتوماتيك بعد ما الدكتور يؤكد تشخيص طفلك بـ{community.label}. تقدر تقرا المنشورات من دلوقتي.</p>
                <Button to="/doctors" variant="secondary" className="mt-3">احجز كشف</Button>
              </div>
            </div>
          }
        </section>

        {list.length === 0 ?
        <p className="mt-8 text-center text-ink-soft">مفيش منشورات لسه. كون أول واحد يشارك.</p> :

        <ul className="mt-6 space-y-5">
            {list.map((p) => <PostCard key={p.id} post={p} user={user} canComment={canComment} />)}
          </ul>
        }
      </main>
    </div>);

}
