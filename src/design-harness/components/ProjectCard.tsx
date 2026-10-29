import type { ReactNode } from 'react'
import { FrameWidget } from '../harnessIcons'
import { Badge, Card, Icon, Stack, type TablerIconComponent, Text } from '../ui'

export type ProjectCardProps = {
  /** Without a route the card is shown but doesn't open anything. */
  route?: string
  title: string
  detail?: string
  /** Replaces the project icon — e.g. a designer's avatar. */
  media?: ReactNode
  icon?: TablerIconComponent
  /** Short tag next to the title, e.g. "Default". */
  badge?: string
  /** Quiet last line, e.g. "Used by 2 prototypes". */
  footer?: string
}

/** Playground card — same gallery card chrome as Team Gallery. */
export function ProjectCard({ route, title, detail, media, icon = FrameWidget, badge, footer }: ProjectCardProps) {
  const card = (
    <Card className="design-harness-gallery__proto-card">
      <Stack gap="var(--spacing-03)">
        {media ?? (
          <span className="design-harness-gallery__card-icon" aria-hidden>
            <Icon icon={icon} size="sm" />
          </span>
        )}
        <span className="design-harness-gallery__card-heading">
          <Text variant="label" as="h3" className="design-harness-gallery__card-title">
            {title}
          </Text>
          {badge ? <Badge>{badge}</Badge> : null}
        </span>
        {detail ? (
          <Text variant="muted" as="p" className="design-harness-ds-list__route">
            {detail}
          </Text>
        ) : null}
        {footer ? (
          <Text variant="muted" as="p" className="design-harness-gallery__card-footer">
            {footer}
          </Text>
        ) : null}
      </Stack>
    </Card>
  )
  return route ? (
    <a className="design-harness-gallery__proto-card-link" href={`#/${route}`}>
      {card}
    </a>
  ) : (
    card
  )
}
