# Handoff menu — `AskQuestion` (Step 5)

Run **strictly after** the headline + workload table(s) are already
shown in chat — never before or alongside them (re-spec 2026-07-17; see
`post-onboarding-handoff.md` § 5's explicit self-check). The menu is
**only** a native Cursor **`AskQuestion` tool call** — **never** repeat it
as bullets, numbers, or prose in the conversation.

**Invocation:** same tool contract as
`references/onboarding-questions.md` § How to ask (`title` +
`questions[]` with `id` / `prompt` / `options` / `allow_multiple`).
See also `SKILL.md` § `AskQuestion` means a real tool call — the tool call
itself renders the question; do not narrate a numbered list in chat first.
**If `AskQuestion` is missing from the session tool list — plain-text
degrade.** Spell out the same menu options below in chat; wait for a typed
reply. Do **not** tell the designer to switch models (see `KNOWN-ISSUES.md`
+ `harness/references/ask-question-ui.md` + `.cursor/rules/ask-question-ui.mdc`).

**For the 5 IC role focus values, this is, worst case, the second and
last onboarding question** — it only fires at all when the opening
message was vague (see § When to skip below). In the common case where
the opening message was already actionable, onboarding asks exactly one
question total (role focus) and this menu never runs. **For `manager`**,
this is the third question worst case (after role focus + reports) — see
`harness/designer-onboarding/SKILL.md` § Manager role focus.

---

## Tool payload

```json
{
  "title": "Next step",
  "questions": [
    {
      "id": "next_step",
      "prompt": "What do you want to tackle first?",
      "allow_multiple": false,
      "options": [
        { "id": "kickoff", "label": "Kick off a project" },
        { "id": "build", "label": "Build or iterate a screen" },
        { "id": "research", "label": "Research beyond this snapshot" },
        { "id": "patterns", "label": "Flow and patterns" },
        { "id": "copy", "label": "Copy and microcopy" },
        { "id": "a11y", "label": "Accessibility review" },
        { "id": "audit", "label": "Audit before sharing" },
        { "id": "cross-squad", "label": "Cross-squad map" },
        { "id": "workload", "label": "Refresh workload snapshot" }
      ]
    }
  ]
}
```

Reorder `options` per the role table below (most relevant first). For
**manager**, insert `{ "id": "1on1", "label": "Prep a 1:1" }` after
`workload` and before `kickoff`; omit `1on1` entirely for the 5 IC
values. Do not add your own `"Other…"` entry — the tool appends its own
free-text option automatically.

`allow_multiple`: **false**

---

## Options (reorder by role — most relevant first)

Use these labels exactly (short — subtitle lives in agent routing, not UI).

| ID | Label | Routes to |
|----|-------|-----------|
| `kickoff` | Kick off a project | `design-kickoff` |
| `build` | Build or iterate a screen | `ui-agent` |
| `research` | Research beyond this snapshot | `research-agent` |
| `patterns` | Flow and patterns | `ux-pattern` |
| `copy` | Copy and microcopy | `content` |
| `a11y` | Accessibility review | `accessibility` |
| `audit` | Audit before sharing | `audit` |
| `workload` | Refresh workload snapshot | `workload-agent` |
| `cross-squad` | Cross-squad map | explain + widen research |
| `1on1` | Prep a 1:1 | `manager-1on1-prep` — **manager profiles only**, omit this option entirely for the 5 IC values |

### Role — option order (first three = top of list)

| Role focus | Order options |
|------------|----------------|
| **product** | kickoff · build · research · patterns · copy · a11y · audit · cross-squad · workload |
| **content** | copy · research · cross-squad · kickoff · build · patterns · a11y · audit · workload |
| **accessibility** | a11y · build · research · patterns · copy · kickoff · audit · cross-squad · workload |
| **research** | research · kickoff · cross-squad · workload · build · patterns · copy · a11y · audit |
| **mix** | kickoff · build · research · copy · patterns · a11y · audit · cross-squad · workload |
| **manager** | workload · 1on1 · kickoff · research · cross-squad · build · patterns · copy · a11y · audit |

Omit options that don't apply (e.g. skip `a11y` lead for pure content if
list is long, or skip `1on1` entirely for the 5 IC values — it only
exists for `manager`).

---

## After they pick

- Map selection → `harness/ORCHESTRATOR.md` §1–2 immediately.
- **Other…** free text → treat as a normal task request.
- Do **not** ask "what would you like to do?" again in prose.

---

## When to skip this `AskQuestion`

| Situation | Action |
|-----------|--------|
| Original message was **specific and actionable** | Short recap + workload tables → execute — **no** menu question |
| `Status: SKIPPED` | No menu |
| Designer already stated intent in same turn after onboarding | Route directly |
