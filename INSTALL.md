# Installation Guide

There are two ways to use this work. Pick the one that matches what you want.

| You want | Install | What you get |
|---|---|---|
| **The full harness** — routing, kickoff for a new request, quality gates, logged projects, the Design Harness app | [Clone this repo](#full-harness) | Every skill, the orchestrator, your company pack, project folders, the preview app |
| **Just the skills**, inside a project you already have | [Design Skills package](#skills-only) | The same skill playbooks, each self-contained. No routing between skills, no gates, no app |

The gates this harness is known for (research before building, `audit` before
sharing, the plan you approve before a multi-skill run) live in
`harness/ORCHESTRATOR.md` and the repo's agent rules. They only apply when your
agent has this repo open as its workspace.

---

## Full harness

**Time:** about 10 minutes. **Cost:** free. Your agent tool may need its own
account or subscription.

### 1. Prepare your computer

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) 22 — the version CI uses, pinned in `.nvmrc`
  (`nvm use` picks it up). 20.19+ also works.
- An agent that can read files and run commands in a folder: Cursor, Claude
  Code, or Codex

### 2. Clone and install

```bash
git clone https://github.com/marcopslopes/design-harness.git
cd design-harness
npm install
```

`npm install` also sets up a git pre-commit hook that blocks new hardcoded
colours and spacing values.

### 3. Open the folder in your agent

| Agent | How | What it reads |
|---|---|---|
| Cursor | Open the `design-harness` folder, then start an Agent chat | `AGENTS.md` and the always-on rules in `.cursor/rules/` |
| Claude Code | Run `claude` from the folder. Optional: `npm run setup:claude-skills` to list every skill in Claude's skill menu | `CLAUDE.md` |
| Codex | Open the folder as a Codex project, or run `codex` from it | `AGENTS.md` |

All three point to `harness/ORCHESTRATOR.md`, which holds the routing table
and every gate.

### 4. Say hi

Start a new chat and say `hi`. The first time, the agent runs a short
onboarding:

1. Asks which work tools your team uses (docs, tracker, chat, Figma, boards).
   **None of these** is a valid answer; every skill has a fallback.
2. Asks your role focus.
3. Writes `designer-profile.local.md` at the repo root. It is gitignored and
   never leaves your machine.

You only do this once per clone. Say "skip setup" to skip it.

### 5. Start the preview app (optional)

```bash
npm run dev
```

Opens Design Harness at **http://localhost:3002**: the design system catalog,
your projects, the team gallery, skill docs, and usage.

### 6. Try it

Talk in plain words. You don't need skill names.

```
"Kick off discovery on a referral leaderboard"
"Build a settings screen"
"Check this before I share it"
"What does Calendly do for rescheduling?"
```

Each project lives in `projects/<slug>/` (`brief.md`, `findings.md`,
`decisions.md`, `log.md`, `screens/`). Screens in `projects/<slug>/screens/`
appear in the app automatically; you never register routes by hand.

---

## Make it yours

The harness ships with **Northline**, a fictional booking company, so every
skill works out of the box. Replace it with your own context when you're ready.

### Your design system

Say `"set up my design system"` or `"import my tokens"`. The `harness-setup`
skill asks for your tokens, voice, personas, and patterns, imports what you
have, and keeps the defaults for the rest.

### Your company pack

Company context lives in `COMPANY-*.md` files. The agent reads
`context/org-pack.local/` when it exists, otherwise the public example in
`context/org-pack/`. It never mixes the two.

To start by hand:

```bash
mkdir -p context/org-pack.local
cp context/org-pack/COMPANY-*.md context/org-pack.local/
```

Then edit each file. Keep the headings (`**Prevents**`, `**Confidence**`,
`**Never do this**`) and replace the Northline facts.

| File | Holds | Affects |
|---|---|---|
| `COMPANY-BUSINESS.md` | Product, market, strategic pillars | What every skill thinks you're building |
| `COMPANY-VOICE.md` | Tone and copy rules | `content` and copy checks |
| `COMPANY-ARCHETYPES.md` | User segments | Who `ux-pattern` and `ui-agent` design for |
| `COMPANY-PATTERNS.md` | Your product's UX patterns | What `audit` checks against |
| `COMPANY-SQUADS.md` | Team structure | Who `workload-agent` and `research-agent` look at |
| `COMPANY-SOURCES.md` | Durable team links | Where research looks first |

Start with business and voice; they change the most output. Any extra
`COMPANY-*.md` you add is picked up through its `use-when:` header
(`harness/references/org-pack-extra-files.md`).

Everything ending in `.local` is gitignored, so company content stays on your
machine. To check: `git status --porcelain context/org-pack.local/` should
print nothing.

### Your work tools

Optional. Connect the MCP servers for whatever your team already uses: one docs
tool, one tracker, one chat, plus Figma or Miro if you use them. Details:
[documentation/setup/mcp-setup.md](documentation/setup/mcp-setup.md).

---

## Use it with a team

The harness is a folder in Git, so a team shares it the way it shares code.

1. Put your copy in a private or company repository. `context/org-pack.local/`
   stays out of Git. To share company defaults with the team, commit them to a
   private repo only, never to a public fork.
2. Each person clones it and runs onboarding once. Profiles stay local.
3. Projects in `projects/<slug>/` are shared through normal commits and pull
   requests. The gallery (`#/gallery`) groups them by person, reading the
   Ownership section of each committed `brief.md`.
4. To publish screens to a share URL, ask "publish this to a share URL". The
   `publish-project` skill only publishes work whose ship packet clears and that has an `audit` PASS.
5. To let people browse the app from a link, host a viewing copy on any static
   host. See [Host a viewing copy](documentation/guides/hosting.md).

Protecting `main` on GitHub and working side by side:
[Using it as a team](documentation/guides/using-it-as-a-team.md).

### Taking updates

New releases never change your copy on their own. To take one:

```bash
git remote add upstream https://github.com/marcopslopes/design-harness.git  # once
git fetch upstream --tags
git switch -c upgrade
git merge v0.1.0   # a release tag, or upstream/main for the latest changes
```

Review the merge, keep your local edits, run `npm install` and `npm run build`,
then merge the `upgrade` branch. Read [RELEASE-NOTES.md](RELEASE-NOTES.md)
first. `package.json` shows which version you're on.

---

## Skills only

If you just want the playbooks in a project you already have, install the
standalone **Design Skills** package. It's built from this repo's
`harness/skills/`; each skill carries a `references/standalone-mode.md` that
tells the agent what to use when harness files aren't there.

| Agent | Install |
|---|---|
| Claude Code | `/plugin marketplace add marcopslopes/design-skills`, then `/plugin install design-skills@design-skills` |
| Codex | `codex plugin marketplace add marcopslopes/design-skills`, then install from `/plugins` |
| Cursor or any other agent | `npx skills add marcopslopes/design-skills` |
| One skill | `npx skills add marcopslopes/design-skills --skill <name>` |

You won't get routing between skills, the plan gate, `audit` before sharing,
logged projects, or the preview app. For those, use the full harness.

---

## Troubleshooting

**The agent answers without loading a skill.** Check that the
`design-harness` folder itself is the open workspace, not a parent folder.
Ask: "audit the harness". It reads the routing log and shows what was missed.

**Onboarding runs again.** It only runs when `designer-profile.local.md` is
missing from the repo root. A new chat doesn't reset it.

**The agent has no clickable questions.** Some models lack Cursor's
`AskQuestion` tool. The harness asks the same question in plain text instead.
See [KNOWN-ISSUES.md](KNOWN-ISSUES.md).

**Port 3002 is busy.**

```bash
lsof -ti:3002 | xargs kill -9
npm run dev
```

**`npm run build` fails on `design:check`.** You've written a raw colour or
spacing value that already has a token. Run
`npm run design:detect -- <file>` to see which token to use.

**Claude Code doesn't list the skills.** Run `npm run setup:claude-skills`
(Windows: `npm run setup:claude-skills-windows`), then restart Claude Code.

Still stuck? [Open an issue](https://github.com/marcopslopes/design-harness/issues).

---

## Contributing

Adding a skill, improving one, or changing routing:
[CONTRIBUTING.md](CONTRIBUTING.md).
