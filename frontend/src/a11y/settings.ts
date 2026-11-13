export type PresetId =
'dyslexia' | 'adhd' | 'flash' | 'lowVision' | 'colorBlind' | 'motor' | 'simplify' | 'screenReader';
export type FontId = 'default' | 'simple' | 'bold';
export type BgId = 'cream' | 'white' | 'gray' | 'dark';
export type CbId = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
export type SpeedId = 'slow' | 'normal' | 'fast';

export interface A11ySettings {
  presets: PresetId[];
  textSize: number; // 0-4
  lineSpacing: number; // 0-4
  letterSpacing: number; // 0-4
  font: FontId;
  background: BgId;
  colorBlind: CbId;
  ruler: boolean;
  calm: boolean;
  keyboard: boolean;
  speed: SpeedId;
}

export const defaultSettings: A11ySettings = {
  presets: [],
  textSize: 0,
  lineSpacing: 0,
  letterSpacing: 0,
  font: 'default',
  background: 'cream',
  colorBlind: 'none',
  ruler: false,
  calm: false,
  keyboard: false,
  speed: 'normal'
};

type Patch = Partial<Omit<A11ySettings, 'presets' | 'speed'>>;

export interface Preset {
  id: PresetId;
  label: string;
  info: string;
  patch: Patch;
}

export const presets: Preset[] = [
{ id: 'dyslexia', label: 'صعوبات القراءة', info: 'خط واضح، تباعد أكبر بين الأسطر والكلمات، وشريط يساعدك تتابع السطر.', patch: { font: 'simple', lineSpacing: 3, letterSpacing: 2, ruler: true } },
{ id: 'adhd', label: 'تشتت الانتباه', info: 'بيوقف الحركة، وبيضيف شريط قراءة يركّزك على سطر واحد.', patch: { calm: true, ruler: true, lineSpacing: 2 } },
{ id: 'flash', label: 'حساسية الوميض', info: 'بيوقف كل الحركة والانتقالات والوميض في الموقع.', patch: { calm: true } },
{ id: 'lowVision', label: 'ضعف البصر', info: 'نص أكبر بشكل واضح وخط عريض أسهل في التمييز.', patch: { textSize: 3, font: 'bold', lineSpacing: 1 } },
{ id: 'colorBlind', label: 'عمى الألوان', info: 'بيعدّل الألوان عشان تفرّق بينها أسهل. تقدر تختار النوع من الأسفل.', patch: { colorBlind: 'deuteranopia' } },
{ id: 'motor', label: 'صعوبة الحركة', info: 'تصفّح بالكيبورد مع إطار تركيز واضح، ونص أكبر شوية.', patch: { keyboard: true, textSize: 1 } },
{ id: 'simplify', label: 'تبسيط المحتوى', info: 'خط مبسّط، نص أكبر، وتباعد مريح من غير حركة.', patch: { font: 'simple', textSize: 1, lineSpacing: 3, calm: true } },
{ id: 'screenReader', label: 'قارئ الشاشة', info: 'بيجهّز الموقع للكيبورد وقارئات الشاشة، وتقدر تسمع الصفحة من زر القراءة.', patch: { keyboard: true, calm: true } }];


export const textScale = [1, 1.1, 1.2, 1.35, 1.5];
export const lineHeights = [null, 2, 2.2, 2.5, 2.8] as const;
export const letterSpacingEm = [0, 0.02, 0.04, 0.06, 0.08];
export const wordSpacingEm = [0, 0.08, 0.16, 0.24, 0.32];

export const fontStacks: Record<FontId, string> = {
  default: "'Cairo', 'IBM Plex Sans Arabic', system-ui, sans-serif",
  simple: "'Readex Pro', 'Cairo', system-ui, sans-serif",
  bold: "'Tajawal', 'Cairo', system-ui, sans-serif"
};

export const backgrounds: { id: BgId; label: string; color: string; ink: string }[] = [
{ id: 'white', label: 'أبيض', color: '#FFFFFF', ink: '#2B2F36' },
{ id: 'cream', label: 'كريمي', color: '#FAF7F0', ink: '#2B2F36' },
{ id: 'gray', label: 'رمادي هادئ', color: '#ECEEF0', ink: '#2B2F36' },
{ id: 'dark', label: 'داكن', color: '#1E2227', ink: '#F1EEE6' }];


export const colorBlindOptions: { id: CbId; label: string }[] = [
{ id: 'none', label: 'بدون' },
{ id: 'protanopia', label: 'بروتانوبيا' },
{ id: 'deuteranopia', label: 'ديوتيرانوبيا' },
{ id: 'tritanopia', label: 'تريتانوبيا' }];


type M3 = number[][];
const I: M3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

// Approximate colour-vision simulation matrices.
const SIM: Record<Exclude<CbId, 'none'>, M3> = {
  protanopia: [[0.567, 0.433, 0], [0.558, 0.442, 0], [0, 0.242, 0.758]],
  deuteranopia: [[0.625, 0.375, 0], [0.7, 0.3, 0], [0, 0.3, 0.7]],
  tritanopia: [[0.95, 0.05, 0], [0, 0.433, 0.567], [0, 0.475, 0.525]]
};
// Where the colour information a viewer cannot see is pushed to (daltonisation).
const SHIFT: Record<Exclude<CbId, 'none'>, M3> = {
  protanopia: [[0, 0, 0], [0.7, 1, 0], [0.7, 0, 1]],
  deuteranopia: [[0, 0, 0], [0.7, 1, 0], [0.7, 0, 1]],
  tritanopia: [[1, 0, 0.7], [0, 1, 0.7], [0, 0, 0]]
};

const mul = (A: M3, B: M3): M3 =>
A.map((row) => [0, 1, 2].map((c) => row.reduce((s, v, k) => s + v * B[k][c], 0)));

/** corrected = x + M * (x - S*x)  =>  (I + M (I - S)) x */
export function correctionMatrix(id: Exclude<CbId, 'none'>): string {
  const S = SIM[id];
  const IminusS = I.map((row, r) => row.map((v, c) => v - S[r][c]));
  const MS = mul(SHIFT[id], IminusS);
  const C = I.map((row, r) => row.map((v, c) => v + MS[r][c]));
  const f = (n: number) => n.toFixed(4);
  return [
  ...C[0].map(f), '0', '0',
  ...C[1].map(f), '0', '0',
  ...C[2].map(f), '0', '0',
  '0', '0', '0', '1', '0'].
  join(' ');
}

export const speedRate: Record<SpeedId, number> = { slow: 0.75, normal: 1, fast: 1.25 };
export const speedOptions: { id: SpeedId; label: string }[] = [
{ id: 'slow', label: 'بطيء' },
{ id: 'normal', label: 'عادي' },
{ id: 'fast', label: 'سريع' }];

