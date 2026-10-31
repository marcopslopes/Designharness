# figma-asset-sync

<!-- generated-from-skill: do not edit -->

Automated asset pipeline between Figma and codebase.

**Triggers:** "download assets from Figma" · "export icons from Figma" · "sync Figma assets" · "upload assets to Figma" · "generate icon bundle" · "update design assets"

<!-- /generated-from-skill -->

Syncs design assets between Figma and codebase - icons, images, illustrations.

## What It Does

**Syncs assets** by:
- Exporting from Figma
- Optimizing (SVG/PNG)
- Importing to codebase
- Keeping in sync

**Single source of truth** - Figma is the source, code stays updated.

---

## When to Use

Use when you need to:
- Export icons from Figma
- Sync illustrations
- Update brand assets
- Keep assets in sync

### Trigger Phrases
```
"Sync assets from Figma"
"Export icons from [Figma file]"
"Update illustrations"
"Import Figma assets"
```

---

## Example

```
You: "Sync icons from Figma icon library"

Process:
1. Connect to Figma file (via Figma MCP)
2. Export all icons as SVG
3. Optimize SVGs (remove Figma metadata)
4. Import to context/design-system/assets/icons/
5. Generate index file for imports

Output:
✅ 24 icons exported
✅ Optimized (-40% file size)
✅ Imported to codebase
✅ Index file generated

Usage:
import { IconHome } from 'context/design-system/assets/icons'
```

---

## Chains With

`figma-asset-sync` works with:
- `icon-usage` (uses synced icons)
- `ui-agent` (uses synced assets)
- `figma-token-sync` (related Figma sync)

---

## Tips

### 1. Name Consistently
Figma layer names become file names - use clear, consistent names.

### 2. Sync Regularly
```
"Sync Figma assets weekly"
```
Keep code up to date.

### 3. Optimize Always
SVGs from Figma include metadata - always optimize.

---

## Related Skills

- [figma-token-sync](figma-token-sync.md) - Syncs design tokens
- [icon-usage](icon-usage.md) - Uses icons
