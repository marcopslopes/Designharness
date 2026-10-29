import React, { useEffect, useMemo, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  SearchIcon,
  XIcon,
  PanelLeftIcon,
  PanelLeftCloseIcon } from
'lucide-react';
type Section = {
  id: string;
  eyebrow: string;
};
// Hand-curated section grouping. New sections fall into "Other".
const GROUP_MAP: Record<string, string> = {
  // Calendar
  calendar: 'Calendar',
  'calendar-top-header': 'Calendar',
  'date-cell': 'Calendar',
  'calendar-picker-mobile': 'Calendar',
  'day-agenda-view': 'Calendar',
  'staffers-bar': 'Calendar',
  // Booking & Day
  appointment: 'Booking',
  'next-appointment': 'Booking',
  'roster-row': 'Booking',
  // Settings & System
  settings: 'Settings',
  'settings-group': 'Settings',
  'profile-actions': 'Settings',
  'business-card': 'Settings',
  // Tabs & Filters
  tabs: 'Tabs & Filters',
  period: 'Tabs & Filters',
  // Stats & Cards
  metric: 'Stats',
  'kpi-strip': 'Stats',
  'revenue-hero': 'Stats',
  'inverted-stat-grid': 'Stats',
  'glanceable-performance': 'Stats',
  'hero-metric': 'Stats',
  'stats-stories': 'Stats',
  'trend-list': 'Stats',
  'bento-stats': 'Stats',
  // Actions
  fab: 'Actions',
  'action-quad': 'Actions',
  'button-showcase': 'Actions',
  'icon-action-grid': 'Actions',
  'quick-action-tiles': 'Actions',
  // Banners & Feedback
  alert: 'Feedback',
  'alert-set': 'Feedback',
  'visibility-alert-card': 'Feedback',
  'promo-card': 'Feedback',
  // Onboarding & Engagement
  progress: 'Engagement',
  'setup-checklist': 'Engagement',
  'influencer-level': 'Engagement',
  'referral-nudge': 'Engagement',
  'earnings-hero': 'Engagement',
  'invite-link': 'Engagement',
  'how-it-works': 'Engagement',
  // Atomic system
  'badge-set': 'Atoms',
  'avatar-group': 'Atoms',
  'floating-nav': 'Atoms',
  'biz-tab-bar': 'Atoms',
  // Form controls
  switch: 'Form Controls',
  checkbox: 'Form Controls',
  radio: 'Form Controls',
  segmented: 'Form Controls',
  stepper: 'Form Controls',
  slider: 'Form Controls',
  'text-input': 'Form Controls',
  'floating-label-field': 'Form Controls',
  'inline-edit-field': 'Form Controls',
  'rich-input-field': 'Form Controls',
  'multi-step-form': 'Form Controls',
  tip: 'Form Controls',
  // Skeletons
  'skeleton-primitive': 'Skeletons',
  'skeleton-list': 'Skeletons',
  'skeleton-card': 'Skeletons',
  'skeleton-calendar': 'Skeletons',
  // Headers
  'large-title-header': 'Headers',
  'nav-bar-header': 'Headers',
  'search-header': 'Headers',
  'sheet-header': 'Headers',
  'tabbed-header': 'Headers',
  // Sheets
  'action-sheet': 'Sheets',
  'confirmation-sheet': 'Sheets',
  'form-sheet': 'Sheets',
  'picker-sheet': 'Sheets',
  'detail-sheet': 'Sheets',
  // Listings
  'service-list-item': 'Listings',
  'client-list-item': 'Listings',
  'marketplace-listing': 'Listings',
  'booking-list-item': 'Listings',
  // Checkout
  checkout: 'Checkout',
  'cart-summary': 'Checkout',
  'payment-method-picker': 'Checkout',
  'discount-code-field': 'Checkout',
  'pay-button': 'Checkout',
  'order-confirmation': 'Checkout',
  // Biz
  'empty-state': 'Biz',
  'notification-feed': 'Biz',
  'notification-panel-card': 'Biz',
  'notification-action-card': 'Biz',
  'pos-keypad': 'Biz',
  'loyalty-stamp': 'Biz',
  'date-range-picker': 'Biz',
  // Hints & Tooltips
  'tooltip-showcase': 'Hints',
  'coachmark-callout': 'Hints',
  'inline-hint': 'Hints',
  // Motion & Feedback
  'success-confetti': 'Motion',
  'celebration-screen': 'Motion',
  'loading-spinner': 'Motion',
  'progress-bar-set': 'Motion',
  'circular-progress': 'Motion',
  'upload-progress': 'Motion',
  'pull-to-refresh': 'Motion',
  'checkmark-draw': 'Motion'
};
const GROUP_ORDER = [
'Calendar',
'Booking',
'Headers',
'Sheets',
'Listings',
'Checkout',
'Form Controls',
'Stats',
'Actions',
'Settings',
'Tabs & Filters',
'Feedback',
'Engagement',
'Atoms',
'Skeletons',
'Biz',
'Hints',
'Motion',
'Other'];

export function SectionMenu({ sections }: {sections: Section[];}) {
  const [collapsed, setCollapsed] = useState(true);
  const [q, setQ] = useState('');
  const [activeId, setActiveId] = useState<string | null>(
    sections[0]?.id ?? null
  );
  const listRef = useRef<HTMLDivElement>(null);
  // Track which section is currently dominant in the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.
        filter((e) => e.isIntersecting).
        sort(
          (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
        );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);
  // Auto-scroll the menu so the active item stays in view.
  useEffect(() => {
    if (!activeId || !listRef.current) return;
    const btn = listRef.current.querySelector<HTMLElement>(
      `[data-target="${activeId}"]`
    );
    if (btn) {
      btn.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [activeId]);
  // Build grouped, filtered list
  const grouped = useMemo(() => {
    const filtered = sections.
    map((s, i) => ({
      ...s,
      idx: i
    })).
    filter((s) =>
    q.trim() ? s.eyebrow.toLowerCase().includes(q.toLowerCase()) : true
    );
    const map = new Map<
      string,
      (Section & {
        idx: number;
      })[]>(
    );
    filtered.forEach((s) => {
      const g = GROUP_MAP[s.id] ?? 'Other';
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(s);
    });
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({
      group: g,
      items: map.get(g)!
    }));
  }, [sections, q]);
  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  return (
    <>
      {/* Collapsed rail trigger — only when collapsed */}
      <AnimatePresence>
        {collapsed &&
        <motion.button
          type="button"
          onClick={() => setCollapsed(false)}
          aria-label="Open section menu"
          initial={{
            opacity: 0,
            x: -10
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: -10
          }}
          className="hidden md:flex fixed left-4 top-6 z-30 size-11 rounded-2xl items-center justify-center text-ink"
          style={{
            backgroundColor: 'var(--page-toggle-bg)',
            boxShadow: 'var(--shadow-card-strong)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}>
          
            <PanelLeftIcon className="size-5" strokeWidth={2.2} />
          </motion.button>
        }
      </AnimatePresence>

      {/* Full menu */}
      <AnimatePresence>
        {!collapsed &&
        <motion.aside
          initial={{
            opacity: 0,
            x: -16
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: -16
          }}
          transition={{
            type: 'spring',
            stiffness: 280,
            damping: 30
          }}
          className="hidden md:flex flex-col fixed left-4 top-6 z-30 w-[240px] max-h-[calc(100vh-3rem)] rounded-2xl overflow-hidden"
          style={{
            backgroundColor: 'var(--page-toggle-bg)',
            boxShadow: 'var(--shadow-card-strong)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
          aria-label="Section navigation">
          
            {/* Header */}
            <div
            className="flex items-center justify-between px-3 pt-3 pb-2"
            style={{
              borderBottom: '1px solid var(--page-line)'
            }}>
            
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                Sections · {sections.length}
              </span>
              <button
              type="button"
              onClick={() => setCollapsed(true)}
              aria-label="Hide section menu"
              className="size-7 rounded-lg flex items-center justify-center text-muted hover:bg-sunken hover:text-ink transition-colors">
              
                <PanelLeftCloseIcon className="size-4" strokeWidth={2.2} />
              </button>
            </div>

            {/* Search */}
            <div className="px-3 pt-2 pb-2">
              <div className="flex items-center gap-2 h-9 px-3 rounded-xl bg-sunken">
                <SearchIcon
                className="size-3.5 text-muted shrink-0"
                strokeWidth={2.5} />
              
                <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Filter"
                className="flex-1 min-w-0 bg-transparent text-[12px] text-ink placeholder:text-muted outline-none" />
              
                {q &&
              <button
                type="button"
                onClick={() => setQ('')}
                aria-label="Clear"
                className="size-4 rounded-full bg-ink/20 text-paper flex items-center justify-center">
                
                    <XIcon className="size-2.5" strokeWidth={3} />
                  </button>
              }
              </div>
            </div>

            {/* List */}
            <div
            ref={listRef}
            className="flex-1 overflow-y-auto px-2 pb-3"
            style={{
              scrollbarWidth: 'thin'
            }}>
            
              {grouped.length === 0 &&
            <div className="px-2 py-6 text-center text-[12px] text-muted">
                  No matches
                </div>
            }
              {grouped.map(({ group, items }) =>
            <div key={group} className="mt-3 first:mt-1">
                  <div className="px-2 pb-1 text-[9px] font-bold uppercase tracking-widest text-muted">
                    {group}
                  </div>
                  <div className="space-y-0.5">
                    {items.map((s) => {
                  const isActive = s.id === activeId;
                  return (
                    <button
                      key={s.id}
                      data-target={s.id}
                      type="button"
                      onClick={() => handleJump(s.id)}
                      className="relative w-full flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg text-left group">
                      
                          {isActive &&
                      <motion.span
                        layoutId="section-menu-active"
                        className="absolute inset-0 rounded-lg bg-ink"
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 36
                        }}
                        aria-hidden="true" />

                      }
                          <span
                        className={`relative text-[10px] font-semibold tabular-nums w-5 shrink-0 ${isActive ? 'text-paper/60' : 'text-muted-soft'}`}>
                        
                            {String(s.idx + 1).padStart(2, '0')}
                          </span>
                          <span
                        className={`relative text-[12px] font-medium truncate ${isActive ? 'text-paper' : 'text-ink/80 group-hover:text-ink'}`}>
                        
                            {s.eyebrow}
                          </span>
                        </button>);

                })}
                  </div>
                </div>
            )}
            </div>
          </motion.aside>
        }
      </AnimatePresence>
    </>);

}