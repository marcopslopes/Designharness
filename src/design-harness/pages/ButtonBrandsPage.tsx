import { BrandButton, Stack } from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import type { BrandButtonVariant } from '../../../context/design-system/ds'

const VARIANTS: BrandButtonVariant[] = [
  'apple-color',
  'facebook-color',
  'google-color',
  'apple-white',
  'facebook-white',
  'google-white',
  'blik',
  'klarna',
]

export function ButtonBrandsPage() {
  return (
    <div className="design-harness-ds-page">
      <DesignHarnessDocPage title="Brands" lead="Social / payment brand buttons from the Buttons frame.">
        <section>
          <div className="design-harness-ds-demo">
            <Stack gap="var(--spacing-04)">
              {VARIANTS.map((variant) => (
                <BrandButton key={variant} variant={variant} />
              ))}
            </Stack>
          </div>
        </section>
      </DesignHarnessDocPage>
    </div>
  )
}
