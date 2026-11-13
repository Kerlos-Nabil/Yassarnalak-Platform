import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import {
  A11ySettings,
  PresetId,
  defaultSettings,
  letterSpacingEm,
  lineHeights,
  presets,
  speedRate,
  textScale,
  wordSpacingEm } from
'./settings';

const STORAGE_KEY = 'yassarnalak:a11y:v1';

interface Stored {
  settings: A11ySettings;
  bannerSeen: boolean;
}

interface A11yContextValue {
  settings: A11ySettings;
  update: <K extends keyof A11ySettings,>(key: K, value: A11ySettings[K]) => void;
  togglePreset: (id: PresetId) => void;
  reset: () => void;
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  bannerSeen: boolean;
  dismissBanner: () => void;
  speaking: boolean;
  speechMessage: string;
  toggleSpeech: () => void;
}

const A11yContext = createContext<A11yContextValue | null>(null);

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error('useA11y must be used inside <AccessibilityProvider>');
  return ctx;
}

function load(): Stored {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Stored>;
      return {
        settings: { ...defaultSettings, ...(parsed.settings ?? {}) },
        bannerSeen: Boolean(parsed.bannerSeen)
      };
    }
  } catch {
    /* storage unavailable */
  }
  return { settings: defaultSettings, bannerSeen: false };
}

function chunkText(text: string): string[] {
  const sentences = text.split(/(?<=[.!؟?۔])\s+/);
  const chunks: string[] = [];
  let current = '';
  for (const s of sentences) {
    if ((current + ' ' + s).length > 180 && current) {
      chunks.push(current);
      current = s;
    } else {
      current = current ? current + ' ' + s : s;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

export function AccessibilityProvider({ children }: {children: React.ReactNode;}) {
  const initial = useMemo(load, []);
  const [settings, setSettings] = useState<A11ySettings>(initial.settings);
  const [bannerSeen, setBannerSeen] = useState(initial.bannerSeen);
  const [panelOpen, setPanelOpen] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [speechMessage, setSpeechMessage] = useState('');
  const speakingRef = useRef(false);

  // persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ settings, bannerSeen }));
    } catch {
      /* ignore */
    }
  }, [settings, bannerSeen]);

  // apply settings to the document. At default values nothing is set, so the site looks as designed.
  useEffect(() => {
    const html = document.documentElement;
    const root = document.getElementById('root');
    const s = settings;

    html.dataset.a11yFont = s.font;
    html.dataset.a11yBg = s.background;
    html.toggleAttribute('data-a11y-calm', s.calm);
    html.toggleAttribute('data-a11y-keyboard', s.keyboard);

    const lh = lineHeights[s.lineSpacing];
    if (lh) html.style.setProperty('--a11y-lh', String(lh));else html.style.removeProperty('--a11y-lh');
    html.toggleAttribute('data-a11y-lh', Boolean(lh));

    html.style.setProperty('--a11y-ls', `${letterSpacingEm[s.letterSpacing]}em`);
    html.style.setProperty('--a11y-ws', `${wordSpacingEm[s.letterSpacing]}em`);
    html.toggleAttribute('data-a11y-ls', s.letterSpacing > 0);

    if (root) {
      const scale = textScale[s.textSize];
      if (scale === 1) root.style.removeProperty('zoom');else root.style.setProperty('zoom', String(scale));
    }

    const filters: string[] = [];
    if (s.colorBlind !== 'none') filters.push(`url(#a11y-${s.colorBlind})`);
    if (s.background === 'dark') filters.push('invert(1) hue-rotate(180deg)');
    if (filters.length) html.style.filter = filters.join(' ');else html.style.removeProperty('filter');
  }, [settings]);

  // unset everything if the provider ever unmounts
  useEffect(
    () => () => {
      const html = document.documentElement;
      ['a11yFont', 'a11yBg'].forEach((k) => delete html.dataset[k]);
      ['data-a11y-calm', 'data-a11y-keyboard', 'data-a11y-lh', 'data-a11y-ls'].forEach((a) => html.removeAttribute(a));
      html.style.removeProperty('filter');
      document.getElementById('root')?.style.removeProperty('zoom');
      window.speechSynthesis?.cancel();
    },
    []
  );

  const update: A11yContextValue['update'] = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const togglePreset = useCallback((id: PresetId) => {
    setSettings((prev) => {
      const preset = presets.find((p) => p.id === id);
      if (!preset) return prev;
      const next: A11ySettings = { ...prev };
      if (prev.presets.includes(id)) {
        next.presets = prev.presets.filter((p) => p !== id);
        const others = presets.filter((p) => next.presets.includes(p.id));
        (Object.keys(preset.patch) as (keyof typeof preset.patch)[]).forEach((key) => {
          const stillUsed = others.some((o) => key in o.patch);
          if (!stillUsed) (next as any)[key] = (defaultSettings as any)[key];
        });
      } else {
        next.presets = [...prev.presets, id];
        (Object.keys(preset.patch) as (keyof typeof preset.patch)[]).forEach((key) => {
          const value = preset.patch[key];
          const current = (prev as any)[key];
          (next as any)[key] = typeof value === 'number' && typeof current === 'number' ? Math.max(current, value) : value;
        });
      }
      return next;
    });
  }, []);

  const stopSpeech = useCallback(() => {
    window.speechSynthesis?.cancel();
    speakingRef.current = false;
    setSpeaking(false);
  }, []);

  const reset = useCallback(() => {
    stopSpeech();
    setSettings(defaultSettings);
    setSpeechMessage('');
  }, [stopSpeech]);

  const startSpeech = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth || typeof SpeechSynthesisUtterance === 'undefined') {
      setSpeechMessage('المتصفح ده مش بيدعم القراءة بصوت عالٍ.');
      return;
    }
    const source = document.querySelector('main') ?? document.getElementById('root');
    const text = (source as HTMLElement | null)?.innerText.replace(/\s+/g, ' ').trim();
    if (!text) {
      setSpeechMessage('مفيش نص في الصفحة لقراءته.');
      return;
    }
    synth.cancel();
    const voices = synth.getVoices();
    const arabic = voices.find((v) => v.lang.toLowerCase().startsWith('ar'));
    setSpeechMessage(arabic || voices.length === 0 ? '' : 'جهازك مفيهوش صوت عربي، ممكن النطق يبقى غير واضح.');

    const parts = chunkText(text);
    speakingRef.current = true;
    setSpeaking(true);
    parts.forEach((part, i) => {
      const u = new SpeechSynthesisUtterance(part);
      u.lang = arabic?.lang ?? 'ar-SA';
      if (arabic) u.voice = arabic;
      u.rate = speedRate[settings.speed];
      u.onend = () => {
        if (i === parts.length - 1) {
          speakingRef.current = false;
          setSpeaking(false);
        }
      };
      u.onerror = () => {
        if (speakingRef.current && i === parts.length - 1) {
          speakingRef.current = false;
          setSpeaking(false);
        }
      };
      synth.speak(u);
    });
  }, [settings.speed]);

  const toggleSpeech = useCallback(() => {
    if (speakingRef.current) stopSpeech();else startSpeech();
  }, [startSpeech, stopSpeech]);

  const dismissBanner = useCallback(() => setBannerSeen(true), []);

  const value: A11yContextValue = {
    settings,
    update,
    togglePreset,
    reset,
    panelOpen,
    openPanel: () => {
      setPanelOpen(true);
      setBannerSeen(true);
    },
    closePanel: () => setPanelOpen(false),
    bannerSeen,
    dismissBanner,
    speaking,
    speechMessage,
    toggleSpeech
  };

  return (
    <A11yContext.Provider value={value}>
      <MotionConfig reducedMotion={settings.calm ? 'always' : 'user'}>
        <a
          href="#main-content"
          onClick={(e) => {
            e.preventDefault();
            const main = document.querySelector('main') as HTMLElement | null;
            if (main) {
              main.setAttribute('tabindex', '-1');
              main.focus();
              main.scrollIntoView();
            }
          }}
          className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-6 focus:py-3 focus:font-bold focus:text-white">
          
          تخطّي إلى المحتوى
        </a>
        {children}
      </MotionConfig>
    </A11yContext.Provider>);

}
