#!/bin/bash
# sessionStart hook — designer onboarding gate.
# - Profile MISSING → inject "run onboarding" context
# - Profile EXISTS  → inject "skip onboarding" context (do not re-ask)
# See harness/designer-onboarding/SKILL.md
#
# KNOWN ISSUE: sessionStart additional_context may not always reach the
# model (Cursor platform bug). AGENTS.md + .cursor/rules/designer-profile-gate.mdc
# are the primary enforcement; this hook is belt-and-suspenders.
set -euo pipefail

PROFILE="designer-profile.local.md"

if [ -f "$PROFILE" ]; then
  cat <<EOF
{
  "additional_context": "ONBOARDING COMPLETE: ${PROFILE} exists at the repo root. Do NOT run designer onboarding, MCP gate, profile AskQuestion, squad questions, handoff workload tables, or handoff menu. Read ${PROFILE} silently if needed, then handle the user's request directly. New chat does not reset onboarding."
}
EOF
  exit 0
fi

cat <<'EOF'
{
  "additional_context": "ONBOARDING REQUIRED: designer-profile.local.md is missing at repo root. After the gate-check Read only: output the Muse greeting first (harness/designer-onboarding/SKILL.md § The greeting — both plain-text blocks, literal first content, no preamble like \"I'll greet you then…\"). Then run the rest of harness/designer-onboarding/SKILL.md in order: Step 0b MCP gate → one profile question → workload handoff. See harness/ORCHESTRATOR.md §0."
}
EOF
exit 0
