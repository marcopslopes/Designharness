/**
 * Team Gallery data — Design Harness (`#/gallery`).
 *
 * Two sources, nothing else:
 * - **Projects** come from each committed `projects/<slug>/brief.md` at build
 *   time (`projectsIndex.ts`) — only its "Ownership" and "Why" fields (see
 *   `projects/_template/brief.md`; older briefs: "Case study summary"). A project
 *   appears under the designer whose `name` matches its `Designer:` line, when
 *   `Gallery:` isn't `hidden` and Problem and What changes are filled. No hand copy.
 * - **Designer profiles** (`title`, `focusAreas`, `avatarUrl`) are written
 *   here by `harness/references/gallery-card-enrichment.md`. A brief naming a
 *   designer who isn't listed here stays unlisted — that's the enrichment gate.
 *
 * PRIVACY BOUNDARY: never read `decisions.md`, `findings.md`, or `log.md` —
 * those files hold candid rationale, rejected ideas, and informal notes about
 * people, and must stay repo-only, never surfaced in this UI. Better card copy
 * means improving the *brief*, not reaching into raw task notes.
 *
 * **Never** read `designer-profile.local.md` when writing a designer card — that
 * profile is local-only (never pushed). The gallery is shared/deployed and
 * may only reflect committed repo data.
 *
 * **Never** pre-populate designer names from `COMPANY-SQUADS.md` (org-pack) or
 * any other roster. A designer appears here only after first gallery
 * eligibility + card enrichment (`harness/references/gallery-card-enrichment.md`)
 * succeeds — triggered proactively from task-intake / design-kickoff when
 * Ownership is written, with audit Step 3.5 as safety net.
 *
 * **Designer-section trigger:** one eligible mirrored project is enough.
 * `getVisibleGalleryDesigners` keeps any designer with ≥1 visible project —
 * there is no "wait for a second project" threshold and no empty
 * placeholder designer cards.
 *
 * **Designer card (required):** `role`, `focusAreas`, and
 * `avatarUrl`, one file per designer in `gallery-designers/` — resolved via `harness/references/gallery-card-enrichment.md`.
 * Never invent; never ship a card with only `name` + projects.

 */

import { truthLine } from './projectFacts'
import { PROJECTS, type Project } from './projectsIndex'
import type { ProjectRoute } from './routes'

export type GalleryVisibility = 'visible' | 'hidden'

export type GalleryCaseStudy = {
  problem: string
  goal: string
  status: string
}

/** Optional deeper brief distill — shown in the gallery detail modal. */
export type GalleryProjectLink = {
  label: string
  href: string
}

export type GalleryProjectDetail = {
  /** Brief "Why are we doing this?" */
  why: string
  /** Brief "What problem… for whom?" */
  forWhom: string
  /** Brief "How will we know it worked?" */
  successSignal: string
  /** Short open questions from brief §6 (public wording only). */
  openQuestions?: string[]
  /** Public ticket / doc links from the brief (not Slack dumps). */
  links?: GalleryProjectLink[]
}

export type GalleryProject = {
  /** Matches `projects/<slug>/`. */
  slug: string
  title: string
  /** From brief.md: problem and goal from the case study, status from the truth block. */
  caseStudy: GalleryCaseStudy
  /**
   * Optional — brief "three questions" + open questions + public links.
   * Powers the gallery detail modal. Still brief-only; never findings/decisions/log.
   */
  detail?: GalleryProjectDetail
  /**
   * The project's Design Harness page (`playground/<slug>`), set when it has at
   * least one screen. When unset, the gallery shows "No prototype yet".
   */
  prototypeRoute?: ProjectRoute
  /** The project's page — the same one All prototypes opens. Unset for the fictional examples. */
  projectRoute?: ProjectRoute
  /** Card line, e.g. "2 screens". */
  screenCount?: number
  /** "{Status} · {top unknown}" from the brief's truth block. */
  line?: string
  /**
   * Standalone HTML or external prototype URL (e.g. `/projects/<slug>/prototype.html`).
   * Used when the deliverable is not a Design Harness playground route.
   */
  prototypeHref?: string
  /** Short label for the prototype CTA in the detail modal. */
  prototypeLabel?: string
  gallery: GalleryVisibility
}

/**
 * One file per designer in `src/design-harness/gallery-designers/<slug>.ts`, default-exporting
 * this shape. Public-safe only: nothing from `designer-profile.local.md`.
 * Recipe: `harness/references/gallery-card-enrichment.md`.
 */
export type DesignerCard = {
  name: string
  /** Job title, e.g. "Product Designer". */
  role: string
  /** 2–4 short public focus labels. */
  focusAreas: string[]
  /** Avatar under `public/`, e.g. `/design-harness/avatars/jane-doe.png`. Omitted → initials. */
  avatarUrl?: string
}

export type GalleryDesigner = DesignerCard & {
  /** From the file name; the designer's page is `#/gallery/<slug>`. */
  slug: string
  /** From each project's `brief.md` whose `Designer:` matches `name` — never a hand-kept list. */
  projects: GalleryProject[]
}

const cardFiles = import.meta.glob<DesignerCard>('./gallery-designers/*.ts', { eager: true, import: 'default' })

export const GALLERY_DESIGNERS: GalleryDesigner[] = Object.entries(cardFiles)
  .map(([file, card]) => ({ ...card, slug: file.replace(/^.*\//, '').replace(/\.ts$/, ''), projects: [] }))
  .sort((a, b) => a.name.localeCompare(b.name))

/** Projects whose brief doesn't hide them but has no resolved `Designer:` — surfaced as a transparency note, never their raw content. */
export const GALLERY_UNRESOLVED_OWNERSHIP_SLUGS: string[] = PROJECTS.filter(
  (p) => !p.ownership.designer && p.ownership.gallery === 'visible',
).map((p) => p.slug)

function galleryProjectFromBrief(project: Project): GalleryProject | undefined {
  if (!project.caseStudy) return undefined
  return {
    slug: project.slug,
    title: project.title,
    caseStudy: project.caseStudy,
    prototypeRoute: project.screens.length > 0 ? project.route : undefined,
    projectRoute: project.route,
    screenCount: project.screens.length,
    line: truthLine(project.brief),
    gallery: project.ownership.gallery,
  }
}

function briefProjectsFor(designer: GalleryDesigner): GalleryProject[] {
  const name = designer.name.trim().toLowerCase()
  return PROJECTS.filter((p) => p.ownership.designer?.trim().toLowerCase() === name)
    .map(galleryProjectFromBrief)
    .filter((p): p is GalleryProject => Boolean(p))
}

export function getVisibleGalleryDesigners(): GalleryDesigner[] {
  // One visible project is enough — no higher threshold, no empty placeholders.
  return GALLERY_DESIGNERS.map((designer) => ({
    ...designer,
    projects: briefProjectsFor(designer).filter((p) => p.gallery === 'visible'),
  })).filter((designer) => designer.projects.length > 0)
}

export function getVisibleGalleryDesignerBySlug(slug: string): GalleryDesigner | undefined {
  return getVisibleGalleryDesigners().find((designer) => designer.slug === slug)
}

/**
 * `playground/<slug>` route → the designer whose visible gallery project
 * links to it — powers a "who built this" byline. A route with no matching
 * `prototypeRoute` anywhere just gets no byline; this never guesses.
 */
export function getDesignerForPrototypeRoute(route: ProjectRoute): GalleryDesigner | undefined {
  for (const designer of getVisibleGalleryDesigners()) {
    if (designer.projects.some((p) => p.gallery === 'visible' && p.prototypeRoute === route)) {
      return designer
    }
  }
  return undefined
}
