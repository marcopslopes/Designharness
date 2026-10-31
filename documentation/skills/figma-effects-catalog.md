# figma-effects-catalog

<!-- generated-from-skill: do not edit -->

Documentation and cataloging of custom Figma shader effects and fills.

**Triggers:** "document custom effects" · "what shader effects do we have" · "catalog Figma shaders" · "custom fill documentation" · "effects library audit"

<!-- /generated-from-skill -->

Catalogs Figma effects (shadows, blurs) and maps to CSS.

## What It Does

**Effect mapping** that:
- Lists all Figma effects
- Generates CSS equivalents
- Creates token references
- Documents usage

**Effects as tokens** - shadows, blurs, gradients become reusable tokens.

---

## When to Use

Use when you need to:
- Export shadows to CSS
- Map Figma effects to code
- Create effect tokens
- Document effect styles

### Trigger Phrases
```
"Catalog Figma effects"
"Export shadows to CSS"
"Map blur effects"
"Create effect tokens"
```

---

## Example

```
You: "Catalog shadows from Figma"

Output: tokens.css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

Usage:
.card {
  box-shadow: var(--shadow-md);
}
```

---

## Related Skills

- [figma-token-sync](figma-token-sync.md) - Syncs all tokens
- [design-system](design-system.md) - Uses effect tokens
