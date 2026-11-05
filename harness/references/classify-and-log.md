# Classify and log — every turn

The full text behind `harness/ORCHESTRATOR.md` §2e and §2f. It also holds
the detail that used to sit in `.cursor/rules/orchestrator-gate.mdc`.

## Every turn (§2e)

Before answering any designer request, after the §0 check:

1. Classify the ask against §2, including No match → §4. Read the table
   if you are unsure this session.
   `npm run -s harness:context -- --ask "<the ask>"` lists the literal
   trigger phrases it hits. It only matches phrases of two words or more.
   A hit is a text match, not a routing decision. No hit is not a fallback
   by itself. Classify by meaning.
2. State routing confidence (§2f below). Silent on high. One short caveat
   line on medium. Never round up what is honestly a §4 fallback.
3. Log only the exceptions. Append to `harness/logs/routing-log.md` for a
   `FALLBACK`, a `MISROUTE`, a `MISS` (`harness/references/miss-log.md`),
   or a §3 plan the designer approved. Do not
   log a plain match: the skill-usage hook records every `SKILL.md` read in
   `harness/logs/skill-usage.jsonl`. A task-scoped ask still gets a row in
   that task's `projects/<slug>/log.md`, since resuming reads it.
4. A skill or chain matched → `Read` the full `harness/skills/<name>/SKILL.md`
   (or `harness/harness-audit/SKILL.md`) once per chat, and follow it. A
   skill already read in this chat is not read again. More than one
   skill → §3 plan, and wait for go.
5. No match → §4 loud fallback only ("doesn't match… closest is X… run
   that or freestyle without harness?"). Do not produce a normal answer as
   if a skill ran. No substantive freestyle in the same turn.

Meta asks about the harness itself match the `harness-audit` row, not
freestyle process advice.

Match the verb. "Show / examples / explain / what would" → answer in chat,
edit nothing. "Fix / do / build" → do it, don't only report. "One file"
means one file.

## Forbidden

- Answering design, product, or harness questions as normal chat when no
  skill was loaded and no `FALLBACK` was logged.
- Editing `src/design-harness/**`, `projects/*/screens/**`, or prototype CSS
  without matching the iterating or micro-edit row and loading `ui-agent`
  (the account-settings failure mode).
- Treating "quick", "just", or "any thoughts?" as license to skip routing.

## Routing confidence (§2f)

- **High** (exact trigger phrase, or this chain is already logged in the
  project's `decisions.md`): say nothing extra. That includes the harness's
  own rules: no "this goes through X, not Y" or "the skill says…" lines. Do
  what the rule says. Open with the work.
- **Medium** (paraphrase, or the ask sits across two rows): one line, then
  proceed: `Routing: <skill> (medium confidence — <why>). Proceeding — say so if this should be something else.`
  Never a gate.
- **Low**: that is a §4 fallback. Never round it up to medium.

A medium line never covers a §2h challenge. When the ask conflicts with a
brief's scope or a named owner, ask and wait. Background:
`documentation/guides/confidence-autonomy.md`.

Design critiques: `harness/skills/ux-pattern/SKILL.md` (Critique gate) and
§2d.
