import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, SearchIcon } from 'lucide-react';
// Modern composite fields — leading affixes, trailing actions, character counters,
// inline split fields. The grammar designers reach for when "label + input + error"
// isn't expressive enough.
export function RichInputField() {
  const [price, setPrice] = useState('45');
  const [website, setWebsite] = useState('patricia-taylor');
  const [bio, setBio] = useState(
    'Senior advisor, 12 years sharpening lines on Montague Ave.'
  );
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>(['Walk-in', 'VIP', 'First visit']);
  const maxBio = 140;
  const addTag = (t: string) => {
    const v = t.trim().replace(/,$/, '');
    if (!v) return;
    setTags((arr) => Array.from(new Set([...arr, v])));
    setTag('');
  };
  return (
    <div
      className="bg-paper rounded-2xl p-5 space-y-4"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {/* Price — currency affix + country picker */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">
          Service price
        </label>
        <div className="flex items-stretch h-12 rounded-2xl bg-sunken ring-1 ring-inset ring-line focus-within:ring-2 focus-within:ring-ink transition-all">
          <button
            type="button"
            className="flex items-center gap-1 pl-3.5 pr-2 text-[14px] font-bold text-ink active:scale-[0.97] transition-transform">
            
            USD
            <ChevronDownIcon
              className="size-3.5 text-muted"
              strokeWidth={2.5} />
            
          </button>
          <span className="text-[18px] font-bold text-muted self-center">
            $
          </span>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="flex-1 min-w-0 bg-transparent text-[18px] font-bold text-ink tabular-nums outline-none px-1"
            inputMode="decimal" />
          
          <div className="self-center pr-3.5 text-[12px] text-muted">
            per booking
          </div>
        </div>
      </div>

      {/* Subdomain — leading affix + trailing affix */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">
          Booking page
        </label>
        <div className="flex items-stretch h-12 rounded-2xl bg-sunken ring-1 ring-inset ring-line focus-within:ring-2 focus-within:ring-ink transition-all">
          <span className="pl-3.5 self-center text-[14px] text-muted">
            northline.example/
          </span>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="flex-1 min-w-0 bg-transparent text-[14px] font-semibold text-ink outline-none px-0" />
          
          <span className="pr-3.5 self-center text-[11px] font-semibold text-leaf bg-leaf/12 rounded-md px-2 py-1 my-2 mr-2">
            Available
          </span>
        </div>
      </div>

      {/* Bio — textarea + character counter */}
      <div>
        <div className="flex items-baseline justify-between mb-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Short bio
          </label>
          <span className="text-[11px] text-muted tabular-nums">
            {bio.length}/{maxBio}
          </span>
        </div>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value.slice(0, maxBio))}
          rows={3}
          className="w-full rounded-2xl bg-sunken px-3.5 py-3 text-[14px] text-ink leading-snug outline-none resize-none ring-1 ring-inset ring-line focus:ring-2 focus:ring-ink transition-all" />
        
        <div className="relative h-[3px] -mt-1 rounded-full bg-sunken overflow-hidden">
          <motion.span
            className={`absolute inset-y-0 left-0 rounded-full ${bio.length / maxBio > 0.9 ? 'bg-amber' : bio.length / maxBio > 0.7 ? 'bg-leaf' : 'bg-ink/40'}`}
            initial={false}
            animate={{
              width: `${bio.length / maxBio * 100}%`
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }} />
          
        </div>
      </div>

      {/* Tag input — chips + free-typing input */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">
          Tags
        </label>
        <div className="rounded-2xl bg-sunken px-2 py-2 ring-1 ring-inset ring-line focus-within:ring-2 focus-within:ring-ink transition-all flex flex-wrap items-center gap-1.5">
          <SearchIcon
            className="size-4 text-muted ml-1.5"
            strokeWidth={2.5}
            aria-hidden="true" />
          
          {tags.map((t) =>
          <span
            key={t}
            className="inline-flex items-center gap-1 h-7 pl-2.5 pr-1 rounded-lg bg-paper text-[12px] font-semibold text-ink"
            style={{
              boxShadow: 'var(--shadow-border)'
            }}>
            
              {t}
              <button
              type="button"
              aria-label={`Remove ${t}`}
              onClick={() => setTags((arr) => arr.filter((x) => x !== t))}
              className="size-5 rounded-md text-muted hover:text-ink hover:bg-sunken flex items-center justify-center">
              
                ×
              </button>
            </span>
          )}
          <input
            value={tag}
            onChange={(e) => {
              const v = e.target.value;
              if (v.endsWith(',')) addTag(v);else
              setTag(v);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag(tag);
              }
              if (e.key === 'Backspace' && !tag && tags.length) {
                setTags((arr) => arr.slice(0, -1));
              }
            }}
            placeholder={tags.length ? '' : 'Add a tag…'}
            className="flex-1 min-w-[80px] h-7 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted" />
          
        </div>
      </div>
    </div>);

}