# interface-change-review

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
