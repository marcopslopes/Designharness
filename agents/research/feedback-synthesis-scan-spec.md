# Feedback synthesis scan — runner spec

This workflow is **separate** from the [project briefing / discovery kickoff](project-briefing-confluence-template.md) template. It synthesises **chat-only** (Slack or Teams) feedback into a **fixed-structure** draft page in the team's docs tool (Confluence, Notion, or Google Docs) for PM/design triage. Tool resolution: `harness/references/work-tools.md`.

## When to use

- Voice-of-customer / internal feedback from a **named chat channel**
- Strict **topic filter** + **product taxonomy** tagging
- Output: **Top issues**, **positive signals**, **recommendations**, **per-product signal tables**

## Prerequisites

- **Chat** (Slack or Teams) — read/search the channel (respect lookback and rate limits).
- **Docs tool** — create/update **draft** pages. No docs tool connected →
  write the page as Markdown in the project folder.
- On Confluence, resolve the numeric **space ID** from the space key before
  creating the page.

## Default placement

If the prompt does not specify a parent, use the team's feedback-scan
destination from `COMPANY-SOURCES.md` § Destinations. If none is recorded,
create the draft in the requester's personal / private space and ask once
whether to save a shared destination.

State in the **Info panel** that the default location was used so the owner can move the page.

## Copy-paste prompt template

Replace every `[PLACEHOLDER]`. Remove placeholder lines you do not need.

```text
Output structure
Every scan page you produce follows this exact structure:

Header line — source channel, scanned by Cursor, date, market
Info panel — brief description of what the scan covers
Executive summary — 3–4 sentences
Top issues — cross-product — numbered list, most critical first
Positive signals — bullet list
Recommendations table — product | action | rationale | priority
Product breakdown — one section per product with a signal table (signal | theme | sentiment | market | user type | priority)

I want you to run a feedback synthesis scan. Here's everything you need:

--- CHANNEL ---
Chat channel: [CHANNEL_NAME]
Channel ID: [CHANNEL_ID]
Lookback: [LOOKBACK e.g. 14d, 30d, 90d]
Market focus: [MARKET e.g. US, GB, global]

--- TOPIC FOCUS ---
I only want feedback related to: [TOPIC]
Ignore all messages not related to this topic.

--- PRODUCT TAXONOMY ---
For each piece of feedback, tag it to one of these products:

[PASTE TAXONOMY — see agents/research/taxonomy-example.md]

For each feedback item extract:
- product code
- theme (checkout_friction / payment_failure / feature_request / pricing_confusion / positive_signal)
- sentiment (positive / negative / neutral)
- market (US / PL / ES / FR / GB / global)
- user type (provider / consumer / unknown)
- priority (blocker / high / medium / low)

--- OUTPUT FORMAT ---
Create a draft page in the docs tool (do not publish) with this exact structure:
1. Header line: source channel, scanned by Cursor, date, market
2. Info panel: brief description of what this scan covers
3. Executive summary (3-4 sentences)
4. Top issues — cross-product (numbered list, most critical first)
5. Positive signals (bullet list)
6. Recommendations (table: product | action | rationale | priority)
7. Product breakdown — one section per product with a table:
   columns: signal | theme | sentiment | market | user type | priority

Follow the repo template: agents/research/feedback-synthesis-scan-template.md

--- DESTINATION ---
Save as draft under:
- Docs tool: [Confluence / Notion / Google Docs]
- Parent page, space, or folder: [URL — or leave blank for the default]
- Page title: [SCAN_TITLE]

--- INSTRUCTIONS ---
1. Read/search the chat channel to collect all relevant messages (within lookback).
2. Filter strictly for [TOPIC]-related feedback only.
3. Categorise each signal by product using the taxonomy above.
4. Write the synthesis report following the output format exactly.
5. Create the page as a draft and share the link.
6. Summarise what you found in chat before asking if the user wants to publish.
```

## Agent behaviour notes

1. **Channel read** — Use chat search scoped to the channel ID when the MCP supports it; otherwise search with `in:#channel-name` style queries if available. If the tool cannot access history depth, say so in the executive summary.
2. **Topic filter** — When in doubt, **exclude**; mention approximate drop rate if possible.
3. **Docs write** — create the page as a draft where the tool supports it (Confluence `createConfluencePage` / `updateConfluencePage` with `status: "draft"`; Notion `notion-create-pages` in a private location; Google Docs in the requester's Drive). See `harness/references/work-tools.md` § Docs.
4. **Empty products** — Still emit the product heading + “No on-topic signals in this scan.”

## Related files

| File | Role |
|------|------|
| `agents/research/feedback-synthesis-scan-template.md` | Section order + table columns + expand/collapse note |
| `agents/research/taxonomy-example.md` | Example taxonomy block shape |
| `.cursor/skills/feedback-synthesis-scan/SKILL.md` | Cursor skill entry |
