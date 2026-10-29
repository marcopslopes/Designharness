import React from 'react';
export function RevenueHero() {
  return (
    <div
      className="bg-white rounded-2xl p-6"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}>
      
      <div className="mb-6">
        <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2">
          Revenue
        </p>
        <div className="flex items-baseline gap-2 mb-1">
          <h2 className="text-5xl font-bold text-ink tabular-nums">$0</h2>
        </div>
        <p className="text-sm text-muted flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-muted-soft" />
          <span className="tabular-nums">0% vs yesterday</span>
        </p>
      </div>

      {/* Clean line chart */}
      <div className="h-32 w-full">
        <svg
          viewBox="0 0 300 100"
          className="w-full h-full"
          preserveAspectRatio="none">
          
          <defs>
            <linearGradient
              id="revenueGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%">
              
              <stop offset="0%" stopColor="#218CAC" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#218CAC" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path
            d="M 0 100 L 0 70 Q 50 65, 100 55 T 200 45 L 250 50 Q 275 48, 300 40 L 300 100 Z"
            fill="url(#revenueGradient)" />
          

          {/* Line */}
          <path
            d="M 0 70 Q 50 65, 100 55 T 200 45 L 250 50 Q 275 48, 300 40"
            fill="none"
            stroke="#218CAC"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
          

          {/* Current value dot */}
          <circle
            cx="300"
            cy="40"
            r="4"
            fill="white"
            stroke="#218CAC"
            strokeWidth="2.5" />
          
        </svg>
      </div>
    </div>);

}