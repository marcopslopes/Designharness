import {
  AppointmentCustomerSelector,
  AppSplitButton,
  CompleteSetupButton,
  DashedButton,
  SquareButton,
  Stack,
  Text,
  ToggleSelectionButton,
} from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'

export function ButtonSpecialPage() {
  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <DesignHarnessDocPage
        title="Special"
        lead="Square, Dashed, App Split, Complete setup, Toggle Selection, and Appointment Customer Selector."
      >
        <section>
          <Text variant="display" as="h2">
            Square Button
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <SquareButton tone="white" />
              <SquareButton tone="black-selected" />
              <SquareButton tone="sea-selected" />
              <SquareButton tone="disabled" />
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Dashed Button
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <DashedButton shape="circle" />
              <DashedButton shape="square" />
              <DashedButton shape="square-filled">Filled</DashedButton>
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            App Split Button
          </Text>
          <div className="design-harness-ds-demo">
            <Stack gap="var(--spacing-04)">
              <AppSplitButton appType="biz" />
              <AppSplitButton appType="customer" />
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Complete setup
          </Text>
          <div className="design-harness-ds-demo">
            <Stack gap="var(--spacing-04)">
              <CompleteSetupButton progress={70} />
              <CompleteSetupButton progress={10} />
              <CompleteSetupButton progress={null} progressLabel="···" label="Invite your clients" />
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Toggle Selection
          </Text>
          <div className="design-harness-ds-demo">
            <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
              <ToggleSelectionButton pressed={false}>Option</ToggleSelectionButton>
              <ToggleSelectionButton pressed>Option</ToggleSelectionButton>
            </Stack>
          </div>
        </section>

        <section>
          <Text variant="display" as="h2">
            Appointment Customer Selector
          </Text>
          <div className="design-harness-ds-demo">
            <Stack gap="var(--spacing-04)">
              <AppointmentCustomerSelector allergies="Olive Shampoo" />
              <AppointmentCustomerSelector allergies="Olive Shampoo" removable={false} />
              <AppointmentCustomerSelector showBadges={false} />
              <AppointmentCustomerSelector
                selected={false}
                showBadges={false}
                removable={false}
                name="No clients selected"
                phone={null}
              />
            </Stack>
          </div>
        </section>
      </DesignHarnessDocPage>
    </div>
  )
}
