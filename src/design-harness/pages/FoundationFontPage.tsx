import { FontShowcase } from '../components/FontShowcase'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { DesignHarnessMarkdown } from '../components/DesignHarnessMarkdown'

export type FoundationFontPageProps = {
  title: string
  source: string
  preface?: string
}

export function FoundationFontPage({ title, source, preface }: FoundationFontPageProps) {
  return (
    <DesignHarnessDocPage
      title={title}
      lead="Live samples, then the token tables from context/design-system/FIGMA-FOUNDATIONS-FONT.md."
      beforeBody={<FontShowcase />}
      toc={false}
    >
      {preface ? <DesignHarnessMarkdown source={preface} /> : null}
      <DesignHarnessMarkdown source={source} stripLeadingH1 />
    </DesignHarnessDocPage>
  )
}
