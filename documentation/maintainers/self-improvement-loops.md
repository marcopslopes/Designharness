# How to use self-improvement loops

**Added:** 2026-08-24  
**Pattern source:** Remy (AI with Remy podcast episode on skills management)

## What they are

Self-improvement loops are a structured feedback mechanism built into skills. After each skill run, the agent checks whether:
1. Any step failed or needed a workaround
2. The designer corrected or rejected anything
3. The skill is missing coverage for a pattern it encountered

If yes to any → the agent proposes **one specific improvement** to the skill file.

## Why we added them

Before this pattern:
- Skills improved only when someone manually noticed a gap
- Edge cases got forgotten or lived only in chat history
- Skill quality depended on designer proactively reporting issues

With self-improvement loops:
- Skills learn from their own failures
- Every designer using a skill can improve it
- Improvements are evidence-based (real failures, not hypotheticals)
- Skill maintenance becomes distributed across the team

## How they work

### 1. During a skill run

The agent executes the skill normally — no change to workflow.

### 2. At the end of the run

Before ending, the agent asks itself:
- Did anything fail?
- Did the designer correct me?
- Did I hit a gap in the skill's coverage?

### 3. If yes to any

The agent proposes **one improvement**:

```
Self-improvement suggestion for ui-agent:

Step 4.5 currently says "load design-system before writing CSS" but 
doesn't specify what to do when tokens.css is missing the exact value 
needed.

Propose adding to Step 4.5:
"If a token is missing, first check tokens.css for a similar token. 
If none exists, flag [DS-TOKEN-GAP] and defer to design-system skill's 
Job 2 procedure."

Approve this change?
```

### 4. Designer decides

- **"Yes"** → Agent edits the skill file
- **"No"** → Suggestion is dropped, skill unchanged
- **"Later"** → Note it in the skill's own issues/backlog

## What gets proposed

**Good proposals** (evidence-based):
- "Step 3 failed because X reference file doesn't exist"
- "Designer corrected the output format 3 times — add explicit format to Step 5"
- "Hit a gap: skill doesn't cover iOS 18 notification patterns"

**Bad proposals** (rejected):
- "This skill could be clearer" (vague)
- "Consider adding dark mode support" (not evidence of failure)
- "Maybe check Figma first?" (opinion without data)

## Skills with loops added

As of 2026-08-24, these 8 skills have loops:

| Skill | Loop added |
|-------|------------|
| `ui-agent` | ✅ 2026-08-24 |
| `ux-pattern` | ✅ 2026-08-24 |
| `design-system` | ✅ 2026-08-24 |
| `audit` | ✅ 2026-08-24 |
| `research-agent` | ✅ 2026-08-24 |
| `content` | ✅ 2026-08-24 |
| `workload-agent` | ✅ 2026-08-24 |
| `design-kickoff` | ✅ 2026-08-24 |

## Adding loops to more skills

To add to remaining skills, use this prompt:

> "Add the self-improvement loop from `harness/references/self-improvement-loop-template.md` to [skill-name]. Customize item 3 based on this skill's focus area."

Or batch-add to all remaining skills:

> "Add the self-improvement loop template to all skills in `harness/skills/` that don't have one yet. Use the template from `harness/references/self-improvement-loop-template.md`."

Template: [`harness/references/self-improvement-loop-template.md`](../../harness/references/self-improvement-loop-template.md)

## Benefits over time

**Week 1:** Skills start proposing obvious gaps you didn't notice
**Month 1:** Skills stabilize as common edge cases get covered
**Quarter 1:** Skills become self-maintaining reference libraries
**Year 1:** Your skill library becomes a competitive advantage

## Comparison to traditional skill improvement

| Approach | How improvements happen | Result |
|----------|------------------------|--------|
| **Traditional** | Designer notices gap → manually edits skill → tests | Slow, requires proactive attention |
| **Self-improvement loops** | Skill detects own gap → proposes fix → designer approves | Fast, distributed, evidence-based |

## Anti-patterns to watch for

1. **Over-proposing** — If a skill suggests improvements every run, the criteria are too loose
2. **Vague suggestions** — "Could be better" is not actionable; reject these
3. **Skill-hopping** — If ui-agent suggests changes to ux-pattern, that's wrong skill
4. **One-off edge cases** — If it happened once and won't recur, don't encode it

## Maintenance

Check self-improvement quality quarterly:
1. Review commits with message pattern `Self-improvement: [skill-name]`
2. Count how many were good catches vs. noise
3. Tighten criteria if too many vague proposals get through

## Related

- Template: [`harness/references/self-improvement-loop-template.md`](../../harness/references/self-improvement-loop-template.md)
- Routing standards: [`harness/logs/routing-standards.md`](../../harness/logs/routing-standards.md)
- Skill benchmarking: [`skill-benchmarking.md`](skill-benchmarking.md)
