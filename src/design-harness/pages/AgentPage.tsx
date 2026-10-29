import { useCallback, useState } from 'react'
import type { AgentDesignHarnessRoute } from '../routes'
import { getAgentDefinition } from '../agentConfig'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { DesignHarnessMarkdown } from '../components/DesignHarnessMarkdown'
import { Badge, Stack, Text } from '../ui'
import { TextLink } from '../components/DocParts'
type Props = {
  route: AgentDesignHarnessRoute
}

export function AgentPage({ route }: Props) {
  const agent = getAgentDefinition(route)
  const [copyHint, setCopyHint] = useState<'idle' | 'ok' | 'err'>('idle')

  const onCopyPrompt = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(agent.starterPrompt)
      setCopyHint('ok')
    } catch {
      setCopyHint('err')
    }
    window.setTimeout(() => setCopyHint('idle'), 2000)
  }, [agent.starterPrompt])

  const readinessLabel = agent.readiness === 'ready' ? 'Ready' : 'In progress'
  const readinessTone = agent.readiness === 'ready' ? 'positive' : 'accent'

  return (
    <div className="design-harness-ds-page">
      <DesignHarnessDocPage
        title={agent.title}
        lead={agent.summary}
        meta={
          <Stack direction="row" gap="var(--spacing-03)" className="design-harness-agent-page__status-row">
            <Badge tone={readinessTone}>{readinessLabel}</Badge>
            <Text variant="muted" as="p" className="design-harness-agent-page__invoke">
              Invoke in Cursor: <code className="design-harness__code">{agent.invoke}</code>
            </Text>
          </Stack>
        }
        beforeBody={
          <div className="design-harness-agent-page__quickstart">
            <section className="design-harness-agent-page__section">
              <Text variant="label" as="h2" className="design-harness-ds-doc-section-title">
                How to invoke
              </Text>
              <Stack gap="var(--spacing-04)">
                <Text variant="body" as="p">
                  In <strong>Cursor</strong>, start a chat in this repo and say{' '}
                  <code className="design-harness__code">Use the {agent.title.toLowerCase()} skill</code> or type{' '}
                  <code className="design-harness__code">{agent.invoke}</code>. The agent loads{' '}
                  <code className="design-harness__code">{agent.skillPath}</code> and the context files below.
                </Text>
                {agent.claudeSkillFile ? (
                  <Text variant="body" as="p">
                    In <strong>Claude.ai</strong>, upload{' '}
                    <code className="design-harness__code">{agent.claudeSkillFile.split('/').pop()}</code> from{' '}
                    <code className="design-harness__code">{agent.claudeSkillFile}</code> at{' '}
                    <TextLink href="https://claude.ai/customize/skills">claude.ai/customize/skills</TextLink> (slash
                    command: <code className="design-harness__code">/brief-me</code>).
                  </Text>
                ) : null}
              </Stack>
            </section>

            <section className="design-harness-agent-page__section">
              <Text variant="label" as="h2" className="design-harness-ds-doc-section-title">
                Context files
              </Text>
              <ul className="design-harness-ds-list">
                {agent.contextFiles.map((file) => (
                  <li key={file}>
                    <Text variant="body" as="span">
                      <code className="design-harness__code">{file}</code>
                    </Text>
                  </li>
                ))}
              </ul>
            </section>

            <section className="design-harness-agent-page__section">
              <Stack direction="row" gap="var(--spacing-04)" className="design-harness-agent-page__prompt-header">
                <Text variant="label" as="h2" className="design-harness-ds-doc-section-title">
                  Starter prompt
                </Text>
                <button
                  type="button"
                  className="design-harness-agent-page__copy-btn"
                  onClick={() => void onCopyPrompt()}
                >
                  Copy prompt
                </button>
              </Stack>
              {copyHint !== 'idle' ? (
                <p className="design-harness-agent-page__copy-hint" role="status">
                  {copyHint === 'ok' ? 'Copied to clipboard.' : 'Could not copy — select the text manually.'}
                </p>
              ) : null}
              <pre className="design-harness-agent-page__prompt">
                <code>{agent.starterPrompt}</code>
              </pre>
            </section>
          </div>
        }
      >
        <Text variant="muted" as="p" className="design-harness-ds-doc-source-note">
          Skill reference — <code className="design-harness__code">{agent.skillPath}</code>
        </Text>
        <DesignHarnessMarkdown source={agent.skillSource} stripLeadingH1 />
      </DesignHarnessDocPage>
    </div>
  )
}
