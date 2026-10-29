import { MermaidDiagram } from '../components/MermaidDiagram'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { DesignHarnessMarkdown } from '../components/DesignHarnessMarkdown'
import { ProjectDocToolbar } from '../components/ProjectDocToolbar'
import type { Project, ProjectCaseStudyPage, ProjectDoc } from '../projectsIndex'
import { ProjectFactsStrip } from './ProjectPage'
import { Stack } from '../ui'
import '../styles/howto-html.css'

export type ProjectDocPageProps = {
  project: Project
  doc: ProjectDoc
}

/** A `docs/*.md` page (with screen and diagram embeds) or a `docs/*.mermaid` diagram. */
export function ProjectDocPage({ project, doc }: ProjectDocPageProps) {
  return (
    <Stack gap="var(--spacing-08)" className="design-harness-ds-page">
      <DesignHarnessDocPage
        title={doc.label}
        breadcrumb={
          <ProjectDocToolbar
            project={project}
            title={doc.label}
            source={doc.kind === 'markdown' ? doc.source : undefined}
            fileName={`${project.slug}-${doc.file
              .split('/')
              .pop()
              ?.replace(/\.\w+$/, '')}`}
          />
        }
      >
        {doc.kind === 'mermaid' ? (
          <MermaidDiagram source={doc.source} label={doc.label} />
        ) : (
          <DesignHarnessMarkdown source={doc.source} stripLeadingH1 projectSlug={project.slug} />
        )}
      </DesignHarnessDocPage>
    </Stack>
  )
}

export type ProjectFactsPageProps = {
  project: Project
}

/** The brief, as written — the project's working facts, one click from the front page. */
export function ProjectFactsPage({ project }: ProjectFactsPageProps) {
  return (
    <Stack gap="var(--spacing-08)" className="design-harness-ds-page">
      <DesignHarnessDocPage
        title="Project facts"
        breadcrumb={
          <ProjectDocToolbar
            project={project}
            title="Project facts"
            source={project.brief}
            fileName={`${project.slug}-facts`}
          />
        }
        lead={project.brief ? undefined : `No brief yet — add projects/${project.slug}/brief.md.`}
        meta={<ProjectFactsStrip project={project} />}
      >
        {project.brief ? (
          <DesignHarnessMarkdown source={project.brief} stripLeadingH1 projectSlug={project.slug} />
        ) : null}
      </DesignHarnessDocPage>
    </Stack>
  )
}

export type ProjectCaseStudyPageViewProps = {
  project: Project
  page: ProjectCaseStudyPage
}

/** `case-study.md`, its prose render, or its slide deck (full-bleed, like the HTML how-to pages). */
export function ProjectCaseStudyPageView({ project, page }: ProjectCaseStudyPageViewProps) {
  if (page.kind === 'slides') {
    return (
      <div className="design-harness-howto-html">
        <iframe
          className="design-harness-howto-html__frame"
          title={`${project.title} — case study slides`}
          src={page.source}
          loading="eager"
        />
      </div>
    )
  }
  const heading = page.source.match(/^#\s+(.+)$/m)?.[1]
  const title = page.kind === 'article' && heading ? heading : 'Case study'
  return (
    <Stack gap="var(--spacing-08)" className="design-harness-ds-page">
      <DesignHarnessDocPage
        title={title}
        breadcrumb={
          <ProjectDocToolbar
            project={project}
            title={title}
            source={page.source}
            fileName={`${project.slug}-${page.kind === 'article' ? 'article' : 'case-study'}`}
          />
        }
      >
        <DesignHarnessMarkdown source={page.source} stripLeadingH1 projectSlug={project.slug} />
      </DesignHarnessDocPage>
    </Stack>
  )
}
