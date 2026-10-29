import React, { useState, useRef } from 'react';
import { EyeIcon, ChevronRightIcon } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, Cell } from 'recharts';
interface StoryCardConfig {
  label: string;
  value: string;
  delta: string;
  data: number[];
  tone: 'purple' | 'teal' | 'success';
}
const stories: StoryCardConfig[] = [
{
  label: 'Rebook Rate',
  value: '61%',
  delta: '↑ 4%',
  data: [45, 52, 48, 55, 58, 61],
  tone: 'purple'
},
{
  label: 'New Clients',
  value: '+12',
  delta: '↑ 2',
  data: [4, 7, 5, 8, 10, 12],
  tone: 'teal'
},
{
  label: 'Avg. Ticket',
  value: '$128',
  delta: '↑ $5',
  data: [110, 115, 118, 122, 125, 128],
  tone: 'success'
}];

const toneStyles = {
  purple: {
    bg: 'bg-purple/10',
    text: 'text-purple',
    delta: 'bg-purple/15 text-purple',
    bar: '#731CD8',
    barMuted: '#D6BCFA'
  },
  teal: {
    bg: 'bg-teal-soft',
    text: 'text-teal',
    delta: 'bg-teal/10 text-teal',
    bar: '#218CAC',
    barMuted: '#BEE3F0'
  },
  success: {
    bg: 'bg-success-soft',
    text: 'text-success',
    delta: 'bg-success/15 text-success',
    bar: '#00A34B',
    barMuted: '#A7E5BD'
  }
} as const;
export function StatsStoriesCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const index = Math.round(target.scrollLeft / target.clientWidth);
    setActiveIndex(index);
  };
  return (
    <div
      className="bg-white rounded-2xl p-5 overflow-hidden"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}>
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-ink">May Sale items</h2>
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <EyeIcon className="w-3.5 h-3.5" strokeWidth={2} /> Only you
        </div>
      </div>

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-4 gap-3"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
        
        {stories.map((s, i) => {
          const tone = toneStyles[s.tone];
          const chartData = s.data.map((value) => ({
            value
          }));
          return (
            <div
              key={i}
              className={`min-w-[85%] snap-center ${tone.bg} rounded-xl p-4`}>
              
              <div className={`text-sm font-semibold ${tone.text} mb-1`}>
                {s.label}
              </div>
              <div className="flex items-end gap-2 mb-4">
                <div className={`text-3xl font-bold ${tone.text} tabular-nums`}>
                  {s.value}
                </div>
                <div
                  className={`text-[11px] font-semibold px-1.5 py-0.5 rounded mb-1 tabular-nums ${tone.delta}`}>
                  
                  {s.delta}
                </div>
              </div>
              <div className="h-16 w-full" aria-hidden="true">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                      {chartData.map((_, idx) =>
                      <Cell
                        key={idx}
                        fill={
                        idx === chartData.length - 1 ?
                        tone.bar :
                        tone.barMuted
                        } />

                      )}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>);

        })}
      </div>

      <div
        className="flex justify-center gap-1.5 mb-4"
        role="tablist"
        aria-label="Highlight slides">
        
        {stories.map((_, i) =>
        <span
          key={i}
          aria-current={activeIndex === i}
          className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${activeIndex === i ? 'w-4 bg-purple' : 'w-1.5 bg-line'}`} />

        )}
      </div>

      <button
        className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-ink transition-colors py-2 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 rounded-lg"
        type="button">
        
        See full stats <ChevronRightIcon className="w-4 h-4" />
      </button>
    </div>);

}