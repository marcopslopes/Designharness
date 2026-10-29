import { useState } from 'react'

interface Skill {
  id: string
  name: string
  category: 'build' | 'critique' | 'research' | 'process'
  description: string
  dependencies: string[]
}

const MOCK_SKILLS: Skill[] = [
  {
    id: 'ui-agent',
    name: 'UI Agent',
    category: 'build',
    description: 'Token-first screen builder',
    dependencies: ['design-system', 'mobile-shell'],
  },
  {
    id: 'design-system',
    name: 'Design System',
    category: 'build',
    description: 'Pre-write token check',
    dependencies: [],
  },
  {
    id: 'mobile-shell',
    name: 'Mobile Shell',
    category: 'build',
    description: 'Phone chrome wrapper',
    dependencies: [],
  },
  {
    id: 'audit',
    name: 'Quality Audit',
    category: 'critique',
    description: 'Pre-share quality gate',
    dependencies: ['design-system', 'accessibility', 'content'],
  },
  {
    id: 'ux-pattern',
    name: 'UX Pattern Review',
    category: 'critique',
    description: 'Flow structure review',
    dependencies: [],
  },
  {
    id: 'content',
    name: 'Content Design',
    category: 'critique',
    description: 'Voice, tone, vocabulary',
    dependencies: [],
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    category: 'critique',
    description: 'WCAG blocking checks',
    dependencies: [],
  },
  {
    id: 'research-agent',
    name: 'Research Agent',
    category: 'research',
    description: 'Full-depth discovery',
    dependencies: [],
  },
  {
    id: 'workload-agent',
    name: 'Workload Agent',
    category: 'research',
    description: 'Live tracker snapshot',
    dependencies: [],
  },
  {
    id: 'design-kickoff',
    name: 'Design Kickoff',
    category: 'process',
    description: 'Mandatory front door',
    dependencies: ['workload-agent', 'research-agent'],
  },
]

export function SkillsGraphPage() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [filterCategory, setFilterCategory] = useState<string | null>(null)

  const filteredSkills = MOCK_SKILLS.filter((skill) => !filterCategory || skill.category === filterCategory)

  const categories = [
    { id: 'build', label: 'Build', count: MOCK_SKILLS.filter((s) => s.category === 'build').length },
    { id: 'critique', label: 'Critique', count: MOCK_SKILLS.filter((s) => s.category === 'critique').length },
    { id: 'research', label: 'Research', count: MOCK_SKILLS.filter((s) => s.category === 'research').length },
    { id: 'process', label: 'Process', count: MOCK_SKILLS.filter((s) => s.category === 'process').length },
  ]

  return (
    <div className="skills-page">
      <header className="skills-page__header">
        <h1 className="skills-page__title">Skills Graph</h1>
        <p className="skills-page__subtitle">Visualize skill dependencies and relationships across the harness</p>
      </header>

      {/* Category Filters */}
      <div className="skills-card" style={{ marginBottom: 'var(--spacing-06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-03)', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 600, color: 'var(--kit-ink-50)', fontSize: '0.875rem' }}>Filter by category:</span>
          <button
            onClick={() => setFilterCategory(null)}
            className="skills-button skills-button--secondary"
            style={{
              background: filterCategory === null ? 'var(--kit-brand)' : 'transparent',
              color: filterCategory === null ? 'white' : 'var(--kit-ink)',
            }}
          >
            All ({MOCK_SKILLS.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className="skills-button skills-button--secondary"
              style={{
                background: filterCategory === cat.id ? 'var(--kit-brand)' : 'transparent',
                color: filterCategory === cat.id ? 'white' : 'var(--kit-ink)',
              }}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid + Details */}
      <div
        style={{ display: 'grid', gridTemplateColumns: selectedSkill ? '2fr 1fr' : '1fr', gap: 'var(--spacing-06)' }}
      >
        {/* Skills Grid */}
        <div className="skills-graph">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className={`skill-node ${selectedSkill?.id === skill.id ? 'skill-node--selected' : ''}`}
              onClick={() => setSelectedSkill(skill)}
            >
              <div className={`skill-node__category skill-node__category--${skill.category}`}>{skill.category}</div>
              <div className="skill-node__name">{skill.name}</div>
              <div className="skill-node__description">{skill.description}</div>
              {skill.dependencies.length > 0 && (
                <div className="skill-node__deps">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  {skill.dependencies.length} {skill.dependencies.length === 1 ? 'dependency' : 'dependencies'}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Skill Details */}
        {selectedSkill && (
          <div
            className="skills-card skills-card--elevated"
            style={{ height: 'fit-content', position: 'sticky', top: 'var(--spacing-06)' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: 'var(--spacing-04)',
              }}
            >
              <h2 className="skills-card__title">Skill Details</h2>
              <button
                onClick={() => setSelectedSkill(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--kit-ink-30)',
                  cursor: 'pointer',
                  padding: 'var(--spacing-02)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div
              className={`skill-node__category skill-node__category--${selectedSkill.category}`}
              style={{ marginBottom: 'var(--spacing-04)' }}
            >
              {selectedSkill.category}
            </div>

            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--kit-ink)',
                marginBottom: 'var(--spacing-02)',
              }}
            >
              {selectedSkill.name}
            </h3>

            <p style={{ color: 'var(--kit-ink-50)', marginBottom: 'var(--spacing-05)', lineHeight: 1.6 }}>
              {selectedSkill.description}
            </p>

            {selectedSkill.dependencies.length > 0 && (
              <>
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--kit-ink-70)',
                    marginBottom: 'var(--spacing-03)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Dependencies ({selectedSkill.dependencies.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)' }}>
                  {selectedSkill.dependencies.map((depId) => {
                    const dep = MOCK_SKILLS.find((s) => s.id === depId)
                    return dep ? (
                      <div
                        key={depId}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedSkill(dep)
                        }}
                        style={{
                          padding: 'var(--spacing-03)',
                          background: 'var(--kit-bg)',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-02)',
                          fontSize: '0.875rem',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--kit-brand-soft)'
                          e.currentTarget.style.transform = 'translateX(4px)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--kit-bg)'
                          e.currentTarget.style.transform = 'translateX(0)'
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span style={{ fontWeight: 500, color: 'var(--kit-ink)' }}>{dep.name}</span>
                      </div>
                    ) : null
                  })}
                </div>
              </>
            )}

            <button
              className="skills-button skills-button--primary"
              style={{ marginTop: 'var(--spacing-05)', width: '100%', justifyContent: 'center' }}
            >
              View Skill File →
            </button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="skills-card" style={{ marginTop: 'var(--spacing-08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-05)', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 600, color: 'var(--kit-ink-50)', fontSize: '0.875rem' }}>Categories:</span>
          <div style={{ display: 'flex', gap: 'var(--spacing-04)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-02)' }}>
              <div className="skill-node__category skill-node__category--build">Build</div>
              <span style={{ fontSize: '0.875rem', color: 'var(--kit-ink-50)' }}>Screen & component builders</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-02)' }}>
              <div className="skill-node__category skill-node__category--critique">Critique</div>
              <span style={{ fontSize: '0.875rem', color: 'var(--kit-ink-50)' }}>Quality gates & reviews</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-02)' }}>
              <div className="skill-node__category skill-node__category--research">Research</div>
              <span style={{ fontSize: '0.875rem', color: 'var(--kit-ink-50)' }}>Discovery & analysis</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-02)' }}>
              <div className="skill-node__category skill-node__category--process">Process</div>
              <span style={{ fontSize: '0.875rem', color: 'var(--kit-ink-50)' }}>Workflow orchestration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
