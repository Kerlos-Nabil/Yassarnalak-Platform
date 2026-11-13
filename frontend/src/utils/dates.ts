import type { Booking } from '../store/platform';
import type { Professional } from '../data/professionals';

const pad = (n: number) => String(n).padStart(2, '0');
export const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const longDate = (iso: string) =>
new Date(`${iso}T12:00:00`).toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' });

export const shortDate = (iso: string) =>
new Date(`${iso}T12:00:00`).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' });

export interface DaySlots {
  iso: string;
  label: string;
  slots: {time: string;taken: boolean;}[];
}

/** next working days (starting tomorrow) with each slot marked free or taken */
export function availableDays(pro: Professional, bookings: Booking[], count = 6): DaySlots[] {
  const out: DaySlots[] = [];
  const d = new Date();
  for (let i = 1; i <= 21 && out.length < count; i++) {
    const cur = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    if (!pro.workDays.includes(cur.getDay())) continue;
    const iso = toISO(cur);
    out.push({
      iso,
      label: longDate(iso),
      slots: pro.slots.map((time) => ({
        time,
        taken: bookings.some((b) => b.doctorId === pro.id && b.date === iso && b.slot === time && b.status !== 'cancelled')
      }))
    });
  }
  return out;
}

export function nextFreeSlot(pro: Professional, bookings: Booking[]): string | null {
  for (const day of availableDays(pro, bookings, 6)) {
    const free = day.slots.find((s) => !s.taken);
    if (free) return `${longDate(day.iso)} — ${free.time}`;
  }
  return null;
}

export function ageText(birth: string): string {
  const b = new Date(birth);
  if (Number.isNaN(b.getTime())) return '';
  const now = new Date();
  let months = (now.getFullYear() - b.getFullYear()) * 12 + (now.getMonth() - b.getMonth());
  if (now.getDate() < b.getDate()) months -= 1;
  months = Math.max(0, months);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const ar = (n: number) => String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
  if (years === 0) return `${ar(rest)} شهر`;
  const y = years === 1 ? 'سنة' : years === 2 ? 'سنتين' : years <= 10 ? `${ar(years)} سنوات` : `${ar(years)} سنة`;
  return rest ? `${y} و${ar(rest)} شهر` : y;
}
