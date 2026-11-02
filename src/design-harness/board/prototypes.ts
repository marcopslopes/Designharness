import { harnessFrameSrc } from '../presentation'
import { PROJECTS, resolveProjectRoute } from '../projectsIndex'

/** Everything in `projects/` that can sit on the board as a live embed. */
export type BoardPrototypeEntry = {
  route: string
  label: string
  project: string
  kind: 'Screen' | 'State' | 'Storyboard' | 'Doc'
  platform?: string
  size: { w: number; h: number }
}

/** PhoneShell's frame plus room for the embed's own padding. */
const PHONE = { w: 420, h: 880 }
const DESKTOP = { w: 1100, h: 760 }
const PAGE = { w: 900, h: 760 }
/** A written page (About, facts, docs, case study) shown whole on its own board page. */
const DOCUMENT = { w: 960, h: 1200 }

const isDesktop = (platform?: string, folder?: string) => /desktop|web/i.test(platform ?? folder ?? '')

/** Frame size for any project route: phone, desktop, slides or a written page. */
export function projectRouteSize(route: string): { w: number; h: number } {
  const resolved = resolveProjectRoute(route)
  if (resolved?.screen) return isDesktop(resolved.screen.platform, resolved.screen.folder) ? DESKTOP : PHONE
  if (resolved?.storyboard || resolved?.presentation || resolved?.caseStudyPage?.kind === 'slides') return DESKTOP
  return DOCUMENT
}

export function prototypeEntries(): BoardPrototypeEntry[] {
  return PROJECTS.flatMap((project) => [
    ...project.screens.map((screen) => ({
      route: screen.route,
      label: screen.platformBase ? `${screen.platformBase} · ${screen.platform ?? 'Screen'}` : screen.label,
      project: project.title,
      kind: 'Screen' as const,
      platform: screen.platform,
      size: isDesktop(screen.platform, screen.folder) ? DESKTOP : PHONE,
    })),
    ...project.states.map((state) => ({
      route: state.route,
      label: state.parentLabel ? `${state.parentLabel} · ${state.label}` : state.label,
      project: project.title,
      kind: 'State' as const,
      size: isDesktop(state.platform, state.folder) ? DESKTOP : PHONE,
    })),
    ...project.storyboards.map((storyboard) => ({
      route: storyboard.route,
      label: storyboard.label,
      project: project.title,
      kind: 'Storyboard' as const,
      size: DESKTOP,
    })),
    ...project.docs.map((doc) => ({
      route: doc.route,
      label: doc.label,
      project: project.title,
      kind: 'Doc' as const,
      size: PAGE,
    })),
  ])
}

export const embedSrc = (route: string) => harnessFrameSrc(`${route}?embed=1`)

/** What the card header icon stands for — proto, case study, doc, and the rest. */
export type ArtifactKind =
  | 'prototype'
  | 'desktop'
  | 'storyboard'
  | 'case-study'
  | 'slides'
  | 'article'
  | 'facts'
  | 'about'
  | 'doc'
  | 'diagram'
  | 'presentation'
  | 'link'

export function artifactKind(route: string): ArtifactKind {
  const resolved = resolveProjectRoute(route)
  if (!resolved) return 'doc'
  if (resolved.screen) return isDesktop(resolved.screen.platform, resolved.screen.folder) ? 'desktop' : 'prototype'
  if (resolved.storyboard) return 'storyboard'
  if (resolved.presentation) return 'presentation'
  if (resolved.caseStudyPage?.kind === 'slides') return 'slides'
  if (resolved.caseStudyPage?.kind === 'article') return 'article'
  if (resolved.caseStudyPage) return 'case-study'
  if (resolved.report) return 'doc'
  if (resolved.facts || resolved.decisions) return 'facts'
  if (resolved.doc?.kind === 'mermaid') return 'diagram'
  if (resolved.doc) return 'doc'
  return 'about'
}
