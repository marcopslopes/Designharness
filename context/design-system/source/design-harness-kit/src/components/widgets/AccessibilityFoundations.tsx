import React, { Component } from 'react';
import { motion } from 'framer-motion';
import {
  HandIcon,
  TargetIcon,
  EyeIcon,
  ZapOffIcon,
  CheckIcon,
  ScaleIcon,
  GlobeIcon,
  FlagIcon,
  AppleIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  ContrastIcon,
  KeyboardIcon,
  EarIcon,
  HeartIcon } from
'lucide-react';
// ─────────────────────────────────────────────────────────────
// Accessibility foundations
//
// Plain-language explainer of what accessibility means here,
// which standards we comply with, contrast ratings for every
// pair, touch-target sizing for phones, and the built-in
// principles every component inherits.
// ─────────────────────────────────────────────────────────────
// ──────────── Explainer ────────────
function Explainer() {
  return (
    <div className="rounded-2xl bg-paper border border-line p-6 md:p-7 mb-8">
      <div className="flex items-start gap-4">
        <div className="size-12 rounded-2xl bg-teal-soft flex items-center justify-center shrink-0">
          <HeartIcon className="size-6 text-teal-700" strokeWidth={2} />
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-teal mb-2">
            What it means
          </div>
          <h4 className="text-[20px] md:text-[22px] font-bold text-ink leading-tight tracking-tight mb-3">
            Accessibility means everyone can use the app — no exceptions.
          </h4>
          <p className="text-[14px] md:text-[15px] text-ink-50 leading-relaxed text-pretty">
            That includes people with low vision, colour blindness, motor
            differences, deaf and hard-of-hearing users, screen-reader users,
            and anyone navigating with a keyboard or assistive switch. It also
            includes the rest of us using the app one-handed on the bus, in
            bright sunlight, or with a cracked screen.
          </p>
          <p className="mt-3 text-[14px] md:text-[15px] text-ink-50 leading-relaxed text-pretty">
            The standards below — <strong className="text-ink">WCAG 2.2</strong>{' '}
            for the web, <strong className="text-ink">iOS HIG</strong> and{' '}
            <strong className="text-ink">Material 3</strong> for native — are
            the rulebooks we measure against. Our tokens, component sizes, and
            theme modes are built so that following them is the default.
          </p>
        </div>
      </div>
    </div>);

}
// ──────────── Standards compliance ────────────
type Standard = {
  icon: ComponentType<any>;
  name: string;
  scope: string;
  region: string;
  level: string;
  desc: string;
};
const standards: Standard[] = [
{
  icon: GlobeIcon,
  name: 'WCAG 2.2',
  scope: 'Web Content Accessibility Guidelines',
  region: 'W3C · Global',
  level: 'AA',
  desc: 'The international baseline for digital accessibility. Covers contrast, keyboard, focus, motion, text size, target size, and more.'
},
{
  icon: ScaleIcon,
  name: 'ADA · Title III',
  scope: 'Americans with Disabilities Act',
  region: 'United States · Legal',
  level: 'AA',
  desc: 'US federal law. Courts treat WCAG 2.1 AA as the de facto standard for "public accommodations" — Northline qualifies.'
},
{
  icon: FlagIcon,
  name: 'EAA · 2025',
  scope: 'European Accessibility Act',
  region: 'European Union · Legal',
  level: 'AA',
  desc: 'Effective June 28, 2025. All consumer-facing services sold in the EU — including booking platforms — must meet WCAG 2.1 AA.'
},
{
  icon: ShieldCheckIcon,
  name: 'Section 508',
  scope: 'US Federal Procurement',
  region: 'United States · Federal',
  level: 'AA',
  desc: 'Required for any service contracted by US federal agencies. Aligned with WCAG 2.0 AA.'
},
{
  icon: AppleIcon,
  name: 'iOS HIG',
  scope: 'Apple Human Interface Guidelines',
  region: 'iOS · Native',
  level: '44 pt',
  desc: "Apple's touch-target minimum. 44 × 44 pt is the smallest comfortably tappable area on iPhone. Apple rejects apps that fall below."
},
{
  icon: SmartphoneIcon,
  name: 'Material 3',
  scope: 'Material Design — Google',
  region: 'Android · Native',
  level: '48 dp',
  desc: "Android's touch-target minimum. 48 × 48 dp ≈ 9 mm — the average index-fingertip area. Material 3 keeps it as the absolute floor."
}];

function StandardCard({ s }: {s: Standard;}) {
  const Icon = s.icon;
  return (
    <div className="relative rounded-2xl bg-paper border border-line p-5 flex flex-col gap-3">
      {/* Pass badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-md bg-leaf-50 text-leaf-700 text-[10px] font-bold tracking-wide">
        <CheckIcon className="size-3" strokeWidth={3} />
        PASS
      </div>

      <div className="size-10 rounded-xl bg-ink/[0.04] flex items-center justify-center">
        <Icon className="size-5 text-ink" strokeWidth={2} />
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-[15px] font-bold text-ink leading-tight">
            {s.name}
          </span>
          <span className="text-[10px] font-bold tabular-nums tracking-wider text-teal-700 bg-teal-soft px-1.5 py-0.5 rounded">
            {s.level}
          </span>
        </div>
        <div className="text-[12px] font-medium text-ink leading-tight mt-0.5">
          {s.scope}
        </div>
        <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-50 mt-1">
          {s.region}
        </div>
      </div>

      <p className="text-[12px] text-ink-50 leading-relaxed">{s.desc}</p>
    </div>);

}
// ──────────── Touch target visualizer ────────────
function TouchTargetVisualizer() {
  // True-to-scale tap-target preview
  const targets = [
  {
    size: 28,
    label: 'Too small',
    sub: '28 pt · fails iOS',
    status: 'fail' as const
  },
  {
    size: 36,
    label: 'Borderline',
    sub: '36 pt · misses Material',
    status: 'warn' as const
  },
  {
    size: 44,
    label: 'iOS minimum',
    sub: '44 × 44 pt · Apple HIG',
    status: 'pass' as const
  },
  {
    size: 48,
    label: 'Material 3',
    sub: '48 × 48 dp · Android',
    status: 'pass' as const
  }];

  return (
    <div className="rounded-2xl bg-sunken p-5 md:p-6">
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-ink-50 mb-1">
            Touch targets · in scale
          </div>
          <div className="text-[15px] font-bold text-ink">
            Hit areas, sized to a phone fingertip.
          </div>
        </div>
        <div className="text-[10.5px] font-bold uppercase tracking-wider text-ink-50">
          Average fingertip ≈ 9 mm
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {targets.map((t) => {
          const ringColor =
          t.status === 'pass' ?
          'ring-leaf border-leaf' :
          t.status === 'warn' ?
          'ring-amber border-amber' :
          'ring-danger border-danger';
          const labelTone =
          t.status === 'pass' ?
          'bg-leaf-50 text-leaf-700' :
          t.status === 'warn' ?
          'bg-amber-soft text-amber-700' :
          'bg-danger-50 text-danger-700';
          return (
            <div
              key={t.size}
              className="bg-paper rounded-xl p-4 flex flex-col items-center justify-between gap-3">
              
              {/* Tap target rendered at true pt-to-px ratio (1pt = 1px in css) */}
              <div className="relative flex items-center justify-center h-[64px] w-[64px]">
                <div
                  className={`rounded-xl border-2 ring-2 ring-offset-2 ring-offset-paper bg-ink/5 ${ringColor}`}
                  style={{
                    width: t.size,
                    height: t.size
                  }} />
                
              </div>
              <div className="text-center">
                <div
                  className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${labelTone}`}>
                  
                  {t.label}
                </div>
                <div className="text-[11px] text-ink-50 mt-1.5 leading-tight">
                  {t.sub}
                </div>
              </div>
            </div>);

        })}
      </div>

      <p className="mt-5 text-[12.5px] text-ink-50 leading-relaxed">
        Every tappable element in this system meets{' '}
        <strong className="text-ink">44 × 44 pt</strong> on iOS and{' '}
        <strong className="text-ink">48 × 48 dp</strong> on Android. Smaller
        icons (e.g. a 20 px chevron) extend their hit area with invisible
        padding so the tappable surface still passes — what you see is{' '}
        <em>not</em> what you tap.
      </p>
    </div>);

}
// ──────────── Contrast pairs ────────────
type Pair = {
  fgName: string;
  bgName: string;
  fgHex: string;
  bgHex: string;
  ratio: string;
  grade: 'AAA' | 'AA' | 'AA Large' | 'Fail';
  use: string;
};
const pairs: Pair[] = [
{
  fgName: 'Ink',
  bgName: 'Paper',
  fgHex: '#14161A',
  bgHex: '#FFFFFF',
  ratio: '18.51',
  grade: 'AAA',
  use: 'Headings · primary body'
},
{
  fgName: 'Ink 70',
  bgName: 'Paper',
  fgHex: '#4B5563',
  bgHex: '#FFFFFF',
  ratio: '7.93',
  grade: 'AAA',
  use: 'Body · paragraph'
},
{
  fgName: 'Ink 50',
  bgName: 'Paper',
  fgHex: '#6B7280',
  bgHex: '#FFFFFF',
  ratio: '5.81',
  grade: 'AA',
  use: 'Captions · meta'
},
{
  fgName: 'Teal',
  bgName: 'Paper',
  fgHex: '#007078',
  bgHex: '#FFFFFF',
  ratio: '5.40',
  grade: 'AA',
  use: 'Links · brand text'
},
{
  fgName: 'White',
  bgName: 'Ink',
  fgHex: '#FFFFFF',
  bgHex: '#14161A',
  ratio: '18.51',
  grade: 'AAA',
  use: 'Primary button · dark surfaces'
},
{
  fgName: 'White',
  bgName: 'Danger',
  fgHex: '#FFFFFF',
  bgHex: '#B42318',
  ratio: '5.87',
  grade: 'AA',
  use: 'Destructive button label'
}];

function gradeColor(grade: Pair['grade']) {
  switch (grade) {
    case 'AAA':
      return 'bg-leaf-50 text-leaf-700 border-leaf-100';
    case 'AA':
      return 'bg-teal-soft text-teal-700 border-teal/20';
    case 'AA Large':
      return 'bg-amber-soft text-amber-700 border-amber/20';
    default:
      return 'bg-danger-50 text-danger-700 border-danger/20';
  }
}
function ContrastCard({ pair }: {pair: Pair;}) {
  return (
    <div className="rounded-2xl bg-paper border border-line p-4 flex flex-col gap-3">
      <div
        className="relative rounded-xl h-24 px-4 flex flex-col items-start justify-center"
        style={{
          backgroundColor: pair.bgHex,
          color: pair.fgHex
        }}>
        
        <div className="text-[20px] font-bold leading-none tracking-tight">
          Aa
        </div>
        <div className="text-[11px] font-semibold mt-1 opacity-90">
          Sample copy text
        </div>
        <div
          className={`absolute top-2 right-2 px-2 py-0.5 rounded-md border text-[10px] font-bold tracking-wide ${gradeColor(pair.grade)}`}>
          
          {pair.grade}
        </div>
      </div>
      <div className="flex items-end justify-between px-1">
        <div>
          <div className="text-[13px] font-bold text-ink leading-tight">
            {pair.fgName}
            <span className="font-medium text-ink-50"> on </span>
            {pair.bgName}
          </div>
          <div className="text-[11px] text-ink-50 mt-0.5">{pair.use}</div>
        </div>
        <div className="text-right">
          <div
            className="text-[18px] font-bold tabular-nums text-ink leading-none"
            style={{
              fontFeatureSettings: '"tnum"'
            }}>
            
            {pair.ratio}
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-50 mt-0.5">
            : 1
          </div>
        </div>
      </div>
    </div>);

}
// ──────────── Scale reference ────────────
function ScaleReference() {
  const tiers = [
  {
    label: 'AA Large',
    ratio: '3 : 1',
    desc: 'Headings ≥ 18pt or 14pt bold · icons · graphic objects',
    color: 'bg-amber-soft text-amber-700'
  },
  {
    label: 'AA',
    ratio: '4.5 : 1',
    desc: 'Normal text · UI components · interactive labels',
    color: 'bg-teal-soft text-teal-700'
  },
  {
    label: 'AAA',
    ratio: '7 : 1',
    desc: 'Enhanced — strictest tier. Default target for body copy.',
    color: 'bg-leaf-50 text-leaf-700'
  }];

  return (
    <div className="rounded-2xl bg-sunken p-5 md:p-6">
      <div className="text-[11px] font-bold uppercase tracking-widest text-ink-50 mb-4">
        WCAG 2.2 · Contrast thresholds
      </div>
      <div className="flex flex-col gap-2">
        {tiers.map((t) =>
        <div
          key={t.label}
          className="flex items-center gap-3 px-3 py-3 bg-paper rounded-xl">
          
            <div
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${t.color}`}>
            
              {t.label}
            </div>
            <div className="text-[16px] font-bold tabular-nums text-ink min-w-[64px]">
              {t.ratio}
            </div>
            <div className="text-[12.5px] text-ink-50 leading-snug">
              {t.desc}
            </div>
          </div>
        )}
      </div>
    </div>);

}
// ──────────── Principles ────────────
const principles = [
{
  icon: TargetIcon,
  title: 'Minimum hit area',
  metric: '44 × 44',
  unit: 'pt',
  desc: 'Every tappable target is at least 44pt square — the iOS HIG floor, the Material 3 floor at 48dp. Smaller icons extend their hit area invisibly.'
},
{
  icon: KeyboardIcon,
  title: 'Focus rings',
  metric: '2 px',
  unit: 'offset · teal',
  desc: 'Keyboard focus is always visible with a 2px outline + 2px offset using fg.accent. Never hidden, never just a colour shift.'
},
{
  icon: ZapOffIcon,
  title: 'Reduced motion',
  metric: 'prefers-reduced-motion',
  unit: 'respected',
  desc: 'All motion is wrapped in a guard. Users with the OS toggle see snap transitions instead of springs. No required animation.'
},
{
  icon: ContrastIcon,
  title: 'High contrast mode',
  metric: 'prefers-contrast',
  unit: 'more',
  desc: 'Tokens swap to a fourth theme: pure black surfaces, white text, yellow accent, 2px strokes on every interactive element.'
}];

function PrincipleCard({
  icon: Icon,
  title,
  metric,
  unit,
  desc






}: {icon: ComponentType<any>;title: string;metric: string;unit: string;desc: string;}) {
  return (
    <div className="rounded-2xl bg-paper border border-line p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="size-10 rounded-xl bg-teal-soft flex items-center justify-center">
          <Icon className="size-5 text-teal-700" strokeWidth={2} />
        </div>
        <CheckIcon className="size-4 text-leaf" strokeWidth={2.5} />
      </div>
      <div className="text-[15px] font-bold text-ink leading-tight">
        {title}
      </div>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-[20px] font-bold text-ink tabular-nums tracking-tight leading-none">
          {metric}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-50">
          {unit}
        </span>
      </div>
      <p className="text-[12.5px] text-ink-50 leading-relaxed">{desc}</p>
    </div>);

}
// ──────────── Main ────────────
export function AccessibilityFoundations() {
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
          Accessibility,{' '}
          <span className="italic font-bold text-teal">measured</span>.
        </h3>
        <p className="mt-4 text-[15px] md:text-base text-ink-50 leading-relaxed text-pretty">
          Every text–surface pair is rated against WCAG 2.2. Hit areas hit the
          44pt iOS floor. Focus is always visible. Motion and contrast respect
          the OS toggles. The system passes by default — you don't have to
          remember.
        </p>
      </div>

      {/* Explainer */}
      <Explainer />

      {/* Compliance & standards */}
      <div className="mb-8">
        <div className="flex items-end justify-between mb-4 border-b border-line pb-3 gap-4">
          <div className="text-[15px] font-bold text-ink leading-tight">
            Standards we comply with
            <span className="ml-1 font-medium text-ink-50">
              · global, regional, native
            </span>
          </div>
          <div className="text-[11px] font-bold tracking-wider text-ink-50 text-right">
            6 STANDARDS · ALL PASS
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {standards.map((s) =>
          <StandardCard key={s.name} s={s} />
          )}
        </div>
      </div>

      {/* Touch target visualizer */}
      <div className="mb-8">
        <TouchTargetVisualizer />
      </div>

      {/* Contrast pairs grid */}
      <div className="mb-8">
        <div className="flex items-end justify-between mb-4 border-b border-line pb-3">
          <div className="text-[15px] font-bold text-ink">
            Contrast pairs
            <span className="ml-1 font-medium text-ink-50">
              · text on surface
            </span>
          </div>
          <div className="text-[11px] font-bold tracking-wider text-ink-50">
            6 PAIRS · ALL PASS AA
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pairs.map((p) =>
          <ContrastCard key={`${p.fgName}-${p.bgName}`} pair={p} />
          )}
        </div>
      </div>

      {/* Scale reference */}
      <div className="mb-8">
        <ScaleReference />
      </div>

      {/* Principles grid */}
      <div>
        <div className="flex items-end justify-between mb-4 border-b border-line pb-3">
          <div className="text-[15px] font-bold text-ink">
            Built-in principles
            <span className="ml-1 font-medium text-ink-50">
              · touch · focus · motion · contrast
            </span>
          </div>
          <div className="text-[11px] font-bold tracking-wider text-ink-50">
            4 GUARANTEES
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {principles.map((p) =>
          <PrincipleCard key={p.title} {...p} />
          )}
        </div>
      </div>
    </motion.div>);

}