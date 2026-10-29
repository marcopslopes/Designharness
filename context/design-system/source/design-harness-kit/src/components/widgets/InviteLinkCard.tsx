import React, { useState } from 'react';
import {
  CopyIcon,
  CheckIcon,
  MessageCircleIcon,
  InstagramIcon,
  Share2Icon } from
'lucide-react';
export function InviteLinkCard() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div
      className="bg-white rounded-2xl p-4"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}>
      
      <div className="text-[11px] font-bold text-muted uppercase tracking-widest mb-2">
        Your invite link
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 px-3 py-2.5 bg-surface-2 rounded-lg text-sm font-mono text-ink-soft truncate">
          boost.app/r/tomas-doe
        </div>
        <button
          onClick={handleCopy}
          className="px-3 py-2.5 bg-ink text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-ink-soft transition-[transform,background-color] active:scale-[0.96] flex-shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          type="button"
          aria-label="Copy invite link">
          
          {copied ?
          <CheckIcon className="w-3.5 h-3.5" /> :

          <CopyIcon className="w-3.5 h-3.5" />
          }
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <ShareButton
          icon={<MessageCircleIcon className="w-5 h-5" strokeWidth={2} />}
          label="WhatsApp"
          tint="success" />
        
        <ShareButton
          icon={<InstagramIcon className="w-5 h-5" strokeWidth={2} />}
          label="Instagram"
          tint="pink" />
        
        <ShareButton
          icon={<Share2Icon className="w-5 h-5" strokeWidth={2} />}
          label="More"
          tint="gray" />
        
      </div>
    </div>);

}
interface ShareButtonProps {
  icon: React.ReactNode;
  label: string;
  tint: 'success' | 'pink' | 'gray';
}
function ShareButton({ icon, label, tint }: ShareButtonProps) {
  const styles = {
    success: 'bg-success-soft text-success hover:brightness-95',
    pink: 'text-pink-600 hover:brightness-95',
    gray: 'bg-surface-2 text-ink-soft hover:bg-line'
  };
  const customStyle =
  tint === 'pink' ?
  {
    backgroundColor: 'rgba(236, 72, 153, 0.08)'
  } :
  undefined;
  return (
    <button
      className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-lg transition-[transform,filter,background-color] active:scale-[0.96] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 ${styles[tint]}`}
      style={customStyle}
      type="button"
      aria-label={`Share via ${label}`}>
      
      {icon}
      <span className="text-[10px] font-semibold">{label}</span>
    </button>);

}