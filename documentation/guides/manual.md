---
label: The manual
hint: Six short chapters, from install to sharing work with your team.
order: 1
---

# The manual

The shortest path through the harness. Each chapter takes a few minutes and links to the longer guide when you want more.

## 1. Set up

You need Git, Node 22, and an agent that works in a folder: Cursor, Claude Code, or Codex.

```bash
git clone https://github.com/marcopslopes/thedesignharness.git
cd design-harness
npm install
```

Open the folder in your agent, start a chat, and say `hi`. The agent asks which work tools your team uses and what your role is, then saves your answers to `designer-profile.local.md`. That file stays on your computer. You only do this once.

Run `npm run dev` to open the Design Harness app at [localhost:3002](http://localhost:3002).

More: [Installation guide](../../INSTALL.md), [Onboarding](onboarding.md).

## 2. Make a prototype

Describe what you want in plain words:

```
"Kick off discovery on a referral leaderboard"
"Build the leaderboard screen for phone"
```

Discovery creates a project folder, `projects/<name>/`, with a brief, findings, decisions, and a log. Screens you build go in its `screens/` folder and appear in the **Prototypes** tab on their own. You never add routes by hand.

To show the work, ask for a presentation view. **Variants** shows every state of one screen. **Compare** puts two to four directions side by side. **Stage** shows the prototype alone for a research session. A storyboard walks through a flow step by step.

More: [presenter](../skills/presenter.md), [ui-agent](../skills/ui-agent.md).

## 3. Work with the agent

You don't need skill names. The agent matches what you ask to one of the harness skills and follows it. When a task needs several skills, it shows a plan and waits for your go before it starts. When it needs a decision, it asks with buttons.

Every screen uses design system tokens and components. A new hardcoded colour or spacing value is blocked when you commit. Before you share, say "check this before I share it" to run the audit.

More: [How the harness works](how-the-harness-works.md), [Understanding skills](understanding-skills.md).

## 4. Add your company context

Out of the box the harness knows **Northline**, a made-up booking company, so every skill works on day one. Replace it with your product, voice, users, and patterns in one of three ways: in the app's Settings, by telling the agent in chat, or by adding `COMPANY-*.md` files to `context/org-pack.local/`.

That folder is gitignored. Your company's content stays on your computer unless you choose to commit it to a private repository.

More: [Company context](company-context.md), [Company sources](company-sources.md).

## 5. Share your work

Ask for the artifact you need: "write the case study", "make a deck for the review", or "write the handoff for developers". They're saved in the project's `artifacts/` folder.

To share the app itself, host a viewing copy. A build is a static website, so any static host works, and anyone with the link can browse your prototypes without installing anything.

More: [Host a viewing copy](hosting.md), [case-study](../skills/case-study.md), [deck-builder](../skills/deck-builder.md).

## 6. Work as a team

The harness is a Git repository, so a team shares it the way it shares code. Put your copy in a private repository, and each person clones it and runs onboarding once. Projects travel through normal commits and pull requests.

The **Prototypes** tab groups projects by designer. A project is listed once its brief names a designer, says `Gallery: visible`, and has a short case study summary.

New releases never change your copy on their own. When you want one, merge its tag, such as `v0.1.0`, and read the release notes first.

More: [Use it with a team](../../INSTALL.md#use-it-with-a-team), [Team gallery](team-gallery.md), [Release notes](../../RELEASE-NOTES.md).
