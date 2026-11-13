import React, { useState } from 'react';
import {
  AudioLinesIcon,
  BookOpenIcon,
  CheckIcon,
  EyeIcon,
  FocusIcon,
  HandIcon,
  InfoIcon,
  ListChecksIcon,
  PaletteIcon,
  ZapOffIcon } from
'lucide-react';
import { PresetId, presets } from './settings';
import { useA11y } from './AccessibilityProvider';

const icons: Record<PresetId, React.ReactNode> = {
  dyslexia: <BookOpenIcon className="h-5 w-5" aria-hidden="true" />,
  adhd: <FocusIcon className="h-5 w-5" aria-hidden="true" />,
  flash: <ZapOffIcon className="h-5 w-5" aria-hidden="true" />,
  lowVision: <EyeIcon className="h-5 w-5" aria-hidden="true" />,
  colorBlind: <PaletteIcon className="h-5 w-5" aria-hidden="true" />,
  motor: <HandIcon className="h-5 w-5" aria-hidden="true" />,
  simplify: <ListChecksIcon className="h-5 w-5" aria-hidden="true" />,
  screenReader: <AudioLinesIcon className="h-5 w-5" aria-hidden="true" />
};

export function PresetChips() {
  const { settings, togglePreset } = useA11y();
  const [infoFor, setInfoFor] = useState<PresetId | null>(null);
  const info = presets.find((p) => p.id === infoFor);

  return (
    <section aria-labelledby="a11y-who">
      <h3 id="a11y-who" className="text-xl font-bold text-white">من أنت؟</h3>
      <p className="mt-1 text-sm text-white/75">اضغط على اللي يناسبك، وتقدر تختار أكتر من واحد.</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {presets.map((p) => {
          const active = settings.presets.includes(p.id);
          return (
            <li
              key={p.id}
              className={`inline-flex items-center rounded-full border-2 transition-colors duration-200 ${
              active ? 'border-accent bg-accent text-ink' : 'border-white/25 bg-white/5 text-white hover:bg-white/10'}`
              }>
              
              <button
                type="button"
                aria-pressed={active}
                onClick={() => togglePreset(p.id)}
                className="inline-flex min-h-[48px] items-center gap-2 ps-4 pe-2 font-bold">
                
                {active ? <CheckIcon className="h-5 w-5" aria-hidden="true" /> : icons[p.id]}
                {p.label}
              </button>
              <button
                type="button"
                aria-label={`ما هو وضع ${p.label}؟`}
                aria-expanded={infoFor === p.id}
                onClick={() => setInfoFor(infoFor === p.id ? null : p.id)}
                className="me-1 flex h-10 w-10 items-center justify-center rounded-full opacity-80 hover:opacity-100">
                
                <InfoIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>);

        })}
      </ul>

      <p role="status" className="mt-3 min-h-[26px] text-sm text-white/85">
        {info && <><strong className="text-accent">{info.label}:</strong> {info.info}</>}
      </p>
    </section>);

}
