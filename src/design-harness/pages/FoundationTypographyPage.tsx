import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { DesignHarnessMarkdown } from '../components/DesignHarnessMarkdown'
import { TypographyShowcase } from '../components/TypographyShowcase'

export type FoundationTypographyPageProps = {
  title: string
  source: string
  preface?: string
}

export function FoundationTypographyPage({ title, source, preface }: FoundationTypographyPageProps) {
  return (
    <DesignHarnessDocPage
      title={title}
      lead="Live samples, then the token tables from context/design-system/FIGMA-FOUNDATIONS-TYPOGRAPHY.md."
      beforeBody={<TypographyShowcase />}
      toc={false}
    >
      {preface ? <DesignHarnessMarkdown source={preface} /> : null}
      <DesignHarnessMarkdown source={source} stripLeadingH1 />
    </DesignHarnessDocPage>
  )
}
