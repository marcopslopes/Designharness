import { isExtractedComponentRoute } from '../componentRoutes'
import { isFoundationDocRoute } from '../foundationDocs'

const COMPONENT_ROUTES = new Set([
  'design-system/icons',
  'design-system/images',
  'design-system/ds-colours',
  'design-system/badge',
  'design-system/button',
  'design-system/card',
  'design-system/chip',
  'design-system/controls',
  'design-system/stack',
  'design-system/text',
  'design-system/text-field',
  'design-system/toast',
])

export function hasSharedCatalog(route: string): boolean {
  return isFoundationDocRoute(route) || COMPONENT_ROUTES.has(route) || isExtractedComponentRoute(route)
}
