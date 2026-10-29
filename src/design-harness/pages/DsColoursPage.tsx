import { Text } from '../../../context/design-system/ds'
import { CalendarPaletteShowcase } from '../components/FoundationsShowcase'
import { KitColourPalette } from '../components/KitColourPalette'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'

export function DsColoursPage() {
  return (
    <div className="design-harness-ds-page design-harness-ds-page--ds-colours design-harness-ds-page--wide">
      <DesignHarnessDocPage
        title="DS colours"
        lead="Neutrals, brand accents, tonal ramps, and depth — live on --kit-* tokens."
      >
        <KitColourPalette />

        <section>
          <Text variant="display" as="h2">
            Calendar (legacy catalog)
          </Text>
          <Text variant="muted" as="p">
            Appointment tile catalog still on <code className="design-harness__code">--ds-calendar-*</code> until those
            map onto kit accents.
          </Text>
          <CalendarPaletteShowcase />
        </section>
      </DesignHarnessDocPage>
    </div>
  )
}
