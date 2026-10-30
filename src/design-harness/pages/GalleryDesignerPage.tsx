import { DesignerAvatar } from '../components/DesignerAvatar'
import { ProjectCard } from '../components/ProjectCard'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { WorkViewToggle } from '../components/WorkViewToggle'
import { getVisibleGalleryDesignerBySlug } from '../galleryData'
import type { GalleryDesignerDesignHarnessRoute } from '../routes'
import { Stack, Text } from '../ui'
import { TextLink } from '../components/DocParts'

export type GalleryDesignerPageProps = {
  route: GalleryDesignerDesignHarnessRoute
}

const count = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

function slugFromRoute(route: GalleryDesignerDesignHarnessRoute): string {
  return route.slice('gallery/'.length)
}

/** One designer — same page frame and cards as All prototypes; a card opens the same project page. */
export function GalleryDesignerPage({ route }: GalleryDesignerPageProps) {
  const designer = getVisibleGalleryDesignerBySlug(slugFromRoute(route))

  if (!designer) {
    return (
      <div className="design-harness-ds-page design-harness-ds-page--wide">
        <DesignHarnessDocPage variant="list" title="Designer not found" toc={false}>
          <Text variant="body" as="p">
            No visible designer matches this page. They may have no visible projects, or this route is out of sync with{' '}
            <code className="design-harness__code">src/design-harness/gallery-designers/</code>.
          </Text>
          <TextLink route="gallery">← By designer</TextLink>
        </DesignHarnessDocPage>
      </div>
    )
  }

  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <DesignHarnessDocPage
        variant="list"
        title={designer.name}
        lead={designer.role}
        actions={<WorkViewToggle active="by-designer" />}
        toc={false}
      >
        <TextLink route="gallery" className="design-harness-gallery__back-link">
          ← By designer
        </TextLink>
        <Stack direction="row" gap="var(--spacing-04)" className="design-harness-gallery__designer-heading">
          <DesignerAvatar designer={designer} />
          {designer.focusAreas.length > 0 ? (
            <ul className="design-harness-gallery__directory-focus" aria-label="Focus areas">
              {designer.focusAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          ) : null}
        </Stack>

        <div className="design-harness-gallery__grid">
          {designer.projects.map((project) => (
            <ProjectCard
              key={project.slug}
              route={project.projectRoute}
              title={project.title}
              detail={
                project.line ??
                (project.projectRoute ? count(project.screenCount ?? 0, 'screen') : project.caseStudy.status)
              }
              footer={project.line && project.screenCount != null ? count(project.screenCount, 'screen') : undefined}
            />
          ))}
        </div>
      </DesignHarnessDocPage>
    </div>
  )
}
