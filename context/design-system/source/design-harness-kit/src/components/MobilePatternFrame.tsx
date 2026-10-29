import React from 'react';
// ─────────────────────────────────────────────────────────────
// MobilePatternFrame
//
// Lightweight "phone-screen" wrapper for individual mobile
// patterns shown in the widget showcase. Gives each pattern
// a clear iPhone-screen context — rounded top, canvas surface,
// status bar hint, home indicator — without becoming a full
// device bezel. Position controls where the pattern sits:
//
//   top    → headers, sticky bars
//   bottom → bottom sheets, tab bars
//   center → free-standing fragments (default)
// ─────────────────────────────────────────────────────────────
type Position = 'top' | 'bottom' | 'center';
export function MobilePatternFrame({
  children,
  position = 'top',
  showStatusBar = true,
  showHomeIndicator = true,
  height = 460






}: {children: React.ReactNode;position?: Position;showStatusBar?: boolean;showHomeIndicator?: boolean;height?: number;}) {
  const justify =
  position === 'top' ?
  'justify-start' :
  position === 'bottom' ?
  'justify-end' :
  'justify-center';
  return (
    <div
      className="relative w-full max-w-[360px] mx-auto rounded-[36px] overflow-hidden bg-canvas border border-line"
      style={{
        height,
        boxShadow:
        '0 1px 2px rgba(20,22,26,0.04), 0 12px 32px -12px rgba(20,22,26,0.10)'
      }}>
      
      {/* Status bar */}
      {showStatusBar &&
      <div className="absolute top-0 left-0 right-0 z-10 h-9 px-6 flex items-center justify-between text-[12px] font-semibold text-ink">
          <span className="tabular-nums">9:41</span>
          <div className="flex items-center gap-1.5">
            {/* Signal */}
            <svg
            className="w-3.5 h-2.5"
            viewBox="0 0 16 12"
            fill="currentColor">
            
              <rect x="0.5" y="7" width="2.5" height="4.5" rx="0.5" />
              <rect x="4.5" y="4.5" width="2.5" height="7" rx="0.5" />
              <rect x="8.5" y="2" width="2.5" height="9.5" rx="0.5" />
              <rect x="12.5" y="0" width="2.5" height="11.5" rx="0.5" />
            </svg>
            {/* Wi-Fi */}
            <svg
            className="w-3.5 h-3"
            viewBox="0 0 14 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4">
            
              <path d="M1 4.5C2.5 2.5 11.5 2.5 13 4.5" />
              <path d="M3 6.5C4 5.2 10 5.2 11 6.5" />
              <path d="M5 8.2C5.7 7.4 8.3 7.4 9 8.2" />
            </svg>
            {/* Battery */}
            <svg
            className="w-5 h-2.5"
            viewBox="0 0 24 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2">
            
              <rect x="0.7" y="0.7" width="20" height="10.6" rx="2.5" />
              <rect
              x="2"
              y="2"
              width="16"
              height="8"
              rx="1.2"
              fill="currentColor" />
            
              <rect
              x="21.5"
              y="3.8"
              width="1.5"
              height="4.4"
              rx="0.5"
              fill="currentColor" />
            
            </svg>
          </div>
        </div>
      }

      {/* Content area */}
      <div
        className={`relative w-full h-full flex flex-col ${justify} ${showStatusBar ? 'pt-9' : ''} ${showHomeIndicator ? 'pb-6' : ''}`}>
        
        <div className="px-3 w-full">{children}</div>
      </div>

      {/* Home indicator */}
      {showHomeIndicator &&
      <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[120px] h-[5px] rounded-full bg-ink/40" />
      }
    </div>);

}