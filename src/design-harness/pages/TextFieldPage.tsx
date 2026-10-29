import { Stack, Text, TextField } from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'

export function TextFieldPage() {
  return (
    <div className="design-harness-ds-page">
      <DesignHarnessDocPage
        title="Text field"
        lead="Outlined label-above fields and floating-label shells from the Design Harness kit."
      >
        <section>
          <Text variant="display" as="h2">
            Default
          </Text>
          <div className="design-harness-ds-demo design-harness__narrow">
            <Stack gap="var(--spacing-05)">
              <TextField
                label="Service name"
                placeholder="e.g. Paint mix"
                hint="Shown to clients on the booking page."
              />
              <TextField
                label="Email"
                type="email"
                defaultValue="you@example.com"
                readOnly
                hint="Read-only in this demo."
              />
              <TextField label="Promo code" invalid hint="This code is not valid for your region." />
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Floating label
          </Text>
          <div className="design-harness-ds-demo design-harness__narrow">
            <Stack gap="var(--spacing-04)">
              <TextField variant="floating" label="Full name" defaultValue="Patricia Taylor" />
              <TextField
                variant="floating"
                label="Email"
                defaultValue="patricia@"
                invalid
                hint="That doesn't look like a valid email."
              />
              <TextField
                variant="floating"
                label="Phone"
                defaultValue="+1 415 555 0119"
                success
                hint="We'll text a confirmation here."
              />
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
                    <code>label</code>
                  </td>
                  <td>Visible label string.</td>
                </tr>
                <tr>
                  <td>
                    <code>variant</code>
                  </td>
                  <td>
                    <code>default</code> or <code>floating</code>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>hint</code>
                  </td>
                  <td>Helper text below the field.</td>
                </tr>
                <tr>
                  <td>
                    <code>invalid</code> / <code>success</code>
                  </td>
                  <td>Error or success ring + hint tone.</td>
                </tr>
                <tr>
                  <td>
                    <code>trailing</code>
                  </td>
                  <td>Optional end affordance (e.g. show password).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </DesignHarnessDocPage>
    </div>
  )
}
