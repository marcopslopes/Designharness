import type { DesignHarnessRoute } from './routes'

/**
 * Blueprints — production-faithful (or kit-faithful) starting surfaces you
 * fork from when beginning a new prototype.
 *
 * Hand-maintained. Prefer real playground / gallery routes when they exist;
 * until then, curated Design System and Work destinations stand in as
 * fork-from surfaces so the IA ships complete.
 */
export type Blueprint = {
  id: string
  title: string
  description: string
  /** Category chip on the card */
  surface: string
  route: DesignHarnessRoute
}

export const BLUEPRINTS: Blueprint[] = [
  {
    id: 'foundations',
    title: 'Foundations home',
    description: 'Token catalogue — colour, spacing, type. Start here when a prototype needs on-brand primitives.',
    surface: 'Design system',
    route: 'design-system/foundations',
  },
  {
    id: 'button',
    title: 'Button hub',
    description: 'Primary / secondary / ghost / FAB variants — fork when the interaction is a control-heavy flow.',
    surface: 'Design system',
    route: 'design-system/button',
  },
  {
    id: 'text-field',
    title: 'Text field',
    description: 'Form input patterns from the kit — use as the base for settings and capture screens.',
    surface: 'Design system',
    route: 'design-system/text-field',
  },
  {
    id: 'controls',
    title: 'Controls',
    description: 'Segmented control, selector, toggle, radio, and checkbox.',
    surface: 'Design system',
    route: 'design-system/controls',
  },
  {
    id: 'gallery',
    title: 'Team gallery',
    description: 'Published designer work — fork an existing case study prototype when one exists.',
    surface: 'Work',
    route: 'gallery',
  },
  {
    id: 'playground',
    title: 'All prototypes',
    description: 'Category grid of live playground screens — pick a sibling flow to branch from.',
    surface: 'Work',
    route: 'playground',
  },
]

export const BLUEPRINT_SURFACES = [...new Set(BLUEPRINTS.map((b) => b.surface))]
