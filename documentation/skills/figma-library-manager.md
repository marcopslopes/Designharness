# figma-library-manager

<!-- generated-from-skill: do not edit -->

Design system library management using get_libraries and search_design_system.

**Triggers:** "search Figma design system" · "find [component] in libraries" · "what libraries do we have" · "check before creating component" · "prevent duplicate components" · "library audit"

<!-- /generated-from-skill -->

Manages Figma component libraries - organization, documentation, updates.

## What It Does

**Library management** including:
- Audit existing components
- Organize structure
- Document usage
- Plan updates
- Version management

**Well-maintained library** - findable, usable components.

---

## When to Use

Use when you need to:
- Audit Figma library
- Reorganize components
- Document component library
- Plan library updates

### Trigger Phrases
```
"Audit Figma library"
"Organize component library"
"Document Figma components"
"Plan library updates"
```

---

## Example

```
You: "Audit Figma component library"

Output:
Library Audit: Design System

Components: 42 total
- Primitives: 18 (Button, Input, Card, etc.)
- Patterns: 12 (Navigation, Forms, etc.)
- Templates: 8 (Page layouts)
- Icons: 4 icon sets

Issues Found:
⚠️ Naming inconsistent (Button/btn, Card/card-component)
⚠️ 6 duplicate components (Button v1, Button v2)
❌ 3 components not documented
✅ Variants properly structured
⚠️ No usage examples in library

Recommendations:
1. Standardize naming (Title Case for components)
2. Deprecate old versions (archive v1 variants)
3. Add descriptions to all components
4. Create usage examples page
5. Version control (add v2.0 tag)

Timeline: 2 weeks cleanup sprint
```

---

## Related Skills

- [figma-code-sync](figma-code-sync.md) - Keeps Figma/code aligned
- [design-system](design-system.md) - Code side of library
