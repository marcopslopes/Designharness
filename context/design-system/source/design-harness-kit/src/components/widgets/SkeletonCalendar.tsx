import React from 'react';
import { Skel } from './SkeletonPrimitive';
export function SkeletonCalendar() {
  return (
    <div
      className="bg-paper rounded-2xl p-4"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}
      role="status"
      aria-busy="true"
      aria-label="Loading calendar">
      
      <div className="flex items-center justify-between mb-3">
        <Skel className="h-4 w-28" />
        <div className="flex gap-1.5">
          <Skel className="size-8" rounded="rounded-lg" />
          <Skel className="size-8" rounded="rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({
          length: 7
        }).map((_, i) =>
        <Skel key={`h-${i}`} className="h-2 w-full" />
        )}
        {Array.from({
          length: 35
        }).map((_, i) =>
        <Skel
          key={`d-${i}`}
          className="aspect-square w-full"
          rounded="rounded-lg" />

        )}
      </div>
    </div>);

}