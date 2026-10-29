/**
 * A storyboard is a guided tour beside a live project screen: steps in a side
 * panel, the screen in an iframe, and a spotlight on the element each step
 * explains. A project opts in with `screens/**\/<Name>.storyboard.ts`
 * exporting `storyboard`; it opens at `#/playground/<slug>/storyboard/<name>`.
 *
 * Selectors are the screen's own classes / aria-labels. If one changes, that
 * step's spotlight disappears and the page says so — fix the selector here.
 * Never put a number in `evidence` that isn't in the project's sources.
 */

export type StoryboardTarget = {
  selector: string
  /** Which match, when the selector hits several. Default 0. */
  nth?: number
  /** Only the match whose text includes this. */
  text?: string
  /** Look inside this element instead of the whole page. */
  within?: StoryboardTarget
}

export type StoryboardAction = { click: StoryboardTarget }

export type StoryboardStep = {
  id: string
  chapter: string
  title: string
  why: string
  /** Where the "why" comes from — a source, or that it's an assumption. */
  evidence?: string
  try?: string
  /**
   * One tap deeper, behind "Notes": research quotes, review findings, spec
   * notes. Paragraphs split by a blank line; lines starting `- ` are bullets.
   */
  notes?: string
  /** Clicks run inside the screen, in order, before the spotlight. */
  setup?: StoryboardAction[]
  targets: StoryboardTarget[]
}

/**
 * A "Start from" link on the first step: replays the tour with the screen
 * seeded by `props` (string props, like a presentation frame). `id: null` is
 * the screen's own default and should come first.
 */
export type StoryboardStart = {
  id: string | null
  label: string
  props?: Record<string, string>
  /** Step id the tour opens on. Default: the first step. */
  step?: string
}

export type Storyboard = {
  title: string
  subtitle?: string
  /** Screen file relative to the project, e.g. `screens/mobile/ClientsListMobilePage.tsx`. */
  screen: string
  steps: StoryboardStep[]
  starts?: StoryboardStart[]
}
