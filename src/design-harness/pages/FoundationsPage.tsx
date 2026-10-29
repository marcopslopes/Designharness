import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { PROJECTS } from '../projectsIndex'
import { getSectionNavSections } from '../designHarnessNavConfig'
import { SummaryPanel } from '../components/DocParts'

const countIn = (sections: ReturnType<typeof getSectionNavSections>, label: string) =>
  sections.find((section) => section.label === label)?.items.length ?? 0

const SYSTEM = getSectionNavSections('design-system')
const DOCS = getSectionNavSections('how-to', 'how-to')
const SKILLS = getSectionNavSections('skills', 'skills')
const skillCount = SKILLS.filter(
  (section) => section.label === 'Craft' || section.label === 'Product' || section.label === 'Harness',
).reduce((sum, section) => sum + section.items.length, 0)

/** Design system → Overview: what the system holds and where it's used. */
export function FoundationsPage() {
  return (
    <DesignHarnessDocPage
      variant="list"
      title="Design system"
      lead="Components, styles, assets, and guidance for your prototypes."
      toc={false}
    >
      <SummaryPanel
        title="Toolkit"
        stats={[
          [countIn(SYSTEM, 'Components'), 'Components'],
          [countIn(SYSTEM, 'Theme'), 'Theme pages'],
          [countIn(SYSTEM, 'Assets'), 'Assets'],
        ]}
        note="Built from context/design-system/ds — primitives, tokens, and the Figma specs they come from."
      />
      <SummaryPanel
        title="Skills"
        stats={[[skillCount, 'Skills']]}
        note="Craft, Product, and Harness. Each card opens the skill as written."
        link={{ label: 'Open skills', route: 'skills' }}
      />
      <SummaryPanel
        title="Documentation"
        stats={[
          [countIn(DOCS, 'Agents'), 'Agents'],
          [countIn(DOCS, 'Platform'), 'Platform pages'],
        ]}
        note="The manual, plus the platform files and agent roles."
        link={{ label: 'Open documentation', route: 'how-to' }}
      />
      <SummaryPanel
        title="Where it's used"
        stats={[[PROJECTS.length, PROJECTS.length === 1 ? 'Active prototype' : 'Active prototypes']]}
        link={{ label: 'View all prototypes', route: 'playground' }}
      >
        <ul className="design-harness-ds-summary__list">
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              <a className="design-harness-ds-summary__row" href={`#/${project.route}`}>
                <span>{project.title}</span>
                {project.ownership.designer ? (
                  <span className="design-harness-ds-summary__detail">{project.ownership.designer}</span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </SummaryPanel>
    </DesignHarnessDocPage>
  )
}
