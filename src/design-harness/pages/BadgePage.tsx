import { Badge, Stack, Text } from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'

export function BadgePage() {
  return (
    <div className="design-harness-ds-page">
      <DesignHarnessDocPage title="Badge" lead="Compact status chips. Tones map to semantic colours from foundations.">
        <section>
          <Text variant="display" as="h2">
            Tones
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-03)" className="design-harness__row">
              <Badge tone="neutral">Neutral</Badge>
              <Badge tone="brand">Brand</Badge>
              <Badge tone="success">Success</Badge>
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Props
          </Text>
          <div className="design-harness-ds-table-wrap">
            <table className="design-harness-ds-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>tone</code>
                  </td>
                  <td>
                    <code>neutral | brand | success</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </DesignHarnessDocPage>
    </div>
  )
}
