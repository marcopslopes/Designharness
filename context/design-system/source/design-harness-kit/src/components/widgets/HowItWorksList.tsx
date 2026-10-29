import React from 'react';
interface Step {
  title: string;
  description: string;
}
const steps: Step[] = [
{
  title: 'Share your link',
  description: 'Send it to stores, advisors, and other pros you know'
},
{
  title: 'They sign up & take 3 bookings',
  description: 'Within their first 30 days on Northline'
},
{
  title: 'You both earn $50',
  description: 'Paid directly to your wallets — no cap'
}];

export function HowItWorksList() {
  return (
    <div
      className="bg-white rounded-2xl p-4"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}>
      
      <h3 className="text-sm font-semibold text-ink mb-3">How it works</h3>
      <ol className="space-y-3">
        {steps.map((step, i) =>
        <li key={i} className="flex items-start gap-3">
            <div
            className="w-6 h-6 rounded-full bg-purple/10 text-purple flex items-center justify-center text-xs font-bold flex-shrink-0 tabular-nums"
            aria-hidden="true">
            
              {i + 1}
            </div>
            <div>
              <div className="text-sm font-medium text-ink">{step.title}</div>
              <div className="text-xs text-muted mt-0.5 text-pretty">
                {step.description}
              </div>
            </div>
          </li>
        )}
      </ol>
    </div>);

}