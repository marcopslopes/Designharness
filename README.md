# Design Discovery Harness

An AI-native design workflow that takes you from a vague idea to a
quality-checked prototype, with real research, real constraints, and real
guardrails. It runs inside the agent you already use (Cursor, Claude Code, or
Codex) on a folder you own.

**What makes it different:** it enforces a repeatable process. New work starts
with research and a brief you approve. Screens are built from your design
tokens. Work is checked before it's shared. Every step is logged, so any agent
can pick up where the last one stopped.

It works for one designer, a small team, or a company design org. It ships
with a fictional example company (Northline) so it works before you've
configured anything.

---

## Quick start

```bash
git clone https://github.com/marcopslopes/design-harness.git
cd design-harness
npm install
```

Open the `design-harness` folder in your agent and say `hi`. A one-time
onboarding asks a few questions and saves a local profile. Then talk in plain
words:

```
"Kick off discovery on a referral leaderboard"
"Build a settings screen"
"Check this before I share it"
"What does Calendly do for rescheduling?"
```

Preview your design system and projects with `npm run dev` at
**http://localhost:3002**.

**Full guide:** [INSTALL.md](INSTALL.md), including company setup, team use,
and updates. **New here?** [The manual](documentation/guides/manual.md) is six
short chapters, from install to sharing work with your team.

**Only want the skills in another project?** Install the standalone
[Design Skills](https://github.com/marcopslopes/design-skills) package. You get
the same playbooks, without routing, gates, or the app.

---

## How it works

1. **Profile and company context.** On the first chat the agent writes
   `designer-profile.local.md` (gitignored). It reads your company pack from
   `context/org-pack.local/` if you've made one, otherwise the Northline
   example.
2. **Routing.** `harness/ORCHESTRATOR.md` matches your request to one or more
   skills, and logs the decision. If nothing matches, it says so and asks
   rather than improvising.
3. **Plan gate.** When a request needs more than one skill, the agent shows the
   plan and waits for your go.
4. **Skills.** Each skill in `harness/skills/<name>/SKILL.md` is a playbook:
   what to read, the steps, the checks, and what to hand back.
5. **Project memory.** Work lives in `projects/<slug>/`: `brief.md`,
   `findings.md`, `decisions.md`, `log.md`, and `screens/`.
6. **Checks.** `audit` closes every full build (design system, accessibility,
   copy). A git hook and `npm run build` block new hardcoded colour and
   spacing values.

---

## What you get

- **68 skills** for building, critique, research, accessibility, content,
  handoff, strategy, and team process. Browse them in
  [documentation/skills/](documentation/skills/).
- **A token-first design system** in `context/design-system/`, with
  primitives (Button, Card, Stack, Text and more) and a live catalog.
- **The Design Harness app**: design system catalog, projects, team gallery,
  skill docs, and usage.
- **A company pack template** for your voice, personas, patterns, and team
  structure. The Northline example fills in until you replace it.
- **Optional tool connections.** Docs (Confluence, Notion, Google Docs),
  tracker (Jira, Linear, GitHub), chat (Slack, Teams), Figma, and Miro. None
  are required. See [documentation/setup/mcp-setup.md](documentation/setup/mcp-setup.md).

---

## Example

```
You: "Kick off discovery on a city leaderboard"

Harness:
1. workload-agent: is anyone already working on this?
2. research-agent: what exists in your docs, tickets, chat, and Figma?
3. Drafts an evidence-based brief
4. Stops and waits for your approval

You: "Looks good, build it"

Harness:
5. ui-agent builds the screen from your tokens and components
6. audit checks it; issues block sharing
7. Saves everything to projects/city-leaderboard/
```

---

## Documentation

- [The manual](documentation/guides/manual.md)
- [What is the harness?](documentation/guides/what-is-the-harness.md)
- [Onboarding](documentation/guides/onboarding.md)
- [Host a viewing copy](documentation/guides/hosting.md)
- [Understanding skills](documentation/guides/understanding-skills.md)
- [Agents vs skills](documentation/guides/agents-vs-skills.md)
- [Design system usage](documentation/guides/design-system-usage.md)
- [Known issues](KNOWN-ISSUES.md)
- [Release notes](RELEASE-NOTES.md)

---

## Tech stack

- Vite, React, and TypeScript. Node.js 22.12+ (or 20.19+)
- Design system: `context/design-system/` (`tokens.css` and `ds/`)
- Harness: `harness/ORCHESTRATOR.md` and `harness/skills/`

---

## Philosophy

The harness is opinionated:

- Research before building
- Tokens before raw values
- Checks before sharing
- Everything logged, so work can be resumed
- Plain language, no commands to memorise

AI without constraints ships fast but ships wrong.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for adding skills, routing changes, and
the pull request process.

## Acknowledgements

Some files adapt text from these MIT-licensed projects. Each of those files
credits its source at the end.

- [Layers of Product Design](https://github.com/jamiemill/layers-skills) by Jamie
  Mill. Breadboarding is adapted from it, and it inspired domain mapping and
  two-stage job stories.
- [cuellarfr/design-skills](https://github.com/cuellarfr/design-skills) by Carlos C.
  The ethical design check, the error-prevention levels, and the service blueprint
  example are adapted from it.
- [jakubkrehel/skills](https://github.com/jakubkrehel/skills) by Jakub Krehel. A few
  review and tone rules in `interface-change-review` and `content` are adapted
  from it. It also inspired rules in `taste-feedback`, `accessibility`, and
  `responsive-patterns`, and the conventions in the
  [skill-writing guide](documentation/maintainers/build-a-skill.md).

[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) is adapted from the
[Contributor Covenant](https://www.contributor-covenant.org) and credits it inside.

## License

MIT. See [LICENSE](LICENSE).
