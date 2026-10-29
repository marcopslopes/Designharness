---
name: feedback-synthesis-scan
description: >-
  Use when the user wants a chat feedback synthesis scan (Slack or Teams): read messages from a
  named channel (with lookback), filter strictly by topic, tag each signal to a
  product taxonomy (theme, sentiment, market, user type, priority), and write
  a draft page in the team's docs tool (Confluence, Notion, or Google Docs) with a fixed seven-part structure — header, info panel,
  executive summary, top cross-product issues, positive signals, recommendations
  table, and per-product breakdown tables. Trigger on: "feedback synthesis
  scan", "synthesise Slack feedback", "scan #channel for X", "VoC from Slack
  for [topic]", or any prompt that matches the runner spec in
  agents/research/feedback-synthesis-scan-spec.md. Requires chat read; writes to the docs tool when
  connected, otherwise Markdown. Does not replace the project-briefing / discovery
  kickoff workflow.
---

# Feedback synthesis scan

## Source of truth (this repository)

1. **Runner prompt + defaults:** `agents/research/feedback-synthesis-scan-spec.md`
2. **Page section order and tables:** `agents/research/feedback-synthesis-scan-template.md`
3. **Example taxonomy block:** `agents/research/taxonomy-example.md`

Create pages as **draft** only. Chat reply = short summary of what
was found + draft link; do not ask to publish before sharing findings.

## Outside this repo

If those files are not in workspace, still honour the **seven-part output
structure** from the user’s prompt and the tagging rules (product, theme,
sentiment, market, user type, priority).
