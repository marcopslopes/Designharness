import { useEffect, useMemo, useState } from 'react'
import { FrameBook, FrameChat, FrameCheck, FrameCode, FrameDownload } from '../harnessIcons'
import { Breadcrumb } from '../components/DocParts'
import { CopyAction, DocAction } from '../components/DocToolbar'
import { downloadText } from '../localFiles'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { DesignHarnessMarkdown } from '../components/DesignHarnessMarkdown'
import { getContextDoc, splitSkillFile, summarizeSkill, type ContextDocRoute } from '../contextDocs'
import { skillChatPrompt } from '../components/SkillCover'
import { skillGroupForRoute } from '../designHarnessNavConfig'
import { prepareHowtoArticle, rewriteHowtoMarkdownLinks, skillGuide, type HowtoArticleModel } from '../howtoDocs'
import { HowtoSections } from './HowToDocPage'
import { Callout, Icon, Stack, Text } from '../ui'

/** The opening list under "What you say", before any table in that section. */
function phrasesFromGuide(article: HowtoArticleModel | undefined): string[] {
  const section = article?.sections.find((item) => item.title.trim().toLowerCase() === 'what you say')
  if (!section) return []
  return [...section.body.matchAll(/^\s*[-*]\s+(.+)$/gm)]
    .map((match) => match[1].trim().replace(/^["“]|["”]$/g, ''))
    .filter(Boolean)
}

function articleWithoutOpeningList(article: HowtoArticleModel, phrases: string[]): HowtoArticleModel {
  if (phrases.length === 0) return article
  return {
    ...article,
    sections: article.sections.flatMap((section) => {
      if (section.title.trim().toLowerCase() !== 'what you say') return [section]
      const body = section.body.replace(/^(?:\s*[-*]\s+.*\n)+/, '').trim()
      return body ? [{ ...section, body }] : []
    }),
  }
}

/** Up to three real trigger phrases, each copying a prompt for Cursor, Claude Code, or Codex. */
function SkillExamples({ label, path, triggers }: { label: string; path: string; triggers: string[] }) {
  const examples = triggers.slice(0, 3)
  const [copied, setCopied] = useState<string | null>(null)
  if (examples.length === 0) return null

  const copy = async (example: string) => {
    const text = skillChatPrompt(label, path, example)
    let ok: boolean
    try {
      await Promise.race([
        navigator.clipboard.writeText(text),
        new Promise((_, reject) => window.setTimeout(() => reject(new Error('clipboard')), 400)),
      ])
      ok = true
    } catch {
      const area = document.createElement('textarea')
      area.value = text
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.left = '-999px'
      document.body.appendChild(area)
      area.select()
      ok = document.execCommand('copy')
      area.remove()
    }
    if (!ok) {
      window.prompt('Paste this into Cursor, Claude Code, or Codex:', text)
      return
    }
    setCopied(example)
    window.setTimeout(() => setCopied(null), 2000)
  }

  return (
    <ul className="design-harness-skill-examples">
      {examples.map((example) => (
        <li key={example}>
          <button
            type="button"
            className="design-harness-skill-example"
            title="Copies a prompt you paste into Cursor, Claude Code, or Codex"
            onClick={() => void copy(example)}
          >
            <span className="design-harness-skill-example__icon" aria-hidden>
              <Icon icon={copied === example ? FrameCheck : FrameChat} size="sm" />
            </span>
            <span>{example}</span>
            <span className="design-harness-skill-example__status" aria-live="polite">
              {copied === example ? 'Copied' : ''}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export type ContextDocPageProps = {
  route: ContextDocRoute
}

const SKILL_PREFIX = 'context/skills/'

/** One harness instruction file — a skill, reference, agent role, or the orchestrator — read in place. */
export function ContextDocPage({ route }: ContextDocPageProps) {
  const doc = getContextDoc(route)
  const [file, setFile] = useState<{
    route: ContextDocRoute
    raw: string
    description: string
    body: string
  }>()

  useEffect(() => {
    let live = true
    doc.load().then((raw) => {
      if (live) setFile({ route, raw, ...splitSkillFile(raw) })
    })
    return () => {
      live = false
    }
  }, [doc, route])

  const ready = file?.route === route

  if (route.startsWith(SKILL_PREFIX)) {
    return <SkillPage route={route} file={ready ? file : undefined} />
  }

  return (
    <Stack gap="var(--spacing-08)" className="design-harness-ds-page">
      <DesignHarnessDocPage
        title={doc.label}
        lead={ready && file.description ? file.description : <code className="design-harness__code">{doc.path}</code>}
        toc={false}
      >
        {ready ? <DesignHarnessMarkdown source={file.body} stripLeadingH1 /> : null}
      </DesignHarnessDocPage>
    </Stack>
  )
}

/**
 * A skill as a designer reads it: its `GUIDE.md`, or — until one
 * is written — what it's for and what triggers it, from the front matter.
 * The agent's own `SKILL.md` is the Source view, and the download.
 */
function SkillPage({
  route,
  file,
}: {
  route: ContextDocRoute
  file?: { raw: string; description: string; body: string }
}) {
  const doc = getContextDoc(route)
  const name = route.slice(SKILL_PREFIX.length)
  const guide = skillGuide(name)
  const article = useMemo(
    () =>
      guide
        ? prepareHowtoArticle(rewriteHowtoMarkdownLinks(guide.source, `harness/skills/${name}`), guide.label)
        : undefined,
    [guide, name],
  )
  const description = file?.description
  const summary = useMemo(() => (description ? summarizeSkill(description) : undefined), [description])
  const guidePhrases = phrasesFromGuide(article)
  const examples = (guidePhrases.length > 0 ? guidePhrases : (summary?.triggers ?? [])).slice(0, 3)
  const shownArticle = article ? articleWithoutOpeningList(article, guidePhrases.slice(0, 3)) : undefined
  const [view, setView] = useState<{
    route: ContextDocRoute
    mode: 'guide' | 'source'
  }>({ route, mode: 'guide' })
  const mode = view.route === route ? view.mode : 'guide'
  const topbar = (
    <div className="design-harness-skill-topbar">
      <Breadcrumb
        items={
          doc.kind === 'skill'
            ? [{ label: 'Skills', route: 'skills' }, { label: skillGroupForRoute(doc.route) }]
            : [
                { label: 'Documentation', route: 'how-to' },
                {
                  label: doc.kind === 'agent' ? 'Agents' : doc.kind === 'reference' ? 'References' : 'Platform',
                },
              ]
        }
      />
      <div className="design-harness-skill-actions">
        <CopyAction label="Use this skill" text={skillChatPrompt(doc.label, doc.path)} />
        <DocAction
          icon={FrameDownload}
          disabled={!file}
          onClick={() => file && downloadText(`${name}-SKILL.md`, file.raw)}
        >
          Download
        </DocAction>
        <DocAction
          icon={mode === 'guide' ? FrameCode : FrameBook}
          onClick={() => setView({ route, mode: mode === 'guide' ? 'source' : 'guide' })}
        >
          {mode === 'guide' ? 'View source' : 'View guide'}
        </DocAction>
      </div>
    </div>
  )

  if (mode === 'source') {
    return (
      <Stack gap="var(--spacing-08)" className="design-harness-ds-page">
        <DesignHarnessDocPage
          breadcrumb={topbar}
          title={doc.label}
          lead="The instructions the agent reads when it runs this skill."
          toc={false}
        >
          <Text variant="muted" as="p" className="design-harness-ds-doc-source-note">
            Source — <code className="design-harness__code">{doc.path}</code>
          </Text>
          {file ? <DesignHarnessMarkdown source={file.body} stripLeadingH1 /> : null}
        </DesignHarnessDocPage>
      </Stack>
    )
  }

  return (
    <Stack gap="var(--spacing-08)" className="design-harness-ds-page">
      <DesignHarnessDocPage
        title={doc.label}
        breadcrumb={topbar}
        lead={article ? undefined : summary?.purpose.replace(/[`*]/g, '')}
        toc={false}
      >
        {examples.length > 0 ? <SkillExamples label={doc.label} path={doc.path} triggers={examples} /> : null}
        {shownArticle ? <HowtoSections article={shownArticle} /> : null}
        {!article && summary ? (
          <>
            {summary.notes.length > 0 ? (
              <section className="design-harness-ds-doc-section">
                <Text variant="display" as="h2">
                  Good to know
                </Text>
                <DesignHarnessMarkdown source={summary.notes.map((n) => `- ${n}`).join('\n')} stripLeadingH1={false} />
              </section>
            ) : null}
            <Callout>
              No how-to guide for this skill yet — this page is built from its description. Add{' '}
              <code className="design-harness__code">harness/skills/{name}/GUIDE.md</code> to replace it.
            </Callout>
          </>
        ) : null}
      </DesignHarnessDocPage>
    </Stack>
  )
}
