import { IconChevronRight } from '@tabler/icons-react'
import { Button, Icon, Stack, Text } from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'

const SIZES = ['xl', 'lg', 'md', 'sm'] as const

export function ButtonPrimaryPage() {
  return (
    <div className="design-harness-ds-page">
      <DesignHarnessDocPage title="Primary" lead="Ink fill. Four sizes, a lifted floating action, and disabled.">
        <section>
          <Text variant="display" as="h2">
            Sizes
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              {SIZES.map((size) => (
                <Button
                  key={size}
                  intent="primary"
                  size={size}
                  endIcon={size === 'xl' || size === 'lg' ? <Icon icon={IconChevronRight} size="sm" /> : undefined}
                >
                  Book now
                </Button>
              ))}
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Lifted
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <Button intent="primary" size="xl" lifted endIcon={<Icon icon={IconChevronRight} size="sm" />}>
                Book now
              </Button>
              <Button intent="primary" size="lg" lifted>
                Confirm
              </Button>
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Active and disabled
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <Button intent="primary" size="md">
                Default
              </Button>
              <Button intent="primary" size="md" active>
                Active
              </Button>
              <Button intent="primary" size="md" disabled>
                Disabled
              </Button>
            </Stack>
          </div>
        </section>
      </DesignHarnessDocPage>
    </div>
  )
}
