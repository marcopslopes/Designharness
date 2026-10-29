# live-page-review

Reviews live production pages - quality check on shipped work.

## What It Does

**Production review** that checks:
- Design system compliance
- Accessibility
- Performance
- Visual quality
- Content accuracy

**Post-ship audit** - catch issues in production.

---

## When to Use

Use for:
- Post-launch reviews
- Regression checks
- Periodic audits

### Trigger Phrases
```
"Review live page [URL]"
"Audit production [feature]"
"Check shipped [page]"
```

---

## Example

```
You: "Review live city leaderboard page"

Output:
✅ Design system compliant
✅ Accessibility WCAG AA
⚠️ Performance: 2.8s load (target <2s)
❌ Visual bug: Card overflow on Android
✅ Content matches approved copy

Action items:
1. Fix Android overflow (critical)
2. Optimize images for performance (high)
```

---

## Related Skills

- [audit](audit.md) - Pre-ship audit
- [interface-change-review](interface-change-review.md) - Code-level review
