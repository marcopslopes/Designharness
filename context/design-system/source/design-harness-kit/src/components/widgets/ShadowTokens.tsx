import React from 'react';
import { motion } from 'framer-motion';
// ─────────────────────────────────────────────────────────────
// Depth & shadow
//
// Three tiers plus glass. Light mode uses soft, low-spread
// shadows. Dark mode swaps in tonal stacking + an inset
// top-edge highlight — the signature lifted-on-dark look.
// All tiers reference --shadow-card / --shadow-card-strong /
// --edge-raised tokens so they flip with the theme.
// ─────────────────────────────────────────────────────────────
type Tier = {
  name: string;
  token: string;
  role: string;
  className: string;
  style?: React.CSSProperties;
  glass?: boolean;
};
const tiers: Tier[] = [
{
  name: 'Flat',
  token: '--shadow-0',
  role: 'Recessed wells · in-grid tiles',
  className: 'bg-sunken'
},
{
  name: 'Shadow 1',
  token: '--shadow-card',
  role: 'Cards · default chrome',
  className: 'bg-paper',
  style: {
    boxShadow: 'var(--shadow-card)'
  }
},
{
  name: 'Shadow 2',
  token: '--shadow-card-strong',
  role: 'Sheets · popovers · floating',
  className: 'bg-paper',
  style: {
    boxShadow: 'var(--shadow-card-strong)'
  }
},
{
  name: 'Glass',
  token: 'blur 28 / sat 180',
  role: 'Tab bar · iOS sheets · scrims',
  className:
  'bg-paper/55 backdrop-blur-[28px] backdrop-saturate-[1.8] border border-paper/40',
  style: {
    boxShadow: 'var(--edge-raised), var(--shadow-card)'
  },
  glass: true
}];

function ShadowCard({ tier }: {tier: Tier;}) {
  return (
    <div
      className={
      'relative rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[200px] ' +
      tier.className
      }
      style={tier.style}>
      
      {/* Subtle gradient backdrop for glass tile so the blur is visible */}
      {tier.glass &&
      <div
        aria-hidden
        className="absolute inset-2 -z-10 rounded-2xl"
        style={{
          background:
          'linear-gradient(135deg, rgba(11,163,173,0.22) 0%, rgba(79,55,145,0.20) 100%)',
          filter: 'blur(20px)'
        }} />

      }
      <div className="text-[15px] font-bold text-ink leading-tight">
        {tier.name}
      </div>
      <div className="mt-2 text-[12px] font-mono tracking-wider text-ink-50">
        {tier.token}
      </div>
      <div className="mt-3 text-[12.5px] text-ink-50 leading-snug">
        {tier.role}
      </div>
    </div>);

}
export function ShadowTokens() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        margin: '-80px'
      }}
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.6
      }}
      className="w-full">
      
      {/* Header */}
      <div className="max-w-2xl mb-10 md:mb-14">
        <h3 className="text-3xl md:text-4xl font-bold text-ink tracking-tight text-pretty leading-tight">
          Depth &amp; <span className="italic font-bold text-teal">shadow</span>
          .
        </h3>
        <p className="mt-4 text-[15px] md:text-base text-ink-50 leading-relaxed text-pretty">
          Three tiers plus glass. Light mode uses soft, low-spread shadows. Dark
          mode swaps in tonal stacking and a top-edge highlight — the signature
          lifted-on-dark look.
        </p>
      </div>

      {/* Tiers — container uses sunken canvas with a faint brand wash */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 md:p-10 rounded-3xl bg-sunken"
        style={{
          backgroundImage:
          'radial-gradient(ellipse at top left, rgba(11,163,173,0.06), transparent 60%), radial-gradient(ellipse at bottom right, rgba(79,55,145,0.05), transparent 60%)'
        }}>
        
        {tiers.map((tier) =>
        <ShadowCard key={tier.name} tier={tier} />
        )}
      </div>
    </motion.div>);

}