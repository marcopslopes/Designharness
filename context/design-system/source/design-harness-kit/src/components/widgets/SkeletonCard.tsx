import React from 'react';
import { Skel } from './SkeletonPrimitive';
export function SkeletonCard() {
  return (
    <div
      className="bg-paper rounded-2xl p-4 space-y-3.5"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}
      role="status"
      aria-busy="true"
      aria-label="Loading card">
      
      <div className="flex items-center justify-between">
        <Skel className="h-2.5 w-20" />
        <Skel className="h-6 w-14" rounded="rounded-lg" />
      </div>
      <Skel className="h-10 w-32" rounded="rounded-lg" />
      <div className="flex items-center gap-2">
        <Skel className="size-2.5" rounded="rounded-full" />
        <Skel className="h-2.5 flex-1" />
      </div>
      <Skel className="h-20 w-full" rounded="rounded-xl" />
      <div className="flex gap-2 pt-1">
        <Skel className="h-9 flex-1" rounded="rounded-xl" />
        <Skel className="h-9 flex-1" rounded="rounded-xl" />
      </div>
    </div>);

}