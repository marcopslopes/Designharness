# Documentation

Public documentation for the Design Discovery Harness.

Last reviewed: 1 November 2026.

## 🚀 Getting Started

New to the harness? Read **[the manual](guides/manual.md)** first: six short chapters, from install to sharing work with your team. Then go deeper:
1. **[What is the Design Harness?](guides/what-is-the-harness.md)** - Overview and key concepts
2. **[Installation Guide](../INSTALL.md)** - Clone, open in your agent, say hi
3. **[Onboarding](guides/onboarding.md)** - First-time setup walkthrough
4. **[How the harness works](guides/how-the-harness-works.md)** - What happens between your request and the result
5. **[Company context](guides/company-context.md)** - Make it use your product, voice, and patterns
6. **[Host a viewing copy](guides/hosting.md)** - Share the app from a link

## 📁 Folder Structure

### `/setup`
Connecting your tools:
- [MCP Setup](setup/mcp-setup.md) - Which tools to connect for docs, tracker, chat, Figma, and Miro
- [Set up an MCP in Cursor](setup/01-setup-mcp-in-cursor.md) - Install, sign in, verify, fix
- [Install custom MCPs](setup/02-install-custom-mcps.md) - Servers that aren't one-click plugins
- Per-tool guides: [Figma](setup/mcps/figma.md), [Slack](setup/mcps/slack.md), [Atlassian](setup/mcps/atlassian.md), [Miro](setup/mcps/miro.md), [optional servers](setup/mcps/optional.md)
- [Slack routing](setup/slack-routing.md) - Trigger the project briefing agent from Slack

### `/guides`
Concepts and workflows:
- [What is the Design Harness?](guides/what-is-the-harness.md)
- [How the harness works](guides/how-the-harness-works.md)
- [Understanding Skills](guides/understanding-skills.md)
- [Agents vs Skills](guides/agents-vs-skills.md)
- [Onboarding](guides/onboarding.md)
- [Company context](guides/company-context.md) and [company sources](guides/company-sources.md)
- [Private context](guides/designer-context-local.md) - Your gitignored notes and links
- [Design System Usage](guides/design-system-usage.md) and [AI-native design system](guides/ai-native-design-system.md)
- [Variation review board](guides/variation-review-board.md) - Side-by-side options before you pick
- [Team gallery](guides/team-gallery.md)
- [Host a viewing copy](guides/hosting.md) - Static hosts, GitHub Pages, Docker
- [Confidence and autonomy](guides/confidence-autonomy.md)
- [Spec vs runtime](guides/spec-vs-runtime.md) - What code enforces vs what is only written down

### `/maintainers`
Changing the harness itself:
- [Build a skill](maintainers/build-a-skill.md)
- [Evals](maintainers/evals.md) - Testing routing changes
- [Docs freshness](maintainers/docs-freshness.md)
- [Skill benchmarking](maintainers/skill-benchmarking.md)
- [Self-improvement loops](maintainers/self-improvement-loops.md)
- [Marketing site strategy](maintainers/marketing-site-strategy.md) - Ideas from impeccable.style for presenting the harness
- [Team and Git plan inputs](maintainers/team-git-plan-inputs.md) - Draft research for a team plan, not a decision

### `/skills`
Individual skill guides - what each skill does and how to use it:

**Build Skills:**
- [ui-agent](skills/ui-agent.md) - Build screens from design system
- [presenter](skills/presenter.md) - Show built screens as Variants, Compare, Stage or Ideas
- [case-study](skills/case-study.md) - Write the project's story once
- [deck-builder](skills/deck-builder.md) - Create presentation decks
- [writing](skills/writing.md) - Long-form prose + anti-slop pass
- [mobile-shell](skills/mobile-shell.md) - Phone prototypes

**Critique Skills:**
- [audit](skills/audit.md) - Quality gate before sharing
- [ux-pattern](skills/ux-pattern.md) - Review flow structure
- [content](skills/content.md) - Review copy and voice
- [accessibility](skills/accessibility.md) - WCAG compliance
- [critique-prep](skills/critique-prep.md) - Presenter script for group critique

**Research Skills:**
- [research-agent](skills/research-agent.md) - Deep discovery
- [workload-agent](skills/workload-agent.md) - Roadmap and team workload
- [competitor-scan](skills/competitor-scan.md) - What competitors do

**Process Skills:**
- [design-kickoff](skills/design-kickoff.md) - Start new projects
- [ticket-create](skills/ticket-create.md) - Create tickets in Jira, Linear, or GitHub
- [design-handoff](skills/design-handoff.md) - Developer spec from a ready design
- [docs-brief](skills/docs-brief.md) - Create wiki pages

---

## 🎯 Common Tasks

### Building Something
1. "Build a [feature] screen" → [ui-agent](skills/ui-agent.md)
2. "Make a presentation about this" → [deck-builder](skills/deck-builder.md)
3. "Write this up / run anti-slop on this article" → [writing](skills/writing.md)
4. "Create a prototype" → [ui-agent](skills/ui-agent.md) + [mobile-shell](skills/mobile-shell.md)

### Checking Work
1. "Check this before I share" → [audit](skills/audit.md)
2. "Review this flow" → [ux-pattern](skills/ux-pattern.md)
3. "Check copy" → [content](skills/content.md)
4. "Prep me for critique" → [critique-prep](skills/critique-prep.md)
5. "Handoff this to developers" → [design-handoff](skills/design-handoff.md)

### Research
1. "Kick off discovery on [topic]" → [design-kickoff](skills/design-kickoff.md)
2. "What's on the roadmap?" → [workload-agent](skills/workload-agent.md)
3. "What does [competitor] do?" → [competitor-scan](skills/competitor-scan.md)

---

## 💡 Key Concepts

- **Skills** - Autonomous playbooks for specific tasks ([learn more](guides/understanding-skills.md))
- **Agents** - Roles that compose multiple skills ([learn more](guides/agents-vs-skills.md))
- **Orchestrator** - Routes your natural language to the right skills automatically
- **Token-First** - All colors/spacing come from design system tokens ([learn more](guides/design-system-usage.md))

---

## 🆘 Need Help?

- **Setup issues:** [MCP Setup](setup/mcp-setup.md)
- **Skill questions:** Browse `/skills` folder
- **Known issues:** [Known Issues](../KNOWN-ISSUES.md)
- **Contributing:** [Contributing Guide](../CONTRIBUTING.md)
