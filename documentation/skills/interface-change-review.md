# interface-change-review

<!-- generated-from-skill: do not edit -->

Change-scoped UI craft review of uncommitted work, the current branch, or a named commit range — classifies findings as introduced, regression, or pre-existing.

**Triggers:** "review my branch for UI" · "interface review on this diff" · "craft review my uncommitted changes" · "design regression check on this PR" · "review UI changes before I push" · "did this branch hurt the interface"

<!-- /generated-from-skill -->

Reviews code changes for design system compliance before merging.

## What It Does

**Pre-merge review** that checks:
- Design system adherence
- Token usage
- Component consistency
- Visual regression

**Quality gate** - prevents design drift in code.

---

## When to Use

Runs automatically on:
- Pull requests
- Code reviews
- Pre-merge checks

Or manually:
```
"Review changes in [PR/branch]"
```

---

## Example

```
PR #123: Add filter UI to leaderboard

Review:
✅ Uses Card from design-system
✅ Spacing tokens correct (--space-4)
❌ Hardcoded #eee for divider
   Fix: Use --kit-border

✅ No accessibility regressions
⚠️ New icon not from Tabler
   Advisory: Use IconFilter from Tabler

Result: Requires changes before merge
```

---

## Related Skills

- [audit](audit.md) - Similar checks
- [design-system](design-system.md) - Token validation
