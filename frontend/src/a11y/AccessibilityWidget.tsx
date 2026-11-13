import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AccessibilityIcon, RotateCcwIcon, XIcon } from 'lucide-react';
import { useA11y } from './AccessibilityProvider';
import { correctionMatrix } from './settings';
import { LivePreview } from './LivePreview';
import { PresetChips } from './PresetChips';
import { Controls } from './Controls';
import { ReadAloud } from './ReadAloud';

const ease = [0.23, 1, 0.32, 1] as const;

function FilterDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        {(['protanopia', 'deuteranopia', 'tritanopia'] as const).map((id) =>
        <filter key={id} id={`a11y-${id}`} colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values={correctionMatrix(id)} />
          </filter>
        )}
      </defs>
    </svg>);

}

function ReadingRuler() {
  const [y, setY] = useState<number | null>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => setY(e.clientY);
    const touch = (e: TouchEvent) => setY(e.touches[0]?.clientY ?? null);
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', touch, { passive: true });
    window.addEventListener('touchstart', touch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', touch);
      window.removeEventListener('touchstart', touch);
    };
  }, []);
  if (y === null) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 z-[55] h-14 border-y-2 border-accent bg-accent/20"
      style={{ top: y - 28 }} />);


}

function Panel({ counter }: {counter: React.CSSProperties;}) {
  const { closePanel, reset } = useA11y();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const first = ref.current?.querySelector<HTMLElement>('button');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePanel();
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;
      const items = Array.from(
        ref.current.querySelectorAll<HTMLElement>('button, input, [href], [tabindex]:not([tabindex="-1"])')
      ).filter((el) => !el.hasAttribute('disabled'));
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [closePanel]);

  return (
    <>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={closePanel}
        aria-hidden="true"
        className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm" />
      
      <motion.aside
        key="panel"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-title"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.3, ease }}
        style={counter}
        className="fixed inset-y-0 left-0 z-[70] flex w-full max-w-[420px] flex-col bg-primary-dark text-white shadow-soft">
        
        <div className="flex items-start justify-between gap-3 px-6 pb-3 pt-6">
          <div>
            <h2 id="a11y-title" className="text-2xl font-bold">اجعل الموقع مناسبًا لك</h2>
            <p className="mt-1 text-sm text-white/75">اختر اللي يريحك، والتغيير بيظهر فورًا.</p>
          </div>
          <button
            type="button"
            onClick={closePanel}
            aria-label="إغلاق"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 hover:bg-white/10">
            
            <XIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 pb-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 font-bold text-accent hover:bg-white/10">
            
            <RotateCcwIcon className="h-4 w-4" aria-hidden="true" />
            إعادة ضبط
          </button>
        </div>

        <LivePreview />

        <div className="flex-1 space-y-9 overflow-y-auto border-t border-white/20 px-6 py-6">
          <PresetChips />
          <Controls />
        </div>

        <ReadAloud />
      </motion.aside>
    </>);

}

export function AccessibilityWidget() {
  const { settings, panelOpen, openPanel, bannerSeen, dismissBanner } = useA11y();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // When the page is inverted for dark mode, the widget is flipped back so it keeps its own look.
  const counter: React.CSSProperties =
  settings.background === 'dark' ? { filter: 'invert(1) hue-rotate(180deg)' } : {};

  const tabLabel = 'سهولة الوصول';

  return createPortal(
    <div dir="rtl" lang="ar" className="font-sans text-base">
      <FilterDefs />
      {settings.ruler && <div style={counter}><ReadingRuler /></div>}

      {/* entry: slim vertical tab on desktop */}
      <button
        type="button"
        onClick={openPanel}
        aria-label={tabLabel}
        aria-haspopup="dialog"
        style={counter}
        className="fixed left-0 top-1/2 z-50 hidden -translate-x-1.5 -translate-y-1/2 flex-col items-center gap-3 rounded-e-2xl bg-primary-dark px-2.5 py-5 text-white shadow-soft transition-transform duration-200 hover:translate-x-0 focus-visible:translate-x-0 md:flex">
        
        <AccessibilityIcon className="h-6 w-6 text-accent" aria-hidden="true" />
        <span aria-hidden="true" className="text-base font-bold [writing-mode:vertical-rl]">{tabLabel}</span>
      </button>

      {/* entry: small pill on mobile */}
      <button
        type="button"
        onClick={openPanel}
        aria-label={tabLabel}
        aria-haspopup="dialog"
        style={counter}
        className="fixed bottom-4 left-4 z-50 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary-dark px-4 font-bold text-white shadow-soft md:hidden">
        
        <AccessibilityIcon className="h-5 w-5 text-accent" aria-hidden="true" />
        {tabLabel}
      </button>

      {/* first visit banner */}
      <AnimatePresence>
        {!bannerSeen && !panelOpen &&
        <motion.div
          role="region"
          aria-label="تخصيص الموقع"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease }}
          style={counter}
          className="fixed inset-x-4 bottom-20 z-50 mx-auto flex max-w-[460px] flex-wrap items-center justify-between gap-3 rounded-card border border-line bg-surface p-4 shadow-soft md:bottom-6">
          
            <p className="font-bold text-ink">تحب نخصص لك الموقع؟</p>
            <div className="flex gap-2">
              <button type="button" onClick={openPanel} className="min-h-[48px] rounded-full bg-accent px-6 font-bold text-ink hover:bg-accent-hover">نعم</button>
              <button type="button" onClick={dismissBanner} className="min-h-[48px] rounded-full px-5 font-bold text-primary hover:bg-primary-light">لاحقًا</button>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <AnimatePresence>{panelOpen && <Panel counter={counter} />}</AnimatePresence>
    </div>,
    document.body);

}
