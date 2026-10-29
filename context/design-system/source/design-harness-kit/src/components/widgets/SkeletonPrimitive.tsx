import React from 'react';
import { motion } from 'framer-motion';
// Atomic shimmer block — exported for use across skeleton widgets.
export function Skel({
  className = '',
  rounded = 'rounded-md'



}: {className?: string;rounded?: string;}) {
  return (
    <div
      className={`relative overflow-hidden bg-sunken ${rounded} ${className}`}
      aria-hidden="true">
      
      <motion.div
        className="absolute inset-0"
        style={{
          background:
          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)'
        }}
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: 'linear'
        }} />
      
    </div>);

}
// Showcase of the primitive in 4 shapes: bar, square, circle, pill.
export function SkeletonPrimitive() {
  return (
    <div
      className="bg-paper rounded-2xl p-5"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Skel className="h-3 w-3/4" />
          <Skel className="h-3 w-1/2" />
          <Skel className="h-3 w-2/3" />
        </div>
        <div className="h-px bg-line" />
        <div className="flex items-center gap-4">
          <Skel className="size-12" rounded="rounded-full" />
          <Skel className="size-12" rounded="rounded-2xl" />
          <Skel className="h-10 w-24" rounded="rounded-xl" />
          <Skel className="h-6 w-16" rounded="rounded-lg" />
        </div>
      </div>
    </div>);

}