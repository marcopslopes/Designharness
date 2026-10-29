# Self-improvement loop template

**Purpose:** Add a structured feedback mechanism to skills so they can propose their own improvements based on real execution evidence.

## When to add

Add to every skill in `harness/skills/*/SKILL.md` — especially:
- Frequently-used skills (ui-agent, audit, ux-pattern)
- Skills with complex multi-step workflows
- Skills that often surface edge cases

## Where to add

**At the very end of the skill file**, after:
- All workflow steps
- "Never do this" / "Guardrails" sections
- "Related files" sections
- Any other content

## Template

```markdown
---

## Self-improvement loop

After completing this skill run, before ending your turn:

1. **Review execution:** Did any step fail, need a workaround, or require multiple attempts?
2. **Review corrections:** Did the designer correct, reject, or clarify anything meaningful during this run?
3. **Review gaps:** Did you discover a missing [SKILL-SPECIFIC-ELEMENT], an ambiguous instruction, or a pattern this skill doesn't cover yet?

If **yes** to any:

- Propose **one specific, actionable improvement** to this skill file.
- State what would change and why (reference the step number or section).
- Wait for designer approval before editing the skill.

**Only propose changes that would prevent a real failure or fill a documented gap.** Do not suggest:
- Vague improvements ("could be clearer")
- Taste preferences without evidence
- Changes that belong in a different skill
- Fixes for one-off edge cases unlikely to recur

If nothing meaningful broke or was missing, skip this section silently.
```

## Customization by skill type

Replace `[SKILL-SPECIFIC-ELEMENT]` in item 3 with context-specific examples:

| Skill type | Replace with |
|------------|--------------|
| Build skills (ui-agent, mobile-shell) | "missing component reference, an ambiguous build rule" |
| Critique skills (ux-pattern, content) | "missing pattern reference, an ambiguous critique criteria" |
| Research skills (research-agent, workload-agent) | "missing source type, an ambiguous search rule" |
| Process skills (design-kickoff, audit) | "missing workflow step, an ambiguous gate criteria" |
| System skills (design-system, icon-usage) | "missing token/component, an ambiguous layer rule" |

## Skills already updated (2026-08-24)

- ✅ `ui-agent`
- ✅ `ux-pattern`
- ✅ `design-system`
- ✅ `audit`
- ✅ `research-agent`
- ✅ `content`
- ✅ `workload-agent`
- ✅ `design-kickoff`

## Skills still pending

Run this to see all skills:
```bash
ls -1 harness/skills/*/SKILL.md | wc -l
```

To add to remaining skills, use this prompt:
> "Add the self-improvement loop template to the remaining skills in `harness/skills/`. Use the template from `harness/references/self-improvement-loop-template.md` and customize item 3 based on each skill's focus area."

## Expected behavior

When a skill with this loop completes:

1. **Silent pass** — If execution was clean and designer accepted output → no message
2. **Improvement proposal** — If something broke or was corrected → agent suggests one specific fix to the skill file
3. **Wait for approval** — Never auto-edits the skill; designer says "yes" or "no"

## Benefits

- **Self-documenting failures** — Skills capture their own edge cases
- **Distributed maintenance** — Every skill user can improve skills they use
- **Evidence-based evolution** — Only real failures trigger changes, not hypotheticals
- **Prevents bloat** — One improvement per run; vague suggestions rejected

## Anti-patterns to avoid

Don't let this become:
- Generic "this could be better" suggestions
- Skill-hopping (proposing changes to different skills)
- Over-correction (suggesting changes for one-off edge cases)
- Approval bypass (editing skills without designer confirmation)
