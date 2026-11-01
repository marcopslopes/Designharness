/**
 * App identity + harness behaviour from the gitignored `harness.config.local.json`
 * (written by `#/settings` through `scripts/harness-settings-plugin.ts`). A missing file or
 * key falls back to the defaults below, which match the harness's behaviour before settings existed.
 */
export type HarnessTheme = 'dark' | 'light'
export type AuditMode = 'after-builds' | 'on-share'

export type HarnessConfig = {
  /** On unless set false. Company-sourced projects then stay in gitignored `projects.local/`. */
  publicRepo: boolean
  harness: { name: string; tagline: string; defaultTheme: HarnessTheme }
  behaviour: {
    audit: AuditMode
    storyboardOffer: boolean
    caseStudyDraft: boolean
    variantForks: boolean
    tasteCheckpoint: boolean
    handoffNudge: boolean
    gitAutopilot: boolean
  }
}

export const DEFAULT_HARNESS_CONFIG: HarnessConfig = {
  publicRepo: true,
  harness: {
    name: 'Design Harness',
    tagline: 'Prototypes, the design system, and the docs, in one place.',
    defaultTheme: 'dark',
  },
  behaviour: {
    audit: 'after-builds',
    storyboardOffer: true,
    caseStudyDraft: true,
    variantForks: true,
    tasteCheckpoint: true,
    handoffNudge: true,
    gitAutopilot: false,
  },
}

type RawConfig = Partial<HarnessConfig> & { studio?: HarnessConfig['harness'] }

const local = Object.values(
  import.meta.glob<RawConfig>('/harness.config.local.json', { eager: true, import: 'default' }),
)[0]

const identity = local?.harness ?? local?.studio ?? {}

export const HARNESS_CONFIG: HarnessConfig = {
  publicRepo: local?.publicRepo !== false,
  harness: { ...DEFAULT_HARNESS_CONFIG.harness, ...identity },
  behaviour: { ...DEFAULT_HARNESS_CONFIG.behaviour, ...(local?.behaviour ?? {}) },
}

export const HARNESS_NAME = HARNESS_CONFIG.harness.name.trim() || DEFAULT_HARNESS_CONFIG.harness.name
export const HARNESS_TAGLINE = HARNESS_CONFIG.harness.tagline.trim()
