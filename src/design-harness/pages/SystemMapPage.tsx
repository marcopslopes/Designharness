import { useEffect, useState } from 'react'
import { FramePerson } from '../harnessIcons'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { DesignHarnessMarkdown } from '../components/DesignHarnessMarkdown'
import { HelpCard } from '../components/HomeParts'
import type { ContextDocRoute } from '../contextDocs'
import { loadSystemMap, type MapRole } from '../systemMap'
import '../styles/system-map.css'
import { Callout, Stack, Text } from '../ui'
import { TextLink } from '../components/DocParts'

const ORCHESTRATOR_ROUTE = 'context/orchestrator' as ContextDocRoute

const PERSON_CALLS = `- **Ask, don't guess** — when a skill is unsure, it asks you instead of picking.
- **Private messages stay private** — the harness never reads or sends DMs.
- **Your profile stays on your machine** — it is never pushed to the shared repo.
- **Taste is never automated** — skills flag options; you choose.`

/** How the harness fits together — orchestrator, roles, and every skill each role owns. */
export function SystemMapPage() {
  const [roles, setRoles] = useState<MapRole[]>()

  useEffect(() => {
    let live = true
    loadSystemMap().then((next) => {
      if (live) setRoles(next)
    })
    return () => {
      live = false
    }
  }, [])

  const skillCount = roles ? new Set(roles.flatMap((role) => role.skills.map((skill) => skill.route))).size : 0
  const ownerRoles = roles?.filter((role) => role.route) ?? []

  return (
    <Stack gap="var(--spacing-08)" className="design-harness-ds-page">
      <DesignHarnessDocPage
        title="System map"
        lead="How the harness fits together: the orchestrator routes every ask, roles own the skills, and some calls always stay with a person."
      >
        <section className="design-harness-ds-doc-section">
          <Text variant="display" as="h2">
            Orchestrator
          </Text>
          <Text variant="body" as="p">
            Every ask goes through the orchestrator first. It matches the ask to a skill in its routing table, logs the
            match, and loads that skill — or says plainly when nothing fits.{' '}
            <TextLink route={ORCHESTRATOR_ROUTE}>Read the orchestrator</TextLink>
          </Text>
          <Callout tone="warning">
            <strong>Two approvals are always yours.</strong> You approve the brief before anything gets built, and the
            plan before anything gets sent.
          </Callout>
        </section>

        <section className="design-harness-ds-doc-section">
          <Text variant="display" as="h2">
            Roles
          </Text>
          <Text variant="body" as="p">
            The agent reasons from {ownerRoles.length || 'five'} roles. Each one owns a set of skills.
          </Text>
          <div className="design-harness-home__cards design-harness-map__roles">
            {ownerRoles.map((role) => (
              <HelpCard
                key={role.name}
                title={role.name}
                description={role.job}
                route={role.route!}
                icon={FramePerson}
              />
            ))}
          </div>
        </section>

        <section className="design-harness-ds-doc-section">
          <Text variant="display" as="h2">
            Skills by role
          </Text>
          <Text variant="body" as="p">
            {roles ? `All ${skillCount} skills, under the role that owns them.` : 'Loading skills…'} Open one to see
            what it does and what to say to start it.
          </Text>
          {roles?.map((role) => (
            <div key={role.name} className="design-harness-map__role">
              <div className="design-harness-map__role-head">
                <Text variant="label" as="h3">
                  {role.name}
                </Text>
                <Text variant="muted" as="span">
                  {role.skills.length} {role.skills.length === 1 ? 'skill' : 'skills'}
                </Text>
              </div>
              <ul className="design-harness-map__skills">
                {role.skills.map((skill) => (
                  <li key={skill.route}>
                    <a className="design-harness-map__skill" href={`#/${skill.route}`} title={skill.purpose}>
                      <span className="design-harness-map__skill-name">{skill.label}</span>
                      {skill.purpose ? <span className="design-harness-map__skill-job">{skill.purpose}</span> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="design-harness-ds-doc-section">
          <Text variant="display" as="h2">
            Always a person's call
          </Text>
          <DesignHarnessMarkdown source={PERSON_CALLS} stripLeadingH1={false} />
        </section>
      </DesignHarnessDocPage>
    </Stack>
  )
}
