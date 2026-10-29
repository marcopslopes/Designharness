import React from 'react';
import { Skel } from './SkeletonPrimitive';
export function SkeletonList() {
  return (
    <div
      className="bg-paper rounded-2xl p-4 space-y-4"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}
      role="status"
      aria-busy="true"
      aria-label="Loading list">
      
      {[0, 1, 2, 3].map((i) =>
      <div key={i} className="flex items-center gap-3">
          <Skel className="size-10" rounded="rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skel className="h-3 w-2/3" />
            <Skel className="h-2.5 w-1/2" />
          </div>
          <Skel className="size-7" rounded="rounded-lg" />
        </div>
      )}
    </div>);

}