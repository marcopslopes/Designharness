import { isExtractedComponentRoute } from '../componentRoutes'
import { isFoundationDocRoute } from '../foundationDocs'
import { ExtractedComponentPage } from './extractedComponentPages'
import { BadgePage } from './BadgePage'
import { ButtonHubPage } from './ButtonHubPage'
import { CardPage } from './CardPage'
import { ChipPage } from './ChipPage'
import { ControlsPage } from './ControlsPage'
import { DsColoursPage } from './DsColoursPage'
import { FoundationRoutePage } from './foundationRoute'
import { StackPage } from './StackPage'
import { TextPage } from './TextPage'
import { TextFieldPage } from './TextFieldPage'
import { DesignHarnessLabPlaceholderPage } from './DesignHarnessLabPlaceholderPage'
import { IconsPage, ImagesPage } from './AssetPages'

/** The same foundations or component page, shown inside whichever system opened it. */
export function SharedCatalogPage({ route, preface }: { route: string; preface?: string }) {
  if (isExtractedComponentRoute(route)) return <ExtractedComponentPage route={route} />
  if (isFoundationDocRoute(route)) return <FoundationRoutePage route={route} preface={preface} />
  switch (route) {
    case 'design-system/icons':
      return <IconsPage />
    case 'design-system/images':
      return <ImagesPage />
    case 'design-system/ds-colours':
      return <DsColoursPage />
    case 'design-system/badge':
      return <BadgePage />
    case 'design-system/button':
      return <ButtonHubPage />
    case 'design-system/card':
      return <CardPage />
    case 'design-system/chip':
      return <ChipPage />
    case 'design-system/controls':
      return <ControlsPage />
    case 'design-system/stack':
      return <StackPage />
    case 'design-system/text':
      return <TextPage />
    case 'design-system/text-field':
      return <TextFieldPage />
    case 'design-system/toast':
      return (
        <DesignHarnessLabPlaceholderPage
          eyebrow="Components"
          title="Toast"
          status="coming-soon"
          description="Design Harness page for the Toast primitive is not built yet. The component already ships from context/design-system/ds for prototypes."
        />
      )
    default:
      return null
  }
}
