import React from 'react';
import { StarIcon, MapPinIcon, HeartIcon, CheckCircle2Icon } from 'lucide-react';
type Place = {
  name: string;
  rating: number;
  reviews: number;
  category: string;
  distance: string;
  price: string;
  hero: string;
  verified?: boolean;
  swatch: 'teal' | 'plum' | 'rose' | 'amber';
};
const swatches: Record<Place['swatch'], string> = {
  teal: 'bg-teal/20',
  plum: 'bg-plum/20',
  rose: 'bg-rose/20',
  amber: 'bg-amber/20'
};
const places: Place[] = [
{
  name: 'Park Avenue Hardware',
  rating: 4.9,
  reviews: 312,
  category: 'Hardware Store',
  distance: '0.4 mi',
  price: '$$',
  hero: 'PB',
  verified: true,
  swatch: 'teal'
},
{
  name: 'Bolt & Brush',
  rating: 4.8,
  reviews: 198,
  category: 'Paint & Decor',
  distance: '0.7 mi',
  price: '$$$',
  hero: 'BB',
  swatch: 'plum'
},
{
  name: 'Soho Tool Hire',
  rating: 4.7,
  reviews: 84,
  category: 'Tool Hire',
  distance: '1.2 mi',
  price: '$$',
  hero: 'ST',
  verified: true,
  swatch: 'rose'
}];

export function MarketplaceListing() {
  return (
    <div className="space-y-3">
      {places.map((p) =>
      <article
        key={p.name}
        className="bg-paper rounded-2xl p-3 flex gap-3"
        style={{
          boxShadow: 'var(--shadow-card)'
        }}>
        
          {/* Hero image placeholder */}
          <div
          className={`relative shrink-0 size-[88px] rounded-xl ${swatches[p.swatch]} flex items-center justify-center text-ink/40 text-2xl font-bold`}
          aria-hidden="true">
          
            {p.hero}
            <button
            type="button"
            aria-label="Save"
            className="absolute top-1.5 right-1.5 size-7 rounded-full bg-paper/90 backdrop-blur flex items-center justify-center active:scale-[0.9] transition-transform">
            
              <HeartIcon className="size-3.5 text-ink" strokeWidth={2.2} />
            </button>
          </div>

          <div className="flex-1 min-w-0 py-0.5">
            <div className="flex items-center gap-1 mb-0.5">
              <h3 className="text-[14px] font-bold text-ink truncate">
                {p.name}
              </h3>
              {p.verified &&
            <CheckCircle2Icon
              className="size-3.5 text-teal shrink-0 fill-teal/20"
              strokeWidth={2.5}
              aria-label="Verified" />

            }
            </div>

            <div className="flex items-center gap-1 text-[12px] text-ink mb-1">
              <StarIcon
              className="size-3 text-amber fill-amber"
              strokeWidth={0}
              aria-hidden="true" />
            
              <span className="font-bold tabular-nums">{p.rating}</span>
              <span className="text-muted tabular-nums">({p.reviews})</span>
              <span className="text-muted-soft mx-0.5">·</span>
              <span className="text-muted truncate">{p.category}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[12px] text-muted">
              <MapPinIcon
              className="size-3"
              strokeWidth={2.5}
              aria-hidden="true" />
            
              <span className="tabular-nums">{p.distance}</span>
              <span className="text-muted-soft mx-0.5">·</span>
              <span className="font-semibold text-ink/70 tabular-nums">
                {p.price}
              </span>
            </div>

            <button
            type="button"
            className="mt-2 h-7 px-3 rounded-lg bg-ink text-paper text-[11px] font-bold active:scale-[0.96] transition-transform">
            
              Book now
            </button>
          </div>
        </article>
      )}
    </div>);

}