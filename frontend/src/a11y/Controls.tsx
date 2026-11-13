import React from 'react';
import { CheckIcon, KeyboardIcon, RulerIcon, WindIcon } from 'lucide-react';
import {
  backgrounds,
  colorBlindOptions,
  fontStacks,
  letterSpacingEm,
  lineHeights,
  wordSpacingEm } from
'./settings';
import { useA11y } from './AccessibilityProvider';

const sectionTitle = 'text-base font-bold text-white';

function Slider({
  id,
  label,
  value,
  onChange,
  ends


}: {id: string;label: string;value: number;onChange: (v: number) => void;ends: React.ReactNode;}) {
  return (
    <div>
      <label htmlFor={id} className={sectionTitle}>{label}</label>
      <div className="mt-2 flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <input
            id={id}
            type="range"
            min={0}
            max={4}
            step={1}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            aria-valuetext={`المستوى ${value + 1} من 5`}
            className="h-10 w-full cursor-pointer accent-accent" />
          
        </div>
        {ends}
      </div>
    </div>);

}

function Toggle({
  label,
  hint,
  icon,
  checked,
  onChange





}: {label: string;hint: string;icon: React.ReactNode;checked: boolean;onChange: (v: boolean) => void;}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex min-h-[56px] w-full items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-start transition-colors duration-200 hover:bg-white/10">
      
      <span className="text-accent">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold text-white">{label}</span>
        <span className="block text-sm text-white/70">{hint}</span>
      </span>
      <span
        aria-hidden="true"
        className={`flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-colors duration-200 ${checked ? 'bg-accent' : 'bg-white/25'}`}>
        
        <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-white text-ink transition-transform duration-200 ${checked ? '-translate-x-6' : ''}`}>
          {checked && <CheckIcon className="h-4 w-4" />}
        </span>
      </span>
    </button>);

}

export function Controls() {
  const { settings: s, update } = useA11y();
  const gap = (i: number) => 5 + i * 3;

  return (
    <section aria-labelledby="a11y-custom" className="space-y-7">
      <h3 id="a11y-custom" className="text-xl font-bold text-white">خصّصها بنفسك</h3>

      <Slider
        id="a11y-size"
        label="حجم النص"
        value={s.textSize}
        onChange={(v) => update('textSize', v)}
        ends={
        <span aria-hidden="true" className="flex shrink-0 items-end gap-1 font-bold text-white/90">
            {[13, 16, 19, 23, 28].map((px, i) =>
          <span key={px} style={{ fontSize: px, lineHeight: 1 }} className={i === s.textSize ? 'text-accent' : ''}>أ</span>
          )}
          </span>
        } />
      

      <Slider
        id="a11y-lh"
        label="تباعد الأسطر"
        value={s.lineSpacing}
        onChange={(v) => update('lineSpacing', v)}
        ends={
        <svg width="44" height="40" viewBox="0 0 44 40" aria-hidden="true" className="shrink-0 text-accent">
            {[0, 1, 2].map((n) =>
          <line key={n} x1="4" x2="40" y1={20 + (n - 1) * gap(s.lineSpacing)} y2={20 + (n - 1) * gap(s.lineSpacing)} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          )}
          </svg>
        } />
      

      <Slider
        id="a11y-ls"
        label="تباعد الحروف والكلمات"
        value={s.letterSpacing}
        onChange={(v) => update('letterSpacing', v)}
        ends={
        <span
          aria-hidden="true"
          className="w-[72px] shrink-0 text-center text-sm font-bold text-accent"
          style={{ letterSpacing: `${letterSpacingEm[s.letterSpacing]}em`, wordSpacing: `${wordSpacingEm[s.letterSpacing]}em` }}>
          
            قراءة سهلة
          </span>
        } />
      

      <fieldset>
        <legend className={sectionTitle}>خط القراءة</legend>
        <div className="mt-2 grid grid-cols-3 gap-2" role="radiogroup" aria-label="خط القراءة">
          {([
          ['default', 'الافتراضي'],
          ['simple', 'مبسّط'],
          ['bold', 'عريض واضح']] as const).
          map(([id, label]) => {
            const on = s.font === id;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => update('font', id)}
                className={`flex min-h-[84px] flex-col items-center justify-center gap-1 rounded-2xl border-2 px-2 py-2 transition-colors duration-200 ${
                on ? 'border-accent bg-accent text-ink' : 'border-white/25 bg-white/5 text-white hover:bg-white/10'}`
                }>
                
                <span style={{ fontFamily: fontStacks[id], fontWeight: id === 'bold' ? 800 : 500 }} className="text-2xl leading-none">قراءة</span>
                <span className="text-sm font-bold">{label}</span>
              </button>);

          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={sectionTitle}>لون الخلفية</legend>
        <div className="mt-2 grid grid-cols-4 gap-2" role="radiogroup" aria-label="لون الخلفية">
          {backgrounds.map((b) => {
            const on = s.background === b.id;
            return (
              <button
                key={b.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => update('background', b.id)}
                className="flex min-h-[48px] flex-col items-center gap-1.5 rounded-2xl py-1 text-white hover:bg-white/5">
                
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 ${on ? 'border-accent ring-2 ring-accent/50' : 'border-white/40'}`}
                  style={{ background: b.color, color: b.ink }}>
                  
                  {on && <CheckIcon className="h-5 w-5" aria-hidden="true" />}
                </span>
                <span className="text-sm font-bold">{b.label}</span>
              </button>);

          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={sectionTitle}>عمى الألوان</legend>
        <div className="mt-2 grid grid-cols-4 gap-1 rounded-full border border-white/25 bg-white/5 p-1" role="radiogroup" aria-label="نوع عمى الألوان">
          {colorBlindOptions.map((o) => {
            const on = s.colorBlind === o.id;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => update('colorBlind', o.id)}
                className={`min-h-[44px] rounded-full px-1 text-[14px] font-bold transition-colors duration-200 ${on ? 'bg-accent text-ink' : 'text-white hover:bg-white/10'}`}>
                
                {o.label}
              </button>);

          })}
        </div>
      </fieldset>

      <div className="space-y-2">
        <Toggle label="شريط القراءة" hint="شريط بيتحرك مع الماوس أو إصبعك" icon={<RulerIcon className="h-6 w-6" aria-hidden="true" />} checked={s.ruler} onChange={(v) => update('ruler', v)} />
        <Toggle label="إيقاف الحركة والوميض" hint="من غير أي حركة في الموقع" icon={<WindIcon className="h-6 w-6" aria-hidden="true" />} checked={s.calm} onChange={(v) => update('calm', v)} />
        <Toggle label="تصفح بلوحة المفاتيح" hint="إطار تركيز أوضح عند التنقل" icon={<KeyboardIcon className="h-6 w-6" aria-hidden="true" />} checked={s.keyboard} onChange={(v) => update('keyboard', v)} />
      </div>
    </section>);

}
