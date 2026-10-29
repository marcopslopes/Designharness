---
name: project-briefing
description: >-
  Use when a product designer wants a **design discovery kickoff PRD scaffold**
  on a project, feature, or domain — structured like an internal PRD starter
  (opportunity, problem, users & JTBD, data & BI, research insights, design
  exploration, delivery state, open questions) with **sources filled where they
  exist** and **intentional blank / placeholder rows where they do not**, so the
  page is a workshop-ready starting point. Same triggers as a briefing: "tell
  me everything about X", "kick off discovery on X", "PRD starter for X", "catch
  me up on X", etc. Searches the team's docs tool (Confluence, Notion, or Google
  Docs), tracker (Jira, Linear, or GitHub Issues), and chat (Slack or Teams).
  Figma when links surface. Competitor benchmark opt-in only.
---

# Project briefing

## Source of truth (this repository)

This is a Cursor entry point for the harness's **`research-agent`** skill.
Follow **`harness/skills/research-agent/SKILL.md`** and its full specification
in **`harness/skills/research-agent/references/agents.md`**: workflow,
vocabulary, guardrails, privacy rules, and chat reply format. Inside this repo,
net-new topics enter through `design-kickoff` first (`harness/ORCHESTRATOR.md` §2).

Which tool fills each job (docs, tracker, roadmap, chat) is resolved by
**`harness/references/work-tools.md`**.

**Every full briefing** produces a **draft page** with the **full** PRD scaffold
from `harness/skills/research-agent/references/brief-template.md` (all `##`
headings, blank placeholders where sources are missing); chat is summary + link
only, unless the user said not to write a page. No docs tool connected → the
same scaffold as Markdown in the project folder. Never auto-publish.

## Outside this repo

If the harness files are not in the workspace, apply the same workflow with
whatever tools are connected:

1. Live search the docs tool, tracker, and chat (with retries / synonyms).
2. Optional web search **only** if the user asked for competitor benchmarking.
3. Synthesise with conflict handling (recency wins, conflicts surfaced),
   **confidence rating** (High / Medium / Low), and no fabrication.
4. Write a structured **draft** briefing in the docs tool's personal / private
   space.
5. Return executive summary + links in chat.

## Related files

| File | Role |
|------|------|
| `harness/skills/research-agent/SKILL.md` | Skill entry |
| `harness/skills/research-agent/references/agents.md` | Full specification |
| `harness/skills/research-agent/references/brief-template.md` | Section order |
| `harness/skills/research-agent/references/taxonomy-example.md` | Optional product tagging block |
| `harness/skills/research-agent/setup/test-prompts.md` | Manual test prompts |
