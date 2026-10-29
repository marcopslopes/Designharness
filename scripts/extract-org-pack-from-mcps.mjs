#!/usr/bin/env node

/**
 * extract-org-pack-from-mcps.mjs
 *
 * Extracts company context from connected MCPs and builds
 * context/org-pack.local/ files with domain vocabulary, business context,
 * voice rules, patterns, squads, and archetypes.
 *
 * Called from harness/skills/org-pack-builder/SKILL.md Mode B (MCP extraction).
 *
 * Usage:
 *   node scripts/extract-org-pack-from-mcps.mjs \
 *     --mcps=linear,notion,figma,slack \
 *     --output=context/org-pack.local
 *
 * Accepted tools, grouped by job (harness/references/work-tools.md):
 *   tracker: jira, linear, github
 *   docs:    confluence, notion, google-docs
 *   chat:    slack, teams
 *   design:  figma
 *
 * Requires:
 * - MCP servers configured and authenticated
 * - GetDynamicTools access for each MCP namespace
 *
 * Output:
 * - COMPANY-BUSINESS.md
 * - COMPANY-VOCABULARY.md (NEW - Layer 2 domain mapping)
 * - COMPANY-VOICE.md
 * - COMPANY-PATTERNS.md
 * - COMPANY-SQUADS.md
 * - COMPANY-ARCHETYPES.md
 * - COMPANY-SOURCES.md
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Parse CLI args
const args = process.argv.slice(2)
const mcpsArg = args.find((arg) => arg.startsWith('--mcps='))?.split('=')[1] || ''
const outputArg = args.find((arg) => arg.startsWith('--output='))?.split('=')[1] || 'context/org-pack.local'

const mcps = mcpsArg.split(',').filter(Boolean)
const outputDir = path.join(process.cwd(), outputArg)

// Extraction results storage
const extractionResults = {
  business: { sources: [], facts: [] },
  vocabulary: { sources: [], terms: new Map() },
  voice: { sources: [], rules: [] },
  patterns: { sources: [], patterns: [] },
  squads: { sources: [], teams: [] },
  archetypes: { sources: [], users: [] },
  sources: { sources: [], links: [] },
}

const JOBS = {
  tracker: { tools: ['jira', 'linear', 'github'], icon: '📊' },
  docs: { tools: ['confluence', 'notion', 'google-docs'], icon: '📝' },
  chat: { tools: ['slack', 'teams'], icon: '💬' },
  design: { tools: ['figma'], icon: '🎨' },
}

const TOOL_LABELS = {
  jira: 'Jira',
  linear: 'Linear',
  github: 'GitHub Issues',
  confluence: 'Confluence',
  notion: 'Notion',
  'google-docs': 'Google Docs',
  slack: 'Slack',
  teams: 'Microsoft Teams',
  figma: 'Figma',
}

const unknown = mcps.filter((tool) => !TOOL_LABELS[tool])
if (unknown.length) {
  console.warn(`⚠️  Ignoring unknown tools: ${unknown.join(', ')}`)
}

// What each job feeds, and what a real extraction would search for
const JOB_TARGETS = {
  tracker: {
    files: ['business', 'vocabulary', 'patterns', 'squads', 'archetypes'],
    // - Epic / project descriptions for business context
    // - Ticket titles/descriptions for domain terms (frequency analysis)
    // - Project / team / repo structure for squad mapping
    // - Bug patterns for common edge cases
    // - User story patterns for archetypes
  },
  docs: {
    files: ['vocabulary', 'voice', 'business', 'sources'],
    // - "glossary", "terminology", "vocabulary" → COMPANY-VOCABULARY.md
    // - "brand voice", "content guidelines", "style guide" → COMPANY-VOICE.md
    // - "strategy", "OKRs", "about us" → COMPANY-BUSINESS.md
  },
  chat: {
    files: ['voice', 'vocabulary'],
    // - Message tone in design/product channels → COMPANY-VOICE.md
    // - Recurring terms from channels → COMPANY-VOCABULARY.md
    // - Team structure from channels → COMPANY-SQUADS.md
  },
  design: {
    files: ['vocabulary', 'patterns'],
    // - Design system files via search_design_system
    // - Component names → COMPANY-VOCABULARY.md (UI terminology)
    // - Repeated patterns → COMPANY-PATTERNS.md
  },
}

// Statistics, keyed by tool
const stats = {}

/**
 * Main extraction orchestrator
 */
async function main() {
  console.log('🔍 Extracting company context from MCPs...\n')

  try {
    const extractions = []
    for (const [job, { tools }] of Object.entries(JOBS)) {
      for (const tool of tools) {
        if (mcps.includes(tool)) extractions.push(extractFrom(job, tool))
      }
    }

    await Promise.all(extractions)

    // Build org-pack files
    await buildOrgPackFiles()

    // Show summary
    showSummary()

    process.exit(0)
  } catch (error) {
    console.error('❌ Extraction failed:', error.message)
    process.exit(1)
  }
}

/**
 * Extract from one tool filling one job
 */
async function extractFrom(job, tool) {
  const label = TOOL_LABELS[tool]
  console.log(`${JOBS[job].icon} Extracting from ${label} (${job})...`)

  try {
    // NOTE: Placeholder — a real implementation calls the tool's MCP from the
    // agent context (see JOB_TARGETS for what each job searches for).
    console.log(`⚠️  ${label} extraction requires MCP integration (run from agent context)`)

    for (const file of JOB_TARGETS[job].files) {
      extractionResults[file].sources.push(label)
    }
    stats[tool] = { items: 0 }
  } catch (error) {
    console.warn(`⚠️  ${label} extraction failed:`, error.message)
  }
}

/**
 * Build org-pack files from extraction results
 */
async function buildOrgPackFiles() {
  console.log('\n📦 Building org-pack files...\n')

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true })

  const today = new Date().toISOString().split('T')[0]
  const sourcesSummary = Array.from(
    new Set([
      ...extractionResults.business.sources,
      ...extractionResults.vocabulary.sources,
      ...extractionResults.voice.sources,
      ...extractionResults.patterns.sources,
      ...extractionResults.squads.sources,
    ]),
  ).join(', ')

  // Build COMPANY-BUSINESS.md
  await buildBusinessFile(today, sourcesSummary)

  // Build COMPANY-VOCABULARY.md (NEW - Layer 2)
  await buildVocabularyFile(today, sourcesSummary)

  // Build COMPANY-VOICE.md
  await buildVoiceFile(today, sourcesSummary)

  // Build COMPANY-PATTERNS.md
  await buildPatternsFile(today, sourcesSummary)

  // Build COMPANY-SQUADS.md
  await buildSquadsFile(today, sourcesSummary)

  // Build COMPANY-ARCHETYPES.md
  await buildArchetypesFile(today, sourcesSummary)

  // Build COMPANY-SOURCES.md
  await buildSourcesFile(today, sourcesSummary)

  console.log('✅ All files created\n')
}

/**
 * Build COMPANY-BUSINESS.md
 */
async function buildBusinessFile(today, sourcesSummary) {
  const content = `# Company Business Context

Business and product context for design agents and designers starting work on any surface. Use alongside \`COMPANY-VOICE.md\` and \`COMPANY-ARCHETYPES.md\`.

**Prevents: Problem drift** — right UI, wrong problem. An agent that doesn't know who's using a screen or why will guess, and the guess defaults to generic SaaS.

**Confidence: INFERRED from ${sourcesSummary} (${today}) — review and correct before trusting in production work. This is extracted content, not ground truth.**

---

## What [Product] is

[Auto-extracted business description — review and edit]

---

## Strategic pillars

[Auto-extracted pillars — review and edit]

---

## User segments

[Auto-extracted segments — review and edit]

---

## Key product areas

[Auto-extracted areas — review and edit]

---

## What [Product] is not

[Auto-extracted differentiators — review and edit]

---

## Never do this

- Never design a feature without understanding which user segment it serves
- Never assume business context — check this file first
- Never invent competitive positioning not documented here
`

  await fs.writeFile(path.join(outputDir, 'COMPANY-BUSINESS.md'), content, 'utf8')
  console.log('✓ COMPANY-BUSINESS.md')
}

/**
 * Build COMPANY-VOCABULARY.md (NEW - Layer 2: Domain mapping)
 */
async function buildVocabularyFile(today, sourcesSummary) {
  const termsCount = extractionResults.vocabulary.terms.size || 0

  const content = `# Company Domain Vocabulary

Domain terms, definitions, and terminology standards. Use when writing copy, naming components, or resolving naming conflicts.

**Prevents: Terminology drift** — different terms for the same concept, or the same term for different concepts.

**Confidence: INFERRED from ${sourcesSummary} (${today}) — extracted ${termsCount} terms via frequency analysis. Review and correct terminology conflicts before production use.**

---

## Core vocabulary

| Term | Definition | Synonyms/alternates | Usage context | Source |
|------|------------|---------------------|---------------|--------|
[Auto-extracted terms — review frequency-based definitions]

---

## Terminology conflicts

| Conflict | Options | Decision | Rationale |
|----------|---------|----------|-----------|
[Auto-detected conflicts from multiple terms for same concept — review and resolve]

---

## Bounded contexts

When a term means different things in different areas:

| Term | Context A meaning | Context B meaning | How to handle |
|------|-------------------|-------------------|---------------|
[Auto-detected context variations — review and document]

---

## Deprecated terms

| Old term | Use instead | Reason |
|----------|-------------|--------|
[To be filled manually — extraction can't infer deprecation without explicit signals]

---

## Never do this

- Never use domain terms inconsistently across surfaces
- Never invent new synonyms for core terms without content team review
- Never assume a term's definition — check this file first
- Never skip this file when writing UI copy or naming components
`

  await fs.writeFile(path.join(outputDir, 'COMPANY-VOCABULARY.md'), content, 'utf8')
  console.log(`✓ COMPANY-VOCABULARY.md (${termsCount} terms extracted)`)
}

/**
 * Build COMPANY-VOICE.md
 */
async function buildVoiceFile(today, sourcesSummary) {
  const content = `# Company Voice & Tone

How [Company] sounds in product copy, notifications, and communication. Use when writing UI copy or product communication.

**Prevents: Content drift** — visually correct screens that sound like generic SaaS.

**Confidence: INFERRED from ${sourcesSummary} (${today}) — extracted from message tone analysis and existing copy. Validate with content team.**

---

## Brand personality

[Auto-extracted personality traits — review tone patterns]

---

## Voice principles

[Auto-extracted principles from copy analysis — review and edit]

---

## Writing rules

| Rule | Do | Don't |
|------|----|-------|
[Auto-extracted rules from copy patterns — review and formalize]

---

## Vocabulary

| Use | Avoid | Notes |
|-----|-------|-------|
[Refer to COMPANY-VOCABULARY.md for domain terms]

---

## Never do this

- Never use emoji in product copy unless explicitly approved
- Never use exclamation marks to manufacture excitement
- Never write copy that could apply to any SaaS product
- Never skip voice validation with content team for high-visibility copy
`

  await fs.writeFile(path.join(outputDir, 'COMPANY-VOICE.md'), content, 'utf8')
  console.log('✓ COMPANY-VOICE.md')
}

/**
 * Build COMPANY-PATTERNS.md
 */
async function buildPatternsFile(today, sourcesSummary) {
  const content = `# Company UX Patterns

Recurring UX patterns, edge cases, and domain-specific flows. Use when designing new features to maintain consistency.

**Prevents: Pattern drift** — reinventing solutions to problems already solved elsewhere.

**Confidence: INFERRED from ${sourcesSummary} (${today}) — extracted from bug reports and component usage. Review for accuracy.**

---

## Recurring patterns

[Auto-extracted patterns from component reuse and ticket patterns — review and document]

---

## Common edge cases

[Auto-extracted from bug reports and error patterns — review and formalize]

---

## Domain-specific patterns

[Auto-extracted unique-to-product patterns — review and document]

---

## Never do this

- Never design a new feature without checking if a pattern already exists
- Never assume edge cases are unique to your feature
- Never skip pattern documentation after solving a recurring problem
`

  await fs.writeFile(path.join(outputDir, 'COMPANY-PATTERNS.md'), content, 'utf8')
  console.log('✓ COMPANY-PATTERNS.md')
}

/**
 * Build COMPANY-SQUADS.md
 */
async function buildSquadsFile(today, sourcesSummary) {
  const content = `# Company Squad Structure

Team structure, ownership, and design leadership. Use for understanding who owns what and routing work correctly.

**Prevents: Ownership confusion** — designing for the wrong squad or missing key stakeholders.

**Confidence: INFERRED from ${sourcesSummary} (${today}) — extracted from project structure and assignees. Verify with team leads.**

---

## Squad structure

[Auto-extracted teams from project ownership — review and update with actual structure]

---

## Design leadership

[Auto-extracted design leads from ticket assignments — review and update]

---

## Never do this

- Never assume squad ownership without checking this file
- Never route work without verifying current squad structure
- Never skip stakeholder identification before starting design work
`

  await fs.writeFile(path.join(outputDir, 'COMPANY-SQUADS.md'), content, 'utf8')
  console.log('✓ COMPANY-SQUADS.md')
}

/**
 * Build COMPANY-ARCHETYPES.md
 */
async function buildArchetypesFile(today, sourcesSummary) {
  const content = `# Company User Archetypes

Key user types, their goals, contexts, and behaviors. Use when designing features to understand who you're designing for.

**Prevents: Generic design** — solutions that work for no one because they try to work for everyone.

**Confidence: INFERRED from ${sourcesSummary} (${today}) — extracted from user story patterns. Validate with research team.**

---

## Archetypes

[Auto-extracted user types from story patterns — review and formalize with research]

---

## Archetype behavior

[Auto-extracted behavioral patterns — review and document]

---

## Never do this

- Never design without identifying which archetype(s) the feature serves
- Never assume all users behave the same way
- Never skip archetype validation with user research
`

  await fs.writeFile(path.join(outputDir, 'COMPANY-ARCHETYPES.md'), content, 'utf8')
  console.log('✓ COMPANY-ARCHETYPES.md')
}

/**
 * Build COMPANY-SOURCES.md
 */
async function buildSourcesFile(today, sourcesSummary) {
  const content = `# Company External Sources

Research sources, competitive analysis, strategy docs, and external references. Use when context requires backing evidence.

**Prevents: Invention** — agents making up facts that should be sourced.

**Confidence: INFERRED from ${sourcesSummary} (${today}) — extracted from linked documents. Review and add missing sources.**

---

## External sources

[Auto-extracted links from documents — review and categorize]

---

## Research repository

[To be filled manually — extraction can't infer research priorities]

---

## Never do this

- Never cite a source not listed here without verifying it first
- Never invent competitive claims without documented evidence
- Never skip source attribution for external research
`

  await fs.writeFile(path.join(outputDir, 'COMPANY-SOURCES.md'), content, 'utf8')
  console.log('✓ COMPANY-SOURCES.md')
}

/**
 * Show extraction summary
 */
function showSummary() {
  console.log('📊 Extraction Summary\n')

  for (const [tool, { items }] of Object.entries(stats)) {
    console.log(`${TOOL_LABELS[tool]}: ${items} items`)
  }
  console.log(`\n✅ Created 7 files in ${outputDir}/`)
  console.log('\n⚠️  NOTE: This is a placeholder implementation.')
  console.log('Real MCP extraction requires running from agent context with MCP access.')
  console.log('Files created are templates — fill in extracted content from MCP calls.\n')
}

// Run
main()
