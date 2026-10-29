# figma-code-sync

Syncs component props between Figma and code - keeps them aligned.

## What It Does

**Component sync** that:
- Maps Figma variants to code props
- Ensures naming consistency
- Documents differences
- Flags drift

**Component parity** - Figma components match code components.

---

## When to Use

Use when you need to:
- Verify component parity
- Sync Figma updates to code
- Document component APIs
- Catch drift

### Trigger Phrases
```
"Sync components with Figma"
"Check component parity"
"Map Figma variants to code"
"Find component drift"
```

---

## Example

```
You: "Check Button component parity"

Output:
Button Component Comparison

Figma Variants:
- Size: small, medium, large
- Variant: primary, secondary, ghost
- State: default, hover, disabled
- Icon: none, left, right

Code Props:
- size: "sm", "md", "lg"
- variant: "primary", "secondary", "ghost"
- disabled: boolean
- leftIcon, rightIcon: ReactNode

Parity Check:
✅ Variants match
⚠️ Naming inconsistency: Figma uses "small", code uses "sm"
✅ State coverage complete
⚠️ Figma doesn't show loading state (exists in code)

Recommendations:
1. Align naming: Use "sm"/"md"/"lg" in both
2. Add loading variant to Figma
```

---

## Related Skills

- [figma-library-manager](figma-library-manager.md) - Manages Figma libraries
- [design-system](design-system.md) - Code design system
