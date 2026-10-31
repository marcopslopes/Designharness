# accessibility-decisions

<!-- generated-from-skill: do not edit -->

Documents accessibility decisions, tradeoffs, and engineering handoff specs so inclusive choices survive redesigns and staff changes.

**Triggers:** "accessibility decision" · "document this a11y tradeoff" · "a11y ADR" · "accessibility handoff for eng" · "why is a11y like this" · "we can't do both for accessibility" · "accessibility decision record" · "who do we exclude if we ship this"

<!-- /generated-from-skill -->

Documents trade-offs when full accessibility is difficult - transparent choices.

## What It Does

**Records accessibility trade-offs** including:
- What standard couldn't be met
- Why (technical/business constraint)
- What was done instead
- Plan to address later
- Who approved

**Transparency** - can't always be perfect, but document it.

---

## When to Use

Use when you ship with known a11y gaps:
- Technical limitations
- Timeline constraints
- Legacy system issues

### Example
```
"Document accessibility trade-off for [feature]"
```

---

## Example Output

```
## Accessibility Trade-off: Video Player
Date: 2026-08-27
Feature: PROJ-890

### Standard Not Met
WCAG 2.1 AA - Captions (1.2.2)
Video player launches without captions

### Why
- Third-party player doesn't support captions yet
- Captioning service not approved by legal
- Timeline: Must ship for launch event

### What We Did Instead
- Added transcript below video (text alternative)
- Warned users in advance (no captions yet)
- Logged as tech debt (PROJ-891)

### Plan to Address
- Q1 2027: Migrate to accessible player
- Target: Full caption support
- Owner: Engineering team

### Approval
- PM: Alex (approved risk)
- Legal: Reviewed, accepted interim solution
- Accessibility lead: Consulted, documented

### Impact
- Estimated: 8% of users need captions
- Mitigation: Transcript provides text alternative
- Risk: User complaints, potential compliance issue
```

---

## Related Skills

- [accessibility](accessibility.md) - Full a11y review
- [design-rationale](design-rationale.md) - Decision documentation
