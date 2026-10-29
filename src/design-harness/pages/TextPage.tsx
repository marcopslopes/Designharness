import { Stack, Text } from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'

export function TextPage() {
  return (
    <div className="design-harness-ds-page">
      <DesignHarnessDocPage
        title="Text"
        lead={
          <>
            Typography ramp for headings and body copy. Polymorphic via the{' '}
            <code className="design-harness__code">as</code> prop.
          </>
        }
      >
        <section>
          <Text variant="display" as="h2">
            Variants
          </Text>
          <div className="design-harness-ds-demo">
            <Stack gap="var(--spacing-04)">
              <Text variant="display" as="h3">
                Display / section title
              </Text>
              <Text variant="body-large">Body large — supporting copy.</Text>
              <Text variant="body">Body — default paragraph.</Text>
              <Text variant="label">Label — dense UI labels.</Text>
              <Text variant="muted">Muted — secondary metadata.</Text>
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Props (summary)
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
                    <code>variant</code>
                  </td>
                  <td>
                    <code>display | body-large | body | label | muted</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>as</code>
                  </td>
                  <td>
                    Polymorphic element (e.g. <code>h2</code>, <code>p</code>, <code>span</code>).
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
