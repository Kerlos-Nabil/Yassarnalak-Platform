import React from 'react';
import { backgrounds, fontStacks, letterSpacingEm, lineHeights, textScale, wordSpacingEm } from './settings';
import { useA11y } from './AccessibilityProvider';

export function LivePreview() {
  const { settings: s } = useA11y();
  const bg = backgrounds.find((b) => b.id === s.background) ?? backgrounds[1];
  return (
    <div className="px-6 pb-4">
      <p className="mb-2 text-sm font-semibold text-white/75">معاينة مباشرة</p>
      <div
        className="max-h-[132px] overflow-hidden rounded-2xl border border-white/20 p-4"
        style={{
          background: bg.color,
          color: bg.ink,
          fontFamily: fontStacks[s.font],
          fontSize: `${16 * textScale[s.textSize]}px`,
          lineHeight: lineHeights[s.lineSpacing] ?? 1.7,
          letterSpacing: `${letterSpacingEm[s.letterSpacing]}em`,
          wordSpacing: `${wordSpacingEm[s.letterSpacing]}em`
        }}>
        
        <p>القراءة حق للجميع، ونحن هنا نيسّرها عليك.</p>
        <span className="mt-2 inline-flex min-h-[40px] items-center rounded-full bg-primary px-5 text-sm font-bold text-white">
          ابدأ الآن
        </span>
      </div>
    </div>);

}
