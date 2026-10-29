/**
 * Presentation formats — ways to show a project's screens to someone, picked
 * by the `presenter` skill from who's looking and what you want back.
 * Each one is a config file beside the screens, discovered like storyboards:
 *
 * - `screens/**\/<Name>.variants.ts` exporting `variants` → `#/playground/<slug>/variants/<name>`
 * - `screens/**\/<Name>.compare.ts` exporting `compare` → `#/playground/<slug>/compare/<name>`
 * - `screens/**\/<Name>.stage.ts` exporting `stage` → `#/playground/<slug>/stage/<name>`
 * - `screens/**\/<Name>.ideas.ts` exporting `ideas` → `#/playground/<slug>/ideas/<name>`
 *
 * A frame is a screen file plus string props. Props reach the screen through
 * its URL (`#/playground/<slug>/<screen>?embed=1&status=paused`), so a screen
 * opts in by taking optional string props with today's defaults — never by
 * copying it. Keep the same seed data across frames so they compare fairly.
 */

export type PresentationFrame = {
  /** Screen file relative to the project, e.g. `screens/WalletHomePage.tsx`. */
  screen: string
  /** Passed to the screen as string props through its URL. */
  props?: Record<string, string>
  /** The size the screen is drawn at before it's scaled to fit. Default `phone`. */
  viewport?: 'phone' | 'desktop'
}

export type VariantsOption = { id: string; label: string }

export type VariantsControl = {
  id: string
  label: string
  options: VariantsOption[]
  /** Option id shown first — the current direction. */
  default: string
  /** What's decided and what's open about this control. */
  note?: string
}

export type VariantsSection = { label: string; controls: VariantsControl[] }

export type Variants = {
  title: string
  subtitle?: string
  sections: VariantsSection[]
  /** Which screen and props a combination of control values shows. */
  frame: (values: Record<string, string>) => PresentationFrame
  /** Optional note for the current combination, e.g. what's assumed in it. */
  note?: (values: Record<string, string>) => string | undefined
}

export type CompareFrame = {
  /** The decision this frame stands for — never "A" or "B". */
  label: string
  frame: PresentationFrame
  note?: string
  /** Marks the direction that was chosen, when there is one. */
  chosen?: boolean
}

export type Comparison = {
  id: string
  title: string
  /** What to look at across the frames. */
  question: string
  /** Two to four frames. */
  frames: CompareFrame[]
  /** Where the decision is written down, e.g. `decisions.md 2026-10-15 (Review fixes)`. */
  source?: string
}

export type Compare = {
  title: string
  subtitle?: string
  comparisons: Comparison[]
}

export type StageItem = {
  id: string
  /** Facilitator-facing only. The participant never sees it. */
  name: string
  /** What to watch for, what to ask. */
  note?: string
  frame: PresentationFrame
}

/** A setup the facilitator can switch between, e.g. iOS vs Android. Overrides each item's screen and props. */
export type StageScenario = { id: string; label: string; screen?: string; props?: Record<string, string> }

export type Stage = {
  /** Facilitator-facing title, shown in the drawer only. */
  title: string
  /** `linear`: steps of one guided session, in order. `concepts`: separate ideas, any order. */
  mode: 'linear' | 'concepts'
  items: StageItem[]
  scenarios?: StageScenario[]
}

export type IdeaItem = {
  id: string
  title: string
  /** Grouping in the index — a theme, a question, a HMW. */
  group?: string
  frame: PresentationFrame
  /** The question the idea answers, shown first in the notes. */
  prompt?: string
  notes?: { title: string; body: string }[]
}

export type Ideas = {
  title: string
  subtitle?: string
  items: IdeaItem[]
}

/** URL keys the harness uses itself; never use them as screen prop names. */
export const RESERVED_HASH_KEYS = new Set(['embed', 'step', 'mode', 'view', 'frames', 'item', 'start'])

export function framePropsQuery(props: Record<string, string> = {}): string {
  const query = new URLSearchParams({ embed: '1' })
  for (const [key, value] of Object.entries(props)) {
    if (!RESERVED_HASH_KEYS.has(key)) query.set(key, value)
  }
  return query.toString()
}
