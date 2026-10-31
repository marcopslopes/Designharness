# live-page-review

<!-- generated-from-skill: do not edit -->

Front door for reviewing a fetchable live or local URL: capture screenshot + DOM + accessibility tree (optional click-through in one browser session), classify the artifact, then hand off to the existing review skill.

**Triggers:** "review this live page" · "review this local URL" · "review localhost" · "click through this flow on this URL" · "capture this page and review it"

<!-- /generated-from-skill -->

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
