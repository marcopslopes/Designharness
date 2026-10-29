import { Button, Stack, Text } from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'

const SIZES = ['xl', 'lg', 'md', 'sm'] as const

export function ButtonSecondaryPage() {
  return (
    <div className="design-harness-ds-page">
      <DesignHarnessDocPage title="Secondary" lead="Sunken fill, and the outlined treatment beside it.">
        <section>
          <Text variant="display" as="h2">
            Secondary
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              {SIZES.map((size) => (
                <Button key={size} intent="secondary" size={size}>
                  Cancel
                </Button>
              ))}
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Outline
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              {SIZES.map((size) => (
                <Button key={size} intent="outline" size={size}>
                  Outlined
                </Button>
              ))}
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Active and disabled
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <Button intent="secondary" size="md" active>
                Active
              </Button>
              <Button intent="outline" size="md" active>
                Active
              </Button>
              <Button intent="secondary" size="md" disabled>
                Disabled
              </Button>
            </Stack>
          </div>
        </section>
      </DesignHarnessDocPage>
    </div>
  )
}
