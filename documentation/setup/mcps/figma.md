---
label: Figma
hint: Read/write designs and DS lookup — checked at onboarding if your team uses Figma.
order: 1
tint: rose
---
# Figma MCP

**Type:** Cursor plugin (`plugin-figma-figma`)  
**Onboarding:** Checked only if your team uses it  
**Site:** your org's Figma org (record it in `COMPANY-BUSINESS.md`)

---

## What it’s for

Let the agent **read** Figma files (screenshots, structure, variables) and
**write** into Figma (generate/update frames from code or intent) so design
links from Jira/Confluence become usable without manual copy-paste.

---

## Install

1. Settings → **Plugins** → install **Figma**.
2. Tools & MCP → enable **figma** → **Authenticate** with your Figma account.
3. Reload Window → new Agent chat.

Verify: paste a `figma.com/design/...` URL and ask for the frame name.

---

## How to use

- Paste a Figma URL and ask for context, screenshot, or token mapping.
- Ask the agent to implement a node in Design Harness / React using DS components.
- Ask for design-system search before inventing new components.

### Example prompts

```text
Open this Figma link and describe the selected frame's hierarchy and key spacing:
https://www.figma.com/design/FILE_KEY/Name?node-id=1-2
```

```text
Using Figma MCP, get design context for that node and map colors to your design tokens.
```

```text
Search your design system in Figma for the primary button component.
```

---

## Designer use cases

| Use case | Why |
|----------|-----|
| Research / kickoff | Open linked comps from Confluence |
| Spec → build | Screenshot + structure → Design Harness UI |
| DS consistency | `search_design_system` before new UI |
| Hand-off | Variables / Code Connect context for eng |

---

## Useful tools (names)

`get_design_context`, `get_screenshot`, `get_metadata`, `get_variable_defs`,
`search_design_system`, `use_figma`, `generate_figma_design`, `whoami`, …

---

## Figma file keys (reference)

| File | Key |
|------|-----|
| Design system | *(your Figma file key — record it in `COMPANY-BUSINESS.md` § Design system)* |
| Foundations | *(your Foundations file key, same place)* |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Can’t read file | Auth with your Figma account; confirm file access |
| Empty / wrong file | Check `fileKey` and `node-id` (`1-2` → `1:2` for APIs) |
| Write tools fail | Need edit permission on the target file |

---

## Related

- [01 — Setup](../01-setup-mcp-in-cursor.md)
- [`documentation/setup/mcp-setup.md`](../mcp-setup.md)
