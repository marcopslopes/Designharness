import { DesignerAvatar } from '../components/DesignerAvatar'
import { ProjectCard } from '../components/ProjectCard'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { WorkViewToggle } from '../components/WorkViewToggle'
import { GALLERY_UNRESOLVED_OWNERSHIP_SLUGS, getVisibleGalleryDesigners } from '../galleryData'
import { Text } from '../ui'

const count = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

/** The same cards as All prototypes, one per designer — avatar, name, role and how many projects. */
export function TeamGalleryPage() {
  const designers = getVisibleGalleryDesigners()
  const unresolvedCount = GALLERY_UNRESOLVED_OWNERSHIP_SLUGS.length

  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <DesignHarnessDocPage
        variant="list"
        title="Prototypes"
        lead="Explore ideas, build interactive prototypes, and document your thinking."
        actions={<WorkViewToggle active="by-designer" />}
        toc={false}
      >
        {designers.length === 0 ? (
          <Text variant="muted" as="p">
            Nobody&apos;s listed yet — once a project has a designer and is marked visible, it&apos;ll show up here.
          </Text>
        ) : (
          <div className="design-harness-gallery__grid">
            {designers.map((designer) => (
              <ProjectCard
                key={designer.slug}
                route={`gallery/${designer.slug}`}
                title={designer.name}
                detail={[designer.title, count(designer.projects.length, 'project')].filter(Boolean).join(' · ')}
                media={<DesignerAvatar designer={designer} className="design-harness-gallery__card-avatar" />}
              />
            ))}
          </div>
        )}
        {unresolvedCount > 0 ? (
          <Text variant="muted" as="p" className="design-harness-gallery__note">
            {count(unresolvedCount, 'project')} {unresolvedCount === 1 ? "isn't" : "aren't"} listed yet — the brief
            needs a designer.
          </Text>
        ) : null}
      </DesignHarnessDocPage>
    </div>
  )
}
