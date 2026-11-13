import React from 'react';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import type { ChildCase } from '../../types/dashboard';
import { toArabicDigits } from '../../utils/numbers';

interface ProgressChartProps {
  child: ChildCase;
}

const tickStyle = { fill: '#565C66', fontSize: 13, fontFamily: 'Cairo' };

export function ProgressChart({ child }: ProgressChartProps) {
  const first = child.progress[0]?.score ?? 0;
  const last = child.progress[child.progress.length - 1]?.score ?? 0;
  const delta = last - first;
  const isUp = delta >= 0;

  return (
    <section aria-labelledby="chart-title" className="rounded-card border border-line bg-surface p-6 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="chart-title" className="text-xl font-bold text-ink">
            تقدّم «{child.nickname}» عبر الوقت
          </h2>
          <p className="text-sm text-ink-soft">متوسط الدرجة الأسبوعي في التمارين المكلّفة</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-ink">٪{toArabicDigits(last)}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-light px-3 py-1 text-sm font-bold text-primary">
            {isUp ? <TrendingUpIcon className="h-4 w-4" aria-hidden="true" /> : <TrendingDownIcon className="h-4 w-4" aria-hidden="true" />}
            {isUp ? '+' : '−'}
            {toArabicDigits(Math.abs(delta))} نقطة منذ البداية
          </span>
        </div>
      </div>

      <div className="mt-6 h-[260px]" role="img" aria-label={`رسم بياني لتقدّم ${child.nickname} من ${first}٪ إلى ${last}٪`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={child.progress} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid stroke="#E3E0D6" vertical={false} />
            <XAxis dataKey="label" reversed tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis
              orientation="right"
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={tickStyle}
              axisLine={false}
              tickLine={false}
              width={36}
              tickFormatter={(v: number) => toArabicDigits(v)} />
            
            <ReferenceLine
              y={80}
              stroke="#1F6F7C"
              strokeOpacity={0.4}
              strokeDasharray="6 6"
              label={{ value: 'هدف الإتقان', position: 'insideTopLeft', fill: '#1F6F7C', fontSize: 13, fontFamily: 'Cairo' }} />
            
            <Tooltip
              cursor={{ stroke: '#E3E0D6' }}
              contentStyle={{
                direction: 'rtl',
                borderRadius: 16,
                border: '1px solid #E3E0D6',
                fontFamily: 'Cairo',
                background: '#FFFDF9'
              }}
              formatter={(value: number) => [`٪${toArabicDigits(value)}`, 'الدرجة']} />
            
            <Line
              type="monotone"
              dataKey="score"
              stroke="#1F6F7C"
              strokeWidth={3}
              dot={{ r: 4, fill: '#FFFDF9', stroke: '#1F6F7C', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              animationDuration={300} />
            
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>);

}