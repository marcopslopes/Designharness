import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { FrameCalendarMark, FrameCheck, FrameClose, FrameDollar, FrameLink, FrameRepeat } from '../harnessIcons'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import { Button, Icon, Toast } from '../../../context/design-system/ds'
import handsAtWork from '../assets/brand/hands.jpg'
import handsWide from '../assets/brand/hands-wide.jpg'
import phoneBetween from '../assets/brand/phone.jpg'
import roomBefore from '../assets/brand/room.jpg'
import type { DesignSystemRoute } from '../designSystems'
import { ArrowButton, Band, CtaCard } from './DocParts'
import {
  BenefitColumns,
  BigStats,
  FeatureRow,
  Hero,
  HeroStats,
  IconFeatures,
  LogoGrid,
  LogoStrip,
  MarketingFooter,
  NewsMosaic,
  ProductCards,
  QuoteBand,
  SplitSection,
  StoryCards,
  Wordmark,
} from './MarketingParts'

/**
 * Brand system — the brand book. Every word comes from the brand's voice and
 * business files; the example brand is Northline (`context/org-pack/`), which
 * is fictional. Colours resolve from tokens, so contrast is measured, not typed.
 */

const NAME = 'Northline'
const BRAND_ROUTE = 'design-system/systems/brand' as DesignSystemRoute

/** Light, brand-coloured surface — keeps the brand's look in either Harness theme. */
export function BrandScope({ children }: { children: ReactNode }) {
  return (
    <div className="design-harness-brand-book" data-theme="light">
      {children}
    </div>
  )
}

function Chapter({
  id,
  number,
  title,
  lead,
  children,
}: {
  id: string
  number: string
  title: string
  lead: string
  children: ReactNode
}) {
  return (
    <section className="design-harness-brand-book__chapter" id={`brand-${id}`} aria-labelledby={`brand-${id}-title`}>
      <header className="design-harness-brand-book__chapter-head">
        <span className="design-harness-brand-book__number">{number}</span>
        <h2 id={`brand-${id}-title`} className="design-harness-brand-book__title">
          {title}
        </h2>
        <p className="design-harness-brand-book__lead">{lead}</p>
      </header>
      {children}
    </section>
  )
}

function Rule({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <li className="design-harness-brand-book__rule" data-ok={ok}>
      <Icon icon={ok ? FrameCheck : FrameClose} size="sm" />
      <span>{children}</span>
    </li>
  )
}

/* ——— Cover ——— */

export function BrandCover() {
  return (
    <header className="design-harness-brand-book__cover">
      <p className="design-harness-brand-book__cover-kicker">Brand book · Example</p>
      <Wordmark size="xl" name={NAME} />
      <p className="design-harness-brand-book__cover-line">
        The calm back office for people who work with their hands.
      </p>
      <p className="design-harness-brand-book__cover-note">
        {NAME} is a fictional company made up for this harness. Swap in your own brand and this book follows.
      </p>
    </header>
  )
}

/* ——— 01 Principles ——— */

export function BrandPrinciples() {
  return (
    <>
      <FeatureRow
        cells={[
          { title: 'Calm', text: 'The app never adds stress to a busy day.' },
          { title: 'Specific', text: 'Names the client, the time, the amount.' },
          { title: 'On your side', text: 'Talks like a good front-desk colleague, not a vendor.' },
        ]}
      />
      <p className="design-harness-brand-book__aside">Not chirpy, salesy, technical or precious.</p>
    </>
  )
}

/* ——— 02 Logo ——— */

const LOGO_SURFACES = [
  { id: 'paper', label: 'On paper' },
  { id: 'deep', label: 'On deep teal' },
  { id: 'ink', label: 'On ink' },
] as const

const LOGO_DONTS: { label: string; style: CSSProperties }[] = [
  { label: "Don't stretch or squash it", style: { transform: 'scale(1.4, 0.7)' } },
  { label: "Don't set it in another typeface", style: { fontFamily: 'inherit', fontWeight: 700, letterSpacing: 0 } },
  { label: "Don't recolour it outside the palette", style: { color: 'var(--kit-brand-60)' } },
]

export function BrandLogo() {
  return (
    <div className="design-harness-brand-book__stack">
      <div className="design-harness-brand-book__tiles" data-count="3">
        {LOGO_SURFACES.map((surface) => (
          <figure key={surface.id} className="design-harness-brand-book__tile" data-surface={surface.id}>
            <Wordmark size="lg" name={NAME} />
            <figcaption>{surface.label}</figcaption>
          </figure>
        ))}
      </div>
      <div className="design-harness-brand-book__tiles" data-count="2">
        <figure className="design-harness-brand-book__tile" data-surface="sand">
          <span className="design-harness-brand-book__clearspace">
            <Wordmark size="lg" name={NAME} />
          </span>
          <figcaption>Clear space — the height of the F, on every side.</figcaption>
        </figure>
        <figure className="design-harness-brand-book__tile" data-surface="sand">
          <span className="design-harness-brand-book__min">
            <Wordmark size="sm" name={NAME} />
          </span>
          <figcaption>Smallest size — 16px tall on screen. Below that, write the name in text.</figcaption>
        </figure>
      </div>
      <div className="design-harness-brand-book__tiles" data-count="3">
        {LOGO_DONTS.map((dont) => (
          <figure key={dont.label} className="design-harness-brand-book__tile" data-surface="paper" data-dont>
            <span className="design-harness-wordmark" data-size="lg" style={dont.style}>
              {NAME}
            </span>
            <figcaption>
              <Icon icon={FrameClose} size="sm" /> {dont.label}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="design-harness-brand-book__aside">
        The name is the logo — a word set in the display serif. There is no symbol; don't draw one.
      </p>
    </div>
  )
}

/* ——— 03 Colour ——— */

type Rgb = [number, number, number]

const parseRgb = (value: string): Rgb | null => {
  const match = value.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/)
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null
}

const luminance = ([r, g, b]: Rgb) => {
  const channel = (c: number) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

const contrast = (a: Rgb, b: Rgb) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const toHex = (rgb: Rgb) => `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`

/** Reads what a set of CSS colours actually resolve to on this page. */
function useResolvedColours(tokens: readonly string[]) {
  const ref = useRef<HTMLSpanElement>(null)
  const [colours, setColours] = useState<Record<string, Rgb>>({})
  const key = tokens.join()
  useLayoutEffect(() => {
    const probe = ref.current
    if (!probe) return
    const next: Record<string, Rgb> = {}
    for (const token of key.split(',')) {
      probe.style.color = `var(${token})`
      const rgb = parseRgb(getComputedStyle(probe).color)
      if (rgb) next[token] = rgb
    }
    setColours(next)
  }, [key])
  return { probe: <span ref={ref} hidden />, colours }
}

const PALETTE = [
  { token: '--color-bg-brand-dark', name: 'Deep teal', use: 'Covers, bands and the big moments.' },
  { token: '--kit-brand', name: 'Teal', use: 'The one thing to tap — buttons and links.' },
  { token: '--brand-paper', name: 'Paper', use: 'Page background.' },
  { token: '--brand-sand', name: 'Sand', use: 'Bands, cards and image frames on paper.' },
  { token: '--kit-ink', name: 'Ink', use: 'Text, and the wordmark on light.' },
  { token: '--kit-premium', name: 'Plum', use: 'Premium features only.' },
] as const

const PAIRS = [
  { text: '--kit-ink', on: '--brand-paper', label: 'Ink on paper' },
  { text: '--brand-paper', on: '--color-bg-brand-dark', label: 'Paper on deep teal' },
  { text: '--brand-paper', on: '--kit-brand', label: 'Paper on teal' },
  { text: '--kit-brand', on: '--brand-sand', label: 'Teal on sand' },
  { text: '--kit-premium', on: '--brand-paper', label: 'Plum on paper' },
  { text: '--kit-brand', on: '--color-bg-brand-dark', label: 'Teal on deep teal' },
] as const

const ALL_TOKENS = [...new Set([...PALETTE.map((p) => p.token), ...PAIRS.flatMap((p) => [p.text, p.on])])]

const grade = (ratio: number) => (ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'Large text only' : 'Fails')

export function BrandColour() {
  const { probe, colours } = useResolvedColours(ALL_TOKENS)
  const ink = colours['--kit-ink']
  const paper = colours['--brand-paper']
  return (
    <div className="design-harness-brand-book__stack">
      {probe}
      <ul className="design-harness-brand-book__swatches">
        {PALETTE.map((swatch) => {
          const rgb = colours[swatch.token]
          const best = rgb && ink && paper ? Math.max(contrast(rgb, ink), contrast(rgb, paper)) : null
          return (
            <li key={swatch.token}>
              <span className="design-harness-brand-book__chip" style={{ background: `var(${swatch.token})` }} />
              <strong>{swatch.name}</strong>
              <code className="design-harness__code">{rgb ? toHex(rgb) : '—'}</code>
              <span className="design-harness-brand-book__muted">{swatch.use}</span>
              <span className="design-harness-brand-book__muted">
                <code className="design-harness__code">{swatch.token}</code>
                {best ? ` · ${best.toFixed(1)}:1 best text` : ''}
              </span>
            </li>
          )
        })}
      </ul>
      <h3 className="design-harness-brand-book__subhead">Pairs</h3>
      <ul className="design-harness-brand-book__pairs">
        {PAIRS.map((pair) => {
          const a = colours[pair.text]
          const b = colours[pair.on]
          const ratio = a && b ? contrast(a, b) : null
          return (
            <li key={pair.label} style={{ color: `var(${pair.text})`, background: `var(${pair.on})` }}>
              <span className="design-harness-brand-book__pair-sample">Aa</span>
              <span>{pair.label}</span>
              <span className="design-harness-brand-book__pair-grade">
                {ratio ? `${ratio.toFixed(1)}:1 · ${grade(ratio)}` : '—'}
              </span>
            </li>
          )
        })}
      </ul>
      <p className="design-harness-brand-book__aside">
        Ratios are measured from the tokens on this page, so they stay true when a colour changes.
      </p>
    </div>
  )
}

/* ——— 04 Type ——— */

const TYPE_SCALE = [
  {
    name: 'Display 1',
    spec: 'Instrument Serif · 64 / 1.0',
    role: 'display',
    size: 'd1',
    sample: 'Headlines carry the page.',
  },
  {
    name: 'Display 2',
    spec: 'Instrument Serif · 44 / 1.05',
    role: 'display',
    size: 'd2',
    sample: 'A second size, still the serif.',
  },
  {
    name: 'Display 3',
    spec: 'Instrument Serif · 30 / 1.1',
    role: 'display',
    size: 'd3',
    sample: 'Small enough for a card.',
  },
  {
    name: 'Lead',
    spec: 'Geist · 20 / 1.45',
    role: 'text',
    size: 'lead',
    sample: 'The line under a headline, in the text face.',
  },
  {
    name: 'Body',
    spec: 'Geist · 16 / 1.55',
    role: 'text',
    size: 'body',
    sample: 'Body copy is what people actually read.',
  },
  { name: 'Small', spec: 'Geist · 14 / 1.5', role: 'text', size: 'small', sample: 'Notes and captions sit here.' },
  { name: 'Label', spec: 'Geist medium · 12 / caps', role: 'text', size: 'label', sample: 'Section label' },
] as const

export function BrandType() {
  return (
    <div className="design-harness-brand-book__stack">
      <div className="design-harness-brand-book__tiles" data-count="2">
        <figure className="design-harness-brand-book__tile design-harness-brand-book__specimen" data-surface="sand">
          <span className="design-harness-brand-book__specimen-glyph" data-role="display">
            Aa<em>Aa</em>
          </span>
          <figcaption>
            <strong>Instrument Serif</strong> — headlines, the wordmark, big numbers. Regular and italic; italic marks
            the one word that matters.
          </figcaption>
        </figure>
        <figure className="design-harness-brand-book__tile design-harness-brand-book__specimen" data-surface="paper">
          <span className="design-harness-brand-book__specimen-glyph" data-role="text">
            Aa
          </span>
          <figcaption>
            <strong>Geist</strong> — everything you read or tap: body, buttons, labels, forms.
          </figcaption>
        </figure>
      </div>
      <ol className="design-harness-brand-book__scale">
        {TYPE_SCALE.map((step) => (
          <li key={step.name}>
            <span className="design-harness-brand-book__scale-meta">
              <strong>{step.name}</strong>
              <span>{step.spec}</span>
            </span>
            <span className="design-harness-brand-book__scale-sample" data-role={step.role} data-size={step.size}>
              {step.sample}
            </span>
          </li>
        ))}
      </ol>
      <p className="design-harness-brand-book__aside">
        Both are open-source: Instrument Serif and Geist ship with the harness.
      </p>
    </div>
  )
}

/* ——— 05 Imagery ——— */

const SHOTS = [
  { src: handsAtWork, caption: 'Hands at work, close — a cut, a set of screws, a line of ink.' },
  { src: roomBefore, caption: 'The room before the first client: light on, tools out.' },
  { src: phoneBetween, caption: 'A phone in one hand between clients.' },
]

export function BrandImagery() {
  return (
    <div className="design-harness-brand-book__stack">
      <div className="design-harness-brand-book__tiles" data-count="3">
        {SHOTS.map((shot) => (
          <figure key={shot.caption} className="design-harness-brand-book__shot">
            <img className="design-harness-brand-book__shot-frame" src={shot.src} alt="" />
            <figcaption>{shot.caption}</figcaption>
          </figure>
        ))}
      </div>
      <ul className="design-harness-brand-book__rules">
        <Rule ok>Real people doing their craft, in daylight.</Rule>
        <Rule ok>The work in the frame, the face optional.</Rule>
        <Rule ok={false}>Stock smiles at the camera.</Rule>
        <Rule ok={false}>Product screenshots without a person or place around them.</Rule>
      </ul>
      <p className="design-harness-brand-book__aside">
        Stand-in photos, generated to the brief. Swap them for real photography when you have it.
      </p>
    </div>
  )
}

/* ——— 06 Voice ——— */

const VOICE = [
  {
    rule: 'Say what changed, then what to do',
    yes: 'Ana moved to 3:30. Your 4:00 is still free.',
    no: 'An appointment has been rescheduled. Please review your calendar.',
  },
  {
    rule: 'Lead with the job, not the feature',
    yes: 'Ask for a deposit on long sessions.',
    no: 'Turn on Northline Holds.',
  },
  {
    rule: 'Numbers beat adjectives',
    yes: '6 regulars are past their usual rebook date.',
    no: 'Lots of your regulars are overdue.',
  },
]

export function BrandVoice() {
  return (
    <ul className="design-harness-brand-book__voice">
      {VOICE.map((item) => (
        <li key={item.rule}>
          <h3>{item.rule}</h3>
          <ul className="design-harness-brand-book__rules">
            <Rule ok>“{item.yes}”</Rule>
            <Rule ok={false}>“{item.no}”</Rule>
          </ul>
        </li>
      ))}
    </ul>
  )
}

/* ——— 07 In use ——— */

const PILLARS = [
  { title: 'Calm calendar', text: 'Fewer gaps, fewer surprises.', icon: FrameCalendarMark },
  { title: 'Repeat clients', text: 'Your regulars, kept.', icon: FrameRepeat },
  { title: 'Clear money', text: "Know what you earned and what's owed.", icon: FrameDollar },
]

export function BrandHero() {
  return (
    <Hero
      kicker={`${NAME} Studio · For providers`}
      title="Fewer gaps, *fewer surprises*."
      lead="Booking, rescheduling, holds and buffers — the day runs the way you planned it."
      actions={<ArrowButton tone="forest">Share your booking link</ArrowButton>}
      media={
        <figure className="design-harness-brand-book__shot" data-shape="banner">
          <img className="design-harness-brand-book__shot-frame" src={handsWide} alt="" />
          <figcaption>Photo: hands at work, close.</figcaption>
        </figure>
      }
    />
  )
}

export function BrandPillars() {
  return (
    <Band tone="dark" kicker="Three pillars" title="Every feature maps to one of these.">
      <FeatureRow cells={PILLARS} />
    </Band>
  )
}

export function BrandSplit() {
  return (
    <SplitSection
      title="Your regulars, *kept*."
      columns={[
        'Rebooking prompts, reminders and Broadcasts keep the clients you already have.',
        `${NAME} measures success in rebooked clients, not new sign-ups.`,
      ]}
      aside={<Wordmark name={NAME} />}
    />
  )
}

export function BrandCta() {
  return (
    <CtaCard
      title="Know what you earned and what's owed."
      description="Deposits, payouts, tips and simple earnings views — no accounting degree required."
      action={<ArrowButton tone="light">See your earnings</ArrowButton>}
    />
  )
}

export function BrandFooter() {
  return (
    <MarketingFooter
      name={NAME}
      columns={[
        {
          title: 'Apps',
          links: [
            { label: `${NAME} Studio`, route: BRAND_ROUTE },
            { label: NAME, route: BRAND_ROUTE },
          ],
        },
        {
          title: 'Pillars',
          links: PILLARS.map((pillar) => ({ label: pillar.title, route: BRAND_ROUTE })),
        },
      ]}
      finePrint={`${NAME} is a fictional company, made up for this harness.`}
    />
  )
}

export function BrandHeroStats() {
  return (
    <HeroStats
      title="The calm back office for people who *work with their hands*."
      lead="Booking, reminders and payments for paint, screws, brows and lashes, plumbing and tattoo."
      action={<ArrowButton tone="forest">Share your booking link</ArrowButton>}
      stats={[
        { value: '2', label: `apps — ${NAME} Studio for providers, ${NAME} for their clients` },
        { value: '3', label: 'pillars every feature maps to' },
        { value: '5', label: 'crafts, each with its own booking shape' },
      ]}
      logos={<LogoStrip count={6} />}
    />
  )
}

export function BrandProductCards() {
  return (
    <ProductCards
      cards={[
        {
          title: 'Calm calendar',
          text: 'Booking, rescheduling, holds and buffers.',
          ui: <Toast intent="brand">Ana moved to 3:30. Your 4:00 is still free.</Toast>,
        },
        {
          title: 'Repeat clients',
          text: 'Rebooking prompts, reminders and Broadcasts.',
          ui: <Toast intent="neutral">Reminder sent to Ana.</Toast>,
        },
        {
          title: 'Clear money',
          text: 'Deposits, payouts, tips and simple earnings views.',
          ui: <Toast intent="leaf">Your first payout is on its way.</Toast>,
        },
        {
          title: NAME,
          text: 'For clients: book, move or pay in a few taps.',
          ui: <Button intent="primary">Book</Button>,
        },
      ]}
    />
  )
}

export function BrandBenefits() {
  return (
    <BenefitColumns
      items={[
        {
          title: 'Solo',
          text: 'One chair or room. The professional is also the receptionist, marketer and bookkeeper.',
        },
        {
          title: 'Studio',
          text: '2–10 people under one owner. Shared calendar, staff permissions, commission splits.',
        },
        { title: 'Multi-site', text: 'Two or more locations. Reporting and settings work per site and across sites.' },
      ]}
    />
  )
}

export function BrandIconFeatures() {
  return (
    <IconFeatures
      items={[
        { icon: FrameLink, title: 'Share your booking link', text: 'Clients book online instead of by text message.' },
        {
          icon: FrameRepeat,
          title: 'Keep your regulars',
          text: 'Reminders and rebooking prompts bring them back on schedule.',
        },
        { icon: FrameDollar, title: "Know what's owed", text: 'Deposits on long sessions, and payouts you can see.' },
      ]}
    />
  )
}

export function BrandQuoteBand() {
  return <QuoteBand brief="Hands at work, close, in daylight." />
}

export function BrandBigStats() {
  return (
    <BigStats
      intro={
        <>
          <p>
            Providers bring their own clients. The first weeks are about moving them from text messages to online
            booking.
          </p>
          <p>In this example, that's how activation is measured.</p>
        </>
      }
      stats={[
        { value: '3', label: 'online bookings to count as active' },
        { value: '21', label: 'days from sign-up to get there' },
      ]}
    />
  )
}

export function BrandNewsroom() {
  return (
    <NewsMosaic
      items={Array.from({ length: 5 }, (_, index) => ({
        date: 'Date',
        title: index === 0 ? 'A real announcement goes here' : 'Headline',
        brief: 'Photo for the story.',
      }))}
    />
  )
}

export function BrandStories() {
  return (
    <StoryCards
      stories={[
        { tag: 'Solo', brief: 'Portrait at their chair.' },
        { tag: 'Studio', brief: 'Portrait with the team.' },
        { tag: 'Multi-site', brief: 'Portrait at the front desk.' },
      ]}
    />
  )
}

export function BrandLogoGrid() {
  return <LogoGrid count={10} />
}

export function BrandInUse() {
  return (
    <div className="design-harness-brand-book__stack design-harness-brand-book__stack--loose">
      <BrandHero />
      <BrandProductCards />
      <BrandPillars />
      <BrandBenefits />
      <BrandSplit />
      <BrandIconFeatures />
      <BrandQuoteBand />
      <BrandBigStats />
      <BrandHeroStats />
      <BrandStories />
      <BrandNewsroom />
      <BrandLogoGrid />
      <BrandCta />
      <BrandFooter />
    </div>
  )
}

/* ——— The book ——— */

const CHAPTERS = [
  { id: 'principles', title: 'Principles', lead: 'How it should feel, in three words.', body: BrandPrinciples },
  {
    id: 'logo',
    title: 'Logo',
    lead: 'A wordmark in the display serif — where it goes and how it stays intact.',
    body: BrandLogo,
  },
  {
    id: 'colour',
    title: 'Colour',
    lead: 'Deep teal and paper lead; teal is for action; plum is rare.',
    body: BrandColour,
  },
  { id: 'type', title: 'Type', lead: 'A serif to speak, a sans to work.', body: BrandType },
  { id: 'imagery', title: 'Imagery', lead: 'The craft, not the software.', body: BrandImagery },
  { id: 'voice', title: 'Voice', lead: 'Calm, specific, on your side.', body: BrandVoice },
  { id: 'in-use', title: 'In use', lead: 'The marketing blocks, wearing the brand.', body: BrandInUse },
] as const

const scrollTo = (id: string) =>
  document.getElementById(`brand-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

export function BrandBook() {
  return (
    <BrandScope>
      <BrandCover />
      <nav className="design-harness-brand-book__index" aria-label="Chapters">
        {CHAPTERS.map((chapter, index) => (
          <button key={chapter.id} type="button" onClick={() => scrollTo(chapter.id)}>
            <span>{String(index + 1).padStart(2, '0')}</span> {chapter.title}
          </button>
        ))}
      </nav>
      {CHAPTERS.map((chapter, index) => (
        <Chapter
          key={chapter.id}
          id={chapter.id}
          number={String(index + 1).padStart(2, '0')}
          title={chapter.title}
          lead={chapter.lead}
        >
          <chapter.body />
        </Chapter>
      ))}
    </BrandScope>
  )
}
