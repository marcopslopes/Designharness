import type { AgentDesignHarnessRoute } from './routes'
import uiAgentSkill from '../../harness/skills/ui-agent/SKILL.md?raw'
import contentAgentSkill from '../../harness/skills/content/SKILL.md?raw'
import uxPatternSkill from '../../harness/skills/ux-pattern/SKILL.md?raw'
import accessibilitySkill from '../../harness/skills/accessibility/SKILL.md?raw'
import researchAgentSkill from '../../harness/skills/research-agent/SKILL.md?raw'

export type AgentReadiness = 'ready' | 'in-progress'

export type AgentDefinition = {
  route: AgentDesignHarnessRoute
  title: string
  invoke: string
  readiness: AgentReadiness
  summary: string
  skillPath: string
  contextFiles: string[]
  starterPrompt: string
  skillSource: string
  claudeSkillFile?: string
}

export const AGENT_DEFINITIONS: Record<AgentDesignHarnessRoute, AgentDefinition> = {
  'agents/ui-agent': {
    route: 'agents/ui-agent',
    title: 'UI Agent',
    invoke: '/ui',
    readiness: 'ready',
    summary:
      'Assembles on-brand UI from `context/design-system/ds` primitives and `context/design-system/tokens.css`. Names the provider archetype, composes real components, and points you to the audit skill before share.',
    skillPath: 'harness/skills/ui-agent/SKILL.md',
    contextFiles: [
      'harness/ORCHESTRATOR.md',
      'COMPANY-BUSINESS.md (org-pack)',
      'COMPANY-ARCHETYPES.md (org-pack)',
      'context/design-system/ds/',
    ],
    starterPrompt: `Use the UI agent skill (harness/skills/ui-agent/SKILL.md).

Build: [describe the screen — e.g. referral entry point in Calendar]
Audience: providers (Northline Studio)
Archetype: [e.g. Side-hustle Builder]

Rules: only context/design-system/ds components, only tokens from context/design-system/tokens.css. Run /audit before I share.`,
    skillSource: uiAgentSkill,
  },
  'agents/content-agent': {
    route: 'agents/content-agent',
    title: 'Content Agent',
    invoke: '/content',
    readiness: 'ready',
    summary:
      'Drafts and reviews UI copy against the Product Content Style Guide, vocabulary rules, and localization table. Produces a priority guide first, then copy, then a Needs review section.',
    skillPath: 'harness/skills/content/SKILL.md',
    contextFiles: [
      'harness/skills/content/references/style-guide.md',
      'harness/skills/content/references/vocabulary.md',
      'harness/skills/content/references/localization.md',
      'COMPANY-VOICE.md (org-pack)',
    ],
    starterPrompt: `/content

I need copy for: [screen name — e.g. Deposits setup, step 2]
Audience: providers
Market: US English

Job to be done: [what the user needs to understand or do]`,
    skillSource: contentAgentSkill,
  },
  'agents/ux-pattern-agent': {
    route: 'agents/ux-pattern-agent',
    title: 'UX Pattern Agent',
    invoke: '/ux',
    readiness: 'ready',
    summary:
      'Maps flows to product interaction conventions and provider archetypes. Flags structural problems before line-level polish — modal vs push, provider vs client model, checkout anti-patterns.',
    skillPath: 'harness/skills/ux-pattern/SKILL.md',
    contextFiles: [
      'COMPANY-PATTERNS.md (org-pack)',
      'COMPANY-ARCHETYPES.md (org-pack)',
      'COMPANY-BUSINESS.md (org-pack)',
    ],
    starterPrompt: `Use the UX pattern agent skill (harness/skills/ux-pattern/SKILL.md).

Review: [flow or prototype — e.g. referral modal compact variant]
Target archetype: [name from COMPANY-ARCHETYPES.md]

Check archetype fit, provider vs client patterns, and documented checkout anti-patterns.`,
    skillSource: uxPatternSkill,
  },
  'agents/accessibility-agent': {
    route: 'agents/accessibility-agent',
    title: 'Accessibility Agent',
    invoke: '/a11y',
    readiness: 'ready',
    summary:
      'WCAG-style baseline checks on prototypes: labels, dialog semantics, focus, live regions, SVG and image alt text. Blocking failures must be fixed before share. For full audit including tokens and copy, use /audit.',
    skillPath: 'harness/skills/accessibility/SKILL.md',
    contextFiles: ['harness/skills/accessibility/SKILL.md', 'harness/skills/audit/SKILL.md'],
    starterPrompt: `Use the accessibility agent skill (harness/skills/accessibility/SKILL.md).

Audit: [file path — e.g. src/design-harness/pages/ReferralModalPrototypePage.tsx]

Report blocking issues first. Then suggest fixes.`,
    skillSource: accessibilitySkill,
  },
  'agents/research-agent': {
    route: 'agents/research-agent',
    title: 'Research Agent',
    invoke: '/research',
    readiness: 'ready',
    summary:
      'Searches your docs tool, tracker, chat, Figma, and Miro for everything the company knows about a topic, then writes a discovery draft in your docs tool and returns a TL;DR with confidence rating.',
    skillPath: 'harness/skills/research-agent/SKILL.md',
    contextFiles: [
      'harness/skills/research-agent/references/agents.md',
      'harness/skills/research-agent/references/brief-template.md',
      'harness/skills/research-agent/references/BUILD-BRIEF.md',
      'documentation/setup/mcp-setup.md',
      'harness/skills/research-agent/setup/test-prompts.md',
    ],
    starterPrompt: `Use the project research agent skill (harness/skills/research-agent/SKILL.md).

Research: [topic — e.g. checkout flow, store onboarding, referral program]
Audience: product design / PM discovery kickoff

Write the draft in my personal docs space and return the executive summary.`,
    skillSource: researchAgentSkill,
  },
}

export function getAgentDefinition(route: AgentDesignHarnessRoute): AgentDefinition {
  return AGENT_DEFINITIONS[route]
}
