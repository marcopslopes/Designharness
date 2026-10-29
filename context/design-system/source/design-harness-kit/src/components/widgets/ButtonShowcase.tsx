import React from 'react';
import {
  ChevronRightIcon,
  CheckIcon,
  PlusIcon,
  PencilIcon,
  SearchIcon,
  SparklesIcon,
  TrashIcon,
  BellIcon,
  HeartIcon } from
'lucide-react';
interface SubLabelProps {
  children: React.ReactNode;
}
function SubLabel({ children }: SubLabelProps) {
  return (
    <div className="text-[10px] font-mono uppercase tracking-widest text-ink-50 mb-3">
      {children}
    </div>);

}
// ─────────────────────────────────────────────────────────────
// No fully-rounded pills anywhere. All buttons sit at a 16px
// (rounded-2xl) container radius; the icon-only square buttons
// stay rounded-2xl so the whole system reads as one family.
// ─────────────────────────────────────────────────────────────
export function ButtonShowcase() {
  return (
    <div className="flex flex-col gap-8">
      {/* Primary & lifted */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-ink">
            Primary &amp; lifted
          </h3>
          <span className="text-[10px] font-mono text-ink-50">
            .btn-primary · XL L M S
          </span>
        </div>

        <SubLabel>Primary · ink fill with chevron</SubLabel>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            type="button"
            className="bg-ink text-white text-base font-semibold px-6 py-3.5 rounded-2xl flex items-center gap-2 hover:bg-ink-70 active:scale-[0.97] transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40">
            
            Primary button{' '}
            <ChevronRightIcon className="w-4 h-4" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className="bg-ink text-white text-sm font-semibold px-5 py-3 rounded-2xl flex items-center gap-1.5 hover:bg-ink-70 active:scale-[0.97] transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40">
            
            Primary{' '}
            <ChevronRightIcon className="w-3.5 h-3.5" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className="bg-ink text-white text-sm font-semibold px-4 py-2.5 rounded-xl active:scale-[0.97] transition-[transform,background-color] hover:bg-ink-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40">
            
            Primary
          </button>
          <button
            type="button"
            className="bg-ink text-white text-xs font-semibold px-3.5 py-2 rounded-xl active:scale-[0.97] transition-[transform,background-color] hover:bg-ink-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40">
            
            Small
          </button>
        </div>

        <SubLabel>Lifted · floating CTAs only</SubLabel>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="bg-ink text-white text-base font-semibold px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-[0_8px_20px_rgba(20,22,26,0.28)] hover:shadow-[0_10px_24px_rgba(20,22,26,0.32)] active:scale-[0.97] transition-[transform,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40">
            
            Book now <ChevronRightIcon className="w-4 h-4" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className="bg-ink text-white text-base font-semibold px-6 py-3.5 rounded-2xl shadow-[0_8px_20px_rgba(20,22,26,0.28)] hover:shadow-[0_10px_24px_rgba(20,22,26,0.32)] active:scale-[0.97] transition-[transform,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40">
            
            Confirm
          </button>
        </div>
      </section>

      <div className="h-px bg-line/60" />

      {/* Brand-tinted intents — full palette */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-ink">Tinted intents</h3>
          <span className="text-[10px] font-mono text-ink-50">
            6 semantic roles
          </span>
        </div>

        <SubLabel>Ghost · tint by intent</SubLabel>
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <button
            type="button"
            className="bg-teal/10 text-teal text-sm font-semibold px-4 py-2.5 rounded-2xl flex items-center gap-1.5 active:scale-[0.97] transition-[transform,filter] hover:bg-teal/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/30">
            
            <CheckIcon className="w-4 h-4" strokeWidth={2.5} /> Tinted teal
          </button>
          <button
            type="button"
            className="bg-plum/10 text-plum text-sm font-semibold px-4 py-2.5 rounded-2xl flex items-center gap-1.5 active:scale-[0.97] transition-[transform,filter] hover:bg-plum/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/30">
            
            <SparklesIcon className="w-4 h-4" strokeWidth={2} /> Premium feature
          </button>
          <button
            type="button"
            className="bg-rose/10 text-rose text-sm font-semibold px-4 py-2.5 rounded-2xl flex items-center gap-1.5 active:scale-[0.97] transition-[transform,filter] hover:bg-rose/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose/30">
            
            <HeartIcon className="w-4 h-4" strokeWidth={2} /> Favorite
          </button>
          <button
            type="button"
            className="bg-leaf/10 text-leaf text-sm font-semibold px-4 py-2.5 rounded-2xl flex items-center gap-1.5 active:scale-[0.97] transition-[transform,filter] hover:bg-leaf/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/30">
            
            <CheckIcon className="w-4 h-4" strokeWidth={2.5} /> Paid
          </button>
          <button
            type="button"
            className="bg-amber/10 text-amber text-sm font-semibold px-4 py-2.5 rounded-2xl flex items-center gap-1.5 active:scale-[0.97] transition-[transform,filter] hover:bg-amber/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/30">
            
            <BellIcon className="w-4 h-4" strokeWidth={2} /> Pending
          </button>
          <button
            type="button"
            className="bg-danger/10 text-danger text-sm font-semibold px-4 py-2.5 rounded-2xl flex items-center gap-1.5 active:scale-[0.97] transition-[transform,filter] hover:bg-danger/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/30">
            
            <TrashIcon className="w-4 h-4" strokeWidth={2} /> Delete account
          </button>
        </div>

        <SubLabel>Secondary &amp; outlined</SubLabel>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="bg-sunken text-ink text-sm font-semibold px-5 py-2.5 rounded-2xl active:scale-[0.97] hover:bg-line/60 transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20">
            
            Secondary
          </button>
          <button
            type="button"
            className="bg-white text-ink text-sm font-semibold px-5 py-2.5 rounded-2xl border border-line active:scale-[0.97] hover:bg-sunken/60 transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20">
            
            Outlined
          </button>
          <button
            type="button"
            className="text-ink-70 text-sm font-semibold px-4 py-2.5 rounded-2xl active:scale-[0.97] hover:bg-sunken transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20">
            
            Ghost neutral
          </button>
        </div>
      </section>

      <div className="h-px bg-line/60" />

      {/* Icon-only */}
      <section>
        <SubLabel>Icon-only · neutral + tinted</SubLabel>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            aria-label="Add"
            className="w-11 h-11 rounded-2xl bg-ink text-white flex items-center justify-center active:scale-[0.94] hover:bg-ink-70 transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40">
            
            <PlusIcon className="w-5 h-5" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            aria-label="Add round"
            className="w-11 h-11 rounded-2xl bg-ink text-white flex items-center justify-center active:scale-[0.94] hover:bg-ink-70 transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40">
            
            <PlusIcon className="w-5 h-5" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            aria-label="Edit"
            className="w-11 h-11 rounded-2xl bg-sunken text-ink-70 flex items-center justify-center active:scale-[0.94] hover:bg-line/60 transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20">
            
            <PencilIcon className="w-5 h-5" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            aria-label="Search"
            className="w-11 h-11 rounded-2xl bg-teal/10 text-teal flex items-center justify-center active:scale-[0.94] hover:bg-teal/15 transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/30">
            
            <SearchIcon className="w-5 h-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Upgrade"
            className="w-11 h-11 rounded-2xl bg-plum/10 text-plum flex items-center justify-center active:scale-[0.94] hover:bg-plum/15 transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/30">
            
            <SparklesIcon className="w-5 h-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="w-11 h-11 rounded-2xl bg-amber/10 text-amber flex items-center justify-center active:scale-[0.94] hover:bg-amber/15 transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/30">
            
            <BellIcon className="w-5 h-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Delete"
            className="w-11 h-11 rounded-2xl bg-danger/10 text-danger flex items-center justify-center active:scale-[0.94] hover:bg-danger/15 transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/30">
            
            <TrashIcon className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </section>

      <div className="h-px bg-line/60" />

      {/* Full-width */}
      <section>
        <SubLabel>Full-width · sticky CTA</SubLabel>
        <button
          type="button"
          className="w-full bg-ink text-white text-base font-semibold px-6 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-ink-70 active:scale-[0.99] transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 mb-3">
          
          Continue <ChevronRightIcon className="w-4 h-4" strokeWidth={2.2} />
        </button>
        <button
          type="button"
          className="w-full bg-sunken text-ink text-base font-semibold px-6 py-4 rounded-2xl hover:bg-line/60 active:scale-[0.99] transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20">
          
          Save as draft
        </button>
      </section>
    </div>);

}