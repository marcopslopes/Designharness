import { useMemo, useState } from 'react'
import { FrameSearch } from '../harnessIcons'
import { BLUEPRINTS, BLUEPRINT_SURFACES } from '../blueprintsData'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { Card, Chip, Field, Icon, Stack, Text } from '../ui'

const ALL_SURFACE = 'All'

export function BlueprintsPage() {
  const [query, setQuery] = useState('')
  const [activeSurface, setActiveSurface] = useState(ALL_SURFACE)

  const normalizedQuery = query.trim().toLowerCase()

  const visible = useMemo(
    () =>
      BLUEPRINTS.filter((b) => {
        if (activeSurface !== ALL_SURFACE && b.surface !== activeSurface) return false
        if (!normalizedQuery) return true
        return (
          b.title.toLowerCase().includes(normalizedQuery) ||
          b.description.toLowerCase().includes(normalizedQuery) ||
          b.surface.toLowerCase().includes(normalizedQuery)
        )
      }),
    [activeSurface, normalizedQuery],
  )

  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <DesignHarnessDocPage
        title="Blueprints"
        lead="Curated starting surfaces — design-system screens and work destinations you branch from instead of a blank page."
        toc={false}
      >
        <Stack gap="var(--spacing-05)" className="design-harness-playground__filters">
          <Field
            label="Search blueprints"
            placeholder="Search blueprints…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            trailing={<Icon icon={FrameSearch} size="sm" />}
            className="design-harness-playground__search"
          />
          <Stack direction="row" gap="var(--spacing-02)" className="design-harness-playground__category-pills">
            <Chip selected={activeSurface === ALL_SURFACE} onClick={() => setActiveSurface(ALL_SURFACE)}>
              {ALL_SURFACE}
            </Chip>
            {BLUEPRINT_SURFACES.map((surface) => (
              <Chip key={surface} selected={activeSurface === surface} onClick={() => setActiveSurface(surface)}>
                {surface}
              </Chip>
            ))}
          </Stack>
        </Stack>

        {visible.length === 0 ? (
          <Text variant="muted" as="p">
            No blueprints match "{query}".
          </Text>
        ) : (
          <div className="design-harness-gallery__grid">
            {visible.map((blueprint) => (
              <a key={blueprint.id} className="design-harness-gallery__proto-card-link" href={`#/${blueprint.route}`}>
                <Card className="design-harness-gallery__proto-card">
                  <Stack gap="var(--spacing-03)">
                    <Text variant="label" as="p" className="design-harness-ds-list__route">
                      {blueprint.surface}
                    </Text>
                    <Text variant="label" as="h3" className="design-harness-gallery__card-title">
                      {blueprint.title}
                    </Text>
                    <Text variant="muted" as="p">
                      {blueprint.description}
                    </Text>
                    <Text variant="muted" as="p" className="design-harness-ds-list__route">
                      #/{blueprint.route}
                    </Text>
                  </Stack>
                </Card>
              </a>
            ))}
          </div>
        )}
      </DesignHarnessDocPage>
    </div>
  )
}
