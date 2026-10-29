import React, { Fragment, Component } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, ArrowUpRightIcon, ChevronDownIcon } from 'lucide-react';
const fadeUp = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)'
  },
  whileInView: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)'
  },
  viewport: {
    once: true,
    margin: '-80px'
  },
  transition: {
    type: 'spring',
    bounce: 0,
    duration: 0.8
  }
};
export function OnePagerIntro() {
  const scrollToFoundations = () => {
    // Scroll down slightly past the intro to the foundations area
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-24 md:pt-32 pb-20 md:pb-28 space-y-24 md:space-y-32">
      {/* 1. Hero / Manifesto */}
      <motion.section {...fadeUp} className="max-w-4xl">
        <div
          className="text-[11px] font-bold uppercase tracking-widest mb-6"
          style={{
            color: 'var(--page-eyebrow)'
          }}>
          
          Design System · Exploration · 2026
        </div>
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-pretty mb-8 leading-[1.1]"
          style={{
            color: 'var(--page-fg)'
          }}>
          
          Not a redesign.
          <br />A revamp.
        </h1>
        <p
          className="text-lg md:text-xl text-pretty max-w-3xl leading-relaxed"
          style={{
            color: 'var(--page-muted)'
          }}>
          
          We're tightening the system that's already there — typography, tokens,
          components — so the product feels more robust, consistent, and modern
          without changing what users know.
        </p>
        <div
          className="flex flex-wrap gap-6 mt-12 text-sm font-medium"
          style={{
            color: 'var(--page-soft)'
          }}>
          
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-current opacity-50" />
            Scope · ~110 components revamped
          </span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-current opacity-50" />
            Touch · Tokens, type, motion, a11y
          </span>
        </div>
      </motion.section>

      {/* 2. The Why */}
      <motion.section {...fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="bg-paper border border-line rounded-3xl p-8"
            style={{
              boxShadow: 'var(--shadow-card)'
            }}>
            
            <h3 className="text-ink font-bold mb-3 text-lg">
              Fragmented foundations
            </h3>
            <p className="text-muted text-sm leading-relaxed text-pretty">
              Tokens were inconsistent, hard-coded values were everywhere, and
              there was no shared semantic layer to scale across platforms.
            </p>
          </div>
          <div
            className="bg-paper border border-line rounded-3xl p-8"
            style={{
              boxShadow: 'var(--shadow-card)'
            }}>
            
            <h3 className="text-ink font-bold mb-3 text-lg">
              Aging components
            </h3>
            <p className="text-muted text-sm leading-relaxed text-pretty">
              Visual polish, motion, and information density were falling behind
              iOS 26-class peers. The UI felt slightly dated.
            </p>
          </div>
          <div
            className="bg-paper border border-line rounded-3xl p-8"
            style={{
              boxShadow: 'var(--shadow-card)'
            }}>
            
            <h3 className="text-ink font-bold mb-3 text-lg">
              Accessibility gaps
            </h3>
            <p className="text-muted text-sm leading-relaxed text-pretty">
              Contrast ratios, touch targets, and focus states weren't
              systematic, making the app harder to use for some providers.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 3. The What */}
      <motion.section {...fadeUp}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-y border-line py-12 md:py-16">
          <div>
            <div className="text-4xl md:text-5xl font-bold tabular-nums text-ink mb-3 tracking-tight">
              12
            </div>
            <div className="text-xs md:text-sm font-bold text-muted uppercase tracking-widest">
              Semantic color roles
            </div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold tabular-nums text-ink mb-3 tracking-tight">
              110+
            </div>
            <div className="text-xs md:text-sm font-bold text-muted uppercase tracking-widest">
              Components revamped
            </div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold tabular-nums text-ink mb-3 tracking-tight">
              4
            </div>
            <div className="text-xs md:text-sm font-bold text-muted uppercase tracking-widest">
              Elevation tokens
            </div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold tabular-nums text-ink mb-3 tracking-tight">
              2×2
            </div>
            <div className="text-xs md:text-sm font-bold text-muted uppercase tracking-widest">
              Themes &amp; Contrast
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. The Approach */}
      <motion.section {...fadeUp}>
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold tracking-tight"
            style={{
              color: 'var(--page-fg)'
            }}>
            
            The Approach
          </h2>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[11px] left-0 right-0 h-px bg-line" />

          <div className="relative z-10">
            <div className="w-6 h-6 rounded-full bg-paper border border-line flex items-center justify-center text-[10px] font-bold tabular-nums text-muted mb-5">
              01
            </div>
            <h3 className="text-ink font-bold mb-2">Audit</h3>
            <p className="text-sm text-muted leading-relaxed text-pretty">
              Mapped existing components, tokens, and screens to understand the
              current surface area.
            </p>
          </div>
          <div className="relative z-10">
            <div className="w-6 h-6 rounded-full bg-paper border border-line flex items-center justify-center text-[10px] font-bold tabular-nums text-muted mb-5">
              02
            </div>
            <h3 className="text-ink font-bold mb-2">Foundations</h3>
            <p className="text-sm text-muted leading-relaxed text-pretty">
              Locked semantic colors, type ramp, shadows, and a strict
              accessibility baseline.
            </p>
          </div>
          <div className="relative z-10">
            <div className="w-6 h-6 rounded-full bg-paper border border-line flex items-center justify-center text-[10px] font-bold tabular-nums text-muted mb-5">
              03
            </div>
            <h3 className="text-ink font-bold mb-2">Revamp</h3>
            <p className="text-sm text-muted leading-relaxed text-pretty">
              Rebuilt every widget on top of the new foundations, preserving
              names, props, and intent.
            </p>
          </div>
          <div className="relative z-10">
            <div className="w-6 h-6 rounded-full bg-paper border border-line flex items-center justify-center text-[10px] font-bold tabular-nums text-muted mb-5">
              04
            </div>
            <h3 className="text-ink font-bold mb-2">Compose</h3>
            <p className="text-sm text-muted leading-relaxed text-pretty">
              Proved the system by rebuilding production screens (e.g. the
              Calendar) without touching IA.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 5. What changed vs what stayed */}
      <motion.section {...fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="bg-sunken rounded-3xl p-8 md:p-12">
            <h3 className="flex items-center gap-3 text-lg font-bold text-ink mb-8">
              <CheckIcon className="size-5 text-muted" strokeWidth={2.5} />
              What stayed
            </h3>
            <ul className="space-y-5">
              {[
              'Information architecture',
              'User flows & navigation',
              'Brand identity & voice',
              'Product surface area'].
              map((item, i) =>
              <li
                key={i}
                className="flex items-center gap-3 text-ink/80 font-medium text-sm md:text-base">
                
                  <div className="size-1.5 rounded-full bg-muted/40" />
                  {item}
                </li>
              )}
            </ul>
          </div>

          {/* Right Column */}
          <div className="bg-sunken rounded-3xl p-8 md:p-12">
            <h3 className="flex items-center gap-3 text-lg font-bold text-ink mb-8">
              <ArrowUpRightIcon
                className="size-5 text-muted"
                strokeWidth={2.5} />
              
              What we tightened
            </h3>
            <ul className="space-y-5">
              {[
              'Typography scale & rhythm',
              'Color token semantics',
              'Component polish & motion',
              'Accessibility (contrast, focus, hit targets)'].
              map((item, i) =>
              <li
                key={i}
                className="flex items-center gap-3 text-ink/80 font-medium text-sm md:text-base">
                
                  <div className="size-1.5 rounded-full bg-muted/40" />
                  {item}
                </li>
              )}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* 6. Closing callout */}
      <motion.section
        {...fadeUp}
        className="flex flex-col items-center text-center">
        
        <div
          className="w-full max-w-4xl bg-ink text-paper rounded-[2rem] p-10 md:p-16 flex flex-col items-center"
          style={{
            boxShadow: 'var(--shadow-card-strong)'
          }}>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-pretty mb-12 leading-snug">
            The result: a system that feels native, scales cleanly, and ships
            faster.
          </h2>
          <button
            type="button"
            onClick={scrollToFoundations}
            className="group flex flex-col items-center gap-4 text-paper/60 hover:text-paper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/50 rounded-xl p-2"
            aria-label="Scroll to foundations">
            
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Explore the foundations
            </span>
            <div className="size-10 rounded-full border border-paper/20 flex items-center justify-center group-hover:border-paper/40 group-hover:bg-paper/10 transition-all">
              <ChevronDownIcon className="size-4" strokeWidth={2.5} />
            </div>
          </button>
        </div>
      </motion.section>
    </div>);

}