# Security

## Reporting a vulnerability

Please don't open a public issue for a security problem. Report it privately
through the repository's **Security** tab ("Report a vulnerability"), with
the steps to reproduce it and what an attacker could do.

You'll get a reply within a week. Fixes ship in the next release and are
listed in [RELEASE-NOTES.md](RELEASE-NOTES.md).

## Supported versions

Only the latest commit on `main` is supported. There are no backported fixes.

## Trust model

Design Harness is a local tool. It assumes a trusted machine, a trusted
clone, and a trusted AI agent working in it.

- **The dev server is local only.** `npm run dev` binds to `127.0.0.1` (port 3002, or the next free one).
  Don't expose it to a network, tunnel it, or run it on a shared host.
- **The dev server writes files.** `/__harness/settings` reads and writes
  `designer-profile.local.md`, `harness.config.local.json`, files in
  `context/org-pack.local/`, and `context/design-system/.inbox/`. It only
  accepts requests from the app's own pages, and it only exists in
  `npm run dev`. A production build (`npm run build`, or the `Dockerfile`
  image) is static and writes nothing.
- **Company content stays local.** `context/org-pack.local/`,
  `designer-profile.local.md`, `harness.config.local.json`, `projects.local/`, and licensed fonts in
  `public/fonts/` are gitignored. Keep it that way in any public fork, and
  commit company content only to a private repo.
- **Agents act with your permissions.** Skills and rules tell an agent what
  to do, and the agent runs commands and edits files as you. Review rule,
  hook, and skill changes from others before you pull them, the same way you
  review code.
- **Connected tools see what you share.** MCP servers (Figma, Slack, and
  others) are optional and run with your own accounts. The harness never
  stores their tokens.

## In scope

- Ways for a web page or another local process to read or write files
  through the dev server.
- Gitignore gaps that would commit company content or credentials.
- Hooks or scripts in this repo that run something other than what they
  say.

Problems in Cursor, Claude Code, MCP servers, or other third-party tools
should go to those projects.
