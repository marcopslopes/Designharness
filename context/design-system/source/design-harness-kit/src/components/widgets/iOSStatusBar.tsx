import React from 'react';
import { SignalHighIcon, WifiIcon, BatteryFullIcon } from 'lucide-react';
// Shared faux iOS status bar — used as a mini chrome strip above
// each header widget so they read as proper iOS native fragments.
export function IOSStatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-2 pb-1 text-ink">
      <span className="text-[13px] font-semibold tabular-nums tracking-tight">
        9:41
      </span>
      <div className="flex items-center gap-1.5">
        <SignalHighIcon className="size-[14px]" strokeWidth={2.5} />
        <WifiIcon className="size-[13px]" strokeWidth={2.5} />
        <BatteryFullIcon className="size-[16px]" strokeWidth={2} />
      </div>
    </div>);

}