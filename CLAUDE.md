# CLAUDE.md

Claude Code loads this file. The session rules are in [AGENTS.md](AGENTS.md). Read that file and follow it. Do not keep a second copy here.

**Before the first reply in a chat, even to a one-line question:** run `npm run -s harness:context`, then read `harness/ORCHESTRATOR.md` and classify the ask. "Which icon…" or "is this a real token…" are design work with their own skills, not general knowledge. `harness:context` is that first tool call. A Light-lane answer after it needs no further tools.
