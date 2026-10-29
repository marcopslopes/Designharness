# Routing confidence signal + per-task autonomy dial

**Status: implemented 2026-08-04.** Live in `harness/ORCHESTRATOR.md`
§2f (confidence signal) and §3a (autonomy dial). Sparked by reading
external agentic-AI/design articles on 2026-08-04 (see
`designer-context.local/sources.md`), routed as a harness-audit-adjacent
ask with no exact §2 row — see `harness/logs/routing-log.md` 2026-08-04.
This doc stays as the design-rationale record; the open questions below
are still genuinely open and worth revisiting once there's enough real
usage to check them against.

Answers: *"How sure is the agent about this routing/build decision,
right now?"* — at decision time, in the conversation. Complements
`evals.md` (routing correctness, checked prospectively before a
routing-table edit ships, not at decision time).

---

## The gap

Right now routing confidence is binary and invisible: a row either
matches (silently, full confidence assumed) or it's a §4 fallback (loud,
asks). There's no middle ground where the agent says "I'm fairly sure
this is `ui-agent`, but it could also be `design-system` — proceeding
with the former" — you only find out something was shaky if it turns out
wrong later.

Autonomy is also binary today: single-skill auto-runs, multi-skill
always gates (§3). There's no per-task dial for "actually, just build
this one and summarize, don't stop to confirm the plan" vs "walk me
through every step" — the designer can only get that via a standing
profile preference ("just do it for simple asks"), which is global, not
per-task.

## Proposed shape (now live)

**Confidence signal** — one line, shown once, right after classification
(§2e step 2), before skill execution:

```
Routing: ui-agent (high confidence — exact phrase match on "iterating" row)
```
or
```
Routing: ux-pattern (medium confidence — no explicit "audit" keyword,
inferred from "any thoughts?" + a named surface). Proceeding — say so if
this should be something else.
```

Confidence isn't a model-internal number (nothing here calls a scoring
API) — it's a simple three-tier heuristic based on *how* the match
happened:

- **High** — exact trigger phrase from the §2 table, or an existing
  `projects/<slug>/decisions.md` gate already logged this exact chain.
- **Medium** — matched by inferred intent (paraphrase, no exact phrase),
  or the ask sits across two adjacent rows.
- **Low** — this is really a §4 fallback in disguise; don't silently
  round up to medium.

Only **medium** gets the one-line caveat above; **high** stays silent
(no added noise on the common case); **low** already is a fallback, no
new plumbing needed.

**Autonomy dial** — a per-task, not global, override, set via
`AskQuestion` only when a plan block already fires (§3), never as a new
standalone question:

```
PLAN — [task name]
1. ui-agent → ...
2. audit → ...
Estimated: ~X min.

How hands-on do you want to be on this one?
[ Just build + summarize ]  [ Confirm each step ]  [ Default (plan gate only) ]
```

Logged to `projects/<slug>/decisions.md` if picked (same pattern as the
existing "just do it" standing preference, §3), but **scoped to that one
task** — doesn't change the global profile setting. Multi-skill chains
still never skip the *first* plan gate (§3's "never execute before
approval" stays a hard rule) — the dial only changes what happens
*after* that first "go."

## Open questions

1. Does "medium confidence" risk becoming noise fast, given how often
   routing already works cleanly? Might need a real dry run against
   `routing-log.md`'s existing MATCHED lines to see the real high/medium
   split before trusting the current heuristic long-term.
2. Where does the autonomy choice live — `decisions.md` (task-scoped,
   matches existing pattern) or a new field, given it's meant to be
   temporary/per-task rather than a standing decision?
3. Multi-skill chains still never skip the *first* plan gate — the dial
   only changes what happens *after* that first "go." Worth re-checking
   this holds once the dial has actually been used a few times.

## Related

| Doc | Role |
|-----|------|
| [`harness/ORCHESTRATOR.md`](../../harness/ORCHESTRATOR.md) §2f, §3a | The live implementation this doc explains |
| [`documentation/maintainers/evals.md`](../maintainers/evals.md) | Prospective routing-correctness testing — different half of the "is routing working" question |
| [`documentation/maintainers/skill-benchmarking.md`](../maintainers/skill-benchmarking.md) | The companion skill-output-benchmarking idea from the same 2026-08-04 conversation |
| `designer-context.local/sources.md` | The external articles that sparked this (personal, gitignored) |
