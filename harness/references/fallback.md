# Fallback protocol

Moved from `harness/ORCHESTRATOR.md` §4. Read this when no routing row matches, or confidence is too low to pick one. Do not answer as if a skill ran.


## 4. Fallback protocol

When **no** row in the routing table matches — or confidence is too low
to pick one without guessing:

### Required script (loud miss — never silent freestyle)

1. **Say so plainly in the first sentence**, using this shape (adapt
   names, keep the honesty):

   > This doesn't match an existing skill — closest is **[skill/row]**.
   > Want me to run that, or freestyle **without** harness context?

2. **Do not** produce a normal design/product answer in the same turn as
   if a skill had run. No "helpful" freestyle first, confirm later.

3. Ask via **`AskQuestion`** when available, with options at least:
   - Run closest: `[skill/row]`
   - Freestyle without harness (explicit opt-in — no skill files, still logged)
   - Other…

   If `AskQuestion` is missing from the session tool list, **plain-text
   degrade** per `harness/references/ask-question-ui.md` — same options in
   chat, wait for a typed reply. **Do not** tell the designer to switch
   models. Still **do not** freestyle the substance while waiting.

4. **Log before or as you ask** — one line in
   `harness/logs/routing-log.md`:

   `YYYY-MM-DD | <intent paraphrase> | FALLBACK | closest=<skill or —> | asked user | Task: <slug or —>`

5. Only after the designer picks:
   - **Run closest** → load that skill and proceed (plan gate if multi-skill).
   - **Freestyle without harness** → answer, but prefix the answer with
     `Freestyle (no harness skill)` and keep the FALLBACK log line.
   - **Other** → one clarifying follow-up, still no silent skill claim.

### Also forbidden

- Pretending a skill ran when it didn't ("I ran ux-pattern…" without
  having read the skill file).
- Using §4 as a shortcut for design critique, ideation on approved work,
  micro-edits, or harness-ops asks — those have §2 rows now; re-check
  before declaring no match.
- Skipping the `FALLBACK` line because there is no task folder.

Every fallback is food for `harness/harness-audit/SKILL.md`.

---
