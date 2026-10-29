import { Button, Card, Stack, Text } from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'

export function CardPage() {
  return (
    <div className="design-harness-ds-page">
      <DesignHarnessDocPage
        title="Card"
        lead="Surface container with optional elevation (border emphasis). Children compose any layout."
      >
        <section>
          <Text variant="display" as="h2">
            Example
          </Text>
          <div className="design-harness-ds-demo design-harness__narrow">
            <Card elevated>
              <Stack gap="var(--spacing-04)">
                <Text variant="label">Card title</Text>
                <Text variant="body">Cards use radius and spacing tokens — no magic numbers in the primitive.</Text>
                <Stack direction="row" gap="var(--spacing-03)">
                  <Button variant="secondary" size="sm">
                    Dismiss
                  </Button>
                  <Button size="sm">Continue</Button>
                </Stack>
              </Stack>
            </Card>
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
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>elevated</code>
                  </td>
                  <td>Stronger border for emphasis.</td>
                </tr>
                <tr>
                  <td>
                    <code>children</code>
                  </td>
                  <td>Card body.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </DesignHarnessDocPage>
    </div>
  )
}
