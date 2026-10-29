# Test prompts — Project briefing agent

Run these in order to verify the workflow before production use.  
All tests run in `#product-design` or a dedicated test channel.

The agent spec lives in **`.cursor/agents.md`**. Confluence drafts follow
**`agents/research/project-briefing-confluence-template.md`**. Slack feedback
synthesis scans follow **`agents/research/feedback-synthesis-scan-spec.md`**.

---

## Test 0 — MCP connectivity smoke test (run this first)

**Prompt:**

```
Search Confluence for "test" and list the first 3 results you find.
Do not create any pages.
```

**Expected:**

- Agent lists 3 Confluence page titles with links
- No errors about authentication or missing tools
- If you see "I don't have access to Confluence" or similar, stop here and complete MCP setup before proceeding

---

## Test 1 — Retrieval only (no Confluence draft)

**Prompt:**

```
@Cursor search Confluence and Jira for anything related to checkout.
Do not create a Confluence page yet. Just list what you find.
```

**Expected:**

- Agent lists pages + issues with titles and links
- No Confluence page created
- Agent explicitly states it is not publishing / not creating a draft

---

## Test 2 — Full briefing, sparse topic (should find little)

**Prompt:**

```
@Cursor tell me everything about placeholder-topic-xyz for a new project.
Save under parent page 123456789 in space DESIGN.
```

**Expected:**

- Agent reports thin or empty results per source where applicable
- Creates a **minimal** Confluence **draft** using the briefing template (still
  includes confidence rating — likely **Low** — and honest "no documented
  research" style language where appropriate)
- Slack TL;DR reflects sparsity
- Page status is **DRAFT**
- Title pattern like `Design discovery kickoff (draft): placeholder-topic-xyz — [date]` (or `Briefing: …` if the prompt asked for a briefing only)

---

## Test 3 — Full briefing, real topic

**Prompt:**

```
@Cursor catch me up on checkout.
Save under parent page 123456789 in space DESIGN.
Title: Test briefing run — checkout — 2026-06-19
```

**Expected:**

- Confluence **draft** includes: executive summary **with confidence**, current
  state, research done (or explicit "none found"), relevant links grouped by
  source
- Slack reply: short summary + confidence + draft link + key verify links
- Page is **DRAFT** (not published)
- Claims cite sources; conflicts/staleness called out if present

---

## Test 4 — Ambiguous topic (agent should ask clarifying question)

**Prompt:**

```
@Cursor brief me on cards for a new project
```

**Expected:**

- Agent asks one clarifying question — e.g. card reader hardware vs gift cards vs
  card payments
- Agent does **not** start live Confluence/Jira/Slack retrieval until you
  answer (or it reasonably disambiguates)
- "cards" is intentionally ambiguous

---

## Test 5 — Default parent (DESIGN) when none specified

**Prompt:**

```
@Cursor what's the status of onboarding
```

*(No parent page ID provided.)*

**Expected:**

- Agent **creates the full briefing draft** under default **DESIGN** parent
  **`123456789`** (see `.cursor/agents.md`) and notes that default in the page
  info panel
- Slack/chat includes the **draft URL**

**Alternate — user forbids default parent:**

**Prompt:**

```
@Cursor brief me on referrals — do NOT use the default parent; I'll give you the parent next
```

**Expected:** Agent asks for parent and **does not** create the page until you
reply with URL/ID.

---

## Test 6 — Optional competitor benchmark (off by default)

**Prompt:**

```
@Cursor tell me everything about checkout — no competitor stuff
```

**Expected:**

- No competitor / external web benchmark section (and no fabricated competitor
  claims)

**Counter-prompt (when you want to test opt-in):**

```
@Cursor benchmark checkout against Fresha and Treatwell, then brief me.
Parent 123456789, space DESIGN.
```

**Expected:**

- Competitor section (7b) present, clearly labeled external / unverified
- Still produces draft + chat summary

---

## Test 7 — Feedback synthesis scan (Slack → Confluence draft)

**Prerequisites:** Slack MCP can read the target channel; user supplies real
`Channel ID`, taxonomy, and topic.

**Prompt:** paste the block from
`agents/research/feedback-synthesis-scan-spec.md` (section **Copy-paste prompt
template**) with placeholders filled — at minimum: channel name + ID, lookback,
market, topic, taxonomy, Confluence space + parent + title.

**Expected:**

- Confluence **draft** with **exactly** the seven-part structure (header →
  product breakdown tables)
- Tables include theme / sentiment / market / user type / priority columns
- Chat: summary of what was found + draft link **before** any publish question
- Strict topic filter acknowledged in info panel

---

## Pass criteria

All core tests pass when:

- [ ] Test 0: 3 Confluence results listed, no auth errors
- [ ] Test 1: Results listed, no page created
- [ ] Test 2: Sparse results acknowledged, draft created with appropriate
      confidence
- [ ] Test 3: Full briefing draft + Slack TL;DR with links
- [ ] Test 4: Clarifying question before retrieval
- [ ] Test 5: Custom parent honoured, or agent asks when user forbids defaults
- [ ] Test 7: Feedback synthesis draft + seven-part layout + chat summary first
