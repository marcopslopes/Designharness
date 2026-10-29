# Claude Code Skills Bridge

This folder bridges **design-harness** skills to Claude Code's skill loading system.

## How it works

Claude Code scans `.claude/skills/` for `SKILL.md` files. Instead of duplicating all 55 skills here, we use **symlinks** pointing to `harness/skills/*/SKILL.md`.

## Structure

```
.claude/skills/
  ui-agent -> ../../harness/skills/ui-agent/
  audit -> ../../harness/skills/audit/
  ux-pattern -> ../../harness/skills/ux-pattern/
  ... (55 symlinks total)
```

## Setup (one-time)

Run this script to create symlinks:

```bash
npm run setup:claude-skills
```

Or manually:

```bash
cd .claude/skills
for dir in ../../harness/skills/*/; do
  name=$(basename "$dir")
  ln -s "$dir" "$name"
done
```

## Why symlinks

**Pros:**
- No duplication (one source of truth in `harness/skills/`)
- Auto-updates when `harness/skills/` changes
- Works on Mac/Linux

**Cons:**
- Windows requires admin or Developer Mode for symlinks
- Git doesn't follow symlinks (team members need to run setup)

## Windows alternative

On Windows without symlink support, use the copy script:

```bash
npm run setup:claude-skills-windows
```

This copies (not links) skills to `.claude/skills/`. Re-run after updating skills in `harness/skills/`.

## Verification

After setup, Claude Code should see all 55 skills:

```bash
# In Claude Code terminal:
/skills
```

You should see:
- ui-agent
- audit
- ux-pattern
- ... (all 55)

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Skills not loading | Run `npm run setup:claude-skills` |
| "Symlink not supported" (Windows) | Run `npm run setup:claude-skills-windows` instead |
| Skills outdated after git pull | Symlinks auto-update; copies need re-run |

---

**Note:** This bridge is for **Claude Code** only. Cursor and Codex use their respective plugin manifests (`.cursor/plugin.json`, `.codex-plugin/plugin.json`).
