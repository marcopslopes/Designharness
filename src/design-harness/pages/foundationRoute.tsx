import type { ReactNode } from 'react'
import { EffectsShowcase } from '../components/EffectsShowcase'
import { KitShadowShowcase } from '../components/KitShadowShowcase'
import { MotionShowcase } from '../components/MotionShowcase'
import {
  ColourShowcaseGrid,
  PrimitiveScalesShowcase,
  RadiusShowcaseGrid,
  SpacingShowcaseGrid,
} from '../components/FoundationsShowcase'
import { FOUNDATION_DOCS, isFoundationDocRoute } from '../foundationDocs'
import { FoundationDocPage } from './FoundationDocPage'
import { FoundationFontPage } from './FoundationFontPage'
import { FoundationTypographyPage } from './FoundationTypographyPage'

const SHOWCASE: Record<string, ReactNode> = {
  'design-system/colour': (
    <>
      <ColourShowcaseGrid />
      <PrimitiveScalesShowcase />
    </>
  ),
  'design-system/spacing': <SpacingShowcaseGrid />,
  'design-system/radius': <RadiusShowcaseGrid />,
  'design-system/motion': <MotionShowcase />,
  'design-system/shadows': <KitShadowShowcase intro={false} />,
  'design-system/effects': <EffectsShowcase />,
}

/** The shared foundations page. `preface` is extra notes from a system file. */
export function FoundationRoutePage({ route, preface }: { route: string; preface?: string }) {
  if (!isFoundationDocRoute(route)) return null
  const { label, source } = FOUNDATION_DOCS[route]
  const path: string = route
  if (path === 'design-system/typography') {
    return <FoundationTypographyPage title={label} source={source} preface={preface} />
  }
  if (path === 'design-system/font') {
    return <FoundationFontPage title={label} source={source} preface={preface} />
  }
  return <FoundationDocPage title={label} source={source} showcase={SHOWCASE[route]} preface={preface} />
}
