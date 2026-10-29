# Autonomy dial — per-task, inside a plan block

The full text of `harness/ORCHESTRATOR.md` §3a. The orchestrator keeps a short version and sends you here when this applies, so it isn't loaded in every chat.

**The gap this closes:** autonomy used to be a global, binary setting —
single-skill auto-runs, multi-skill always gates, with no per-task
override short of the standing "just do it" profile preference. See
`documentation/guides/confidence-autonomy.md` for the full proposal.

Whenever a plan block above actually fires (i.e. a real multi-skill
chain, not a single-skill auto-run), offer one extra `AskQuestion` right
after the plan, before "go":

```
How hands-on do you want to be on this one?
[ Just build + summarize ]  [ Confirm each step ]  [ Default — plan gate only ]
```

- **Just build + summarize** — skip per-step confirmations *within* this
  chain (e.g. don't stop between `ui-agent` and `audit` to check in);
  still report what happened at the end.
- **Confirm each step** — pause and show output after each skill in the
  chain before moving to the next.
- **Default** — today's existing behaviour (plan gate once, then run to
  completion, same as if this question didn't exist).

**Scoped to this one task only** — log the choice to
`projects/<slug>/decisions.md` if picked, but never write it back to
`designer-profile.local.md`'s global interaction style. **Never** skips
the *first* plan-gate approval itself — §3's "never execute before
approval on a multi-skill chain" stays a hard rule; this only changes
what happens *after* that first "go." **Never** fires on single-skill
auto-runs or the kickoff PRD gate (Step 3 there is never skippable in-spec, per
§3 above).
