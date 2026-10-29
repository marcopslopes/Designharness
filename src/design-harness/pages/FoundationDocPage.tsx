import type { ReactNode } from 'react'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { DesignHarnessMarkdown } from '../components/DesignHarnessMarkdown'

export type FoundationDocPageProps = {
  title: string
  source: string
  /** Live samples shown above the token tables. */
  showcase?: ReactNode
  /** System notes shown above the shared token tables. */
  preface?: string
}

export function FoundationDocPage({ title, source, showcase, preface }: FoundationDocPageProps) {
  return (
    <DesignHarnessDocPage
      title={title}
      lead="Token tables from context/design-system/, with live previews where a cell is a single value."
      beforeBody={showcase}
      toc={false}
    >
      {preface ? <DesignHarnessMarkdown source={preface} /> : null}
      <DesignHarnessMarkdown source={source} stripLeadingH1 />
    </DesignHarnessDocPage>
  )
}
