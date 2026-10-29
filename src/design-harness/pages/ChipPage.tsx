import { IconCalendar } from '@tabler/icons-react'
import { Chip, Icon, Stack, Text } from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { DesignHarnessMarkdown } from '../components/DesignHarnessMarkdown'
import chipSpecSource from '../../../context/design-system/FIGMA-DESIGN-SYSTEM-CHIPS.md?raw'

const SIZES = ['sm', 'md', 'lg'] as const
const FILLS = ['gray', 'black', 'white'] as const

function CalIcon({ size }: { size: 'sm' | 'md' | 'lg' }) {
  return <Icon icon={IconCalendar} size={size === 'sm' ? 'xs' : 'lg'} />
}

export function ChipPage() {
  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <DesignHarnessDocPage
        title="Chip"
        lead="Sizes sm/md/lg, fills Gray/Black/White, selected Black/Sea, rounded on/off."
      >
        <section>
          <Text variant="display" as="h2">
            Fills · medium · rounded
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              {FILLS.map((fill) => (
                <Chip key={fill} size="md" fill={fill} startIcon={<CalIcon size="md" />}>
                  Chips Action
                </Chip>
              ))}
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Selected · Black / Sea
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <Chip size="md" fill="gray" selected="black" startIcon={<CalIcon size="md" />}>
                Selected black
              </Chip>
              <Chip size="md" fill="white" selected="black" startIcon={<CalIcon size="md" />}>
                Selected black
              </Chip>
              <Chip size="md" fill="gray" selected="sea" startIcon={<CalIcon size="md" />}>
                Selected sea
              </Chip>
              <Chip size="md" fill="white" selected="sea" startIcon={<CalIcon size="md" />}>
                Selected sea
              </Chip>
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Sizes
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              {SIZES.map((size) => (
                <Chip key={size} size={size} fill="gray" startIcon={<CalIcon size={size} />}>
                  Chips Action
                </Chip>
              ))}
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Rounded off
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <Chip size="lg" fill="gray" rounded={false} startIcon={<CalIcon size="lg" />}>
                Chips Action
              </Chip>
              <Chip size="lg" fill="black" rounded={false} startIcon={<CalIcon size="lg" />}>
                Chips Action
              </Chip>
              <Chip size="lg" fill="gray" rounded={false} selected="sea" startIcon={<CalIcon size="lg" />}>
                Selected sea
              </Chip>
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Disabled
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <Chip size="md" fill="gray" disabled startIcon={<CalIcon size="md" />}>
                Chips Action
              </Chip>
              <Chip size="md" fill="white" disabled startIcon={<CalIcon size="md" />}>
                Chips Action
              </Chip>
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Component spec
          </Text>
          <div className="design-harness-ds-md-panel design-harness-ds-md-panel--spec">
            <DesignHarnessMarkdown source={chipSpecSource} />
          </div>
        </section>
      </DesignHarnessDocPage>
    </div>
  )
}
