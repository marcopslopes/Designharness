# figma-token-sync

Syncs design tokens between Figma variables and CSS tokens.

## What It Does

**Token sync** that:
- Exports Figma variables
- Converts to CSS custom properties
- Imports to tokens.css
- Keeps in sync

**Single source of truth** - design tokens stay aligned.

---

## When to Use

Use when you need to:
- Export Figma variables to code
- Sync token updates
- Import tokens from Figma
- Keep design/code aligned

### Trigger Phrases
```
"Sync tokens from Figma"
"Export Figma variables"
"Update design tokens"
"Import tokens to code"
```

---

## Example

```
You: "Sync tokens from Figma design system"

Process:
1. Connect to Figma file (via Figma MCP)
2. Export all variables (colors, spacing, type, radius)
3. Convert to CSS custom properties
4. Import to context/design-system/tokens.css
5. Validate (no conflicts)

Output: tokens.css updated

Colors:
--kit-brand: #007078 (from Figma var: Brand/Primary)
--kit-premium: #7B2CBF (from Figma var: Brand/Premium)
--kit-leaf: #52B788 (from Figma var: Brand/Leaf)

Spacing:
--space-1: 4px (from Figma var: Spacing/1)
--space-2: 8px (from Figma var: Spacing/2)
--space-3: 12px (from Figma var: Spacing/3)
...

Type:
--font-size-sm: 14px (from Figma var: Type/Small)
--font-size-md: 16px (from Figma var: Type/Medium)
--font-size-lg: 20px (from Figma var: Type/Large)

✅ 48 tokens synced
✅ 0 conflicts
✅ Code updated
```

---

## Sync Frequency

Recommended:
- **After Figma changes:** Immediate sync
- **Routine:** Weekly check for drift
- **Before releases:** Verify alignment

---

## Chains With

`figma-token-sync` works with:
- `design-system` (uses synced tokens)
- `harness-setup` (imports tokens)
- `figma-asset-sync` (related sync)

---

## Tips

### 1. Use Figma Variables
Figma variables → CSS custom properties (automatic mapping).

### 2. Sync Before Building
```
"Sync tokens, then build screen"
```
Ensures latest tokens.

### 3. Version Control Tokens
Commit tokens.css changes with clear messages.

### 4. Test After Sync
Run audit to catch any issues after token updates.

---

## Related Skills

- [figma-asset-sync](figma-asset-sync.md) - Syncs assets
- [design-system](design-system.md) - Uses synced tokens
- [harness-setup](harness-setup.md) - Initial token import
