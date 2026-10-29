import React from 'react';
import { motion } from 'framer-motion';
// ─────────────────────────────────────────────────────────────
// Token reference
//
// The same Influencer card rendered in three theme modes side
// by side, with the token map underneath each. A cheat sheet
// for how surface/fg/border/action/feedback tokens resolve
// across light, dark, and high-contrast.
// ─────────────────────────────────────────────────────────────
type Mode = {
  key: 'light' | 'dark' | 'hc';
  label: string;
  metaKey: string;
  metaValue: string;
  // Card chrome
  cardBg: string;
  cardBorder: string;
  eyebrow: string;
  eyebrowItalic: string;
  title: string;
  italic: string;
  body: string;
  // Buttons
  primaryBg: string;
  primaryFg: string;
  primaryExtra?: string;
  tintedBg: string;
  tintedFg: string;
  tintedExtra?: string;
  // Tokens list
  panelBg: string;
  panelFg: string;
  panelMuted: string;
  swatchBorder: string;
  rowBorder: string;
  tokens: TokenRow[];
};
type TokenRow = {
  name: string;
  value: string;
  swatchBg: string;
  swatchStyle?: React.CSSProperties;
};
const modes: Mode[] = [
// ───────── Light ─────────
{
  key: 'light',
  label: 'Light',
  metaKey: 'prefers-color-scheme',
  metaValue: 'light',
  cardBg: 'bg-white',
  cardBorder: 'border-[#E5E7EB]',
  eyebrow: 'text-[#007078]',
  eyebrowItalic: 'italic',
  title: 'text-[#14161A]',
  italic: 'text-[#14161A] italic',
  body: 'text-[#3D424A]',
  primaryBg: '#14161A',
  primaryFg: '#FFFFFF',
  tintedBg: '#E5F6F7',
  tintedFg: '#14161A',
  panelBg: '#FAFAF7',
  panelFg: 'text-[#14161A]',
  panelMuted: 'text-[#6B7280]',
  swatchBorder: 'border-[#E5E7EB]',
  rowBorder: 'border-[#E5E7EB]',
  tokens: [
  {
    name: 'surface.canvas',
    value: '#FAFAF7',
    swatchBg: '#FAFAF7'
  },
  {
    name: 'surface.raised',
    value: '#FFFFFF',
    swatchBg: '#FFFFFF'
  },
  {
    name: 'fg.default',
    value: '#14161A',
    swatchBg: '#14161A'
  },
  {
    name: 'fg.muted',
    value: '#3D424A',
    swatchBg: '#3D424A'
  },
  {
    name: 'fg.accent',
    value: '#007078',
    swatchBg: '#007078'
  },
  {
    name: 'border.subtle',
    value: '#E5E7EB',
    swatchBg: '#E5E7EB'
  },
  {
    name: 'action.primary',
    value: '#14161A',
    swatchBg: '#14161A'
  },
  {
    name: 'action.tinted',
    value: '#E5F6F7',
    swatchBg: '#E5F6F7'
  },
  {
    name: 'feedback.warn',
    value: '#B86A00',
    swatchBg: '#B86A00'
  },
  {
    name: 'feedback.danger',
    value: '#B42318',
    swatchBg: '#B42318'
  }]

},
// ───────── Dark ─────────
{
  key: 'dark',
  label: 'Dark',
  metaKey: 'prefers-color-scheme',
  metaValue: 'dark',
  cardBg: 'bg-[#181C22]',
  cardBorder: 'border-white/[0.06]',
  eyebrow: 'text-[#34CDD6]',
  eyebrowItalic: 'italic',
  title: 'text-[#F1F2F4]',
  italic: 'text-[#F1F2F4] italic',
  body: 'text-[#C7CAD1]',
  primaryBg: '#F1F2F4',
  primaryFg: '#0E1115',
  tintedBg: 'rgba(11,163,173,0.16)',
  tintedFg: '#6BD3D9',
  panelBg: '#0E1115',
  panelFg: 'text-[#F1F2F4]',
  panelMuted: 'text-[#C7CAD1]',
  swatchBorder: 'border-white/[0.08]',
  rowBorder: 'border-white/[0.06]',
  tokens: [
  {
    name: 'surface.canvas',
    value: '#0E1115',
    swatchBg: '#0E1115'
  },
  {
    name: 'surface.raised',
    value: '#181C22',
    swatchBg: '#181C22'
  },
  {
    name: 'fg.default',
    value: '#F1F2F4',
    swatchBg: '#F1F2F4'
  },
  {
    name: 'fg.muted',
    value: '#C7CAD1',
    swatchBg: '#C7CAD1'
  },
  {
    name: 'fg.accent',
    value: '#6BD3D9',
    swatchBg: '#6BD3D9'
  },
  {
    name: 'border.subtle',
    value: 'white/10',
    swatchBg: 'transparent',
    swatchStyle: {
      background: 'rgba(255,255,255,0.1)'
    }
  },
  {
    name: 'action.primary',
    value: '#F1F2F4',
    swatchBg: '#F1F2F4'
  },
  {
    name: 'action.tinted',
    value: 'teal-500/16',
    swatchBg: 'transparent',
    swatchStyle: {
      background: 'rgba(11,163,173,0.16)'
    }
  },
  {
    name: 'feedback.warn',
    value: '#F2A24A',
    swatchBg: '#F2A24A'
  },
  {
    name: 'feedback.danger',
    value: '#F87171',
    swatchBg: '#F87171'
  }]

},
// ───────── High Contrast ─────────
{
  key: 'hc',
  label: 'High Contrast',
  metaKey: 'prefers-contrast',
  metaValue: 'more',
  cardBg: 'bg-black',
  cardBorder: 'border-white',
  eyebrow: 'text-[#D9D74E]',
  eyebrowItalic: '',
  title: 'text-white',
  italic: 'text-white uppercase',
  body: 'text-white',
  primaryBg: '#FFFF00',
  primaryFg: '#000000',
  tintedBg: '#000000',
  tintedFg: '#FFFFFF',
  tintedExtra: 'border-2 border-white',
  panelBg: '#000000',
  panelFg: 'text-white',
  panelMuted: 'text-white',
  swatchBorder: 'border-white',
  rowBorder: 'border-white/30',
  tokens: [
  {
    name: 'surface.canvas',
    value: '#000000',
    swatchBg: '#000000'
  },
  {
    name: 'surface.raised',
    value: '#000 + 2px stroke',
    swatchBg: '#000000'
  },
  {
    name: 'fg.default',
    value: '#FFFFFF',
    swatchBg: '#FFFFFF'
  },
  {
    name: 'fg.muted',
    value: '#FFFFFF (no muting)',
    swatchBg: '#FFFFFF'
  },
  {
    name: 'fg.accent',
    value: '#FFFF00',
    swatchBg: '#FFFF00'
  },
  {
    name: 'border.subtle',
    value: '#FFFFFF · 2px',
    swatchBg: '#FFFFFF'
  },
  {
    name: 'action.primary',
    value: '#FFFF00',
    swatchBg: '#FFFF00'
  },
  {
    name: 'action.tinted',
    value: 'black + 2px stroke',
    swatchBg: '#000000'
  },
  {
    name: 'feedback.warn',
    value: '#FFA500',
    swatchBg: '#FFA500'
  },
  {
    name: 'feedback.danger',
    value: '#FF6B6B',
    swatchBg: '#FF6B6B'
  }]

}];

function SampleCard({ mode }: {mode: Mode;}) {
  return (
    <div
      className={`rounded-2xl border p-5 md:p-6 ${mode.cardBg} ${mode.cardBorder}`}
      style={{
        borderWidth: mode.key === 'hc' ? 2 : 1
      }}>
      
      <div
        className={`text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] mb-3 ${mode.eyebrow}`}
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace'
        }}>
        
        INFLUENCER · 1 OF 3
      </div>
      <h4
        className={`text-[20px] md:text-[22px] font-bold leading-tight tracking-tight ${mode.title}`}>
        
        {mode.key === 'hc' ?
        <>One step from VERIFIED</> :

        <>
            One step from <span className={mode.italic}>verified</span>
          </>
        }
      </h4>
      <p
        className={`mt-3 text-[13.5px] md:text-[14px] leading-relaxed ${mode.body}`}>
        
        Add a portfolio photo to publish your profile and start receiving online
        bookings.
      </p>
      <div className="mt-5 flex items-center gap-2.5">
        <button
          className={`px-4 h-10 rounded-xl text-[13.5px] font-bold ${mode.primaryExtra ?? ''}`}
          style={{
            backgroundColor: mode.primaryBg,
            color: mode.primaryFg
          }}>
          
          Add photo
        </button>
        <button
          className={`px-4 h-10 rounded-xl text-[13.5px] font-bold ${mode.tintedExtra ?? ''}`}
          style={{
            background: mode.tintedBg,
            color: mode.tintedFg
          }}>
          
          Skip
        </button>
      </div>
    </div>);

}
function TokenList({ mode }: {mode: Mode;}) {
  return (
    <div className="mt-5 flex flex-col">
      {mode.tokens.map((t, i) =>
      <div
        key={t.name}
        className={`flex items-center gap-3 py-2.5 ${i < mode.tokens.length - 1 ? `border-b border-dashed ${mode.rowBorder}` : ''}`}>
        
          {/* Swatch */}
          <div
          className={`w-5 h-5 md:w-[22px] md:h-[22px] rounded-[5px] border shrink-0 ${mode.swatchBorder}`}
          style={{
            backgroundColor: t.swatchBg,
            borderWidth: mode.key === 'hc' ? 1.5 : 1,
            ...t.swatchStyle
          }} />
        
          {/* Token name + value (mono, right aligned) */}
          <div
          className={`flex-1 flex items-center justify-end gap-3 text-[11.5px] md:text-[12px] font-medium tracking-tight ${mode.panelFg}`}
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace'
          }}>
          
            <span className="font-semibold">{t.name}</span>
            <span className={`${mode.panelMuted} tabular-nums`}>{t.value}</span>
          </div>
        </div>
      )}
    </div>);

}
function ModePanel({ mode }: {mode: Mode;}) {
  return (
    <div
      className="rounded-[28px] p-6 md:p-7"
      style={{
        background: mode.panelBg,
        boxShadow:
        mode.key === 'light' ?
        '0 1px 2px rgba(20,22,26,0.04), 0 8px 24px -12px rgba(20,22,26,0.08)' :
        'none'
      }}>
      
      {/* Mode header */}
      <div className="flex items-baseline justify-between mb-5 md:mb-6">
        <h3
          className={`text-2xl md:text-[28px] font-bold tracking-tight ${mode.panelFg}`}>
          
          {mode.label}
        </h3>
        <div
          className={`text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.16em] ${mode.panelMuted}`}
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace'
          }}>
          
          {mode.metaKey}:{' '}
          <span className={mode.panelFg.replace('text-', 'text-')}>
            {mode.metaValue.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Sample card */}
      <SampleCard mode={mode} />

      {/* Token list */}
      <TokenList mode={mode} />
    </div>);

}
export function TokenReference() {
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
          One card,{' '}
          <span className="italic font-bold text-teal">three modes</span>.
        </h3>
        <p className="mt-4 text-[15px] md:text-base text-ink-50 leading-relaxed text-pretty">
          The same component rendered under each theme contract. Tokens carry
          the meaning; the values flip. High contrast strips muted greys and
          swaps in pure white text, yellow accents, and 2px strokes on every
          surface.
        </p>
      </div>

      {/* Three-up grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        {modes.map((m) =>
        <ModePanel key={m.key} mode={m} />
        )}
      </div>
    </motion.div>);

}