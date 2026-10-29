import React from 'react';
import { CheckIcon, XIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react';
// iOS 26 status sheet — compact bottom-sheet card with centered tinted
// glyph, title, optional paragraph, and 0–4 stacked actions. Used for
// the result of an async operation: loading, success, warning, error,
// and info dialogs.
type Variant = 'loading' | 'warning' | 'success' | 'error' | 'info';
type Action = {
  label: string;
  tone?: 'primary' | 'secondary' | 'danger';
};
type Props = {
  variant: Variant;
  title: string;
  paragraph?: string;
  actions?: Action[];
  showClose?: boolean;
};
function Sheet({ variant, title, paragraph, actions = [], showClose }: Props) {
  return (
    <div
      className="relative w-full bg-paper rounded-3xl p-6 flex flex-col items-center text-center"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {showClose &&
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute top-4 right-4 size-7 flex items-center justify-center text-ink-50 active:scale-95 transition-transform">
        
          <XIcon className="size-5" strokeWidth={2.2} />
        </button>
      }

      <Glyph variant={variant} />

      <h3 className="text-[17px] font-bold text-ink leading-tight mt-4 px-2">
        {title}
      </h3>
      {paragraph &&
      <p className="text-[13px] text-ink-70 leading-[18px] mt-2 px-2">
          {paragraph}
        </p>
      }

      {actions.length > 0 &&
      <div className="flex flex-col gap-2 w-full mt-5">
          {actions.map((a, i) => {
          const tone = a.tone ?? (i === 0 ? 'primary' : 'secondary');
          const styles =
          tone === 'primary' ?
          'bg-ink text-paper' :
          tone === 'danger' ?
          'bg-paper text-danger border border-line' :
          'bg-paper text-ink border border-line';
          return (
            <button
              key={i}
              type="button"
              className={`w-full h-11 rounded-2xl text-[15px] font-semibold active:scale-[0.98] transition-transform ${styles}`}>
              
                {a.label}
              </button>);

        })}
        </div>
      }
    </div>);

}
function Glyph({ variant }: {variant: Variant;}) {
  if (variant === 'loading') {
    return (
      <div
        className="size-12 rounded-full border-[3px] border-line border-t-ink animate-spin"
        aria-label="Loading" />);


  }
  if (variant === 'warning') {
    return (
      <div className="size-14 rounded-full bg-amber/20 flex items-center justify-center">
        <AlertTriangleIcon className="size-7 text-amber" strokeWidth={2.5} />
      </div>);

  }
  if (variant === 'success') {
    return (
      <div className="size-14 rounded-full bg-leaf/20 flex items-center justify-center">
        <CheckIcon className="size-7 text-leaf" strokeWidth={3} />
      </div>);

  }
  if (variant === 'error') {
    return (
      <div className="size-14 rounded-full bg-danger/15 flex items-center justify-center">
        <XIcon className="size-7 text-danger" strokeWidth={3} />
      </div>);

  }
  return (
    <div className="size-14 rounded-full bg-sunken flex items-center justify-center">
      <InfoIcon className="size-7 text-ink" strokeWidth={2.4} />
    </div>);

}
function VariantLabel({ children }: {children: React.ReactNode;}) {
  return (
    <div className="text-[11px] font-bold text-ink-50 uppercase tracking-[0.1em] mb-3">
      {children}
    </div>);

}
export function StatusSheet() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <VariantLabel>Loading · no actions</VariantLabel>
        <Sheet variant="loading" title="We are processing your payment." />
      </div>

      <div>
        <VariantLabel>Warning · two actions</VariantLabel>
        <Sheet
          variant="warning"
          title="Payment completed but…"
          paragraph="The receipt could not be sent to the customer."
          actions={[
          {
            label: 'Retry',
            tone: 'primary'
          },
          {
            label: 'Skip',
            tone: 'secondary'
          }]
          } />
        
      </div>

      <div>
        <VariantLabel>Success · dismiss only</VariantLabel>
        <Sheet
          variant="success"
          title="Payment completed."
          paragraph="$45.00 charged to Visa ·· 4521."
          showClose />
        
      </div>

      <div>
        <VariantLabel>Error · dismiss only</VariantLabel>
        <Sheet
          variant="error"
          title="We failed."
          paragraph="The card was declined. Try a different payment method."
          showClose />
        
      </div>

      <div>
        <VariantLabel>Info · four stacked actions</VariantLabel>
        <Sheet
          variant="info"
          title="Update available"
          paragraph="A new version of Northline is ready to install."
          actions={[
          {
            label: 'Install now',
            tone: 'primary'
          },
          {
            label: 'Remind me later',
            tone: 'secondary'
          },
          {
            label: 'Skip this version',
            tone: 'danger'
          }]
          } />
        
      </div>
    </div>);

}