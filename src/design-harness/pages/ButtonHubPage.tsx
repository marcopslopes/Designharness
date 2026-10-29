import { IconCheck, IconChevronRight, IconPlus, IconSparkles, IconTrash } from '@tabler/icons-react'
import { Button, Icon, Stack, Text } from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { BUTTON_ROUTE_LABEL, BUTTON_ROUTES } from '../componentRoutes'
import { TextLink } from '../components/DocParts'

function Chevron() {
  return <Icon icon={IconChevronRight} size="sm" />
}

export function ButtonHubPage() {
  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <DesignHarnessDocPage
        title="Button"
        lead="Ink primary, sunken secondary, outline, ghost, and the tinted intents. Four sizes."
      >
        <section>
          <Text variant="display" as="h2">
            Primary
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <Button intent="primary" size="xl" endIcon={<Chevron />}>
                Book now
              </Button>
              <Button intent="primary" size="lg" endIcon={<Chevron />}>
                Continue
              </Button>
              <Button intent="primary" size="md">
                Confirm
              </Button>
              <Button intent="primary" size="sm">
                Save
              </Button>
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Lifted
          </Text>
          <Text variant="muted" as="p">
            Floating actions only. The shadow lifts on hover.
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <Button intent="primary" size="xl" lifted endIcon={<Chevron />}>
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
            Intents
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <Button intent="secondary" size="md">
                Cancel
              </Button>
              <Button intent="outline" size="md">
                Outlined
              </Button>
              <Button intent="ghost" size="md">
                Ghost
              </Button>
              <Button intent="tinted" size="md" startIcon={<Icon icon={IconCheck} size="sm" />}>
                Paid
              </Button>
              <Button intent="premium" size="md" startIcon={<Icon icon={IconSparkles} size="sm" />}>
                Upgrade
              </Button>
              <Button intent="danger" size="md" startIcon={<Icon icon={IconTrash} size="sm" />}>
                Delete
              </Button>
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            States
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
              <Button intent="secondary" size="md" active>
                Active
              </Button>
              <Button intent="outline" size="md" active>
                Active
              </Button>
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Icon only
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <Button intent="primary" size="lg" iconOnly aria-label="Add">
                <Icon icon={IconPlus} size="sm" />
              </Button>
              <Button intent="secondary" size="lg" iconOnly aria-label="Add">
                <Icon icon={IconPlus} size="sm" />
              </Button>
              <Button intent="tinted" size="lg" iconOnly aria-label="Add">
                <Icon icon={IconPlus} size="sm" />
              </Button>
              <Button intent="premium" size="lg" iconOnly aria-label="Upgrade">
                <Icon icon={IconSparkles} size="sm" />
              </Button>
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Full width
          </Text>
          <div className="design-harness-ds-demo design-harness__narrow">
            <Stack gap="var(--spacing-03)">
              <Button intent="primary" size="lg" lifted fullWidth endIcon={<Chevron />}>
                Book now
              </Button>
              <Button intent="secondary" size="lg" fullWidth>
                Not now
              </Button>
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Related
          </Text>
          <ul className="design-harness-ds-list">
            {BUTTON_ROUTES.filter((route) => route !== 'design-system/button').map((route) => (
              <li key={route}>
                <TextLink route={route}>{BUTTON_ROUTE_LABEL[route]}</TextLink>
              </li>
            ))}
          </ul>
        </section>
      </DesignHarnessDocPage>
    </div>
  )
}
