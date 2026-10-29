#!/usr/bin/env bash
# Setup Claude Code skills symlinks
# Creates symlinks from .claude/skills/ to harness/skills/*/

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CLAUDE_SKILLS="$REPO_ROOT/.claude/skills"
HARNESS_SKILLS="$REPO_ROOT/harness/skills"

echo "🔗 Setting up Claude Code skills bridge..."
echo ""

# Create .claude/skills if it doesn't exist
mkdir -p "$CLAUDE_SKILLS"

# Count skills
skill_count=0
success_count=0
skip_count=0

# Create symlinks for each skill
for skill_dir in "$HARNESS_SKILLS"/*/ ; do
  skill_count=$((skill_count + 1))
  skill_name=$(basename "$skill_dir")
  target_link="$CLAUDE_SKILLS/$skill_name"
  
  # Skip if it's not a directory
  if [ ! -d "$skill_dir" ]; then
    continue
  fi
  
  # Check if SKILL.md exists
  if [ ! -f "$skill_dir/SKILL.md" ]; then
    echo "⚠️  Skipping $skill_name (no SKILL.md)"
    skip_count=$((skip_count + 1))
    continue
  fi
  
  # Remove existing link/file if it exists
  if [ -e "$target_link" ] || [ -L "$target_link" ]; then
    rm -rf "$target_link"
  fi
  
  # Create symlink (relative path for portability)
  ln -s "../../harness/skills/$skill_name" "$target_link"
  
  if [ -L "$target_link" ]; then
    success_count=$((success_count + 1))
    echo "✅ $skill_name"
  else
    echo "❌ Failed: $skill_name"
  fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Summary:"
echo "   Total skills: $skill_count"
echo "   Linked: $success_count"
echo "   Skipped: $skip_count"
echo ""

if [ $success_count -gt 0 ]; then
  echo "✨ Claude Code skills bridge ready!"
  echo ""
  echo "Verify in Claude Code:"
  echo "  /skills"
  echo ""
else
  echo "❌ No skills were linked. Check harness/skills/ directory."
  exit 1
fi
