import { useMemo } from 'react'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { DesignHarnessMarkdown } from '../components/DesignHarnessMarkdown'
import {
  HOWTO_DOCS,
  prepareHowtoArticle,
  rewriteHowtoMarkdownLinks,
  type HowtoArticleModel,
  type HowtoDocRoute,
} from '../howtoDocs'
import { Stack, Text } from '../ui'

export type HowToDocPageProps = {
  route: HowtoDocRoute
}

/** A how-to article body — one block per `##` section. */
export function HowtoSections({ article }: { article: HowtoArticleModel }) {
  return (
    <>
      {article.sections.map((section) => (
        <section key={section.id} className="design-harness-ds-doc-section">
          {section.id === 'overview' ? null : (
            <Text variant="display" as="h2" id={section.id}>
              {section.title}
            </Text>
          )}
          <DesignHarnessMarkdown source={section.body} stripLeadingH1={false} />
        </section>
      ))}
    </>
  )
}

export function HowToDocPage({ route }: HowToDocPageProps) {
  const doc = HOWTO_DOCS[route]
  const article = useMemo(
    () => prepareHowtoArticle(rewriteHowtoMarkdownLinks(doc.source, doc.dir), doc.label),
    [doc.dir, doc.label, doc.source],
  )
  const ownIntro = doc.group === 'guide' || doc.group === 'release'

  return (
    <Stack gap="var(--spacing-08)" className="design-harness-ds-page">
      <DesignHarnessDocPage
        title={ownIntro ? doc.label : article.titleMain}
        lead={ownIntro ? undefined : (article.titleEm ?? doc.hint)}
        toc={false}
      >
        <HowtoSections article={article} />
      </DesignHarnessDocPage>
    </Stack>
  )
}
