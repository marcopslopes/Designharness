# CLAUDE.md

Claude Code loads this file. The session rules are in [AGENTS.md](AGENTS.md). Read that file and follow it. Do not keep a second copy here.

**Before the first reply in a chat, even to a one-line question:** run `npm run -s harness:context`, then read `harness/ORCHESTRATOR.md` and classify the ask. "Which icon…", "is this a real token…" or "give me a link" are design work with their own skills, not general knowledge. A reply with no tool call is never right in this repo.
