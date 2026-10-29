import { Stack, Text } from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'

export function StackPage() {
  return (
    <div className="design-harness-ds-page">
      <DesignHarnessDocPage
        title="Stack"
        lead={
          <>
            Flex layout primitive: vertical stack by default, or horizontal row with{' '}
            <code className="design-harness__code">direction=&quot;row&quot;</code>. Gap accepts any CSS length, usually
            a spacing token.
          </>
        }
      >
        <section>
          <Text variant="display" as="h2">
            Vertical
          </Text>
          <div className="design-harness-ds-demo">
            <Stack gap="var(--spacing-03)">
              <Text variant="body">First row</Text>
              <Text variant="body">Second row</Text>
              <Text variant="body">Third row</Text>
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Horizontal
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)">
              <Text variant="label" as="span">
                A
              </Text>
              <Text variant="label" as="span">
                B
              </Text>
              <Text variant="label" as="span">
                C
              </Text>
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
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>gap</code>
                  </td>
                  <td>
                    CSS gap (e.g. <code>var(--spacing-04)</code>).
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>direction</code>
                  </td>
                  <td>
                    <code>column</code> (default) or <code>row</code>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>className</code>
                  </td>
                  <td>Optional class on the flex wrapper.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </DesignHarnessDocPage>
    </div>
  )
}
