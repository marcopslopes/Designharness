import { Badge, Stack, Text } from '../ui'

export type DesignHarnessLabPlaceholderStatus = 'coming-soon' | 'in-progress'

type Props = {
  eyebrow: string
  title: string
  description: string
  status: DesignHarnessLabPlaceholderStatus
}

export function DesignHarnessLabPlaceholderPage({ eyebrow, title, description, status }: Props) {
  const statusLabel = status === 'coming-soon' ? 'Coming soon' : 'In progress'
  const tone = status === 'coming-soon' ? 'neutral' : 'accent'

  return (
    <Stack gap="var(--spacing-06)" className="design-harness-ds-page">
      <header>
        <Text variant="label" as="p">
          {eyebrow}
        </Text>
        <Text variant="display" as="h1">
          {title}
        </Text>
        <Stack direction="row" gap="var(--spacing-03)" className="design-harness-lab-placeholder__status-row">
          <Badge tone={tone}>{statusLabel}</Badge>
          <Text variant="muted" as="p" className="design-harness-lab-placeholder__status-note">
            This area is being wired into Design Harness; there is no live agent UI here yet.
          </Text>
        </Stack>
      </header>
      <Text variant="body-large" as="p">
        {description}
      </Text>
    </Stack>
  )
}
