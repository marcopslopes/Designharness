import { ProjectCard } from '../components/ProjectCard'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { WorkViewToggle } from '../components/WorkViewToggle'
import { truthLine } from '../projectFacts'
import { PROJECTS } from '../projectsIndex'
import { Text } from '../ui'

const count = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

/** Every project in `projects/`, one card each — the designer's name shows once the brief sets it. */
export function PlaygroundPage() {
  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <DesignHarnessDocPage
        variant="list"
        title="Prototypes"
        lead="Explore ideas, build interactive prototypes, and document your thinking."
        actions={<WorkViewToggle active="by-category" />}
        toc={false}
      >
        {PROJECTS.length === 0 ? (
          <Text variant="muted" as="p">
            No prototypes yet. Ask in chat to start a project.
          </Text>
        ) : (
          <div className="design-harness-gallery__grid">
            {PROJECTS.map((project) => {
              const line = truthLine(project.brief)
              const who = [project.ownership.designer, count(project.screens.length, 'screen')]
                .filter(Boolean)
                .join(' · ')
              return (
                <ProjectCard
                  key={project.slug}
                  route={project.route}
                  title={project.title}
                  detail={line ?? who}
                  footer={line ? who : undefined}
                />
              )
            })}
          </div>
        )}
      </DesignHarnessDocPage>
    </div>
  )
}
