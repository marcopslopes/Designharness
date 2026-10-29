import { useState } from 'react'

interface SkillMatch {
  id: string
  name: string
  category: 'build' | 'critique' | 'research' | 'process'
  description: string
  relevance: 'high' | 'medium' | 'low'
  reason: string
}

export function SkillsAssistantPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SkillMatch[]>([])
  const [searching, setSearching] = useState(false)

  const handleSearch = () => {
    if (!query.trim()) return

    setSearching(true)

    // Mock search results
    setTimeout(() => {
      const mockResults: SkillMatch[] = [
        {
          id: 'ui-agent',
          name: 'UI Agent',
          category: 'build',
          description: 'Token-first screen builder',
          relevance: 'high',
          reason: 'Directly builds UI screens using design tokens',
        },
        {
          id: 'design-system',
          name: 'Design System',
          category: 'build',
          description: 'Pre-write token check',
          relevance: 'high',
          reason: 'Must be used before ui-agent to ensure token compliance',
        },
        {
          id: 'mobile-shell',
          name: 'Mobile Shell',
          category: 'build',
          description: 'Phone chrome wrapper',
          relevance: 'medium',
          reason: 'Useful if building mobile-specific screens',
        },
        {
          id: 'accessibility',
          name: 'Accessibility',
          category: 'critique',
          description: 'WCAG blocking checks',
          relevance: 'medium',
          reason: 'Run after building to validate accessibility',
        },
      ]

      setResults(mockResults)
      setSearching(false)
    }, 600)
  }

  const examplePrompts = [
    'I need to build a new user profile screen',
    'Review my design before sharing with stakeholders',
    'Research competitor payment flows',
    'Set up a new design project',
  ]

  return (
    <div className="skills-page">
      <header className="skills-page__header">
        <h1 className="skills-page__title">Skills Assistant</h1>
        <p className="skills-page__subtitle">Ask what to do next, and get the right skills for your task</p>
      </header>

      {/* Search Interface */}
      <div className="skills-card skills-card--elevated" style={{ marginBottom: 'var(--spacing-06)' }}>
        <div className="skills-search">
          <svg
            className="skills-search__icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="skills-search__input"
            placeholder="What are you trying to do?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        <button
          className="skills-button skills-button--primary"
          onClick={handleSearch}
          disabled={!query.trim() || searching}
          style={{
            marginTop: 'var(--spacing-04)',
            opacity: !query.trim() || searching ? 0.5 : 1,
            cursor: !query.trim() || searching ? 'not-allowed' : 'pointer',
          }}
        >
          {searching ? (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ animation: 'spin 1s linear infinite' }}
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Searching...
            </>
          ) : (
            'Find Skills'
          )}
        </button>

        {/* Example Prompts */}
        {results.length === 0 && (
          <div style={{ marginTop: 'var(--spacing-06)' }}>
            <div
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--kit-ink-50)',
                marginBottom: 'var(--spacing-03)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Try these examples:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)' }}>
              {examplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(prompt)
                    setTimeout(() => handleSearch(), 100)
                  }}
                  style={{
                    padding: 'var(--spacing-03) var(--spacing-04)',
                    background: 'var(--kit-bg)',
                    border: '1px solid var(--kit-line-strong)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                    fontSize: '0.9375rem',
                    color: 'var(--kit-ink-70)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--kit-brand-soft)'
                    e.currentTarget.style.borderColor = 'var(--kit-brand-80)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--kit-bg)'
                    e.currentTarget.style.borderColor = 'var(--kit-line-strong)'
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
                    style={{ display: 'inline', marginRight: 'var(--spacing-02)', verticalAlign: 'middle' }}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-05)',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--kit-ink)' }}>Recommended Skills</h2>
            <button
              onClick={() => {
                setQuery('')
                setResults([])
              }}
              className="skills-button skills-button--secondary"
              style={{ fontSize: '0.875rem' }}
            >
              New Search
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-04)' }}>
            {results.map((match) => (
              <div
                key={match.id}
                className="skills-card"
                style={{
                  borderLeft: `4px solid ${
                    match.relevance === 'high'
                      ? 'var(--kit-leaf)'
                      : match.relevance === 'medium'
                        ? 'var(--kit-amber)'
                        : 'var(--kit-neutral-50)'
                  }`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: 'var(--spacing-03)',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-03)',
                        marginBottom: 'var(--spacing-02)',
                      }}
                    >
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--kit-ink)', margin: 0 }}>
                        {match.name}
                      </h3>
                      <div className={`skill-node__category skill-node__category--${match.category}`}>
                        {match.category}
                      </div>
                    </div>
                    <p style={{ color: 'var(--kit-ink-50)', fontSize: '0.9375rem', marginBottom: 'var(--spacing-03)' }}>
                      {match.description}
                    </p>
                  </div>
                  <div className={`skills-badge skills-badge--${match.relevance}`}>
                    {match.relevance === 'high' && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    {match.relevance}
                  </div>
                </div>

                <div
                  style={{
                    padding: 'var(--spacing-04)',
                    background: 'var(--kit-brand-soft)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--spacing-04)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--kit-brand)',
                      marginBottom: 'var(--spacing-01)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Why this skill?
                  </div>
                  <div style={{ fontSize: '0.9375rem', color: 'var(--kit-brand-30)', lineHeight: 1.5 }}>
                    {match.reason}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-03)' }}>
                  <button className="skills-button skills-button--primary">Use Skill →</button>
                  <button className="skills-button skills-button--secondary">View Details</button>
                </div>
              </div>
            ))}
          </div>

          {/* Workflow Recommendation */}
          <div
            className="skills-card skills-card--elevated"
            style={{
              marginTop: 'var(--spacing-06)',
              background: 'linear-gradient(135deg, var(--kit-brand-soft) 0%, var(--kit-paper) 100%)',
              border: '1px solid var(--kit-brand-95)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--spacing-04)' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--kit-brand)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--kit-ink)',
                    marginBottom: 'var(--spacing-02)',
                  }}
                >
                  Recommended Workflow
                </h3>
                <p
                  style={{
                    color: 'var(--kit-ink-50)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    marginBottom: 'var(--spacing-04)',
                  }}
                >
                  Based on your query, here's the suggested order:
                </p>
                <ol
                  style={{
                    margin: 0,
                    paddingLeft: 'var(--spacing-05)',
                    color: 'var(--kit-ink-70)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.8,
                  }}
                >
                  <li>
                    <strong style={{ color: 'var(--kit-brand)' }}>Design System</strong> — Check token availability
                    first
                  </li>
                  <li>
                    <strong style={{ color: 'var(--kit-brand)' }}>UI Agent</strong> — Build the screen using tokens
                  </li>
                  <li>
                    <strong style={{ color: 'var(--kit-brand)' }}>Mobile Shell</strong> — (Optional) Wrap in phone
                    chrome
                  </li>
                  <li>
                    <strong style={{ color: 'var(--kit-brand)' }}>Accessibility</strong> — Validate before sharing
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Info Card */}
      {results.length === 0 && (
        <div className="skills-card" style={{ marginTop: 'var(--spacing-08)' }}>
          <h2 className="skills-card__title">How the Assistant Works</h2>
          <div style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--kit-ink-50)' }}>
            <p style={{ marginBottom: 'var(--spacing-04)' }}>
              The Skills Assistant uses natural language search to match your intent with the right skills from the
              harness.
            </p>
            <p style={{ marginBottom: 'var(--spacing-04)' }}>
              <strong style={{ color: 'var(--kit-ink)' }}>It recommends:</strong>
            </p>
            <ul
              style={{
                margin: 0,
                paddingLeft: 'var(--spacing-05)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-02)',
              }}
            >
              <li>Which skills to use for your task</li>
              <li>The optimal order to run them</li>
              <li>Why each skill is relevant</li>
              <li>Skill dependencies and relationships</li>
            </ul>
            <div
              style={{
                marginTop: 'var(--spacing-05)',
                padding: 'var(--spacing-04)',
                background: 'var(--kit-brand-soft)',
                border: '1px solid var(--kit-brand-95)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <strong style={{ color: 'var(--kit-brand)' }}>Note:</strong>{' '}
              <span style={{ color: 'var(--kit-brand-30)' }}>
                This assistant currently uses mock data. Real RAG-based search will connect to your actual skills
                repository.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
