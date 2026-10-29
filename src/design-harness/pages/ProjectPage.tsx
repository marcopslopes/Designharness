import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { DesignHarnessMarkdown } from '../components/DesignHarnessMarkdown'
import { ProjectDocToolbar } from '../components/ProjectDocToolbar'
import { briefSectionText } from '../projectFacts'
import type { Project } from '../projectsIndex'
import { Text } from '../ui'

export type ProjectPageProps = {
  project: Project
}

/** "About this prototype": `about.md`, or the brief's Intent until one exists. The sidebar lists everything else. */
export function ProjectPage({ project }: ProjectPageProps) {
  const intent = project.about ? undefined : briefSectionText(project.brief, 'Intent')
  return (
    <div className="design-harness-ds-page">
      <DesignHarnessDocPage
        title={project.title}
        breadcrumb={
          <ProjectDocToolbar
            project={project}
            title={project.title}
            source={project.about ?? intent}
            fileName={`${project.slug}-about`}
          />
        }
        lead={
          project.about || intent
            ? undefined
            : `No brief yet — add projects/${project.slug}/brief.md to say what this is and why.`
        }
      >
        {project.about ? (
          <DesignHarnessMarkdown source={project.about} stripLeadingH1 projectSlug={project.slug} />
        ) : null}
        {intent ? (
          <>
            <DesignHarnessMarkdown source={intent} projectSlug={project.slug} />
            <Text variant="muted" as="p">
              Add <code className="design-harness__code">projects/{project.slug}/about.md</code> to give this project a
              proper front page — a short tour of the screens for whoever opens it.
            </Text>
          </>
        ) : null}
      </DesignHarnessDocPage>
    </div>
  )
}

/** Status · platform · stage, plus designer and squad when the brief names them. Blank fields are left out. */
export function ProjectFactsStrip({ project }: { project: Project }) {
  const facts = [
    ['Status', project.facts.status],
    ['Platform', project.facts.platform],
    ['Stage', project.facts.stage],
    ['Designer', project.ownership.designer],
    ['Squad', project.ownership.squad],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]))
  if (facts.length === 0) return null
  return (
    <dl className="design-harness-project-facts">
      {facts.map(([label, value]) => (
        <div key={label} className="design-harness-project-facts__item">
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}
