import { BackToTop, Fab, FabExpanded, Stack, Text } from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { IconCalendarPlus, IconClock, IconUserPlus } from '@tabler/icons-react'

export function ButtonFabPage() {
  return (
    <div className="design-harness-ds-page">
      <DesignHarnessDocPage
        title="FAB & Back to top"
        lead="Design Harness kit floating action — ink circle (56 default) and speed-dial menu chips."
      >
        <section>
          <Text variant="display" as="h2">
            FAB · Ink
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <Fab size="xs" tone="ink" aria-label="Add xs" />
              <Fab size="sm" tone="ink" aria-label="Add" />
              <Fab size="lg" tone="ink" aria-label="Add lg" />
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            FAB · Paper
          </Text>
          <div
            className="design-harness-ds-demo"
            style={{
              background: 'var(--kit-sunken)',
              padding: 'var(--spacing-05)',
              borderRadius: 'var(--radius-03)',
            }}
          >
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <Fab size="xs" tone="paper" aria-label="Add xs" />
              <Fab size="sm" tone="paper" aria-label="Add" />
              <Fab size="lg" tone="paper" aria-label="Add lg" />
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            FAB · Disabled
          </Text>
          <div className="design-harness-ds-demo">
            <Fab size="sm" tone="ink" disabled aria-label="Add disabled" />
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            FAB menu
          </Text>
          <div className="design-harness-ds-demo">
            <FabExpanded
              size="sm"
              actions={[
                { id: 'block', label: 'Block time', icon: IconClock },
                { id: 'walkin', label: 'Walk-in', icon: IconUserPlus },
                { id: 'new', label: 'New appointment', icon: IconCalendarPlus },
              ]}
            />
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Back to top
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <BackToTop size="sm" />
              <BackToTop size="lg" />
            </Stack>
          </div>
        </section>
      </DesignHarnessDocPage>
    </div>
  )
}
