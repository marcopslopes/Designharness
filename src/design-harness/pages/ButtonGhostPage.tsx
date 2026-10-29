import { IconCheck, IconSparkles, IconTrash } from '@tabler/icons-react'
import { Button, Icon, Stack, Text } from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'

const SIZES = ['lg', 'md', 'sm'] as const

export function ButtonGhostPage() {
  return (
    <div className="design-harness-ds-page">
      <DesignHarnessDocPage title="Ghost" lead="Transparent ghost, plus tinted, premium, and danger.">
        <section>
          <Text variant="display" as="h2">
            Ghost
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              {SIZES.map((size) => (
                <Button key={size} intent="ghost" size={size}>
                  Learn more
                </Button>
              ))}
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Tinted
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              {SIZES.map((size) => (
                <Button key={size} intent="tinted" size={size} startIcon={<Icon icon={IconCheck} size="sm" />}>
                  Paid
                </Button>
              ))}
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Premium
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              {SIZES.map((size) => (
                <Button key={size} intent="premium" size={size} startIcon={<Icon icon={IconSparkles} size="sm" />}>
                  Upgrade
                </Button>
              ))}
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Danger
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              {SIZES.map((size) => (
                <Button key={size} intent="danger" size={size} startIcon={<Icon icon={IconTrash} size="sm" />}>
                  Delete
                </Button>
              ))}
              <Button intent="danger" size="md" disabled>
                Disabled
              </Button>
            </Stack>
          </div>
        </section>
      </DesignHarnessDocPage>
    </div>
  )
}
