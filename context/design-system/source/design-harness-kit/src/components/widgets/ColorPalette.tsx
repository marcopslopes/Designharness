import React from 'react';
import { motion } from 'framer-motion';
// ─────────────────────────────────────────────────────────────
// Color tokens & tonal ramps
//
// Mirrors Northline's twelve semantic roles + their tonal ramps.
// Teal anchors brand, plum carries premium, the rest cover
// feedback. Ramps drive every adaptive component so dark mode
// flips the same role to a different tone without renaming.
// ─────────────────────────────────────────────────────────────
type Neutral = {
  name: string;
  role: string;
  hex: string;
  contrast: string;
  contrastBadgeOnDark?: boolean;
};
const neutrals: Neutral[] = [
{
  name: 'Ink',
  role: 'Primary text · CTA fill',
  hex: '#14161A',
  contrast: '21 : 1 AAA',
  contrastBadgeOnDark: true
},
{
  name: 'Ink 70',
  role: 'Body · paragraph',
  hex: '#4B5563',
  contrast: '9.5 : 1 AAA',
  contrastBadgeOnDark: true
},
{
  name: 'Ink 50',
  role: 'Captions · meta',
  hex: '#6B7280',
  contrast: '5.8 : 1 AA',
  contrastBadgeOnDark: true
},
{
  name: 'Paper',
  role: 'Card surface',
  hex: '#FFFFFF',
  contrast: 'paper'
},
{
  name: 'Sunken',
  role: 'Cells · wells',
  hex: '#F5F5F5',
  contrast: 'recessed'
},
{
  name: 'Line',
  role: 'Border · divider',
  hex: '#D1D5DB',
  contrast: 'edge'
}];

type Accent = {
  name: string;
  role: string;
  hex: string;
  contrast: string;
  description: string;
  ramp: string[];
};
const accents: Accent[] = [
{
  name: 'Teal',
  role: 'brand',
  description: 'Active · CTA tint',
  hex: '#0BA3AD',
  contrast: '3.9 : 1',
  ramp: [
  '#E0F7F8',
  '#C3F0F2',
  '#95E2E6',
  '#5DCFD5',
  '#2CB9C0',
  '#0BA3AD',
  '#0A8A92',
  '#086C72',
  '#054F54']

},
{
  name: 'Plum',
  role: 'premium',
  description: 'Upsell · influencer',
  hex: '#4F3791',
  contrast: '9.1 : 1 AAA',
  ramp: [
  '#EBE5F5',
  '#DCD1EE',
  '#B9A2DD',
  '#9576CC',
  '#714BBB',
  '#4F3791',
  '#422C7A',
  '#322160',
  '#110A24']

},
{
  name: 'Rose',
  role: 'accent',
  description: 'Apprentice · today',
  hex: '#C24A6E',
  contrast: '4.9 : 1 AA',
  ramp: [
  '#F8E2E9',
  '#F1CBD7',
  '#E8A5B8',
  '#DC7E96',
  '#CF5B7C',
  '#C24A6E',
  '#A23A5C',
  '#7E2C47',
  '#2C0F19']

},
{
  name: 'Leaf',
  role: 'success',
  description: 'Open · live · paid',
  hex: '#2EA043',
  contrast: '3.2 : 1',
  ramp: [
  '#DFF5E4',
  '#C2EBCC',
  '#94DAA4',
  '#66C97D',
  '#45B85F',
  '#2EA043',
  '#258438',
  '#1A672C',
  '#082510']

},
{
  name: 'Amber',
  role: 'warn',
  description: 'Pending · attention',
  hex: '#B86A00',
  contrast: '3.8 : 1',
  ramp: [
  '#FAEFD7',
  '#F5DDA8',
  '#E9C16B',
  '#DAA13A',
  '#C68615',
  '#B86A00',
  '#985700',
  '#774500',
  '#2B1900']

},
{
  name: 'Danger',
  role: 'destructive',
  description: 'Delete · failed',
  hex: '#B42318',
  contrast: '5.9 : 1 AA',
  ramp: [
  '#F9E3DF',
  '#F2C7BF',
  '#E59A8C',
  '#D56E5B',
  '#C44734',
  '#B42318',
  '#951C13',
  '#74160F',
  '#2A0805']

}];

const tonalScale = [
'98',
'95',
'90',
'80',
'70',
'60',
'50',
'40',
'30',
'20',
'10'];

const tonalRows = [
{
  name: 'Neutral',
  stops: [
  '#FAFAFA',
  '#F5F5F5',
  '#E5E7EB',
  '#D1D5DB',
  '#9CA3AF',
  '#6B7280',
  '#4B5563',
  '#374151',
  '#1F2937',
  '#111827',
  '#000000']

},
{
  name: 'Teal',
  stops: [
  '#F0FBFB',
  '#E0F7F8',
  '#C3F0F2',
  '#95E2E6',
  '#5DCFD5',
  '#2CB9C0',
  '#0BA3AD',
  '#0A8A92',
  '#086C72',
  '#054F54',
  '#02282B']

},
{
  name: 'Plum',
  stops: [
  '#F5F2FA',
  '#EBE5F5',
  '#DCD1EE',
  '#B9A2DD',
  '#9576CC',
  '#714BBB',
  '#4F3791',
  '#422C7A',
  '#322160',
  '#221645',
  '#110A24']

},
{
  name: 'Rose',
  stops: [
  '#FBF1F4',
  '#F8E2E9',
  '#F1CBD7',
  '#E8A5B8',
  '#DC7E96',
  '#CF5B7C',
  '#C24A6E',
  '#A23A5C',
  '#7E2C47',
  '#581E32',
  '#2C0F19']

}];

// Determines whether to render light text on a stop (rough luma test).
function isDark(hex: string) {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  // perceived brightness
  const luma = (r * 299 + g * 587 + b * 114) / 1000;
  return luma < 140;
}
function ContrastBadge({ label, onDark }: {label: string;onDark?: boolean;}) {
  return (
    <span
      className={
      'inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold tabular-nums tracking-wider ' + (
      onDark ? 'bg-white/90 text-ink' : 'bg-ink/90 text-white')
      }>
      
      {label}
    </span>);

}
function NeutralCard({ swatch }: {swatch: Neutral;}) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-3 flex flex-col gap-3">
      <div
        className="relative rounded-xl h-32 w-full flex items-start justify-start p-3"
        style={{
          backgroundColor: swatch.hex
        }}>
        
        <ContrastBadge
          label={swatch.contrast}
          onDark={!swatch.contrastBadgeOnDark} />
        
      </div>
      <div className="px-1 pb-1">
        <div className="text-[15px] font-bold text-ink leading-tight">
          {swatch.name}
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <span className="text-xs text-ink-50 truncate">{swatch.role}</span>
          <span className="text-xs font-semibold tabular-nums tracking-wider text-ink-50">
            {swatch.hex}
          </span>
        </div>
      </div>
    </div>);

}
function AccentCard({ swatch }: {swatch: Accent;}) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-3 flex flex-col gap-3">
      <div
        className="relative rounded-xl h-32 w-full flex items-start justify-start p-3"
        style={{
          backgroundColor: swatch.hex
        }}>
        
        <ContrastBadge label={swatch.contrast} onDark />
      </div>
      <div className="px-1">
        <div className="text-[15px] font-bold text-ink leading-tight">
          {swatch.name}
          <span className="ml-1 font-medium text-ink-50">· {swatch.role}</span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <span className="text-xs text-ink-50 truncate">
            {swatch.description}
          </span>
          <span className="text-xs font-semibold tabular-nums tracking-wider text-ink-50">
            {swatch.hex}
          </span>
        </div>
      </div>
      <div className="px-1 pb-1 flex gap-1.5">
        {swatch.ramp.map((stop, i) =>
        <div
          key={i}
          className="flex-1 h-3 rounded-[4px]"
          style={{
            backgroundColor: stop
          }} />

        )}
      </div>
    </div>);

}
function TonalRow({ name, stops }: {name: string;stops: string[];}) {
  return (
    <div className="flex items-stretch rounded-2xl bg-white shadow-card overflow-hidden">
      <div className="flex items-center px-5 min-w-[120px] md:min-w-[140px]">
        <span className="text-[15px] font-bold text-ink">{name}</span>
      </div>
      <div className="flex-1 flex">
        {stops.map((stop, i) =>
        <div
          key={i}
          className="flex-1 flex items-center justify-center py-5 md:py-6"
          style={{
            backgroundColor: stop
          }}>
          
            <span
            className={
            'text-[11px] font-semibold tabular-nums tracking-wider ' + (
            isDark(stop) ? 'text-white/90' : 'text-ink/70')
            }>
            
              {tonalScale[i]}
            </span>
          </div>
        )}
      </div>
    </div>);

}
export function ColorPalette() {
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
          Color tokens &amp;{' '}
          <span className="italic font-bold text-teal">tonal</span> ramps.
        </h3>
        <p className="mt-4 text-[15px] md:text-base text-ink-50 leading-relaxed text-pretty">
          Twelve semantic roles. Teal anchors brand, plum carries premium, the
          rest cover feedback. Tonal ramps drive every adaptive component, so
          dark mode flips the same role to a different tone without renaming.
        </p>
      </div>

      {/* Neutrals group */}
      <div className="mb-10">
        <div className="flex items-end justify-between mb-4 border-b border-line pb-3">
          <div className="text-[15px] font-bold text-ink">
            Neutrals
            <span className="ml-1 font-medium text-ink-50">· paper to ink</span>
          </div>
          <div className="text-[11px] font-bold tracking-wider text-ink-50">
            6 SURFACES · TEXT
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {neutrals.map((n) =>
          <NeutralCard key={n.name} swatch={n} />
          )}
        </div>
      </div>

      {/* Accents group */}
      <div className="mb-10">
        <div className="flex items-end justify-between mb-4 border-b border-line pb-3 gap-4">
          <div className="text-[15px] font-bold text-ink leading-tight">
            Brand &amp; semantic
            <br className="hidden md:block" />
            <span className="font-bold">accents</span>
          </div>
          <div className="text-[11px] font-bold tracking-wider text-ink-50 text-right">
            TEAL · PLUM · ROSE · LEAF · AMBER · DANGER
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accents.map((a) =>
          <AccentCard key={a.name} swatch={a} />
          )}
        </div>
      </div>

      {/* Tonal ramps */}
      <div>
        <div className="flex items-end justify-between mb-4 border-b border-line pb-3">
          <div className="text-[15px] font-bold text-ink">
            Tonal ramps
            <span className="ml-1 font-medium text-ink-50">· 11 stops</span>
          </div>
          <div className="text-[11px] font-bold tracking-wider text-ink-50">
            98 → 0
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {tonalRows.map((row) =>
          <TonalRow key={row.name} name={row.name} stops={row.stops} />
          )}
        </div>
      </div>
    </motion.div>);

}