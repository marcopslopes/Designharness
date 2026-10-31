# review-report

Comprehensive design review - all checks in one report.

## What It Does

**Complete review** running:
- `audit` (design system)
- `accessibility` (WCAG)
- `ux-pattern` (structure)
- `content` (copy)
- `taste-feedback` (craft)

**One report, all dimensions** - holistic quality check.

---

## Example

```
You: "Full review of city leaderboard"

Output:
Design Review Report: City Leaderboard
Date: 2026-08-27

OVERALL: ✅ APPROVED WITH ADVISORIES

Design System: ✅ PASS
- All tokens used correctly
- No hardcoded values
- Component usage proper

Accessibility: ✅ PASS
- WCAG AA compliant
- Screen reader tested
- Keyboard navigation works

UX Pattern: ⚠️ ADVISORY
- Structure solid
- Minor: Consider loading skeleton
- Minor: Error state could be clearer

Content: ✅ PASS
- Voice matches brand
- Terminology correct
- Microcopy clear

Craft: ⚠️ ADVISORY
- High quality overall
- Minor: Badge typography weight
- Minor: Spacing around ranks

Recommendations:
1. Add loading skeleton (nice-to-have)
2. Increase badge font weight (polish)
3. Ship as-is, iterate post-launch
```

---

## Related Skills

- [audit](audit.md) - One dimension
- [accessibility](accessibility.md) - One dimension
- [ux-pattern](ux-pattern.md) - One dimension
