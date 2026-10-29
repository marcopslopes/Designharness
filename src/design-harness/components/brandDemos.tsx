import type { ReactNode } from 'react'
import {
  BrandBenefits,
  BrandBigStats,
  BrandBook,
  BrandColour,
  BrandCta,
  BrandFooter,
  BrandHero,
  BrandHeroStats,
  BrandIconFeatures,
  BrandImagery,
  BrandInUse,
  BrandLogo,
  BrandLogoGrid,
  BrandNewsroom,
  BrandPillars,
  BrandPrinciples,
  BrandProductCards,
  BrandQuoteBand,
  BrandScope,
  BrandSplit,
  BrandStories,
  BrandType,
  BrandVoice,
} from './BrandBook'

/** Brand item pages show one chapter each; the Brand book page shows them all. */
const chapter = (body: () => ReactNode) =>
  function BrandChapter() {
    return <BrandScope>{body()}</BrandScope>
  }

export const BRAND_DEMOS: Record<string, () => ReactNode> = {
  'brand/book/the-book': BrandBook,
  'brand/book/principles': chapter(BrandPrinciples),
  'brand/book/logo': chapter(BrandLogo),
  'brand/book/colour': chapter(BrandColour),
  'brand/book/type': chapter(BrandType),
  'brand/book/imagery': chapter(BrandImagery),
  'brand/book/voice': chapter(BrandVoice),
  'brand/book/in-use': chapter(BrandInUse),
  'brand/components/brand-book': BrandBook,
  'brand/theme/brand-colours': () => (
    <BrandScope>
      <BrandColour />
    </BrandScope>
  ),
  'brand/theme/display-type': () => (
    <BrandScope>
      <BrandType />
    </BrandScope>
  ),
  'brand/theme/imagery': () => (
    <BrandScope>
      <BrandImagery />
    </BrandScope>
  ),
  'brand/theme/voice': () => (
    <BrandScope>
      <BrandVoice />
    </BrandScope>
  ),
  'brand/assets/logo': () => (
    <BrandScope>
      <BrandLogo />
    </BrandScope>
  ),
  'brand/assets/fonts': () => (
    <BrandScope>
      <BrandType />
    </BrandScope>
  ),
  'brand/components/hero': () => (
    <BrandScope>
      <BrandHero />
    </BrandScope>
  ),
  'brand/components/feature-band': () => (
    <BrandScope>
      <BrandPillars />
    </BrandScope>
  ),
  'brand/components/split-section': () => (
    <BrandScope>
      <BrandSplit />
    </BrandScope>
  ),
  'brand/components/cta-band': () => (
    <BrandScope>
      <BrandCta />
    </BrandScope>
  ),
  'brand/components/hero-with-stats': () => (
    <BrandScope>
      <BrandHeroStats />
    </BrandScope>
  ),
  'brand/components/product-cards': () => (
    <BrandScope>
      <BrandProductCards />
    </BrandScope>
  ),
  'brand/components/benefit-columns': () => (
    <BrandScope>
      <BrandBenefits />
    </BrandScope>
  ),
  'brand/components/icon-features': () => (
    <BrandScope>
      <BrandIconFeatures />
    </BrandScope>
  ),
  'brand/components/quote-band': () => (
    <BrandScope>
      <BrandQuoteBand />
    </BrandScope>
  ),
  'brand/components/big-stats': () => (
    <BrandScope>
      <BrandBigStats />
    </BrandScope>
  ),
  'brand/components/newsroom': () => (
    <BrandScope>
      <BrandNewsroom />
    </BrandScope>
  ),
  'brand/components/story-cards': () => (
    <BrandScope>
      <BrandStories />
    </BrandScope>
  ),
  'brand/components/logo-grid': () => (
    <BrandScope>
      <BrandLogoGrid />
    </BrandScope>
  ),
  'brand/components/footer': () => (
    <BrandScope>
      <BrandFooter />
    </BrandScope>
  ),
}

export const WIDE_DEMOS = new Set(['brand/book/the-book', 'brand/book/in-use', 'brand/components/brand-book'])
