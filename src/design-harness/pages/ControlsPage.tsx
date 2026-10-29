import { useState } from 'react'
import { Checkbox, Radio, SegmentedControl, Selector, Stack, Text, Toggle } from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { DesignHarnessMarkdown } from '../components/DesignHarnessMarkdown'
import controlsSpecSource from '../../../context/design-system/FIGMA-DESIGN-SYSTEM-CONTROLS.md?raw'

const SELECTOR_OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']

export function ControlsPage() {
  const [selector, setSelector] = useState('Option 3')
  const [toggleOn, setToggleOn] = useState(true)
  const [check, setCheck] = useState<'unchecked' | 'checked' | 'indeterminate'>('checked')
  const [radio, setRadio] = useState('a')
  const [segment, setSegment] = useState('staff')

  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <DesignHarnessDocPage
        title="Controls"
        lead="Segmented control, selector, toggle, radio, and checkbox. Alerts, loaders, sheets, and the other pieces each have their own page."
      >
        <section>
          <Text variant="display" as="h2">
            Segmented control
          </Text>
          <div className="design-harness-ds-demo">
            <SegmentedControl
              aria-label="Staff or resources"
              value={segment}
              onChange={setSegment}
              options={[
                { value: 'staff', label: 'Staff' },
                { value: 'resources', label: 'Resources' },
              ]}
            />
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Selector
          </Text>
          <div className="design-harness-ds-demo">
            <Selector options={SELECTOR_OPTIONS} value={selector} onChange={setSelector} />
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Toggle
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-05)" className="design-harness__row">
              <Toggle size="lg" checked={toggleOn} onClick={() => setToggleOn((v) => !v)} />
              <Toggle size="sm" checked />
              <Toggle size="lg" checked={false} />
              <Toggle size="sm" checked={false} />
              <Toggle size="lg" checked tone="negative" />
              <Toggle size="sm" checked tone="negative" />
              <Toggle size="lg" checked={false} disabled />
              <Toggle size="lg" checked disabled />
              <Toggle size="lg" checked label="Label" />
              <Toggle size="sm" checked label="Label" />
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Radio
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <Radio checked={radio === 'a'} tone="black" onClick={() => setRadio('a')} aria-label="Selected black" />
              <Radio checked={radio === 'b'} tone="sea" onClick={() => setRadio('b')} aria-label="Selected sea" />
              <Radio checked={false} aria-label="Basic" />
              <Radio checked={false} error aria-label="Error" />
              <Radio checked disabled aria-label="Selected disabled" />
              <Radio checked={false} disabled aria-label="Basic disabled" />
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Checkbox
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <Checkbox
                state={check}
                tone="black"
                onClick={() =>
                  setCheck((s) => (s === 'unchecked' ? 'checked' : s === 'checked' ? 'indeterminate' : 'unchecked'))
                }
                aria-label="Cycle checkbox"
              />
              <Checkbox state="indeterminate" tone="black" aria-label="Indeterminate black" />
              <Checkbox state="checked" tone="sea" aria-label="Selected sea" />
              <Checkbox state="indeterminate" tone="sea" aria-label="Indeterminate sea" />
              <Checkbox state="unchecked" aria-label="Basic" />
              <Checkbox state="unchecked" error aria-label="Error" />
              <Checkbox state="checked" disabled aria-label="Selected disabled" />
              <Checkbox state="indeterminate" disabled aria-label="Selected indeterminate" />
              <Checkbox state="unchecked" disabled aria-label="Basic disabled" />
            </Stack>
          </div>
        </section>

        <DesignHarnessMarkdown source={controlsSpecSource} />
      </DesignHarnessDocPage>
    </div>
  )
}
